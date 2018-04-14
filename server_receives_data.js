// this will be the server that receives the incoming IoT message on port 8001
// and then sends that message over port

var http = require('http');
var url = require('url');
var server;

// Use this socket/port to send message to browser node app
var socket = require('socket.io-client')('http://localhost');
socket.open();
socket.on('connect', function(){console.log('connect has occurred')});
socket.on('event', function(data){});
socket.on('disconnect', function(){});

get_payload = function(s){
  re = /\?(.+)$/;
  m = s.match(re);
  if(m == null) {
    return '';
  } else {
    if(m.length > 1){
      return m[1];
    } else {
      return '';
    }
  }
}

server = http.createServer(function(req, res){
    var path = url.parse(req.url).pathname;
    switch (path){
        // case '/test':
        //     res.writeHead(200, {'Content-Type': 'text/html'});
        //     res.write('<h1>Hello! Try the <a href="/test.html">Test page</a></h1>');
        //     res.end();
        //     break;
        case '/r':  // receive incoming http get/post from IoT server here on port 8001
          payload = get_payload(req.url);
          console.log('hi there console this route just got IoT message: ' + payload);
          socket.emit('got_iot_message', 'this is the IoT message payload: ' + payload);
          my_emit('testing');
          res.write('thanks');
          res.end();

        break;
        default: send404(res);
    }
});

my_emit = function(x){
  console.log('rrr');
  console.log(socket.connected);
  socket.emit('got_iot_message', 'gotcha');
}

send404 = function(res){
    res.writeHead(404);
    res.write('404');
    res.end();
};

server.listen(8001);

// use socket.io
// var io = require('socket.io').listen(server);

//turn off debug
// io.set('log level', 1);



// define interactions with client
// io.sockets.on('connection', function(socket){
//     //send data to client
//     setInterval(function(){
//         socket.emit('date', {'date': new Date()});
//     }, 1000);
//
//     //recieve client data
//     socket.on('client_data', function(data){
//         process.stdout.write(data.letter);
//     });
//
//     socket.on('hey', function(data){
//       console.log('i saw the hey message: ' + data);
//     });
// });
