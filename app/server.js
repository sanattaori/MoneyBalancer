var express = require("express");
var morgan = require('morgan');
var path = require('path');
var bodyParser = require('body-parser');

var app = express()
app.use( bodyParser.json() )


var token;


app.use(morgan('combined'));


app.use("/", express.static("static"));

app.post('/test-page', function(req, res) {
    token = req.body.token,
    console.log("token "+token);
    
});

app.get('/app', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'app.html'));

});

app.get('/login', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'login.html'));

});



app.get('/forgot', function (req, res) {
     res.send("We are currently building this screen");
 });

app.get('/chat', function (req, res) {
     res.send("This feature is comming soon with firebase stay tuned");
 });





app.listen(8080,"127.0.0.1", () => {
	console.log(`Server Listening at localhost:8080`);
});