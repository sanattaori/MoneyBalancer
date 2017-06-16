
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

function tokenHeaders() {
    return {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    };
  }

var token = readCookie('name')

 function showData(id)
{
	$.ajax({
		url: 'https://data.project.sanattaori.me/v1/query',
		method: 'post',
		headers:tokenHeaders(),
		data: JSON.stringify(

			{  "type" : "delete",
         "args" : {
            "table"     : "chatn" ,
            "where"     : { "id" : { "$eq" : id } }
           
         }
      }

		)
	}).done(function(){
		 Materialize.toast('Item Deleted', 2000, 'rounded')
$("#tabl").load(location.href + " #tabl");
		 //refresh table again
		 //

$.ajax({
	url: 'https://data.project.sanattaori.me/v1/query',
	method: 'POST',
	headers: tokenHeaders(),
	data: JSON.stringify({
    "type" : "select",
    "args" : {
        "table" : "chatn",
        "columns": ["id", "name", "text", "time"]
     
    }
})
}).done(function(data){
	console.log(data);


	var tr;
    for (var i = 0; i < data.length; i++) {
        tr = $('<tr/>');

        tr.append("<td>" + data[i].name + "</td>");
        tr.append("<td>" + data[i].text + "</td>");
        tr.append("<td>" + data[i].time + "</td>");

        tr.append("<td onclick = showData("+data[i].id  +"); >" + "<i class="+ "material-icons"+ ">delete</i>"+" </td> ");
        $('#tabl').append(tr);
    }
});
			//
		});
}


$(document).ready(function(){
var usernames;




  $(".button-collapse").sideNav();

var user_ids;
var user_id;



user_ids = readCookie('id')
 user_id = parseInt(user_ids);
//console.log(user_id);
var username = null;

var setUsername = function (u) {
    username = u;
    //$('#uname').text(username);
   // console.log(username);
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




 

$.ajax({
	url: 'https://auth.project.sanattaori.me/user/account/info',
	headers: tokenHeaders(),
	method: 'GET'

}).done(function(data){
 setUserId(data.hasura_id);
	usernames = data.username;


}).fail(function(){
	//alert('fail to fetch user info refresh page or login again');
	Materialize.toast('refresh', 2000, 'rounded')
	location.reload();
});

var currentdate = new Date(); 
var datetime =  currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();

$(send).click(function(){
	console.log("click");
	if ($('#textarea1').val()=="") {
		Materialize.toast('Enter Message ', 2000, 'rounded')
	}
	else{

		$.ajax({
			url: 'https://data.project.sanattaori.me/v1/query',
			method: 'post',
			headers:tokenHeaders(),
			data: JSON.stringify({
			"type" : "insert",
			"args" : {
				"table": "chatn",
				"objects": [
             {
             user_id ,
              "name"   :usernames,
              "text": $("#textarea1").val() ,
              "time": datetime
              
              

              }
           ]
			}
			
		})
		}).done(function(data){
			$("#tabl").load(location.href + " #tabl");

			//

$.ajax({
	url: 'https://data.project.sanattaori.me/v1/query',
	method: 'POST',
	headers: tokenHeaders(),
	data: JSON.stringify({
    "type" : "select",
    "args" : {
        "table" : "chatn",
        "columns": ["id", "name", "text", "time"]
     
    }
})
}).done(function(data){
	console.log(data);


	var tr;
    for (var i = 0; i < data.length; i++) {
        tr = $('<tr/>');

        tr.append("<td>" + data[i].name + "</td>");
        tr.append("<td>" + data[i].text + "</td>");
        tr.append("<td>" + data[i].time + "</td>");

        tr.append("<td onclick = showData("+data[i].id  +"); >" + "<i class="+ "material-icons"+ ">delete</i>"+" </td> ");
        $('#tabl').append(tr);
    }
});
			//

		}).fail(function(ja){
			alert('fail'+JSON.parse(ja.responseText).message);
		});


	}
});


$.ajax({
	url: 'https://data.project.sanattaori.me/v1/query',
	method: 'POST',
	headers: tokenHeaders(),
	data: JSON.stringify({
    "type" : "select",
    "args" : {
        "table" : "chatn",
        "columns": ["id","name", "text", "time"]
     
    }
})
}).done(function(data){
	console.log(data);


	var tr;
    for (var i = 0; i < data.length; i++) {
        tr = $('<tr/>');

        tr.append("<td>" + data[i].name + "</td>");
        tr.append("<td>" + data[i].text + "</td>");
        tr.append("<td>" + data[i].time + "</td>");

        tr.append("<td onclick = showData("+data[i].id  +"); >" + "<i class="+ "material-icons"+ ">delete</i>"+" </td> ");
        $('#tabl').append(tr);
    }
});


});