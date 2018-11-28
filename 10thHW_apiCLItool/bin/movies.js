require("dotenv").config();
const fs = require('fs');
const keys = require("./keys.js");
const fetch = require("node-fetch");

let movieGet = async (arg) => {
  try {
    const url=`https://www.omdbapi.com/?apikey=${keys.omdb.key}&t=${arg}`;
    const response = await fetch(url);
    const result = await response.json();
    let resultObj = {
      "Title": result.Title,
      "Year": result.Year,
      "IMDB Rating": result.Ratings[0].Value,
      "Rotten Tomatos Rating": result.Ratings[1].Value,
      "Production Country": result.Country,
      "Plot": result.Plot,
      "Acotors": result.Actors
    };
    fs.appendFileSync('./log.txt', JSON.stringify([process.argv[2] + " -- " + process.argv[3], resultObj], null, 2), 'utf8');
    return console.log(JSON.stringify(resultObj, null, 2));
  } catch (error) {
    if (process.argv[3] === undefined) {
      return console.log('Please search for a movie. node liri.js movie-this "balto"');
    }
    return console.log(error);
  }
};

exports.movieGet = movieGet
