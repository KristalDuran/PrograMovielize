var http = require("http"), //modulo de servir
  fs = require("fs"),
  parser = require("./params_parser.js");

//req solicitud res respuesta

//var p = parser.parse;
http.createServer(function(req, res){ //servidor

  //el script no se detinene
  if(req.url.indexOf("favicon.ico") > 0 ){return;}

  fs.readFile("./index.html", function(err, html){

    var html_string = html.toString();
    var arreglo_parametros = [], parametros = {};
    var variables = html_string.match(/[^\{\}]+(?=\})/g);
    var nombre = "Movielize";
    if(req.url.indexOf("favicon.ico") > 0 ){
      var url_data=req.url.split("?");
      var arreglo_parametros = url_data[1].split("&");
    }

    for (var i = arreglo_parametros.length-1; i >=0; i--) {
      var parametro = arreglo_parametros[i];
      var param_data = parametro.split("=");
      parametros[param_data[0]] = param_data[1];

    }
      //var parametros = p(req);

      for (var i = variables.length -1; i >= 0; i--) {

      //  {nombre},"Movielize"
        html_string = html_string.replace("{"+variables[i]+"}", parametros[variables[i]]);
      };
      res.writeHead(200,{"Content-Type":"text/html"})//escribe encabezados de la respuesta
      res.write(html_string);
      res.end();
  });
}).listen(8080);
