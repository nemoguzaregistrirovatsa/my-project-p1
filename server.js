// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});


var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded());
app.get('/api/timestamp/:date', function(req, res, next) {
  var data = req.params.date;
  if (isNaN(data)) {
    var date = new Date(data);
  } else {
    var date = new Date(+data);
  }
  var utc = date.toUTCString('en-us');
  if (utc == 'Invalid Date') res.json({'error': utc})
  else res.json({'unix': date/1, 'utc': utc});
})

app.get('/api/timestamp', function(req, res, next) {
  var date = new Date();
  var utc = date.toUTCString('en-us');
  res.json({'unix': date/1, 'utc': utc});
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
