var express = require('express');

var PORT = 3000; //TODO make option

var app = express();
app.engine('.html', require('ejs').__express);
app.set('view engine', 'html');


var helloData = {
  world: 'World'
}

app.get('/', function(req, res){
  res.render('hello', helloData);
});


app.listen(PORT);