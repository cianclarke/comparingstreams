var express = require('express');
var app = express();
var JSONStream = require('JSONStream');
var es = require('event-stream');
var bodyParser = require('body-parser')
var request = require('request');
var stream = false;
if (!stream){
  app.use(bodyParser.json({ limit: 10000000000 }))
}

app.post('/', function(req, res){
  if (stream){
    var reportsJsonStream = req.pipe(JSONStream.parse('reports.*')),
    reportsStringifyStream = reportsJsonStream.pipe(JSONStream.stringify()),
    reportsSendStream = reportsStringifyStream.pipe(request.post({json : true, url : 'http://127.0.0.1:3001/'}));
    reportsSendStream.on('end', function(){
      return res.json({ ok : true });
    });  
  }else{
    console.log('got ' + req.body.reports.length + ' reports');
    request.post({json : req.body.reports, url : 'http://127.0.0.1:3001/'}, function(){
      return res.json({ ok : true });
    })
  }
});

app.listen(3000);
