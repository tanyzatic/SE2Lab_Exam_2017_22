//express lib
var express = require('express');
//general lib
var app = express();
//inspect
var util = require('util');
//Cross-Origin Resource Sharing (CORS), used for enabling pre-flight option
cors = require('cors');

//record shop manager
var recordShop = require('./recordShop.js');

//POST
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));//set to true since we want to parse nested objects in the JSON we receive
app.use(bodyParser.json());// JSON

//set up the server
app.set('port', (process.env.PORT || 5000));
//enable pre-flight authorization
app.options('*', cors());

/**
 * @brief returns a static welcome page.
 * @return a static page.
 */
app.get('/', function(request, response) {
	var headers = {};
	//answer
	headers["Content-Type"] = "text/html";
	response.writeHead(200, headers);
	response.end("Welcome dear customer");
});

/**
 * @brief returns the content of disks
 * @return a static page.
 */
app.get('/showDisks', function(request, response) 
{
	var headers = {};
	headers["Content-Type"] = "text/html";
	response.writeHead(200, headers);
	response.end(JSON.stringify(recordShop.getDisks()));
});

/**
 * @brief search for a disk
 * @return a disk tat matches the ID specifed, if it does not exists it returns 404
 */
app.post('/searchDisk', function(request, response) 
{
	var headers = {};
	headers["Access-Control-Allow-Origin"] = "*";
	headers["Access-Control-Allow-Methods"] = "POST, GET, PUT, DELETE, OPTIONS";
	headers["Access-Control-Allow-Credentials"] = false;
	headers["Access-Control-Max-Age"] = '86400'; // 24 hours
	headers["Access-Control-Allow-Headers"] = "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept";
	headers["Content-Type"] = "application/json";

	var diskID;
	
	//check body and parameters
	if ( typeof request.body !== 'undefined' && request.body)
	{
        
        //diskID
		if ( typeof request.body.ID !== 'undefined' && request.body.ID)
			 diskID = parseFloat(request.body.ID);
		else 
			diskID = null;
        
		//search for disk
		var disk = recordShop.searchDisk(diskID);
		//if exists
		if (disk != null)
		{
			response.writeHead(200, headers);
			response.end(JSON.stringify(disk));
		}
		else
		{
			response.writeHead(404, headers);
			response.end(JSON.stringify());
		}
	
	}
	else
	{
		//unaceptable input
		response.writeHead(406, headers);
		response.end(JSON.stringify("1"));
	}
    

});

/**
 * @brief remaster an item, update the date
 * @return the item restoked
 */
app.post('/remasterDisk', function(request, response) 
{	
	var headers = {};
	headers["Access-Control-Allow-Origin"] = "*";
	headers["Access-Control-Allow-Methods"] = "POST, GET, PUT, DELETE, OPTIONS";
	headers["Access-Control-Allow-Credentials"] = false;
	headers["Access-Control-Max-Age"] = '86400'; // 24 hours
	headers["Access-Control-Allow-Headers"] = "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept";
	headers["Content-Type"] = "application/json";

	var diskID;
	var diskQuantity;

	//check body and parameters
	if ( typeof request.body !== 'undefined' && request.body)
	{
		if ( typeof request.body.ID !== 'undefined' && request.body.ID &&
			 typeof request.body.quantity !== 'undefined' && request.body.quantity 
		   )
            {
			 diskID = parseFloat(request.body.ID);
			 diskQuantity = parseFloat(request.body.quantity);
            }
		else 
			diskID = "undefined";
	}
	else
	{
		diskID = "body undefined";
	}
    
    if (diskID!="undefined" && diskID!="body undefined")
	{
		//aceptable input
		//create the object to be used as input for the db manager function
		var disk =  
            {
                ID: diskID,
                quantity: diskQuantity
            };
        
        var result=recordShop.remaster(disk)
		
		//if insertion works correctly
		if (result)
		{
			response.writeHead(200, headers);
			response.end(JSON.stringify(result));
		}
		else
		{
			response.writeHead(400, headers);
			response.end(JSON.stringify());
		}

	}
    else    
	{
		//unaceptable input
		response.writeHead(406, headers);
		response.end(JSON.stringify("1"));
	}   

});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});