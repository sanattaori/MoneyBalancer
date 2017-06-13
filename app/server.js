var express = require("express");
var morgan = require('morgan');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var app = express()
app.use( bodyParser.json() )


var token ;
var userId;


app.use(morgan('combined'));

app.use(cookieParser());
app.use("/", express.static("static"));

app.post('/test-page', function(req, res) {
    token = req.body.token;
    userId = req.body.userId;
    
});

app.get('/verify-email/:token',function(req,res){
token = req.params.token;

res.cookie('name', token, {maxAge : 36000000});
res.redirect('/app');
});

app.get('/app', function (req, res) {
	
 //res.cookie('name', token, {maxAge : 36000000});
  
  var cookiem = req.cookies['name'];
 
 if ((cookiem === 'undefined') || (cookiem === undefined) ||(cookiem === 'null')||(cookiem === null) ||(cookiem === "") ) {
 	res.redirect('/login');
 }
 else{
  	res.sendFile(path.join(__dirname, 'ui', 'app.html'));
 }
  
  
 
});

app.get('/clearcookie', function(req,res){
      res.clearCookie('name');
      res.send('Cookie deleted');
      token === null;
      cookiem === undefined;
});

app.get('/login', function (req, res) {
var cookiem = req.cookies['name'];

if ((cookiem === 'undefined') || (cookiem === undefined)||(cookiem === 'null')||(cookiem === null)||(cookiem === "")){
  res.sendFile(path.join(__dirname, 'ui', 'login.html'));

 }
 else{
  	res.redirect('/app');
 }

});



app.get('/forgot', function (req, res) {
     res.send("We are currently building this screen");
 });

app.get('/chat', function (req, res) {
     res.send("This feature is comming soon with firebase stay tuned");
 });





app.listen(8080, function () {
  console.log('Example app listening on port 8080!');
});