// This represents the web server for the browser client.
// It listens for incoming message over socket.io from the server1.js
// file.

// From https://stackoverflow.com/a/35427353/5794417
// Shows two server apps talking to each other over socket.io-client
//server.js
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var http2 = require('http');
var url = require('url');
var fs = require('fs');

io.on('connection', function (socket){
   console.log('connection');

  socket.on('CH01', function (from, msg) {
    console.log('MSG', from, ' saying ', msg);
  });

});

http.listen(3000, function () {
  console.log('socket.io listening on *:3000');
});


server = http2.createServer(function(req, res){
    // your normal server code
    var path = url.parse(req.url).pathname;
    switch (path){
        case '/':
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write('<h1>Hello! Try the <a href="/test.html">Test page</a></h1>');
            res.end();
            break;

          case '/test.html':
              fs.readFile(__dirname + path, function(err, data){
                  if (err){
                      return send404(res);
                  }
                  res.writeHead(200, {'Content-Type': path == 'json.js' ? 'text/javascript' : 'text/html'});
                  res.write(data + '\n', 'utf8');
                  res.end();
              });


        break;
        default: send404(res);
    }
});

send404 = function(res){
    res.writeHead(404);
    res.write('404');
    res.end();
};

server.listen(8002);
console.log("web server listening on 8002")
