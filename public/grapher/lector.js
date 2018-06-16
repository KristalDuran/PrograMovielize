

var fs = require('fs');
var d3 = require('d3');
console.log("hello world");

var content = fs.readFileSync('sample.json','utf-8');
content = JSON.parse(content);
