var http = require('http');
var url = require('url');
var fs = require('fs');
var server;

server = http.createServer(function(req, res){
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

server.listen(8003);

// use socket.io
var io = require('socket.io').listen(server);

//turn off debug
io.set('log level', 1);

var socket_server = require('socket.io-client')('http://localhost');
temps = socket_server.open();
console.log('temp socket: ' + temps.connected);
console.log('socket_server connected?: ' + socket_server.connected);
console.log('hello');

socket_server.on('got_iot_message', function(data){
    console.log('message received from server on 8002');
});

// define interactions with client
io.sockets.on('connection', function(socket){

    var f = function(s){
      console.log('got something: ' + data);
    };

  // socket.emit('got_iot_message', 'yyy');
  socket_server.on('connect', function(){console.log('connect')});
  socket_server.on('event', function(data){});
  socket_server.on('disconnect', function(){});
  // socket_server.on('got_iot_message', function(){
  //   socket.emit('got_iot_message', 'xxx');
  // })

    //send data to client
    setInterval(function(){
        socket.emit('date', {'date': new Date()});
    }, 1000);

    //recieve client data
    socket.on('client_data', function(data){
        process.stdout.write(data.letter);
    });

});
