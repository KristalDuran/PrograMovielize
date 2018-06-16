var express = require("express");
var bodyParser=require("body-parser");
const readJson = require("./readJson.js");
const shapes = require(".//public/grapher/grapher.js");

var app = express();
var fs = require('fs');
var d3 = require('d3');
var movies = [];
var cont = 0;
var matchMovies = [];
var json = fs.readFileSync('sample.json','utf-8');
//const NodeRSA = require('node-rsa');
//const JSEncrypt = require('jsencrypt');

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
  readJson.makeTrees(JSON.parse(json));
  matchMovies = readJson.search(movies);
  console.log(matchMovies);
  for (var i = 0; i < matchMovies.length; i++) {
    console.log("for final " + matchMovies[i].title);
  }
  shapes.yearFrom  = yearFrom;
  shapes.yearTo = yearTo;
  shapes.resultado = readJson.search(movies);
  res.redirect("/grapher/prueba.html");
  //res.redirect("/showGraphic.html");
});

app.post("/showGraphicSave", function(req,res){
  var key = req.body.publicKey;
  //decifrarKey sacar info
  //shapes.yearFrom  = yearFrom;
  //shapes.yearTo = yearTo;
  //shapes.resultado = readJson.search(movies);
  res.redirect("/grapher/prueba.html");
});

app.post("/saveInfo", function(req, res){

  //const key = new NodeRSA({b: 512});
  var myDecrypter = new NodeRSA({b: 512});
   myDecrypter.setOptions({encryptionScheme: 'pkcs1'});
  //key.generateKeyPair(); //key size in bits. 2048 by default. — public exponent. 65537 by default
   var publicKeyJson = {"Key": ""};
   publicKeyJson.Key = myDecrypter.exportKey('public');
   console.log(publicKeyJson.key);

   var myEncrypter = new JSEncrypt();
   myEncrypter.setPublicKey(publicKeyJson.key);
   myEncrypter.encrypt(matchMovies, 'base64', 'utf-8');
   //var clearMessage = myDecrypter.decrypt(publicKeyJson.key, 'utf8');
   //console.log(myEncrypter+"\n+clearMessage");
});

app.listen(8080);
