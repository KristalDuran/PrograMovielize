var infomation = [];
var yearFrom;
var yearTo;
var genre;
//Array.isArray(car);

//AGREGAR
function addInfo(movieName, actors, director){
  var nombre = movieName;
  infomation.push({nombre: movieName, actorName:actors, directorName: director,});
  console.log("add " +  nombre + " " + actors + " "+director);

}

function info(pelicula, director, actors){
  console.log("entro " +  pelicula + " " + director + " "+actors);

  return false;
}

function buscar(yearFrom, yearTo, genre){
  this.yearFrom = yearFrom;
  this.yearTo = yearTo;
  this.genre = genre;
  console.log("buscar");
}

/*
exprecion regular que busca en el htlm
var html_string = html.toString();
var variables = html_string.match(/[^\{\}]+(?=\})/g);

var name = "Movieze";

for (var i = variables.length-1; i >= 0 ; i--) {
  var value = eval(variables[i]);
  html_string = html_string.replace("{"+variables[i]+"{", value);
}*/
