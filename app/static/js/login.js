/*
      gapi.load('auth2', function() {
        auth2 = gapi.auth2.init({
          client_id: '34086388208-6ss2aot6thu6c5ephla48bj43til1pgp.apps.googleusercontent.com',
          // Scopes to request in addition to 'profile' and 'email'
          
          scope: 'email profile openid',
          response_type: 'id_token permission'
        });
      });

$('#signinButton').click(function() {
    // signInCallback defined in step 6.
   // auth2.grantOfflineAccess().then(signInCallback);
    gapi.auth2.authorize({
  client_id: '34086388208-6ss2aot6thu6c5ephla48bj43til1pgp.apps.googleusercontent.com',
  scope: 'email profile openid',
  response_type: 'id_token permission'
}, function(response) {
  if (response.error) {
    // An error happened!
    return;
  }
  // The user authorized the application for the scopes requested.
  var accessToken = response.access_token;
  var idToken = response.id_token;
  console.log(accessToken);
  // You can also now use gapi.client to perform authenticated requests.
  var url = 'https://auth.project.sanattaori.me/google/authenticate?access_token='
   +accessToken ;

   $.ajax({
   	xhrFeilds: {withCredentials: true},
   	crossDomain:true,
   	type: 'GET',
   	url: url,
   	success: function(response){
   		console.log(response);
   	}
   });

});

  });

function signInCallback(authResult) {
  if (authResult['code']) {

    // Hide the sign-in button now that the user is authorized, for example:
    $('#signinButton').attr('style', 'display: none');
console.log(authResult['code']);
    // Send the code to the server
     var accessToken = authResult['access_token'];

  // And send the token over to the server
  var url = ''
   +accessToken ;
  $.get(url, function(response) {
    // Sample response:
    // {
    //   "hasura_id": 23,
    //   "hasura_roles": ["user"],
    //   "auth_token": "aeo8u3dhauh3d39pdsiaw",
    //   "new_user": true
    // }
    console.log(response);
  });

  } else {
    // There was an error.
  }
}



*/
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