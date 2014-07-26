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
  var data = analyze(req.body);
  console.log(data);
  res.render('analysis', data);
});

app.listen(PORT);


//business logic ain't big enough for its own file yet

function analyze(data) {
  //bills A and H come from account I.
  //bill V comes from account V
  //partner pays into account V
  //bills A and H are shared; sharedV and other are also shared costs for now (from V and other sources)
  //^^^ TODO: put that logic into a json file
  
  console.log(data);
  //TODO: make the math currency-safe
  var shared = data.billA + data.billH + data.sharedV + data.other;
  data.partner = shared/2;
  
  var debitI = data.billA + data.billH;
  var debitV = data.billV - data.partner;
  
  data.addI = debitI - data.accountI;
  data.addV = debitV - data.accountV;
  
  return data;
}
