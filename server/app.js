const express = require('express');
const {default: axios} = require('axios');
require('dotenv').config();

const app = express();
app.use(express.json());

app.get('/local/:zip', async (req, res) => {
  try {
    const {data} = await axios.get(`http://api.openweathermap.org/data/2.5/weather?`, {
      params: {
        zip: req.params.zip,
        units: 'imperial',
        appid: process.env.API_KEY,
      },
    });
    res.status(data.cod).send({
      city: data.name,
      conditions: data.weather[0].description,
      high_temp: data.main.temp_max,
      low_temp: data.main.temp_min,
    });
  } catch ({response}) {
    res.status(response.data.cod).send(response.data.message);
  }
});

module.exports = app;
