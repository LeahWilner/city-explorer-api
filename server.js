'use strict';

const express = require('express');
require('dotenv').config();
const cors = require('cors');

const app = express();
app.use(cors());
const PORT = process.env.PORT || 5005;
const getMovies = require('./movies.js');
const weather = require('./newWeather.js');
// const axios = require('axios');

// let Movies = process.env.MOVIE_API_KEY

app.get('/', (request, response) => {
  response.send('Hello from server HOME route / !!');
});
app.get('/movies', getMovies);

app.get('/newweather', getWeather);

function getWeather(req, res) {
  const {lat, lon} = req.query;
  weather(lat, lon)
    .then(summaries => res.status(200).send(summaries))
    .catch((error) => {
      res.status(500).send('Sorry, weather is unavailable at this time', error);
    });
}

// eslint-disable-next-line no-unused-vars
app.use((error, request, response, next) => {
  response.status(500).send(error.message);
});

app.get('*', (request, response) => {
  response.status(404).send('The route was not found. Error 404');
});

app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));
