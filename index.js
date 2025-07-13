// index.js
// where your node app starts

var express = require('express');
var cors = require('cors');
var app = express();

// enable CORS so that your API is remotely testable by FCC 
app.use(cors({ optionsSuccessStatus: 200 }));

// serve static files
app.use(express.static('public'));

// homepage route
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// hello test endpoint
app.get("/api/hello", function (req, res) {
  res.json({ greeting: 'hello API' });
});

// timestamp endpoint
app.get("/api/:date?", function (req, res) {
  let dateString = req.params.date;
  let date;

  if (!dateString) {
    date = new Date();
  } else if (!isNaN(dateString)) {
    // Handle Unix timestamp in milliseconds
    date = new Date(Number(dateString));
  } else {
    date = new Date(dateString);
  }

  if (date.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});

// start server
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
