$(document).ready(function()
{	
	//var baseAddress = "https://polar-coast-16373.herokuapp.com"
	var baseAddress = "http://127.0.0.1:5000"; 
	//post + Json
	$("#btn1").click(function(){
		$.post(baseAddress + "/searchDisk",
		{
			ID: 1
		},
		function(data, status){
			alert(" Status: " + status);
            console.log(data);
		},
		"json");
	});
	
	$("#btn2").click(function(){
		$.post(baseAddress + "/sellDisk",
		{
			ID: 1
		},
		function(data, status){
			alert("ID: " + data.ID + 
				  "\n genre: " + data.genre +
				  "\n quantity: " + data.quantity +
                  "\n price: " + data.price +
                  "\n date: " + data.date +
				  "\n Status: " + status);
		},
		"json");
	});   
    
	$("#btn3").click(function(){
		$.post(baseAddress + "/remasterDisk",
		{
                ID: 4,
                quantity: 2
		},
		function(data, status){
			alert("ID: " + data.ID + 
				  "\n genre: " + data.genre +
				  "\n quantity: " + data.quantity +
                  "\n price: " + data.price +
                  "\n date: " + data.date +
				  "\n Status: " + status);
		},
		"json");
	});
	
	$("#btn4").click(function(){
		$.post(baseAddress + "/searchSimilarDisk",
		{
			genre: 'classic'
		},
		function(data, status){
			alert("Status: " + status);
            console.log(data);
		},
		"json");
	});
		
	$("#btn5").click(function(){
		$.post(baseAddress + "/searchSimilarDisk",
		{
			genre: 'cross over'
		},
		function(data, status){
			alert("Status: " + status);
            console.log(data);
		},
		"json");
	});
	
	$("#btn6").click(function(){
		$.post(baseAddress + "/sellDisk",
		{
			ID: 4
		},
		function(data, status){
			alert("ID: " + data.ID + 
				  "\n genre: " + data.genre +
				  "\n quantity: " + data.quantity +
                  "\n price: " + data.price +
                  "\n date: " + data.date +
				  "\n Status: " + status);
		},
		"json");
	});
});