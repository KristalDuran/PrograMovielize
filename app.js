var express = require("express");
var bodyParser=require("body-parser");
const readJson = require("./readJson.js");
const shapes = require(".//public/grapher/grapher.js");

//const path = require('path');
//const fs = require('fs');
//var jwt = require('jsonwebtoken');
//const NodeRSA = require('node-rsa');

var app = express();

var movies = [];
var cont = 0;
app.use(express.static('public')); //archivos que no cambian

app.use(bodyParser.json());  //para peticiones de aplicaciones formato json

app.use(bodyParser.urlencoded({extended:true}));


//var json = require(express.static("https://raw.githubusercontent.com/prust/wikipedia-movie-data/master/movies.json"));


app.post("/addMovie", function(req,res){
  var title = req.body.title;
  var yearFrom = req.body.yearFrom;
  var yearTo =req.body.yearTo;
  var director = req.body.director;
  var genre = req.body.genre;
  var cast = req.body.actors;
  //{"title":req.body.title,"year":req.body.yearFrom, req.body.yearTo,"director":req.body.director,"genre":req.body.genre, "actors":req.body.actors};
  var movie = {"title":title,"yearFrom":yearFrom,"yearTo":yearTo,"director":director,"genre":genre, "cast":cast};
  movies[cont] = movie;
  cont++;
  console.log("movie "+movie + " cont "+cont);
  res.redirect("/seeker.html");
  res.end();
});

app.post("/showGraphic", function(req,res){
  var yearFrom = req.body.yearFrom;
  var yearTo =req.body.yearTo;
  readJson.makeTrees(readJson.getDatURL());
  var matchMovies = readJson.search(movies);
  console.log(matchMovies);
  for (var i = 0; i < matchMovies.length; i++) {
    console.log("for final " + matchMovies[i].title);
  }
  //shapes.shapes(readJson.search(movies), yearFrom, yearTo);
  //res.redirect("/graph/d3.html");
  res.redirect("/showGraphic.html");
});

app.post("/saveInfo", function(req, res){
  const keyPrivate = new NodeRSA('-----BEGIN RSA PRIVATE KEY-----\n'+
                      'MIIBOQIBAAJAVY6quuzCwyOWzymJ7C4zXjeV/232wt2ZgJZ1kHzjI73wnhQ3WQcL\n'+
                      'DFCSoi2lPUW8/zspk0qWvPdtp6Jg5Lu7hwIDAQABAkBEws9mQahZ6r1mq2zEm3D/\n'+
                      'VM9BpV//xtd6p/G+eRCYBT2qshGx42ucdgZCYJptFoW+HEx/jtzWe74yK6jGIkWJ\n'+
                      'AiEAoNAMsPqwWwTyjDZCo9iKvfIQvd3MWnmtFmjiHoPtjx0CIQCIMypAEEkZuQUi\n'+
                      'pMoreJrOlLJWdc0bfhzNAJjxsTv/8wIgQG0ZqI3GubBxu9rBOAM5EoA4VNjXVigJ\n'+
                      'QEEk1jTkp8ECIQCHhsoq90mWM/p9L5cQzLDWkTYoPI49Ji+Iemi2T5MRqwIgQl07\n'+
                      'Es+KCn25OKXR/FJ5fu6A6A+MptABL3r8SEjlpLc=\n'+
                      '-----END RSA PRIVATE KEY-----');
  console.log("llave "+keyPrivate);
  var publicKey = new NodeRSA('-----BEGIN PUBLIC KEY-----\n' +
                'MIIBYjANBgkqhkiG9w0BAQEFAAOCAU8AMIIBSgKCAUEAsE1edyfToZRv6cFOkB0t\n' +
                'AJ5qJor4YF5CccJAL0fS/o1Yk10VSXH4Xx4peSJgYQKkO0HqO1hAz6k9dFQB4U1C\n' +
                'nWtRjtNEcIfycqrZrhu6you5syb6ScV3Zu/9bm7/DyaLlx/gJhUPR1OxOzaqsEvl\n' +
                'u7hbDhNLIYo1zKFb/aUBbD6+UcaGxH2BfFNdzVAtVSVpc/s2Y3sboMN7rByUj793\n' +
                '7iQlaMINvVjyasynYuzHNw6ZRP9JP9fwxrCyaxnTPWxVl0qvVaQO2+TtFMtDXH2O\n' +
                'VZtWWeLHAL8cildw0G+u2qVqTqIGEwNyJlsAHykaPFAMW0xLueumrSlB+JUJPrRv\n' +
                'vw4nBCd4GOrNSlPCE/xlk1Cb8JaICTLvDUcYc3ZqL3jqAueBhkpw2uCz8xVJeOA1\n' +
                'KY4kQIIx8JEBsAYzgyP2iy0CAwEAAQ==\n' +
                '-----END PUBLIC KEY-----');
  console.log("Su llave publica es: " + publicKey);
  res.redirect("/index.html");
});

app.listen(8080);
