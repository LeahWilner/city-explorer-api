const express = require('express');
const app = express();
const axios = require('axios');

app.get('/movies', async (request, response, next) => {
  try {
    let movieSearchQuery = request.query.searchQuery;
    console.log(movieSearchQuery);
    let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${movieSearchQuery}`;
    let results = await axios.get(url);
    console.log(results.data);
    response.send('dataToSend');
  } catch (error) {
    next(error);
  }
});

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
