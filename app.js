var express = require("express");
var bodyParser=require("body-parser");
const readJson = require("./readJson.js");
var app = express();

var movies = [];
var cont = 0;
app.use(express.static('public')); //archivos que no cambian

app.use(bodyParser.json());  //para peticiones de aplicaciones formato json

app.use(bodyParser.urlencoded({extended:true}));
var json = app.use(express.static("https://raw.githubusercontent.com/prust/wikipedia-movie-data/master/movies.json"));
app.post("/addMovie", function(req,res){
  console.log(json);
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

  readJson.makeTrees(readJson.getDatURL());

  readJson.search(movies);

  res.redirect("/showGraphic.html");
});

app.listen(8080);
