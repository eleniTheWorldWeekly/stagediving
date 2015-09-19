function validateEmail($email) {
	var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
	if( !emailReg.test( $email ) ) {
		return false;
	} else {
		return true;
	}
}


function search_by_artist(){                
    suggestA= new Array();
    var i=0;
    $.getJSON("getArtists?", function(data){
        $.each(data.Allartists, function(){
            suggestA[i]=data.Allartists[i]["artist"];
            i++;
        }); 
        $("#search_by_artist_artist").autocomplete({
            source:suggestA,
            select: function(event, ui) {
                console.log(ui.item.value);
                var i=0;
            }
        });
    });
}

//sunarthsh chech_town checkarei apo to expanded menu track cities tis poleis pou epilegei o xrhsths
function check_town(element){
    if(element.next().attr("class")=="city_name checked" )
    {
        console.log("it was checked");
        element.css("background-image","url(icons/no_selected.jpg)");
        element.next().removeClass("checked");
    }
    else
    {
        console.log("it was un_checked");
        element.next().addClass("checked");
        element.css("background-image","url(icons/selected.jpg)");              
    }
}


//apothikeuei ston pinaka trackes_cities tis poleis pou exei tsekarei o xrhsths
function store_cities(){
    tracked_cities=new Array();
	$(".checked").each(function (index, domEle) 
    {
        tracked_cities[index]=$(domEle).prev().attr("id");
        console.log(index,$(domEle).prev().attr("id"));
    });
$("#display_cities").text("");

for (var i=0; i<tracked_cities.length; i++)
{
    $("#display_cities").append(tracked_cities[i]+",");
}
$("#num_cities").text(tracked_cities.length);
filter_run();
console.log(tracked_cities);
}



//diadikasia login xrhsth
//o servlet Login epistrefei 0 ean den kataferei na pistopoihsei ta stoixeia tou xrhsth
//alliws epistrefei to ID tou xrhsth apo thn bash dedemenwn
//apothikeuetai ston browser tou xrhsth h metablhth logges_in==yes pou shmainei oti o xrhsths exei kanei epituxhmenh sundesh
//epishs sto browser epistrefetai to ID tou xrhsth alla kai to username
function login(){
    var username     = $("#login_username").attr("value");
    var pass     = $("#login_password").attr("value");
    var str ="username="+username+"&password="+pass;
    console.log(str);

    $.ajax({
        type: "POST",
        //data: str,
        //async:false,
        url: "login/",
	data: {username:username, password:pass},
        success: function(data) {
            console.log(data);

		if(data.success == false)
		{
		     $(".login > .results").html("Wrong username or password</br>Please try again");

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

    return false;
}


//diadikasia create_sign_up
//dhmiourgei thn forma gia to sign up. Se periptwsh pou o xrhsths epileksei login elegxetai apo ton browser tou xrhsth mesw tou localStorage an o xrhsths exei
//syndethei sto parelthon.
//Ean den exei sundethei ksana tou emfanizetai h forma gia sign up wste o xrhsths na dhmiourghsei logariasmo
function create_sign_up()
{

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



function create_login()
{
    $(".login_register.expanded h2").html("LOGIN");
    $(".login_register.expanded .login").text("Login to Stage Diving");
    var html="<a class='fb-login' href='#' onclick='startConnect(); return false;'><button class='fb-login-button'><div class='icon'></div>Log in with Facebook</button></a><form><div class='prompt'> or using your StageDiving account </div><input type='text' id='login_username' value='Username'/>"+
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

//diadikasi sigbUp, kaleitai otan o xrhsths dhmiourgei logariasmo
//kalei ton servlet signUp, pou epistrefei 0 ean auth h epafh yparxei hdh
//diaforetika epistrefei to ID tou kainouriou xrhsth
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


//meta thn epituxhmenh sundesh tou xrhsth ta attends stis afises ginontai active wste na mporei na ta pathsei
function makeAttendActive(){
    $('body').find('.thumb .attend').removeClass("attend_active");
}

//diadikasi feelUsersConcerts
//trabaei apo thn DB tis sunaulies gia tis opoies o xrhsths exei dhlwsei oti tha paei (exei kanei attend)
//symplhrwnei to antisoixo pedio sto expanded menu
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
