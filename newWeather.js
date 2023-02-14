
const axios = require('axios');
require('dotenv').config();

'use strict';

let cache = require('./modules/cache.js');

function getWeather(lat, lon) {

  // console.log(lat,lon,'!!!!!!!!!');
  const key = 'weather-' + lat + lon;
  const url = `http://api.weatherapi.com/v1/forecast.json?key=${process.env.WEATHER_API_KEY}&days=5&aqi=no&alerts=no&q=${lat},${lon})}`;

  if (!cache[key]) {
    // console.log('cache hit, we added a location for weather');
    cache[key] = {};
    cache[key].timestamp = Date.now();
    cache[key].data = axios.get(url).then((response) => parseWeather(response.data));
  } else {
    console.log('cache miss, already in cache!');
  }

  console.log('CCCCCCCCCCCCc',cache[key].data);
  return cache[key].data;
}


function parseWeather(weatherData) {
  try {
    const weatherSummaries = weatherData.forecast.forecastday.map((day) => {
      return new Weather(day);
    });
    return Promise.resolve(weatherSummaries);
  } catch (e) {
    return Promise.reject(e);
  }
}

class Weather {
  constructor(day) {
    // console.log('DDDDDDDDDDDDDDDDD',day);
    for (let i = 0; i < day.hour.length; i++) {
      this.forecast = day.hour[i].condition.text;
    }
    this.time = day.date;
  }
}

module.exports = getWeather;
