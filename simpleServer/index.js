/**
* main file for node.js to running a server
*
* @author bringItUpX
* @date 2018-07-21
*/

//Dependencies
var http = require('http');
var url  = require('url');
var StringDecoder = require('string_decoder').StringDecoder;

var server = http.createServer(function(req, ret) {
	var message = 'Hello to Pirple!';
	// get url
	var parsedUrl = url.parse(req.url, true);
	// get path
	var path = parsedUrl.pathname;
	var trimmedPath = path.replace(/^\/+|\/+$/g,'');
	console.log('received a request with path: ' + path);
	console.log('received a request with trimmedPath: ' + trimmedPath);
	// get the http method
	var method = req.method.toLowerCase();
	// get the query
	var queryStringObject = parsedUrl.query;
	// get headers (use postman plugin for safari)
	var headers = req.headers;

	// receive payload
	var decoder = new StringDecoder('utf-8');
	var buffer = '';
req.on('data', function (data){
	buffer += decoder.write(data);
})

req.on('end', function (){
	buffer += decoder.end();
	
	// send response
	ret.end(message);

	// log the send message
	console.log('answer: ' + message);

})


})

server.listen(3000, function(){
	console.log('server has started to listing on port 3000');
})