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
	
	var data = {
		'method': method,
		'query' : queryStringObject,
		'path'  : trimmedPath,
		'headers' : headers
	};

	var chooseHandler = typeof(router[trimmedPath]) == 'undefined' ? handlers.notFound : router[trimmedPath];
	chooseHandler(data, function(statusCode, data) {
		statusCode = typeof(statusCode) == 'number' ? statusCode : 200;
		data = typeof(data) == 'object' ? data : {};

		// send response
		ret.setHeader('Content-Type', 'application/json');
		ret.writeHead(statusCode);
		ret.end(JSON.stringify(data));
		// log the send message
		console.log('statusCode: ' + statusCode + ' answer: ' + JSON.stringify(data));
	})
})
})

server.listen(3000, function(){
	console.log('server has started to listing on port 3000');
})

var handlers = {};

handlers.sample = function (data, callback){
	callback(200, {"sample" : "sample-Value"});
}

handlers.notFound = function (data, callback){
	callback(404, {});
}

var router = {
	"sample" : handlers.sample
};
