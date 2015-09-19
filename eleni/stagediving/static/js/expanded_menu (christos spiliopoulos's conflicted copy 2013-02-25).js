var users_attends=null;
var users_json;


 function validateEmail($email) {
	var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
	if( !emailReg.test( $email ) ) {
		return false;
	} else {
		return true;
	}
}



//sunarthsh chech_town checkarei apo to expanded menu track cities tis poleis pou epilegei o xrhsths
function check_town(element){
    if(element.next().attr("class")=="city_name checked" )
    {
        console.log("it was checked");
        element.css("background-image","url(/static/icons/no_selected.jpg)");
        element.next().removeClass("checked");
    }
    else
    {
        console.log("it was un_checked");
        element.next().addClass("checked");
        element.css("background-image","url(/static/icons/selected.jpg)");
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

    $.ajax({
        type: "POST",
        url: "/login/",
	   data: {username:username, password:pass},
        success: function(data) {
            console.log(data);

		if(data.success == false)
		{
		     $(".login > .results").html("Wrong username or password</br>Please try again");

		}
		else{
		
		//userId=data;
		user=username;
		sessionStorage.setItem('logged_in', 'yes');
		//localStorage.setItem("userid", data);
		localStorage.setItem("username", username);
		$(".expanded .login").html("Welcome  "+user);
		get_user_events();		
		}
        }
    });

    return false;
}



function logout(){

window.location.href = "/logout";
    /*$.ajax({
        type: "POST",
        url: "/logout/",
        success: function(data) {
            console.log(data);

		if(data.success == false)
		{
		     console.log("logout false");

		}
		else{
			console.log("logout true");
		}
        }
    });

    return false;*/
}


//diadikasia create_sign_up
//dhmiourgei thn forma gia to sign up. Se periptwsh pou o xrhsths epileksei login elegxetai apo ton browser tou xrhsth mesw tou localStorage an o xrhsths exei
//syndethei sto parelthon.
//Ean den exei sundethei ksana tou emfanizetai h forma gia sign up wste o xrhsths na dhmiourghsei logariasmo
function create_sign_up()
{

$("#login_register h2").html("SIGN UP");
$("#login_register .login").text("Sign up to Stage Diving");
var html="<form ><input type='email' id='sign_up_email'  value='Email' onclick='this.value='';' /><input type='text' id='sign_up_username' value='Username' onclick='this.value='';'/>"+
"<input type='password' id='sign_up_password' value='Password' onclick='this.value='';'/><button id='sign_up' > Sign Up </button>"+
"</form></br><div class='results'></div><div id='login_from_register'><span>Already have an account?</span></br>Login now!</div><hr>3 reasons to signup to StageDiving<div id='reasons'>1.</br>2.</br>3.</br></div>";
$("#login_register .login").append(html);
$('#sign_up').bind('click', function() {
    signUp();

    return false;
});
$('#login_from_register').bind('click', function() {
    create_login();
    return false;
});

$("#sign_up_email").click(function(){
	this.value='';
});

$("#sign_up_username").click(function(){
	this.value='';
});
}



function create_login()
{
    $("#login_register h2").html("LOGIN");
    $("#login_register .login").text("Login to Stage Diving");
    var html="<form ><input type='text' id='login_username' value='Username' onclick='this.value='';'/>"+
"<input type='password' id='login_password' value='Password' onclick='this.value='';'/><button id='login'> Login </button><div class='squaredThree'><input type='checkbox' value='None' id='squaredThree' name='check' /><label for='squaredThree'></label><span>Keep me login</span></div>"+
"</form></br><div class='results'></div><div class='register'><span>Don't have an account yet?</span></br>Register now!</div>"
    $("#login_register .login").append(html);
    $('#login').bind('click', function() {
    login();
    return false;
    });

    $("#login_register .login .register").bind('click', function() {
    create_sign_up();
    return false;
    });

    
    $("#login_username").click(function(){
	this.value='';
    });

    $("#login_password").click(function(){
	this.value='';
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
					url: "/register/",
                    data: {email:email, username:username, password:password},
                    async:false,
                    success: function(data) {
                        console.log(data);
                        if(data.success == false)
                        {
                            $(".login > .results").html("This username allready exists</br>Please try again");

                        }
                        else{
                        //userId=data;
                        user=username;
                        sessionStorage.setItem('logged_in', 'yes');
                        //localStorage.setItem("userid", data);
                        localStorage.setItem("username", username);
                        $(".expanded .login").html("Welcome  "+user);
                        makeAllAttendActive();
                        

                        }
                    }
               
                });
        

        // $("#results").html(html);

        return false;
      


}





//diadikasi feelUsersConcerts
//symplhrwnei to antisoixo pedio sto expanded menu me tis sunaulies tou xrhsth

function feelUsersConcerts(data){

	//console.log("from feel users concerts", JSON.stringify(data));
    var i=0;
	//users_attends=new Array();

	$.each(data, function(){
        var html="<div class='item'><div class='poster'"+
        "style='background-image:url(/static/"+data[i]["fields"]["poster"]["fields"]["file"]+")'></div>"+
        "<input type='hidden' value='"+data[i]["fields"]["attends"]+"'/><div class='info'>"+
        "<span class='date'>"+data[i]["fields"]["on_date"]+"</br></span><span class='artist'>"+
        data[i]["fields"]["artists"][0]["fields"]["name"]+"</br></span>"+
        "<span class='place'>"+data[i]["fields"]["venue"]["fields"]["city"]+"</br>"+
        data[i]["fields"]["venue"]["fields"]["name"]+" </span></div>"+
        "<div class='attend'> </div></div>";
		//console.log(html);
		//users_attends[i]=data[i]["pk"];
        $("#my_concerts_exp .search_content").append(html);
		i++;
        });
   //console.log(users_attends);

    //on poster click show event
    $("#my_concerts_exp .search_content .item .poster").live("click", function() {
    window.location.href = "/event?event_id="+$(this).next().val();
    });

}



//shnarthsh search_by_artist
//pragmatopoiei anazhthsh bash onoma kallitexnh
//sto pedio tou onomatos pou sumplhrwnei o xrhsths xrhsimopoieitai auto completion
function search_by_artist(artist){
            $.ajax({
                url: "/event/",
        	type: "GET",
                dataType: "json",
                data: {param:"artist", query:artist},
                success: function( data ) {
                    console.log("events from artist", data);
                    $("#search_by-artist .search_content").html("");
                    var i=0;
		            if(data.events.length==0)
			        {
			         console.log("no concerts");
			         $(".search_content").append("No cocerts found!");
			        }
                    $.each(data.events, function(){
                        var date="";
                        date=parseDate(data.events[i]["Date"]).toString();
                        var tmp = date.split(" ");
                        var date=tmp[0];
                        var month=tmp[1];
                        var number=tmp[2];
                        var year= tmp[3];

                        //if the user is already logged in make attend active
                        if(sessionStorage.getItem('logged_in')=="yes"){
                        console.log("search by artist if the user is already logged in make attend active");
                        for(j=0; j<users_attends.length; j++)
                        {
                            if(data.events[i]["Id"]==users_attends[j])
                            {
                                var html="<div class='item'><div class='poster'"+
                                "style='background-image:url(/static/"+data.events[i]["Poster"]+")'></div><input type='hidden' value='"+data.events[i]["Id"]+"'/><div class='info'>"+
                                "<span class='date'>"+date+" "+ month+" "+number+" "+year+"</br></span><span class='artist'>"+
                                data.events[i]["artists"][0]["artist"]+"</br></span>"+
                                "<span class='place'>"+data.events[i]["venue"]["venueCity"]+"</br>"+
                                data.events[i]["venue"]["venueName"]+" </span></div>"+
                                "<div class='attend attend_active'> <div class='attend_number' >"+data.events[i]["Attends"]+"</div></div></div>";
                                break;
                            }
                            else
                            {
                                var html="<div class='item'><div class='poster'"+
                                "style='background-image:url(/static/"+data.events[i]["Poster"]+")'></div><input type='hidden' value='"+data.events[i]["Id"]+"'/><div class='info'>"+
                                "<span class='date'>"+date+" "+ month+" "+number+" "+year+"</br></span><span class='artist'>"+
                                data.events[i]["artists"][0]["artist"]+"</br></span>"+
                                "<span class='place'>"+data.events[i]["venue"]["venueCity"]+"</br>"+
                                data.events[i]["venue"]["venueName"]+" </span></div>"+
                                "<div class='attend'> <div class='attend_number' >"+data.events[i]["Attends"]+"</div></div></div>";
                            }
                        }
                        //$('body').find('.search_by-artist .search_content .attend').removeClass("attend_active");
                        //makeAttendActive();
                        }
                        else
                        {
                            var html="<div class='item'><div class='poster'"+
                                "style='background-image:url(/static/"+data.events[i]["Poster"]+")'></div><input type='hidden' value='"+data.events[i]["Id"]+"'/><div class='info'>"+
                                "<span class='date'>"+date+" "+ month+" "+number+" "+year+"</br></span><span class='artist'>"+
                                data.events[i]["artists"][0]["artist"]+"</br></span>"+
                                "<span class='place'>"+data.events[i]["venue"]["venueCity"]+"</br>"+
                                data.events[i]["venue"]["venueName"]+" </span></div>"+
                                "<div class='attend attend_active'> <div class='attend_number' >"+data.events[i]["Attends"]+"</div></div></div>";
                        }
                        
                        
                        $(".search_content").append(html);
                        i++;
                     });

                    
                    // notification to the user that can not attend a concert if he is not logged in
                    if(sessionStorage.getItem('logged_in')!="yes"){
                      $('.search_by-artist .search_content .attend.attend_active').balloon({
                        contents: 'you have to login',
                        position: "top"
                      });
                    }

                    $(".search_by-artist .search_content .attend").click(function(e){

                        e.stopPropagation();
                        if($(this).hasClass("attend_active"))
                            {return;}

                        /*for(i=0; i<users_attends.length; i++)
                        {
                          if($(this).prev().prev().val()==users_attends[i])
                            {return;}
                        }
                        */

                        $(this).css("background-image","url(/static/icons/attend-active.png)");
                        $(this).addClass("attend_active");

                        console.log("attend clicked",$(this).prev().prev().val());
                        var attends=parseInt($(this).find(".attend_number").text());
                        $(this).find(".attend_number").text(attends+1);
                        attend_event($(this).prev().prev().val());

                    });
                }
        });



    //on poster click show event
    //window.location.href = "/event?event_id="+$(this).children().attr("alt");
	$("#search_by-artist .search_content .item .poster").live("click", function() {
  	window.location.href = "/event?event_id="+$(this).next().val();
	});


    

}


//pairnei apo ton server ta attends tou xrhsth kai ta apothikeuei ston pinaka users_attends
function get_user_events(){
        //console.log("from get users events");
		$.ajax({
			url: "/user_events/",
      			type: "GET",
			dataType: "json",
			success: function( data ) {
			console.log("got user events", data);
            users_json=data;
			var i=0;
            users_attends=new Array();

            $.each(data, function(){
                users_attends[i]=data[i]["pk"];
            i++;
            });
            console.log(users_attends,users_attends.length);

            
//make attends on thumbs active according to the users_attends matrix
                $('body').find('.thumb .attend').removeClass("attend_active");
                $('.thumb .attend').each(function()
                { 
                  for(j=0; j<users_attends.length; j++)
                  {
                    if(users_attends[j]==$(this).prev().val())
                    {
                      $(this).addClass("attend_active");
                      //cosnole.log("this yes",$(this).prev().val());
                    }
                  }
                })
                
//make attends on list_view active according to the users_attends matrix
                $('body').find('#list_view_exp #list_view_conten .item .attend').removeClass("attend_active");
                $('#list_view_exp #list_view_conten .item .attend').each(function()
                { 
                  for(j=0; j<users_attends.length; j++)
                  {
                    if(users_attends[j]==$(this).prev().prev().prev().prev().prev().val())
                    {
                      $(this).addClass("attend_active");
                    }
                  }
                })

			}
		});


    

}
