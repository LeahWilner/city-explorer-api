'use strict';

const express = require('express');
require('dotenv').config();
const cors = require('cors');

const app = express();
app.use(cors());
const PORT = process.env.PORT || 5005;
const getMovies = require('./modules/movies.js');
const weather = require('./modules/newWeather.js');
const yelp = require('./modules/yelp.js');
// const axios = require('axios');

// let Movies = process.env.MOVIE_API_KEY

app.get('/', (request, response) => {
  response.send('Hello from server HOME route / !!');
});
app.get('/movies', getMovies);

app.get('/newweather', getWeather);

app.get('/yelp', getYelp);

function getWeather(request, response) {

  const {lat, lon} = request.query;
  weather(lat, lon)
  //sends to the front objects
    .then(summaries => response.status(200).send(summaries))
    .catch((error) => {
      response.status(500).send('Sorry, weather is unavailable at this time', error);
    });
}

function getYelp(request, response) {

  const location = request.query.searchQuery;
  yelp(location, request.query.page)
    .then(reviews => response.send(reviews))
    .catch((error) => {
      console.error(error);
      response.status(500).send('Sorry. Something went wrong!');
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
