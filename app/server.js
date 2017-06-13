var express = require("express");
var morgan = require('morgan');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var request = require('request');
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

app.get('/verify-email/:toke',function(req,res){

var toke = req.params.toke;

request('https://auth.project.sanattaori.me/email/confirm?token='+ toke, function (error, response, body) {
  console.log('error:', error); // Print the error if one occurred 
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received 
  console.log('body:', body); // Print the HTML for the Google homepage. 
  if ((response && response.statusCode)===	200) {
res.send('User verified Login to continue');


}
else if ((response && response.statusCode)===400) {

res.send('Invalid User Or Expired Key');

}
});




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