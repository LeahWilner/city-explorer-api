


const express = require('express');
const app = express();
const axios = require('axios');

async function getMovies(request, response,next) {
  try {
    let movieSearchQuery = request.query.searchQuery;
    console.log(movieSearchQuery);
    let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${movieSearchQuery}`;
    let results = await axios.get(url);
    console.log(results.data);
    response.send(results.data);
  } catch (error) {
    next(error);
  }
}

function getMovies(req, res){
//get the location from the front end: http://localhost:3001/movies/?searchQuery=seattle
  let frontEndSearchQuery = req.query.searchQuery;
  console.log('see location: ',frontEndSearchQuery);

  //refactor the url to use the params object to pass query information
  //https://api.themoviedb.org/3/search/movie?api_key=45b661bcbcf607acc1df316673e4b463&query=seattle
  let url = `https://api.themoviedb.org/3/search/movie`;
  let params = {
    api_key: process.env.MOVIE_API_KEY,
    query:frontEndSearchQuery
  };
  console.log(url,params);
  //looks like https://api.themoviedb.org/3/search/movie { api_key: '45b661bcbcf607acc1df316673e4b463', query: 'seattle' }


  //test api call to see returned data
  // let apiResults = await axios.get(url, {params});
  // console.log('🚀 ~ file: movies.js:28 ~ getMovies ~ results', apiResults.data.results);


  axios.get(url, {params})
    .then(results => results.data.results.map((movieObject) => new Movies(movieObject)))
    .then(constructorResults => res.status(200).send(constructorResults));



  //place holder for testing the api call from front end while we look at our console logs.
  // res.send('hello testing console logs');
}









app.use((error, req, res) => {
  console.log(error.message);
  res.status(500).send(error.message);
});


class Movies {
  constructor(movieObject) {
    console.log('!!!!!!', movieObject);
    // this.movieObject = movieObject.data;
    this.id = movieObject.id;
    this.title = movieObject.title;
    this.overview = movieObject.overview;
    this.posterPath = movieObject.posterPath;
  }
}


module.exports = getMovies;
