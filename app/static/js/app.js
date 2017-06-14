$(document).ready(function(){


  $(".button-collapse").sideNav();




//var cookie =  document.cookie;

//var length = document.cookie.length;


/*
for (var i = 0; i <= length; i++) {
	var token = cookie.split('=')[3];
	
}
*/


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




function tokenHeaders() {
    return {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    };
  }



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