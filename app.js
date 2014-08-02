var express = require('express');
var bodyParser = require('body-parser')

var settings = require('./settings.json');
var PORT = settings.port || 3000;
var billInfo = settings.billInfo;

var app = express();
var ejs = require('ejs');
app.engine('.html', ejs.__express);
app.set('view engine', 'html');
app.use(bodyParser.urlencoded({extended:false}));

app.get('/', function(req, res){
  res.render('input', billInfo);
});

app.post('/', function (req, res) {
  var data = analyze(req.body);
  console.log(data);
  res.render('analysis', data);
});

app.listen(PORT);

//business logic ain't big enough for its own file yet

function analyze(input) {
  console.log(input);
  
  //mathify all potential strings
  var data = {
    input: {}
  };
  Object.keys(input).forEach(function(key){
    data.input[key] = toCurrency(input[key]);
  });
  
  //note: there's still a chance of small rounding errors here, but they should be way less than a penny
  //and since I round my money transfers up to the nearest $10, I don't care.
  
  var shared = 0;
  var debits = {};
  billInfo.accounts.forEach(function(name){
    debits[name] = -data.input[name];
  });
  
  billInfo.bills.forEach(function(bill){
    var amount = bill.amount || data.input[bill.name];
    if (bill.shared) {
      shared += amount;
    }
    if (bill.paidFrom) {
      debits[bill.paidFrom] += amount;
    }
  });
  
  data.partner = shared/2;
  debits[billInfo.partnerTo] -= data.partner;
  data.debits = debits;
  
  return data;
}

function toCurrency(input) {
  //parseFloat returns NaN for blanks, in which case we want 0.
  return parseFloat(input) || 0;
}

ejs.filters.currency = function (amount) {
  return '$' + amount.toFixed(2);
}
