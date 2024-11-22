var express = require('express');
var app = express();

// Enable CORS (Cross-Origin Resource Sharing)
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 })); // Some legacy browsers choke on 204

// Serve static files
app.use(express.static('public'));

// Root endpoint (renders index.html)
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// API endpoint to handle timestamp requests
app.get('/api/:date?', function (req, res) {
  let dateParam = req.params.date;

  // Handle empty date parameter (use current date)
  if (!dateParam) {
    const now = new Date();
    return res.json({
      unix: now.getTime(),
      utc: now.toUTCString(),
    });
  }

  // Handle Unix timestamp (numeric string)
  if (!isNaN(dateParam)) {
    dateParam = parseInt(dateParam); // Convert to number
  }

  // Create a Date object
  const date = new Date(dateParam);

  // Handle invalid date
  if (isNaN(date.getTime())) {
    return res.json({ error: 'Invalid Date' });
  }

  // Return valid Unix and UTC timestamps
  res.json({
    unix: date.getTime(),
    utc: date.toUTCString(),
  });
});

// Start the server
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
