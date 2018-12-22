require('dotenv').load();
var express = require('express');
var app = express();
var connection = require('./connection');


app.get('/leagues', function(req, res) {
  res.send('Hello World!');
});

app.get('/matches', async function(req, res) {
  const matches = await connection.top20('me arthur chen');
  console.log(matches)
  var json = JSON.stringify(matches);
  res.send(json);
})

app.listen(8000, function() {
  console.log('Example app listening on port 8000!');
});