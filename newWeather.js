
const axios = require('axios');
require('dotenv').config();

'use strict';

let cache = require('./cache.js');

function getWeather(lat, lon) {
  const key = 'weather-' + lat + lon;
  const url = `http://api.weatherapi.com/v1/forecast.json?key=${
    process.env.WEATHER_API_KEY
  }&days=1&aqi=no&alerts=no&q=${(lat, lon)}`;

  if (cache[key] && Date.now() - cache[key].timestamp < 5000) {
    console.log('cache hit');
  } else {
    console.log('cache miss');
    cache[key] = {};
    cache[key].timestamp = Date.now();
    cache[key].data = axios
      .get(url)
      .then((response) => parseWeather(response.data));
  }

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
    for (let i = 0; i < day.hour.length; i++) {
      this.forecast = day.hour[i].condition.text;
    }
    this.time = day.time;
  }
}

module.exports = getWeather;
