// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/timestamp/:date_string", function (req, res) {
  if(/\d{5,}/.test(req.params.date_string)) {
    let dateInt = parseInt(req.params.date_string);
    res.json({unix: req.params.date_string, utc: new Date(dateInt).toUTCString()});
  }
  let apiDate = new Date(req.params.date_string);
  if(apiDate=="Invalid Date")
    res.json({"error":"Invalid Date"});
  else
    res.json({"unix":apiDate.getTime(),"utc":apiDate.toUTCString()});
});

app.get("/api/timestamp", function(req,res){
  let apiDate = new Date();
  res.json({"unix":apiDate.getTime(), "utc":apiDate.toUTCString()});
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});