var d3 = require("d3");
console.log("dos");
var svg = d3.select("body").append("svg").attr('height','100%').attr('width','100%');

/*svg.selectAll('rect').data(dataArray).enter()
.append('rect')
.attr('height',function(d,i){return d;})
.attr('width','70')
.attr('fill','blue')
.attr('x',function(d,i){return 80*i;})
.attr('y',function(d,idea){return 400-d;});
*/
console.log("paso");
var rango = 0;
var From = 0;
var To = 0;
var offsetValue = 0;

var result =
[["comedia",1905,["actorD","actorE","actorF"],"hombres de negro", "director name"],
["comedia",1905,["actorD","actorE","actorF"],"hombres de negro", "director name"],
["comedia",1905,["actorD","actorE","actorF"],"hombres de negro", "director name"],
["comedia",1905,["actorD","actorE","actorF"],"hombres de negro", "director name"],
["comedia",1905,["actorD","actorE","actorF"],"hombres de negro", "director name"],
["comedia",1905,["actorD","actorE","actorF"],"hombres de negro", "director name"],
["comedia",1905,["actorD","actorE","actorF"],"hombres de negro", "director name"],
["comedia",1905,["actorD","actorE","actorF"],"hombres de negro", "director name"],
["comedia",1905,["actorD","actorE","actorF"],"hombres de negro", "director name"],
["comedia",1905,["actorD","actorE","actorF"],"hombres de negro", "director name"],
["comedia",1905,["actorD","actorE","actorF"],"hombres de negro", "director name"],
["comedia",1905,["actorD","actorE","actorF"],"hombres de negro", "director name"],
["comedia",1905,["actorD","actorE","actorF"],"hombres de negro", "director name"],
["comedia",1905,["actorD","actorE","actorF"],"hombres de negro", "director name"],
["comedia",1905,["actorD","actorE","actorF"],"hombres de negro", "director name"],
["comedia",1905,["actorD","actorE","actorF"],"hombres de negro", "director name"],
["comedia",1905,["actorD","actorE","actorF"],"hombres de negro", "director name"],
["comedia",1905,["actorD","actorE","actorF"],"hombres de negro", "director name"],
["comedia",1935,["actorD","actorE","actorF"],"hombres de negro", "director name"],
["comedia",1935,["actorD","actorE","actorF"],"hombres de negro", "director name"],
["comedia",1935,["actorD","actorE","actorF"],"hombres de negro", "director name"],
["comedia",1935,["actorD","actorE","actorF"],"hombres de negro", "director name"],
["comedia",1935,["actorD","actorE","actorF"],"hombres de negro", "director name"],
["comedia",1935,["actorD","actorE","actorF"],"hombres de negro", "director name"],
["comedia",1935,["actorD","actorE","actorF"],"hombres de negro", "director name"],
["comedia",1935,["actorD","actorE","actorF"],"hombres de negro", "director name"],
["comedia",1935,["actorD","actorE","actorF"],"hombres de negro", "director name"],
["comedia",1965,["actorD","actorE","actorF"],"hombres de negro", "director name"],
["terror",1970,["a","a","a"],"hombres de negro", "a"]];

function grupoPelicula(genero){
    this.actores = [];
    this.directores = [];
    this.genero = genero;

    this.addActores = function(array){
      var i = array.length - 1;
      for(; i >= 0; i--)
        if(this.actores.indexOf(array[i]) == -1)
          this.actores.push(array[i]);
    }
    this.addDirector = function(elemento){
      if(this.directores.indexOf(elemento) == -1)
        this.directores.push(elemento);
    }

}

function drawCircle(x, y, radio, name){
  svg.append('circle')
  .attr('cx',x + '%')
  .attr('cy',y + '%')
  .attr('r',radio)
  .attr('fill','none')
  .attr('stroke','black')
  .attr('stroke-width','1');

  svg.append('text')
  .text(name)
  .attr('x',x + '%')
  .attr('y',y + '%');
}

function draw(){

  svg.append('rect')
  .attr('x',"10%")
  .attr('y','2.5%')
  .attr('width','10')
  .attr('height','50%')
  .attr('fill','steelblue');

  svg.append('rect')
  .attr('x','10%')
  .attr('y','52%')
  .attr('width','70%')
  .attr('height','10')
  .attr('fill','steelblue');

  svg.append('text').text('years').attr('x','80.5%').attr('y','52.8%');
  svg.append('text').text('movies').attr('x','8%').attr('y','2%');
}

function drawEdges(x, y, radio, from){

  svg.append('text').text(from).attr('x', x - 1 + '%').attr('y', '54%');
  svg.append('text').text(radio).attr('x','9%').attr('y',y + 0.5 + '%');
  svg.append('line')
  .attr('x1','10%')
  .attr('y1', y + '%')
  .attr('x2', 80 + '%')
  .attr('y2', y + '%')
  .style('stroke','lightgrey')
  .attr('stroke-width','1');

  svg.append('line')
  .attr('x1', x + '%')
  .attr('y1', '52%')
  .attr('x2', x + '%')
  .attr('y2', 2.5 + '%')
  .style('stroke','lightgrey')
  .attr('stroke-width','2');

}

