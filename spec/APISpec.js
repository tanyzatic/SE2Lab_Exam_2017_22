//test of the APIs

//lib for sending requests
var request = require("request");

//set base URL
var base_url = "http://localhost:5000/";

//library for JSON requests
requestJSON = require('request-json');
var client = requestJSON.createClient(base_url);


// Test for homepage
describe("Test /", function() {
    it("returns status code 200", function(done) {
        request.get(
            base_url + "", 
            function(error, response, body) {
                expect(response.statusCode).toBe(200);
                done();
            });
    }); 
});

// Test for /showDisks
describe("Test /showDisks", function() {
    it("returns status code 200", function(done) {
        request.get(
            base_url + "showDisks/", 
            function(error, response, body) {
                expect(response.statusCode).toBe(200);
                done();
            });
    }); 
});


//Test for /sellDisk
describe("Test /sellDisk", function() {	
	//legal request
	var data = {
			ID: 1
    };
    
    var dateCheck= new Date(2000, 0, 1, 0, 0, 0, 0).toISOString();
    
	it("to return status code 200", function(done) {
	  client.post(base_url + "sellDisk/", data, function(err, res, body) {
		expect(body).toEqual(
        {
                ID: 1,
                price: 5.5,
                quantity: 19,
                genre: "classic",
                date: dateCheck
        }
		);
		done();
	  });
	});
	

	//item non existing ID
	var data1 = {
			ID: 10
    };
	it("to return status code 404", function(done) {
	  client.post(base_url + "sellDisk/", data1, function(err, res, body) {
		expect(res.statusCode).toBe(404);
		done();
	  });
	});
	
	//wrong parameter
	var data2 = {code: "1" };
	it("to return status code 406", function(done) {
	  client.post(base_url + "sellDisk/", data2, function(err, res, body) {
		expect(res.statusCode).toBe(406);
		expect(body).toBe(1);
		done();
	  });
	});	
	
});

//Test for /remasterDisk
describe("Test /remasterDisk", function() {	
	//legal request
	var data = {
			ID: 1,
            quantity: 1
    };
    
    var dateCheck= new Date().toISOString();
    
	it("to return status code 200", function(done) {
	  client.post(base_url + "remasterDisk/", data, function(err, res, body) {
		//skip this because of difference in generation of dates
        /*expect(body).toEqual(
        {
                ID: 1,
                price: 11,
                quantity: 20,
                genre: "classic",
                date: dateCheck
        }*/
        expect(body.ID).toEqual(1);
        expect(body.price).toEqual(11);
        expect(body.quantity).toEqual(20);
        expect(body.genre).toEqual("classic");
		done();
	  });
	});
	

	//item non existing ID
	var data1 = {
			ID: 10,
            quantity: 1
    };
	it("to return status code 400", function(done) {
	  client.post(base_url + "remasterDisk/", data1, function(err, res, body) {
		expect(res.statusCode).toBe(400);
		done();
	  });
	});
	
	//wrong parameter
	var data2 = {code: "1" };
	it("to return status code 406", function(done) {
	  client.post(base_url + "remasterDisk/", data2, function(err, res, body) {
		expect(res.statusCode).toBe(406);
		expect(body).toBe(1);
		done();
	  });
	});	
	
});

//Test for /searchSimilarDisk
describe("Test /searchSimilarDisk", function() {	
	//legal request
	var data = {
			genre: 'cross over'
    };
    
    var dateCheck= new Date(2017, 3, 21, 0, 0, 0, 0).toISOString();
    
	it("to return status code 200", function(done) {
	  client.post(base_url + "searchSimilarDisk/", data, function(err, res, body) {
          expect(body).toEqual(

                [
                    {
                        ID: 4,
                        price: 10,
                        quantity: 4,
                        genre: "cross over",
                        date: dateCheck
                    }
                ]
		);
		done();
	  });
	});
	

	//item non existing ID
	var data1 = {
            genre: 'foo'
    };
	it("to return status code 400", function(done) {
	  client.post(base_url + "searchSimilarDisk/", data1, function(err, res, body) {
		expect(res.statusCode).toBe(400);
		done();
	  });
	});
	
	//wrong parameter
	var data2 = {code: "1" };
	it("to return status code 406", function(done) {
	  client.post(base_url + "searchSimilarDisk/", data2, function(err, res, body) {
		expect(res.statusCode).toBe(406);
		expect(body).toBe(1);
		done();
	  });
	});	
	
});