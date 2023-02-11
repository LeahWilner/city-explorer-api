const express = require('express');
const app = express();
const axios = require('axios');





app.get('/restaurant', async (request, response, next) => {
  try {
    let restaurantSearchQuery = request.query.searchquery;
    let url = `https://api.yelp.com/v3/autocomplete?text=del&latitude=37.786882&longitude=-122.399972?client_id=${process.env.YELP_API_KEY}&query=${restaurantSearchQuery}&format=json`;
    let restaurantResults = await axios.get(url);
    let restaurantConstructorData = restaurantResults.data;
    response.status(200).send(restaurantConstructorData);
  } catch (error) {
    next(error);
  }
});

class Restaurant {
  constructor(restaurantObject) {
    console.log('restaurants?');
    this.restaurantObject = restaurantObject;
  }
}
