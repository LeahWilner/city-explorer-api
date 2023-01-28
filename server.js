"use strict";

const express = require("espress");
require("dotenv").config();
let data = require("./data/weather.json");
const cors = require("cors");

const app = express();
app.use(cors);
const PORT = process.env.PORT || 5005;

app.get("/", (request, response) => {
  response.send("Hello from server HOME route / !!");
});

app.get("/hello", (request, response) => {
  let firstName = request.query.name;
  let lastName = request.query.lastName;
  response.status(200).send(`Hello, ${firstName} ${lastName}`);
});

app.get("/weather", (request, response) => {
  try {
    let weatherForecast = request.query.weatherForeacast;
    let dataToInstantiate = data.find(
      (weather) => weather.weatherForecast === weatherForecast
    );
    let dataToSend = new Weather(dataToInstantiate);
    response.status(200).send.dataToSend;
  } catch (error) {
    next(error);
  }
});

app.get("*", (request, response) => {
  response.status(404).send("The route was not found. Error 404");
});

class Weather {
  constructor(weatherObject) {
    this.weatherForecast = weatherObject.weatherForecast;
    this.location = weatherObject.location;
  }
}

app.use((error, request, response, next) => {
  response.status(500).send(error.message);
});

app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));
