'use strict';

const express = require('express');
require('dotenv').config();
let data = require('./data/weather.json');
const cors = require('cors');

const app = express();
app.use(cors());
const PORT = process.env.PORT || 5005;

app.get('/', (request, response) => {
  response.send('Hello from server HOME route / !!');
});



app.get('/weather', (request, response) => {
//   try {

  //localhost:3002/weather?searchquery=Seattle
  let searchQuery = request.query.searchquery;

  let dataToInstantiate = data.find(weather => weather.city_name === searchQuery);
  let dataToSend = new Weather(dataToInstantiate);

  response.status(200).send(dataToSend);

//   } catch (error) {
//     // eslint-disable-next-line no-undef
//     next(error);
//   }
});

app.get('*', (request, response) => {
  response.status(404).send('The route was not found. Error 404');
});

class Weather {
  constructor(weatherObject) {
    console.log('CCCCC',weatherObject.data[0].datetime);
    this.location = weatherObject.city_name;
    // this.weatherForecast = weatherObject.weather.description;
    // this.datetime = weatherObject.datetime;
  }
}

// eslint-disable-next-line no-unused-vars
// app.use((error, request, response, next) => {
//   response.status(500).send(error.message);
// });

app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));
