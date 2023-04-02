'use strict';

// const express = require('express');
// const app = express();
const axios = require('axios');

module.exports = getYelp;

function getYelp(location, page=1) {
  console.log(page);
  const numPerPage = 4;
  const start = ((page - 1) * numPerPage + 1);
  
  const url = `https://api.yelp.com/v3/businesses/search?location=${location}&limit=${numPerPage}&offset=${start}`;

  return axios
    .get(url, {headers: {'Authorization': `Bearer ${process.env.YELP_API_KEY}`}})
    .then( data => parseYelpData(data.data))
    .catch(err => console.error('there was an error', err));
}

function parseYelpData(data) {
  console.log('did we get this far?', {data});
  try {
    const yelpSummaries = data.businesses.map(business => {
      return new Yelp(business); 
    });
    return Promise.resolve(yelpSummaries);
  } catch(e) {
    return Promise.reject(e);
  }
}


class Yelp {
  constructor(business) {
    this.tableName = 'yelps';
    this.name = business.name;
    this.image_url = business.image_url;
    this.price = business.price;
    this.rating = business.rating;
    this.url = business.url;
    this.timeStamp = Date.now();
  }
}

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

// class Restaurant {
//   constructor(restaurantObject) {
//     console.log('restaurants?');
//     this.restaurantObject = restaurantObject;
//   }
// }
