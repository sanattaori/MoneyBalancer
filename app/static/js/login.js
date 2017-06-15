

$(document).ready(function(){
	 $("#showf").hide();

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

var response = grecaptcha.getResponse();


if ( ($('#email').val()=="") || ($('#password').val()=="") ||($('#uname').val()=="")  ) {
console.log('sorry');
if ($('#email').val()=="") {$("#signup").text("Enter Email");}

 else if ($('#password').val()=="") {$("#signup").text("Enter Password");}
 else if ($('#uname').val()=="") {$("#signup").text("Enter username");}



  else{$("#signup").text("Submitting...");}
}//if ka bracket
else if ($('#email').val().indexOf("@")<1 || $('#email').val().lastIndexOf(".")<$('#email').val().indexOf("@")+2 || $('#email').val().lastIndexOf(".")+2 >= $('#email').val().length) {$("#signup").text("Enter Valid Email");}

else if (response.length == 0) {
	$("#signup").text("Click Recapcha above");
}

else{
$("#one").hide();
$("#signup").hide();

	$.ajax({
		url: "https://auth.project.sanattaori.me/signup",
		method: 'post',
		headers: { 'Content-Type' : 'application/json' },
		data: JSON.stringify({
			"username": $('#uname').val(),
			"email": $('#email').val(),
			"password": $('#password').val(),
			"g-recaptcha-response": response
		})
	}).done(function(data){
		
		$('#signup').text('Redirecting...');
		$("#hidef").hide();
		$("#showf").show();

		

		
	}).fail(function(j){
		console.error(j);
		alert("FAILED: " + JSON.parse(j.responseText).message);
		$('#signup').val('Failed. Try again?');
		location.reload();
	});
}//else ka bracket


});
//click signup finish
$(one).click(function(){
var response = grecaptcha.getResponse();

if ( ($('#email').val()=="") || ($('#password').val()=="") || ($('#uname').val()=="")  ) {
console.log('sorry');

if ($('#email').val()=="") {$("#one").text("Enter Email");}
else if ($('#uname').val()=="") {$("#one").text("Enter username");}
 else if ($('#password').val()=="") {$("#one").text("Enter Password");}

  else{$("#one").text("Submitting...");}
}//if ka bracket
 else if ($('#email').val().indexOf("@")<1 || $('#email').val().lastIndexOf(".")<$('#email').val().indexOf("@")+2 || $('#email').val().lastIndexOf(".")+2 >= $('#email').val().length) {$("#one").text("Enter Valid Email");}

 else if (response.length == 0) {
	$("#one").text("Click Recapcha above");
}
else{
$("#one").hide();
$("#signup").hide();

	$.ajax({
		url: "https://auth.project.sanattaori.me/login",
		method: 'post',
		headers: { 'Content-Type' : 'application/json' },
		data: JSON.stringify({
			"username": $('#uname').val(),
			"email": $('#email').val(),
			"password": $('#password').val(),
			"g-recaptcha-response": response
		})
	}).done(function(data){
		token = data.auth_token;
		userId = data.hasura_id;
		$('#one').text('Redirecting...');
		//send token to server.js
		window.location = '/app';
	//set cookie
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
		location.reload();
	});
}//else ka bracket


});
//login

});