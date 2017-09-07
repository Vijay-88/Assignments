var express  = require('express');
var app = express();                               

var bodyParser = require('body-parser'); 	
var methodOverride = require('method-override'); 

app.use(express.static(__dirname + '/public'));
app.listen(2020);
console.log("App listening on port 2020");

app.use(bodyParser.urlencoded({'extended':'true'})); 			
app.use(bodyParser.json()); 	
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); 
app.use(methodOverride());

var routes = require('./router/routes')(app);

