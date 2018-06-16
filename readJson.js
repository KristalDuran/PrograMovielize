
var actors = new Object();
var directors = new Object();
var genres = new Object();
var years = new Object();
var movies = new Object();
var matchMovies = new Array;

module.exports = {

  getDatURL: function (){
    console.log("En get url");

    var listJson = [{"title":"After Dark in Central Park","year":1900,"director":null,"cast":"Jose","genre":null,"notes":null},{"title":"Boarding School Girls' Pajama Parade","year":1900,"director":null,"cast":null,"genre":null,"notes":null},
    {"title":"Buffalo Bill's Wild West Parad","year":1900,"director":null,"cast":null,"genre":null,"notes":null},{"title":"Caught","year":1900,"director":null,"cast":null,"genre":null,"notes":null},{"title":"Clowns Spinning Hats","year":1900,
    "director":null,"cast":null,"genre":null,"notes":null},{"title":"Capture of Boer Battery by British","year":1900,"director":"James H. White","cast":null,"genre":"Short documentary","notes":null},{"title":"The Enchanted Drawing","year":1900,
    "director":"J. Stuart Blackton","cast":null,"genre":null,"notes":null},{"title":"Family Troubles","year":1900,"director":null,"cast":null,"genre":null,"notes":null},{"title":"Feeding Sea Lions","year":1900,"director":null,"cast":"Paul Boyton",
    "genre":null,"notes":null},{"title":"How to Make a Fat Wife Out of Two Lean Ones","year":1900,"director":null,"cast":null,"genre":"Comedy","notes":null},{"title":"New Life Rescue","year":1900,"director":null,"cast":null,"genre":null,"notes":null},
    {"title":"New Morning Bath","year":1900,"director":null,"cast":null,"genre":null,"notes":null},{"title":"Searching Ruins on Broadway, Galveston, for Dead Bodies","year":1900,"director":null,"cast":null,"genre":null,"notes":null},
    {"title":"The Tribulations of an Amateur Photographer","year":1900,"director":null,"cast":null,"genre":null,"notes":null},{"title":"Trouble in Hogan's Alley","year":1900,"director":null,"cast":null,"genre":"Comedy","notes":null},
    {"title":"Two Old Sparks","year":1900,"director":null,"cast":null,"genre":"Short","notes":"Produced by Siegmund Lubin"},{"title":"The Wonder, Ching Ling Foo","year":1900,"director":null,"cast":"Ching Ling Foo","genre":"Short",
    "notes":"Produced by Siegmund Lubin"},{"title":"Watermelon Contest","year":1900,"director":"James H. White","cast":null,"genre":"Short","notes":null},{"title":"Acrobats in Cairo","year":1901,"director":null,"cast":null,"genre":null,"notes":null},
    {"title":"An Affair of Honor","year":1901,"director":null,"cast":null,"genre":null,"notes":null},{"title":"Another Job for the Undertaker","year":1901,"director":"Edwin Stanton Porter","cast":null,"genre":null,"notes":null},
    {"title":"Arrival of Tongkin Train","year":1901,"director":null,"cast":null,"genre":null,"notes":null},{"title":"The Artist's Dilemma","year":1901,"director":"Edwin Stanton Porter","cast":null,"genre":null,"notes":null},{"title":"Band and Battalion of the U.S. Indian School",
    "year":1901,"director":null,"cast":null,"genre":null,"notes":null},{"title":"Barnum and Bailey's Circus","year":1901,"director":null,"cast":null,"genre":null,"notes":null},{"title":"Beef Extract Room","year":1901,"director":null,"cast":null,
    "genre":null,"notes":null},{"title":"Boxing in Barrels","year":1901,"director":null,"cast":null,"genre":null,"notes":null},{"title":"Branding Hams","year":1901,"director":null,"cast":null,"genre":null,"notes":null},
    {"title":"Buffalo Street Parade","year":1901,"director":null,"cast":null,"genre":null,"notes":null},{"title":"A Busy Corner at Armour's","year":1901,"director":null,"cast":null,"genre":null,"notes":null},
    {"title":"The Bund, Shanghai","year":1901,"director":null,"cast":null,"genre":null,"notes":null},{"title":"Circular Panorama of the Base of the Electric Tower, Ending Looking Down the Mall","year":1901,"director":null,
    "cast":null,"genre":null,"notes":null},{"title":"Circular Panorama of the Electric Tower and Pond","year":1901,"director":null,"cast":null,"genre":null,"notes":null},
    {"title":"Circular Panorama of the Esplanade with the Electric Tower in the Background","year":1901,"director":null,"cast":null,"genre":null,"notes":null},{"title":"Coaling a Steamer, Nagasaki Bay, Japan","year":1901,
    "director":null,"cast":null,"genre":null,"notes":null},{"title":"Convention of Railroad Passengers Agents","year":1901,"director":null,"cast":null,"genre":null,"notes":null},{"title":"The Cook's Revenge",
    "year":1901,"director":null,"cast":"Jose","genre":null,"notes":null},{"title":"Cornell-Columbia-University of Pennsylvania Boat Race at Ithaca, N.Y., Showing Lehigh Valley Observation Train","year":1901,"director":null,
    "cast":null,"genre":null,"notes":null},{"title":"Couchee Dance on the Midway","year":1901,"director":null,"cast":null,"genre":null,"notes":null},{"title":"The Donkey Party","year":1901,"director":null,"cast":null,
    "genre":null,"notes":null},{"title":"The Finish of Bridget McKeen","year":1901,"director":null,"cast":null,"genre":null,"notes":null},{"title":"Follow the Leader","year":1901,"director":null,"cast":null,"genre":null,"notes":null},
    {"title":"The Fraudulent Beggar","year":1901,"director":null,"cast":null,"genre":null,"notes":null},{"title":"Fun at a Children's Party","year":1901,"director":null,"cast":null,"genre":null,"notes":null}];
    return listJson;
  },

  makeTrees: function (listJson){
    for (var i = 0; i < listJson.length; i++) {

      if(listJson[i].cast !== null)
        actors[listJson[i].cast] = addDetail(actors[listJson[i].cast], listJson[i]);

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
              console.log("genero");
              and(genres[genre],null, null, yearFrom, yearTo, null);
            }else{
              if(yearFrom !== undefined && yearFrom !== null && yearTo !== undefined && yearTo !== null){
                console.log("year");
                and([],null, null, mull, null, null);
              }
            }
          }
        }
      }
      console.log("Esta "+ lengthList);
    }
  }

} // end exports
function searchByActor(list){
  if(list === null){
    return null;
  }
  var actor = "";
  var cant;
  var actorsList = [];
  for (var i = 0; i < list.length; i++) {
    var char = list[i];
    if(char === ',' || i === (list.length)-1){
      if(i === (list.length)-1){
        actor += char;
      }
      if(actors[actor] !== undefined){
        actorsList[cant] = actor;
      }
      //buscar actor en lista de actores y almacenar la pelicula en la que sale
      actor = "";
    }else{
      actor += char;
    }
  }
  return actorsList;
}

function addDetail(list, value){
    if(list === undefined){
      list = new Array;

    }
    var idx = list.indexOf(value);
    if (idx === -1) {
      list.push(value);
    }
    return list;
  }

function and(moviesSearch, director, listsActors, yearFrom, yearTo, genre){

    for (var j = 0; j < moviesSearch.length; j++) {
      matchMovies.push(moviesSearch[j]);
      if(director !== null && moviesSearch[j].director !== director){
        matchMovies.splice(moviesSearch[j]);
      }
      if(genre !== null &&   moviesSearch[j].genre === genre){
        matchMovies.splice(moviesSearch[j]);
      }
      if(listsActors !== null){
        if(notSameActors(moviesSearch[j].cast, listsActors)){
          matchMovies.splice(moviesSearch[j]);
        }
      }
      //faltan los actores
      if(yearFrom !== null && moviesSearch[j].yearFrom >= yearFrom && yearFrom !== null && moviesSearch[j].yearFrom >= yearFrom){
        matchMovies.splice(moviesSearch[j]);
      }

    }
  }

function notSameActors(cast, listActors){
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
