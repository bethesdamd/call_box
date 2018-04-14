
// this represents the server listening for the incoming HTTP IoT data from sensor,
// then it sends that message to server2.js over http
// From https://stackoverflow.com/a/35427353/5794417
// do the following to simulate an incoming message:
// curl localhost:8001/r

const request = require('request');

var http = require('http');
var url = require('url');
var fs = require('fs');
var server;

// send data to the other server
var sendit = function(s) {
  request('http://localhost:3000/rh' + '?' + s, { }, (err, res, body) => {
  if (err) { return console.log(err); }
  });
}

server = http.createServer(function(req, res){
    var path = url.parse(req.url).pathname;
    console.log(req.method);

    switch (path){

        // this is just a hello route for testing
        case '/':
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write('<h1>Hello!</h1>');
            res.end();
            break;

        // this path accepts incoming http get with IoT message
        // e.g. curl localhost:8001/r
        case '/r':
          console.log('url: ' + req.url);
          sendit(req.url);
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
