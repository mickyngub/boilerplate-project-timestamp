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

//show request
app.use("", (req,res,next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
  
})
// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});
app.get("/api/timestamp/", (req,res) => {
  res.json(
    {"unix": Date.now(), "utc": Date()});
  
});
app.get("/api/timestamp/:date_string", (req, res) => {

  if(req.params.date_string.match(/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/)) { 
    let date = new Date(req.params.date_string);
    res.json( 
    {"unix": date.getTime(),
    "utc": date.toUTCString()});

  } else if(req.params.date_string.match(/\d{5,}/)) {
    let test = parseInt(req.params.date_string);
    let date = new Date(test);
    res.json( 
    {"unix": date.getTime(),
    "utc": date.toUTCString()});
  }
  
 else {
    res.json({"error": "Invalid Date"});
  }

}); 

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});