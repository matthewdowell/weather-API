const express = require('express');
const { default: axios } = require('axios');
require('dotenv').config();

const app = express();
app.use(express.json());

app.get('/local/:zipcode', (req, res) => {
  axios
    .get(`http://api.openweathermap.org/data/2.5/weather?zip=${req.params.zipcode}&appid=${process.env.API_KEY}&units=imperial`)
    .then(({ data }) => {
      console.log(data);
      res.send({
        city: data.name,
        conditions: data.weather[0].description,
        high_temp: data.main.temp_max,
        low_temp:  data.main.temp_min
      });
    })
    .catch((err) => console.log(err.message));
});

app.listen('3000', () => {
  console.log('listening on 3000');
});

// {
//   "city": "city name",
//   "conditions": "clear sky",
//   "high_temp": 65,
//   "low_temp": 35
// }