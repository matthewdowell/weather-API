# weather-api

Building and testing a json API

**Installation:**

```bash
npm install
```

Create .env file for API key (https://openweathermap.org/api):

```bash
API_KEY=your API key goes here
```

**Start App:**

```bash
npm start
```

Use prefered API testing platform and send a get request to this address:
http://localhost:3000/local/{zipcode}

or

```bash
curl http://localhost:3000/local/{zipcode}
```

**Test API:**

```bash
npx jest
```
