var express = require('express');
var bodyParser = require('body-parser')

var PORT = 3000; //TODO make option

var app = express();
app.engine('.html', require('ejs').__express);
app.set('view engine', 'html');
app.use(bodyParser.urlencoded({extended:false}));

app.get('/', function(req, res){
  res.render('input', {});
});

app.post('/analysis', function (req, res) {
  var data = req.body;
  data.partner = 123;
  data.addI = 321;
  data.addV = -5;
  //console.log("data:");
  console.log(data);
  res.render('analysis', data);
});


app.listen(PORT);
