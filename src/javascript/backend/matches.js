require('dotenv').load();
var express = require('express');
var app = express();

app.get('/data', function(req, res) {
  res.send('Hello World!');
});

app.listen(8000, function() {
  console.log('Example app listening on port 8000!');
});