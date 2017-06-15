$(document).ready(function(){



  $(".button-collapse").sideNav();




//var cookie =  document.cookie;

//var length = document.cookie.length;


/*
for (var i = 0; i <= length; i++) {
	var token = cookie.split('=')[3];
	
}
*/

$.ajaxSetup({
    // xhrFields: { withCredentials: true },
    crossDomain: true,
    headers: {
      'X-Hasura-Role' : 'user'
    }
  });



function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

var token = readCookie('name')
var id = readCookie('id')
console.log(id);
var userId;
var username = null;

var setUsername = function (u) {
    username = u;
    //$('#userinfo').text(username);
    console.log(username);
  };


var setUserId = function (v) {
    userId = v;
    //$('#userinfo').text(username);
    //set cookie
	var d = new Date();
    d.setTime(d.getTime() + (1*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = 'id' + "=" + userId + ";" + expires + ";path=/";
  };


function tokenHeaders() {
    return {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    };
  }

$.ajax({
	url: 'https://auth.project.sanattaori.me/user/account/info',
	headers: tokenHeaders(),
	method: 'GET'

}).done(function(data){
	setUserId(data.hasura_id);
	setUsername(data.username);


}).fail(function(){
	alert('fail to fetch user info refresh page or login again');
});

//insert 

$(insert).click(function(){

console.log("insert");

if ($('#title').val()=="") {
$("#insert").text("Enter title");
}
else if($("#amount").val()==""){
	$("#insert").text("Enter Amount");
}
else if($("#date").val()==""){
	$("#insert").text("Enter Date");
}
else if($("#description").val()==""){
	$("#insert").text("Enter description");
}
else{
	$.ajax({
		url: 'https://data.project.sanattaori.me/v1/query',
		method: 'POST',
		headers: tokenHeaders(),
		data: JSON.stringify({
			"type" : "insert",
			"args" : {
				"table": "moneyb",
				"objects": [
             {
             "user_id": id,
              "title"   : $('#title').val(),
              "description" : $("#description").val() ,
              "date" : $("#date").val(),
              "amount" : $("#amount").val()

              }
           ]
			}
			
		})
		
	}).done(function(data){
		console.log(data);
		console.log("updated");
	}).fail(function(ja){
		console.log(ja);

		alert('Fail Try again'+JSON.parse(ja.responseText).message);
	});
}

});








	$(logout).click(function(){
		$.ajax({
			url: 'https://auth.project.sanattaori.me/user/logout',
			headers: tokenHeaders(),
			method: 'GET'
		}).done(function(){
			window.location = '/login';
			document.cookie = "name=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
		}).fail(function(j){
			console.error(j);
			alert('Logout Failed! Try Refreshing?');
		});
	});

});