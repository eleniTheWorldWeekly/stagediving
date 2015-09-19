function validateEmail($email) {
	var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
	if( !emailReg.test( $email ) ) {
		return false;
	} else {
		return true;
	}
}

function check_town(element){


	if(element.next().attr("class")=="city_name checked" )
	{console.log("it was checked");
	element.css("background-image","url(icons/no_selected.jpg)");
	element.next().removeClass("checked");

	}
	else{
		console.log("it was un_checked");
		element.next().addClass("checked");
		element.css("background-image","url(icons/selected.jpg)");
               // $("#display_cities").append(element.attr("id")+",");
		}


}


function store_cities(){
      tracked_cities=new Array();
	$(".checked").each(function (index, domEle) {

        
        tracked_cities[index]=$(domEle).prev().attr("id");
        
	console.log(index,$(domEle).prev().attr("id"));
       

});
$("#display_cities").text("");
/*if(tracked_cities.length!=0){

            $("#display_cities").append(tracked_cities[0]+"...");
           // $("#display_cities").append(tracked_cities[1]+"...");
        }*/
for (var i=0; i<tracked_cities.length; i++){
    $("#display_cities").append(tracked_cities[i]+",");

}
$("#num_cities").text(tracked_cities.length);
filter_run();
console.log(tracked_cities);
	}


function login(){

var username     = $("#login_username").attr("value");
        var pass     = $("#login_password").attr("value");
       //console.log(email,pass);
       var str ="username="+username+"&password="+pass;
       console.log(str);
        $.ajax({
                    type: "POST",
                    data: str,
                     async:false,
                    url: "Login",
                    success: function(data) {
                        console.log(data);
                       
                        
                        if(data!=0){
                            userId=data;
                        user=username;
                        sessionStorage.setItem('logged_in', 'yes');
                        localStorage.setItem("userid", data);
                        localStorage.setItem("username", username);
                        $(".login > .results").html("Welcome  "+user);
                        makeAttendActive();
                        
                        }
                        else{
                            $(".login > .results").html("Wrong username or password</br>Please try again");

                        }
                    }
                });

         //console.log(localStorage.getItem("username"),localStorage.getItem("userid"));

         
         return false;
}


function create_sign_up(){


    $(".login_register.expanded h2").html("SIGN UP");
    $(".login_register.expanded .login").text("Sign up to Stage Diving");
    var html="<form ><input type='email' id='sign_up_email' value='Email'/><input type='text' id='sign_up_username' value='Username'/>"+
"<input type='password' id='sign_up_password' value='Password'/><button id='sign_up' > Sign Up </button>"+
"</form></br><div class='results'></div><div id='login_from_register'>Already have an account?</br>Login now!</div>";
    $(".login_register.expanded .login").append(html);
   $('#sign_up').bind('click', function() {
    signUp();
    return false;
    });

    $('#login_from_register').bind('click', function() {
    create_login();
    return false;
    });

    
    
}

function create_login(){
    $(".login_register.expanded h2").html("LOGIN");
    $(".login_register.expanded .login").text("Login to Stage Diving");
    var html="<form ><input type='text' id='login_username' value='Username'/>"+
"<input type='password' id='login_password' value='Password'/><button id='login'> Login </button>"+
"</form></br><div class='results'></div><div class='register'>Don't have an account yet?</br>Register now!</div>"
    $(".login_register.expanded .login").append(html);
    $('#login').bind('click', function() {
    login();
    return false;
    });

    $(".login_register.expanded .login .register").bind('click', function() {
    create_sign_up();
    return false;
    });

}


function signUp(){
 	var email = $("#sign_up_email").attr("value");
        var password  = $("#sign_up_password").attr("value");
        var username=$("#sign_up_username").attr("value");
       console.log(email,password, username);

	if (validateEmail(email) == false){
		$(".login > .results").html("Please enter a valid email address");
		return false;
	}

        $.ajax({
                    type: "POST",
                    data: {email:email, username:username, password:password},
                    //async:false,
                    url: "register/",
                    success: function(data) {
                        console.log(data);
                        if(data.success == false)
                        {
                            $(".login > .results").html("This username allready exists</br>Please try again");

                        }
                        else{
                            userId=data;
                        user=username;
                        sessionStorage.setItem('logged_in', 'yes');
                        localStorage.setItem("userid", data);
                        localStorage.setItem("username", username);
                        $(".login > .results").html("Welcome  "+user);
                        makeAttendActive();
                        

                        }
                    }
               
                });
        

        // $("#results").html(html);

        return false;
      


}

function makeAttendActive(){

$('body').find('.thumb .attend').removeClass("attend_active");


    
}
function feelUsersConcerts(){

                $.ajax({
                type: "GET",
                url: "getUsersAttends?userid="+userId,
                dataType: 'json',
                async: false,
                success:function(data){
                    var i=0;
                    
                 $.each(data.events, function(){
                     var html="<div class='item'><div class='poster'"+
                         "style='background-image:url(posters/"+data.events[i]["Poster"]+")'></div><div class='info'>"+
                    "<span class='date'>"+data.events[i]["Date"]+"</br></span><span class='artist'>"+
                    data.events[i]["artists"][0]["artist"]+"</br></span>"+
                    "<span class='place'>"+data.events[i]["venue"]["venueCity"]+"</br>"+
                    data.events[i]["venue"]["venueName"]+" </span></div>"+
                "<div class='attend'> </div></div>";
                    $(".my_concerts_exp .search_content").append(html);
                    i++;
                 });
                }
             })



}
