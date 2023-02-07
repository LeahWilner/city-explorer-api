'use strict';

const express = require('express');
require('dotenv').config();
let data = require('./data/weather.json');
const cors = require('cors');

const app = express();
app.use(cors());
const PORT = process.env.PORT || 5005;

const axios = require('axios');

// let Movies = process.env.MOVIE_API_KEY

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

  let dataToInstantiate = data.find(
    (weather) =>
      weather.city_name.toLowerCase() === searchQueryCity.toLowerCase()
  );

  // console.log('dataToInstantiate:',dataToInstantiate);
  let dataToSend = dataToInstantiate.data.map(
    (weather) => new Weather(weather)
  );

  response.status(200).send(dataToSend);
});

app.get('/movies', async (request, response, next) => {
  try {
    let movieSearchQuery = request.query.searchquery;
    let url = (`https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}`).then(response => {
      const dataToSend = response.data.results.map(movie => new Movie(movie, dataToSend));
      response.send(dataToSend);
  
    
      // &query=${movieSearchQuery}&format=json`;
  

    let results = await axios.get(url);
    let constructorData = results.data;
    reults.map(movie => new(movie, constructorData))
    response.status(200).send(constructorData);
    console.log(results.data);
  } catch (error) {
    next(error);
  }
});

// app.get('/restaurant', async (request, response, next) => {
//   try {
//     let restaurantSearchQuery = request.query.searchquery;
//     let url = `https://api.yelp.com/v3/autocomplete?text=del&latitude=37.786882&longitude=-122.399972?client_id=${process.env.YELP_API_KEY}&query=${restaurantSearchQuery}&format=json`;
//     let restaurantResults = await axios.get(url);
//     let restaurantConstructorData = restaurantResults.data;
//     response.status(200).send(restaurantConstructorData);
//   } catch (error) {
//     next(error);
//   }
// });

class Weather {
  constructor(weatherObject) {
    console.log('yo', weatherObject);
    this.weatherForecast = weatherObject.weather.description;
    this.datetime = weatherObject.datetime;
  }
}

class Movies {
  constructor(movieObject, dataToSend) {
    console.log('yo', movieObject);
    this.movieObject = movieObject.data;
    this.id = movieObject.id;
    this.title = movieObject.title;
    this.overview = movieObject.overview;
    this.cover = movieObject.cover;
  }
}

// class Restaurant {
//   constructor(restaurantObject) {
//     console.log('restaurants?');
//     this.restaurantObject = restaurantObject;
//   }
// }

// eslint-disable-next-line no-unused-vars
// app.use((error, request, response, next) => {
//   response.status(500).send(error.message);
// });

app.get('*', (request, response) => {
  response.status(404).send('The route was not found. Error 404');
});

app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));
