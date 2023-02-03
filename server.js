'use strict';

const express = require('express');
require('dotenv').config();
let data = require('./data/weather.json');
const cors = require('cors');

const app = express();
app.use(cors());
const PORT = process.env.PORT || 5005;

const axios = require('axios');

app.get('/', (request, response) => {
  response.send('Hello from server HOME route / !!');
});



app.get('/weather', (request, response) => {
//   try {

  //localhost:3002/weather?searchquery=Seattle
  let searchQueryCity = request.query.searchquery;
  let lat = request.query.lat;
  let lon = request.query.lon;
  console.log(`----------------${lat} + ${lon}`);

  let dataToInstantiate = data.find(weather => weather.city_name.toLowerCase() === searchQueryCity.toLowerCase());

  // console.log('dataToInstantiate:',dataToInstantiate);
  let dataToSend = dataToInstantiate.data.map((weather) => new Weather(weather));
  // console.log('dataToSend:', dataToSend);

  response.status(200).send(dataToSend);

//   } catch (error) {
//     // eslint-disable-next-line no-undef
//     next(error);
//   }
});

app.get('*', (request, response) => {
  response.status(404).send('The route was not found. Error 404');
});

app.get('/movies', async (request, response, next) => {
  try {
    let frontEndSearchQuery = request.query.searchquery;
    let url = `https://api.themoviedb.org/3/movie/550?client_id=${process.env.MOVIE_API_KEY}&query=${frontEndSearchQuery}&format=json`;
    let results = await axios.get(url);
    let constructorData= results.data;
    response.status(200).send(constructorData);
    console.log(results.data);
  } catch (error) {
    next(error);
  }

});

class Weather {
  constructor(weatherObject) {
    console.log('yo',weatherObject);
    this.weatherForecast = weatherObject.weather.description;
    this.datetime = weatherObject.datetime;
  }
}

class Movies {
  constructor(movieObject) {
    console.log('yo', movieObject);
    this.movieObject = movieObject.description;
    // this.datetime = weatherObject.datetime;
  }
}

// eslint-disable-next-line no-unused-vars
// app.use((error, request, response, next) => {
//   response.status(500).send(error.message);
// });

app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));
