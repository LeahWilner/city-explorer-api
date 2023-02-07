const express = require('express');
const app = express();
// const axios = require('axios');
let data = require('./data/weather.json');

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


class Weather {
  constructor(weatherObject) {
    console.log('yo', weatherObject);
    this.weatherForecast = weatherObject.weather.description;
    this.datetime = weatherObject.datetime;
  }
}
