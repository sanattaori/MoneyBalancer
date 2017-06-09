var username = null;
var token = null;
var userId;

$(document).ready(function(){

function tokenHeaders() {
    return {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    };
  }

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


		$('#signup').text('Redirecting...');
	}).fail(function(){
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
		$('#signup').text('Redirecting...');
		//send token to server.js
		window.location = '/app';

		$.ajax({
			url: "/test-page",
			method: 'post',
			dataType: 'json',
			 contentType: 'application/json',
			data: JSON.stringify({
				"token": token
			})
		
		}).done(function(){
			window.location = '/app';
		}).fail(function(){
			$('#signup').val('Failed. Try again?');
		});

	}).fail(function(){
		console.error(j);
		alert("FAILED: " + JSON.parse(j.responseText).message);
		$('#signup').val('Failed. Try again?');
	});
}//else ka bracket


});
//login

});