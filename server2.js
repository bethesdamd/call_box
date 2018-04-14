// This represents the web server for the browser client.
// It listens for incoming message over socket.io from the server1.js
// file.

// From https://stackoverflow.com/a/35427353/5794417
// Shows two server apps talking to each other over socket.io-client
//server.js
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

// TODO: <script src="/socket.io/socket.io.js"></script> in html file is not loading
// Probably the fact that i'm instantiating two servers, i've got something wrong in my syntax?
// See this about wrapping: "you wrap your HTTP server in Socket.IO"
// the normal node server does not need this wrapping, but the socket.io server does.  how do I make
// that work?

var url = require('url');
var fs = require('fs');

// connection to other server
io.on('connection', function (socket){
   console.log('connection');

  socket.on('CH01', function (from, msg) {
    console.log('MSG', from, ' saying ', msg);
    // socket.emit('got_iot_message');
  });

});

http.listen(3000, function () {
  console.log('socket.io listening on *:3000');
});

app.get('/', function(req, res){
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<h1>Hello! Try the <a href="/test.html">Test page</a></h1>');
    res.end();
});

// get message from sister server
app.get('/rh', function(req, res){
  io.emit('got_iot_message', '123');
  console.log('gotcha');
});

app.get('/my_new.html', function(req, res) {
  console.log('hi');
      fs.readFile('my_new.html', function(err, data){
          if (err){
              return send404(res);
          }
          res.writeHead(200, {'Content-Type': 'text/html'});
          res.write(data + '\n', 'utf8');
          res.end();
      });
});

send404 = function(res){
    res.writeHead(404);
    res.write('404');
    res.end();
};
