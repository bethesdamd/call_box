// this works, it sends a message to my app server.js in node-and-socket-example directory which then
// receives the message and does something.

var socket = require('socket.io-client')('http://localhost:8001');
socket.on('connect', function(){console.log('connect')});
socket.on('event', function(data){});
socket.on('disconnect', function(){});
socket.emit('hey', 'success message');
