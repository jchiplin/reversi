/*include static file webserver library */
var static = require('node-static');

//include http server library
var http = require('http');

//assume writing on heroku
var port = process.env.PORT;
var directory = __dirname + '/Public';

//if we arent on heroku we need to readjust port and directory info and we know that because port wont be set
if(typeof port == 'undefined' || !port){
	directory = './public';
	port = 8080;
	}
//set up static web server that wil deliever files from file system
var file = new static.Server(directory);
//construct an http server that gets files from file server
var app = http.createServer(
		function(request, response){
			request.addListener('end', 
				function(){
					file.serve(request,response);
				}
			).resume();
		}
	).listen(port);

console.log('The Server is running');