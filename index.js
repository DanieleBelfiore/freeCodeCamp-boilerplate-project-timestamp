var express = require('express');
var app = express();

var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));

app.use(express.static('public'));

app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

var isDate = function(date) {
  return (new Date(date) !== "Invalid Date") && !isNaN(new Date(date));
}
 
app.get("/api/:date?", function (req, res) {
  let date = new Date();
  let input = req.params.date;
  
  if (input != null) { 
    date = new Date(+input);
    if (!isDate(date)) {
      date = new Date(input);
      if (!isDate(date)) {
        return res.json({ error : "Invalid Date" });
      }
    }
  }
  res.json({ unix: date.getTime(), utc: date.toUTCString() } );
});

var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
