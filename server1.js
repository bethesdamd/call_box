
// this represents the server listening for the incoming HTTP IoT data from sensor,
// then it emits that message to server2.js
// From https://stackoverflow.com/a/35427353/5794417
// Shows two server apps talking to each other over socket.io-client

//client.js
const request = require('request');

var io = require('socket.io-client');
var socket = io.connect('http://localhost:3000', {reconnect: true});

// Add a connect listener
socket.on('connect', function (socket) {
    console.log('Connected!');
});
socket.emit('CH01', 'me', 'test msg');

var http = require('http');
var url = require('url');
var fs = require('fs');
var server;

var sendit = function() {
  request('http://localhost:3000/rh', { json: false }, (err, res, body) => {
  if (err) { return console.log(err); }
  });
}

server = http.createServer(function(req, res){
    var path = url.parse(req.url).pathname;
    switch (path){
        case '/':
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write('<h1>Hello! Try the <a href="/test.html">Test page</a></h1>');
            res.end();
            break;
        case '/r':
          sendit();
          res.write('thanks 1 \n\n');
          res.end();

        break;
        default: send404(res);
    }
});

send404 = function(res){
    res.writeHead(404);
    res.write('404');
    res.end();
};

server.listen(8001);
console.log("web server listening on 8001 for incoming http get with data")
