/*
To run:

- Open three terminals
- In first terminal: node server1.js
- In second terminal: node server2.js
- In browser: http://localhost:3000/my_new.html
- In third terminal: curl localhost:8001/r?message1
- You should see a change in the browser indicating the message was received
*/

/* This is Node.js Server 1
   (Server1 and Server2 are Node.js apps running on the same physical server)
   This represents the server listening for the incoming HTTP IoT data from sensor,
   then it sends that message to server2.js using HTTP
   Do the following to simulate an incoming message:
*/


// TODO: implement the code that extracts the 'foo' message from a url of this format:
// curl localhost:8001/r?data=foo

const request = require('request');

var http = require('http');
var url = require('url');
var fs = require('fs');
var server;

// Send data to Node Server 2
var sendit = function(s) {
  request('http://localhost:3000/rh' + '?' + s, { }, (err, res, body) => {
  if (err) { return console.log(err); }
  });
}

server = http.createServer(function(req, res){
    var path = url.parse(req.url).pathname;
    console.log(req.method);

    switch (path){

        // This is just a hello route for testing
        case '/':
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write('<h1>Hello!</h1>');
            res.end();
            break;

        // This route accepts an incoming http get with IoT message
        // e.g. curl localhost:8001/r?data=foo
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
console.log("Web server listening on 8001 for incoming http get with data")
