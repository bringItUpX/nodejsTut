/**
* main file for node.js to running a server
*
* @author bringItUpX
* @date 2018-07-21
*/

//Dependencies
var http = require('http');
var url  = require('url');

// variables
var message = 'Hello to Pirple!';

var server = http.createServer(function(req, ret) {
	// get url
	var parsedUrl = url.parse(req.url, true);
	// get path
	var path = parsedUrl.pathname;
	var trimmedPath = path.replace(/^\/+|\/+$/g,'');
	console.log('received a request with path: ' + path);
	console.log('received a request with trimmedPath: ' + trimmedPath);
	// send response
	ret.end(message);

	// log the send message
	console.log('answer: ' + message);
})

server.listen(3000, function(){
	console.log('server has started to listing on port 3000');
})