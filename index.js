var express = require('express');
var cors = require('cors');
var app = express();

// Enable CORS
app.use(cors({ optionsSuccessStatus: 200 }));

// Serve static files
app.use(express.static('public'));

// Home page
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

// Hello test endpoint
app.get("/api/hello", (req, res) => {
  res.json({ greeting: "hello API" });
});

// Timestamp API
app.get("/api/:date?", (req, res) => {
  const dateParam = req.params.date;
  let date;

  // Handle no date provided
  if (!dateParam) {
    date = new Date();
  } 
  // Handle numeric timestamp
  else if (!isNaN(dateParam) && /^\d+$/.test(dateParam)) {
    date = new Date(parseInt(dateParam));
  } 
  // Handle ISO date string
  else {
    date = new Date(dateParam);
  }

  // Handle invalid dates
  if (date.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  // Success response
  res.json({
    unix: date.getTime(),
    utc: date.toUTCString(),
  });
});

// Start the server
var listener = app.listen(process.env.PORT || 3000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
