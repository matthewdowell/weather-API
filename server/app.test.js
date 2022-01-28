const {expect} = require('@jest/globals');
const request = require('supertest');
const app = require('./app');

const validZipCode = 80003;
const invalidZipCode = 123;

describe('GET /local/{zip code}', () => {
  describe('when given a valid zipcode', () => {
    test('should respond with a 200 status code', async () => {
      const response = await request(app).get(`/local/${validZipCode}`);
      expect(response.statusCode).toBe(200);
    });
    test('should specify json in the content type header', async () => {
      const response = await request(app).get(`/local/${validZipCode}`);
      expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
    });
    test('should respond with the correct object and value types', async () => {
      const response = await request(app).get(`/local/${validZipCode}`);
      expect(response.body).toEqual(
        expect.objectContaining({
          city: expect.any(String),
          conditions: expect.any(String),
          high_temp: expect.any(Number),
          low_temp: expect.any(Number),
        })
      );
    });
  });

  describe('when given an invalid zipcode', () => {
    test('should respond with a status code of 404', async () => {
      const response = await request(app).get(`/local/${invalidZipCode}`);
      expect(response.statusCode).toBe(404);
    });
    test(`should respond with a "city not found" message`, async () => {
      const response = await request(app).get(`/local/${invalidZipCode}`);
      expect(response.text).toBe('city not found');
    });
  });
});
