

$(document).ready(function(){
var username = null;
var token = null;
var userId;


$.ajaxSetup({
	crossDomain: true,
	headers: {
		'X-Hasura-Role' : 'user'
	}
});



$(signup).click(function(){



if ( ($('#email').val() && $('#password').val()) == ""  ) {$("#signup").text("Enter Email Password");

  if ($('#email').val().indexOf("@")<1 || $('#email').val().lastIndexOf(".")<$('#email').val().indexOf("@")+2 || $('#email').val().lastIndexOf(".")+2 >= $('#email').val().length) {$("#signup").text("Enter Valid Email");}

  else{$("#signup").text("Submitting...");}
}//if ka bracket

else{

	$.ajax({
		url: "https://auth.project.sanattaori.me/signup",
		method: 'post',
		headers: { 'Content-Type' : 'application/json' },
		data: JSON.stringify({
			"username": $('#email').val(),
			"password": $('#password').val()
		})
	}).done(function(data){
		token = data.auth_token;
		userId = data.hasura_id;
		$('#one').text('Redirecting...');
		//send token to server.js
		window.location = '/app';
var d = new Date();
    d.setTime(d.getTime() + (1*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = 'name' + "=" + token + ";" + expires + ";path=/";
		$.ajax({
			url: "/test-page",
			method: 'post',
			dataType: 'json',
			 contentType: 'application/json',
			data: JSON.stringify({
				"token": token,
				"userId": userId
			})
		
		}).done(function(){
			$('#signup').text('Redirecting...');
			window.location = '/app';
		}).fail(function(){
			$('#one').val('Failed. Try again?');
		});


		
	}).fail(function(j){
		console.error(j);
		alert("FAILED: " + JSON.parse(j.responseText).message);
		$('#signup').val('Failed. Try again?');
	});
}//else ka bracket


});
//click signup finish
$(one).click(function(){


if ( ($('#email').val() && $('#password').val()) == ""  ) {$("#signup").text("Enter Email Password");

  if ($('#email').val().indexOf("@")<1 || $('#email').val().lastIndexOf(".")<$('#email').val().indexOf("@")+2 || $('#email').val().lastIndexOf(".")+2 >= $('#email').val().length) {$("#signup").text("Enter Valid Email");}

  else{$("#signup").text("Submitting...");}
}//if ka bracket

else{

	$.ajax({
		url: "https://auth.project.sanattaori.me/login",
		method: 'post',
		headers: { 'Content-Type' : 'application/json' },
		data: JSON.stringify({
			"username": $('#email').val(),
			"password": $('#password').val()
		})
	}).done(function(data){
		token = data.auth_token;
		userId = data.hasura_id;
		$('#one').text('Redirecting...');
		//send token to server.js
		window.location = '/app';
var d = new Date();
    d.setTime(d.getTime() + (1*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = 'name' + "=" + token + ";" + expires + ";path=/";
		$.ajax({
			url: "/test-page",
			method: 'post',
			dataType: 'json',
			 contentType: 'application/json',
			data: JSON.stringify({
				"token": token,
				"userId": userId
			})
		
		}).done(function(){
			window.location = '/app';
		}).fail(function(){
			$('#one').val('Failed. Try again?');
		});

	}).fail(function(j){
		console.error(j);
		alert("FAILED: " + JSON.parse(j.responseText).message);
		$('#one').val('Failed. Try again?');
	});
}//else ka bracket


});
//login

});