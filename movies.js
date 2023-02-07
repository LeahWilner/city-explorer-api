const express = require('express');
const app = express();
// const axios = require('axios');

// app.get('/movies', async (request, response, next) => {
//   try {
//     let movieSearchQuery = request.query.searchQuery;
//     console.log(movieSearchQuery);
//     let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${movieSearchQuery}`;
//     let results = await axios.get(url);
//     console.log(results.data);
//     response.send('dataToSend');
//   } catch (error) {
//     next(error);
//   }
// });

function getMovies(req, res){
  let frontEndSearchQuery = req.query.searchQuery;
  console.log(frontEndSearchQuery);
  //   let url = 'https://www.themoviedb.org/3/search/movie';
  //   let params = {
  //     api_key: process.env.MOVIE_API_KEY,
  //     query:frontEndSearchQuery
  //   };

  //   axios.get(url, {params})
  //     .then(results => results.data.results.map((film) => new Movies(film)));
  //   // .then(movieInstance => console.log(movieInstance));
  res.status(200).send('were ok');
}









app.use((error, req, res) => {
  console.log(error.message);
  res.status(500).send(error.message);
});


// class Movies {
//   constructor(movieObject) {
//     console.log('yo', movieObject);
//     this.movieObject = movieObject.data;
//     this.id = movieObject.id;
//     this.title = movieObject.title;
//     this.overview = movieObject.overview;
//     this.cover = movieObject.cover;
//   }
// }


module.exports = getMovies;
