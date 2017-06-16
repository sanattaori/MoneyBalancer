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
            "table"     : "moneyb" ,
            "where"     : { "id" : { "$eq" : id } }
           
         }
      }

		)
	}).done(function(){
		 //Materialize.toast('Item Deleted', 2000, 'rounded')

		 //refresh table again
$("#tabl").load(location.href + " #tabl");
//on refresh load data
$.ajax({
	url: 'https://data.project.sanattaori.me/v1/query',
	method: 'POST',
	headers: tokenHeaders(),
	data: JSON.stringify({
    "type" : "select",
    "args" : {
        "table" : "moneyb",
        "columns": [ "id", "title", "amount", "date", "description"]
     
    }
})
}).done(function(data){
	//console.log(data);
	
	var tr;
    for (var i = 0; i < data.length; i++) {
        tr = $('<tr/>');
        tr.append("<td>" + data[i].title + "</td>");
        tr.append("<td>" + data[i].description + "</td>");
        tr.append("<td>" + data[i].date + "</td>");
        tr.append("<td>" + data[i].amount + "</td>");
        tr.append("<td onclick = showData("+data[i].id  +"); >" + "<i class="+ "material-icons"+ ">delete</i>"+" </td> ");
        $('#tabl').append(tr);
    }
});
//done 

		 //


	}).fail(function(){
		Materialize.toast('Fail to delete', 2000, 'rounded')
	});
    
}

$(document).ready(function(){
$("#newa").hide()


  $(".button-collapse").sideNav();




//var cookie =  document.cookie;

//var length = document.cookie.length;


/*
for (var i = 0; i <= length; i++) {
	var token = cookie.split('=')[3];
	
}
*/

var user_ids;
var user_id;



user_ids = readCookie('id')
 user_id = parseInt(user_ids);
//console.log(user_id);
var username = null;

var setUsername = function (u) {
    username = u;
    //$('#userinfo').text(username);
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
	setUsername(data.username);


}).fail(function(){
	//alert('fail to fetch user info refresh page or login again');
	Materialize.toast('refresh', 2000, 'rounded')
	location.reload();
});

//insert 

$(insert).click(function(){

//console.log("insert");

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
             user_id ,
              "title"   : $('#title').val(),
              "description" : $("#description").val() ,
              "date" : $("#date").val(),
              "amount" : $("#amount").val()

              }
           ]
			}
			
		})
		
	}).done(function(data){
		Materialize.toast('Item insert', 2000, 'rounded')
		console.log(data);
		console.log("updated");
		$("#insert").hide()
		$("#newa").show()
$("#tabl").load(location.href + " #tabl");
//on refresh load data
$.ajax({
	url: 'https://data.project.sanattaori.me/v1/query',
	method: 'POST',
	headers: tokenHeaders(),
	data: JSON.stringify({
    "type" : "select",
    "args" : {
        "table" : "moneyb",
        "columns": [ "id", "title", "amount", "date", "description"]
     
    }
})
}).done(function(data){
	//console.log(data);
	
	var tr;
    for (var i = 0; i < data.length; i++) {
        tr = $('<tr/>');
        tr.append("<td>" + data[i].title + "</td>");
        tr.append("<td>" + data[i].description + "</td>");
        tr.append("<td>" + data[i].date + "</td>");
        tr.append("<td>" + data[i].amount + "</td>");
        tr.append("<td onclick = showData("+data[i].id  +"); >" + "<i class="+ "material-icons"+ ">delete</i>"+" </td> ");
        $('#tabl').append(tr);
    }
});
//done 


	}).fail(function(ja){
		location.reload();
		//console.log(ja);
		//console.log(user_id);
		alert('Fail Try again'+JSON.parse(ja.responseText).message);
	});
}

});

$(newa).click(function(){
$("#newa").hide()
$("#insert").show()
$('#title').val('')
$('#amount').val('')
$('#description').val('')
$('#date').val('')
//location.reload();

});

//fetch

$.ajax({
	url: 'https://data.project.sanattaori.me/v1/query',
	method: 'POST',
	headers: tokenHeaders(),
	data: JSON.stringify({
    "type" : "select",
    "args" : {
        "table" : "moneyb",
        "columns": ["id", "title", "amount", "date", "description"]
     
    }
})
}).done(function(data){
	console.log(data);


	var tr;
    for (var i = 0; i < data.length; i++) {
        tr = $('<tr/>');

        tr.append("<td>" + data[i].title + "</td>");
        tr.append("<td>" + data[i].description + "</td>");
        tr.append("<td>" + data[i].date + "</td>");
        tr.append("<td>" + data[i].amount + "</td>");
        tr.append("<td onclick = showData("+data[i].id  +"); >" + "<i class="+ "material-icons"+ ">delete</i>"+" </td> ");
        $('#tabl').append(tr);
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
			document.cookie = "id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
			document.cookie = "dinoisses=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
		}).fail(function(j){
			console.error(j);
			location.reload();
			Materialize.toast('Re', 2000, 'rounded')
			alert('Logout Failed! Try Refreshing?');
		});
	});

});