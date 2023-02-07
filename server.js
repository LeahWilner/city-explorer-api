'use strict';

const express = require('express');
require('dotenv').config();
const cors = require('cors');

const app = express();
app.use(cors());
const PORT = process.env.PORT || 5005;

const axios = require('axios');

// let Movies = process.env.MOVIE_API_KEY

app.get('/', (request, response) => {
  response.send('Hello from server HOME route / !!');
});


// eslint-disable-next-line no-unused-vars
// app.use((error, request, response, next) => {
//   response.status(500).send(error.message);
// });

app.get('*', (request, response) => {
  response.status(404).send('The route was not found. Error 404');
});

app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));
