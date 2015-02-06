var express = require('express');
var app = express();
var JSONStream = require('JSONStream');
var es = require('event-stream');
var bodyParser = require('body-parser')
app.use(bodyParser.json({ limit : 1000000000 }))

app.post('/', function(req, res){
  console.log('got ' + req.body.length + ' reports');
  return res.json({ ok : true });
});

app.listen(3001);