module.exports = {
  resultManager: function (result, from, to){
    draw();
    From = from;
    To = to;
    var resultTmp = [];
    var rangeSize;
    var offsetToDraw = getOffsetToDraw(from, to);
    var offsetIncremental = offsetToDraw;
    offsetValue = offsetToDraw;
    if(to - from <= 10){
      //el % de offset queda en 15 para que dibuje sobre el plano
      resultTmp = getMoviesByRange(result, from, to);
      offsetValue = 65;
      getTypesAndCant(resultTmp, 15);
    }
    else{
      rangeSize = Math.round((to - from) / 3);
      rango = rangeSize;
      console.log("el tamaño del rango es: "  + rango);
      while(from < to){
        resultTmp = getMoviesByRange(result, from, from + rangeSize);
        getTypesAndCant(resultTmp, offsetToDraw, from);
        offsetToDraw = offsetToDraw + offsetIncremental;
        from = from + rangeSize;
      }
    }
  }
}
function getOffsetToDraw(from, to){
  if(to - from >= 10){
    var range = (to - from) / 3;
    var itCount = 0;
    while(to > from){
      to = to - range;
      itCount++;
    }
    //60 % que tiene para dibujar + 10% que es donde empiza el plano
    console.log("el it count es de : " + itCount);
    var a =  (60 / itCount);
    return a;
  }
  return 0;
}

function getMaxIndex(result){
  var i = result.length - 1;
  var indexOfMax = -1;
  var max = -1;
  for(; i >= 0; i--){
    if(result[i] > max){
      indexOfMax = i;
      max = result[i];
    }
  }
  return indexOfMax;
}

//obtiene las peliculas por tipo y la cantidad en dos arreglos
//uno para tipos y otro para cantidad por tipo
function getTypesAndCant(result, offset, from){
  var types = [];
  var typeCounter = [];
  var typeMovie;
  var actores = [];
  var director;

  var i = result.length - 1;
  var index;

  for(; i >= 0; i--){
    //obtiene el tipo de pelicula
    if(result[i] != undefined){
      typeMovie = result[i][0];
      actores = result[i][2];
      director = result[i][4];
      //si el tipo existe aumenta el contador si no lo agrega a la lista
      index = containsMovieGenero(types, typeMovie);
      if(index >= 0){
          typeCounter[index] = typeCounter[index] + 1;
          types[index].addActores(actores);
          types[index].addDirector(director);
      }
      else{
        types.push(new grupoPelicula(typeMovie));
        types[types.length - 1].addActores(actores);
        types[types.length - 1].addDirector(director);
        typeCounter.push(1);
      }
    }
  }
  console.log("un grupo de circulos desde: " + from);
  for(var i = 0; i < types.length; i++){
    console.log("________________________________________________________________________");
    console.log("El resultado de types and cant es: " + types[i].genero);
    console.log("El resultado de types and cant es: " + types[i].actores.toString());
    console.log("El resultado de types and cant es: " + types[i].directores.toString());
    console.log("El resultado de types and cant es: " + typeCounter[i]);
    console.log("________________________________________________________________________");
  }


  return graphFinalResult(typeCounter, types, offset, from);
}

function graphFinalResult(typeCounter, types, offset, from){
  var indexPivot = getMaxIndex(typeCounter);
  var groupPivot = types[indexPivot];
  var ejeX, ejeY, radio, offsetBetweenRanges;
  console.log("el offset para dibujar es: " + offset);
  if(types[indexPivot] != undefined){
    ejeX = offset;
    ejeY = 52 - ((typeCounter[indexPivot] / result.length) * 10);
    radio = typeCounter[indexPivot];
    drawEdges(ejeX, ejeY, radio, from);
    drawCircle(ejeX, ejeY, radio, groupPivot.genero);
    typeCounter[indexPivot] = 0;

    for(var i = 0; i < types.length; i++){
      if(typeCounter[i] != 0 && types[i] != undefined){
        //52% es para que se acomode bien con el eje y
        offsetBetweenRanges = offsetValue *  (getMatchPercentage(groupPivot,types[i]) / 100);
        offsetBetweenRanges = offset + (offsetValue - offsetBetweenRanges);
        ejeY = 52 - ((typeCounter[i] / result.length)*10);
        radio = typeCounter[i];
        drawEdges(offsetBetweenRanges , ejeY, radio, from);
        drawCircle(offsetBetweenRanges, ejeY, radio, types[i].genero);

      }
    }
  }

}



function getMatchPercentage(groupMovieA, groupMovieB){
  console.log("compara: " + groupMovieA.genero + " con: " + groupMovieB.genero);
  var result = getMatchOfList(groupMovieA.actores,groupMovieB.actores) / 2;
  result = result + getMatchOfList(groupMovieA.directores,groupMovieB.directores) / 2;
  return result;

}

function getMatchOfList(listA, listB){
  var sizeB = listB.length;
  var percentageByMatch = 100 / listA.length;
  var result = 0;
  var iterator = sizeB-1;
  for(; iterator >= 0; iterator--){
    if(listA.indexOf(listB[iterator]) >= 0){
      result = result + percentageByMatch
    }
  }
  return result;
}



//returns indexOf element else -1
function containsMovieGenero(array, element){
  var i = array.length - 1;

  for(; i >= 0; i--){
    if(array[i].genero == element){
      return i;
    }
  }
  return -1;
}

function getMoviesByRange(result, from, to){
  var i = result.length - 1;

  var filter = [];

  for(;i >= 0; i--){
    //obtiene el número de año
    if(result[i] != undefined){
      if(result[i][1] >= from && result[i][1] < to){
        filter.push(result[i]);
      }
    }
  }

  return filter;
}
