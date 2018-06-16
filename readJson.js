
var actors = new Object();
var directors = new Object();
var genres = new Object();
var years = new Object();
var movies = new Object();
var matchMovies = new Array;

module.exports = {

  makeTrees: function (listJson){
    for (var i = 0; i < listJson.length; i++) {

      if(listJson[i].cast !== null)
        addDetailCast(listJson[i].cast, listJson[i]);

      if(listJson[i].director !== null)
        directors[listJson[i].director] = addDetail(directors[listJson[i].director],listJson[i]);

      if(listJson[i].genre !== null)
        genres[listJson[i].genre] = addDetail(genres[listJson[i].genre], listJson[i]);

      if(listJson[i].year !== null)
        years[listJson[i].year] = addDetail(years[listJson[i].year], listJson[i]);

      if(listJson[i].title !== null)
        movies[listJson[i].title] = addDetail(movies[listJson[i].title],listJson[i]);
    }
  },


   search: function (listJsonUser){
    for (var lengthList = 0; lengthList < listJsonUser.length; lengthList++) {
      var actor = listJsonUser[lengthList].cast;
      var title = listJsonUser[lengthList].title;
      var genre = listJsonUser[lengthList].genre;
      var yearFrom = listJsonUser[lengthList].yearFrom;
      var yearTo = listJsonUser[lengthList].yearTo;
      var director = listJsonUser[lengthList].director;

      var listsActors = searchByActor(actor);

      if(title !== undefined){
        if(movies[title] !== undefined){
          and(movies[title], director, listsActors, yearFrom, yearTo, genre);
        }else break;
      }else{
        if(director !== undefined && director !== null){
          if(directors[director] !== undefined){
            and(directors[director], null, listsActors, yearFrom, yearTo, genre);
            console.log(matchMoviesIsNull);
          }else break;
        }else{
          if(actor !== undefined && actor !== null){
            and([],null, null, yearFrom, yearTo, genre);
          }else{
            if(genre !== undefined && genre !== null){

              and(genres[genre],null, null, yearFrom, yearTo, null);
            }else{
              if(yearFrom !== undefined && yearFrom !== null && yearTo !== undefined && yearTo !== null){

                and([],null, null, mull, null, null);
              }
            }
          }
        }
      }
    }
    return matchMovies;
  }

} // end exports
function searchByActor(list){

  if(list === null){
    return;
  }
  var cant = 0;
  var actorsList = [];
  var listActors = list.split(",");

  for (var posListActors = 0; posListActors < listActors.length; posListActors++) {
    if(actors[listActors[posListActors]] !== undefined){
      actorsList[cant] = listActors[posListActors];
      cant++;
    }
  }
  return actorsList;
}

function addDetailCast(stringCast, value){
  if(stringCast === null){
    return;
  }
  var listActors = stringCast.split(",");
  for (var posListActors = 0; posListActors < listActors.length; posListActors++) {
    actors[listActors[posListActors]] = addDetail(actors[listActors[posListActors]], value);
  }
}

function addDetail(list, value){
    if(list === undefined){
      list = new Array;

    }
    //var idx = list.indexOf(value);
    //if (idx === -1) {
      list.push(value);
    //}
    return list;
  }

function and(moviesSearch, director, listsActors, yearFrom, yearTo, genre){
    for (var j = 0; j < moviesSearch.length; j++) {
      matchMovies.push(moviesSearch[j]);
      if(director !== "" && moviesSearch[j].director !== director){
        matchMovies.splice(matchMovies.indexOf(moviesSearch[j]), 1);
      }
      if(genre !== "" && moviesSearch[j].genre !== genre){
        matchMovies.splice(moviesSearch[j]);
      }
      if(listsActors !== null){
        if(notSameActors(moviesSearch[j].cast, listsActors)){
          matchMovies.splice(matchMovies.indexOf(moviesSearch[j]), 1);
        }
      }
      if(yearFrom !== null && moviesSearch[j].yearFrom >= yearFrom && yearFrom !== null && moviesSearch[j].yearFrom >= yearFrom){
        matchMovies.splice(matchMovies.indexOf(moviesSearch[j]), 1 );
      }

    }
  }

function notSameActors(cast, listActors){
  if(listActorMovie === undefined){
    return;
  }
  var listActorMovie = searchByActor(cast);
  var isThere = false;
  for (var i = 0; i < listActorMovie.length; i++) {
    for (var j = 0; j < listActors.length; j++) {
      if(listActorMovie[i] === listActors[j]){
        isThere = true;
      }
    }
    if(isThere === false){
      return true;
    }
  }
  return false;
}
searchByActor("juan,miguel,maria,carlos",{"titulo":"mi movie", "carro":2050});
