var express = require("express");
var bodyParser=require("body-parser");
const readJson = require("./readJson.js");
//const shapes = require(".//public/graph/shapes.js");

const path = require('path');
//const fs = require('fs');
var jwt = require('jsonwebtoken');
const NodeRSA = require('node-rsa');

var app = express();
var fs = require('fs');
var d3 = require('d3');
var movies = [];
var cont = 0;
app.use(express.static('public')); //archivos que no cambian

app.use(bodyParser.json());  //para peticiones de aplicaciones formato json

app.use(bodyParser.urlencoded({extended:true}));


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
  const NodeRSA = require('node-rsa');

  const key = new NodeRSA();
  const keyData = '-----BEGIN PUBLIC KEY----- ... -----END PUBLIC KEY-----';
  key.importKey(keyData, 'pkcs8');
  const publicDer = key.exportKey('pkcs8-public-der');
  const privateDer = key.exportKey('pkcs1-der');
  key.importKey({
    n: Buffer.from('0086fa9ba066685845fc03833a9699c8baefb53cfbf19052a7f10f1eaa30488cec1ceb752bdff2df9fad6c64b3498956e7dbab4035b4823c99a44cc57088a23783', 'hex'),
    e: 65537,
    d: Buffer.from('5d2f0dd982596ef781affb1cab73a77c46985c6da2aafc252cea3f4546e80f40c0e247d7d9467750ea1321cc5aa638871b3ed96d19dcc124916b0bcb296f35e1', 'hex'),
    p: Buffer.from('00c59419db615e56b9805cc45673a32d278917534804171edcf925ab1df203927f', 'hex'),
    q: Buffer.from('00aee3f86b66087abc069b8b1736e38ad6af624f7ea80e70b95f4ff2bf77cd90fd', 'hex'),
    dmp1: Buffer.from('008112f5a969fcb56f4e3a4c51a60dcdebec157ee4a7376b843487b53844e8ac85', 'hex'),
    dmq1: Buffer.from('1a7370470e0f8a4095df40922a430fe498720e03e1f70d257c3ce34202249d21', 'hex'),
    coeff: Buffer.from('00b399675e5e81506b729a777cc03026f0b2119853dfc5eb124610c0ab82999e45', 'hex')
}, 'components');
const publicComponents = key.exportKey('components-public');
console.log(publicComponents);
  key.importKey({
    n: Buffer.from('0086fa9ba066685845fc03833a9699c8baefb53cfbf19052a7f10f1eaa30488cec1ceb752bdff2df9fad6c64b3498956e7dbab4035b4823c99a44cc57088a23783', 'hex'),
    e: 65537,
}, 'components-public');
});

app.listen(8080);
