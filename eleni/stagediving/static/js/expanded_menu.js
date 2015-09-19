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
        //console.log(index,$(domEle).prev().attr("id"));
    });
    $("#display_cities").text("");

    for (var i=0; i<tracked_cities.length; i++)
    {
        $("#display_cities").append(tracked_cities[i]+",");
    }
    $("#num_cities").text(tracked_cities.length);
    filter_run();
    //console.log(tracked_cities);
}



//diadikasia login xrhsth
//o servlet Login epistrefei 0 ean den kataferei na pistopoihsei ta stoixeia tou xrhsth
//alliws epistrefei to ID tou xrhsth apo thn bash dedemenwn
//apothikeuetai ston browser tou xrhsth h metablhth logges_in==yes pou shmainei oti o xrhsths exei kanei epituxhmenh sundesh
//epishs sto browser epistrefetai to ID tou xrhsth alla kai to username
function login(expanded){
   // console.log("#"+expanded+" .login_username");
    var username     = $("#"+expanded+" .login_username").attr("value");
    var pass     = $("#"+expanded+" .login_password").attr("value");
    var keep = $("#"+expanded+" .login_keep").is(':checked');


    $.ajax({
        type: "POST",
        url: "/login/",
	   data: {username:username, password:pass, keep:keep},
        success: function(data) {
           // console.log(data);

		if(data.success == false)
		{
		     $("#"+expanded+" .login > .results").html("Wrong username or password</br>Please try again");
         $("html").addClass("visitor");
         $("html").removeClass("subscriber");
         $("#show_login").val("True");

		}
		else{
		     $("html").removeClass("visitor")
         $("html").addClass("subscriber")
         $("#show_login").val("False");
		
		user=username;
		
		localStorage.setItem("username", username);
		$(".expanded .login").html("Welcome  "+user);
		get_user_events();	
        location.reload();	
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
/*$("#login_register .login").text("Sign up to Stage Diving");*/
$("#login_register .login").text("");
/*var html="<div id='reasons'>Three reasons to signup to StageDiving<ol><li> Find the concerts you dont wanna miss</li><li> Get in touch with your audience</li><li> Promote your venue</li></ol></div>"+*/
var html="<span>Signup to be able to add your own event.</span></br><a class='fb-login' href='#' onclick='startConnect(); return false;'><button class='fb-login-button'><div class='icon'></div>Sign up with Facebook</button></a>"+
"<form ><div class='prompt'> or create new account </div><input type='email' class='sign_up_email'  placeholder='Email'  /><input type='text' class='sign_up_username' placeholder='Username' />"+
"<input type='password' class='sign_up_password' placeholder='Password' />"+
"<div id='agree'><p>StageDiving will NEVER share your info with anybody for any reason.</p><p>By signing up, you agree to our <a href='http://www.stagediving.gr/terms/' target='_blank'>terms of service </a>.</div>"+
" </div><button id='sign_up' > Sign Up </button>"+
"</form></br><div class='results'></div><div id='login_from_register'><span class='already_have'>Already have an account?</span></br><span class='login_now'>Login now!</span></div>";
$("#login_register .login").append(html);

 $(".sign_up_email",".sign_up_username",".sign_up_password").live('keydown', function(event){ 
    if (event.which == '13') {
        event.preventDefault();
       // console.log("'heyyy");
       // console.log($(this).parent().parent().parent().parent().parent().attr("id"));
        if($(this).parent().parent().parent().attr("id")=="login_register")
        {
            $('#sign_up').trigger('click');
        }
        else if ($(this).parent().parent().parent().parent().parent().attr("id")=="add_event_exp")
        {
            $('#add_event_sign_up').trigger('click');
        }
    }
    });



$('#sign_up').bind('click', function() {

    signUp("login_register");
    return false;
    });

    $('#add_event_sign_up').live('click', function() {
    signUp("add_event_exp");
    return false;
    });


$(' #login_register .login_now').bind('click', function() {
    create_login();
    return false;
});


}



function create_login()
{
    $("#login_register h2").html("LOGIN");
    /*$("#login_register .login").text("Login to Stage Diving");*/                                                      
                                                                                                                                                                                                                                                
    $("#login_register .login").text("");
    var html="<a class='fb-login' href='#' onclick='startConnect(); return false;'><button class='fb-login-button'><div class='icon'></div>Log in with Facebook</button></a><form><div class='prompt'> or using your StageDiving account </div><input type='text' class='login_username' placeholder='Username'/>"+
"<input type='password' class='login_password' placeholder='Password' /><button id='login'> Login </button><div class='keep_login'><input type='checkbox' id='checkbox79' value='None' class='login_keep css-checkbox lrg' name='login_keep' /><label for='checkbox79' name='checkbox79_lbl' class='css-label lrg klaus'>Keep me logged in</label></div>"+
"</form></br><div class='results'></div><div class='register'><span class='dont_have'>Don't have an account yet?</span></br><span class='register_now'>Register now!</span></div>"
    $("#login_register .login").append(html);

  

    $(".login_username",".login_password").live('keydown', function(event){ 
    if (event.which == '13') {
        event.preventDefault();
      //  console.log("'heyyy");
       // console.log($(this).parent().parent().parent().parent().parent().attr("id"));
        if($(this).parent().parent().parent().attr("id")=="login_register")
        {
            $('#login').trigger('click');
        }
        else if ($(this).parent().parent().parent().parent().parent().attr("id")=="add_event_exp")
        {
            $('#add_event_login').trigger('click');
        }
        
    }
    });



    

    $('#login').bind('click', function() {

    login("login_register");
    return false;
    });

    $('#add_event_login').live('click', function() {
    login("add_event_exp");
    return false;
    });

    $("#login_register .login .register").bind('click', function() {
    create_sign_up();
    return false;
    });

   
}

//diadikasi sigbUp, kaleitai otan o xrhsths dhmiourgei logariasmo
//kalei ton servlet signUp, pou epistrefei 0 ean auth h epafh yparxei hdh
//diaforetika epistrefei to ID tou kainouriou xrhsth
function signUp(expanded){
    // console.log("#"+expanded+" .sign_up_email");
	var email = $("#"+expanded+" .sign_up_email").attr("value");
	var password  = $("#"+expanded+" .sign_up_password").attr("value");
	var username=$("#"+expanded+" .sign_up_username").attr("value");
	//console.log(email,password, username);

	if (validateEmail(email) == false){

		$("#"+expanded+" .sign_up > .results").html("Please enter a valid email address");
        $("#"+expanded+" .login > .results").html("Please enter a valid email address");
		return false;
	}

        $.ajax({
                    type: "POST",
					url: "/register/",
                    data: {email:email, username:username, password:password},
                    async:false,
                    success: function(data) {
                       // console.log(data);

                        if(data.success == false)
                        {
                            $("#"+expanded+" .sign_up > .results").html("This username allready exists</br>Please try again");
                            $("#"+expanded+" .login > .results").html("This username allready exists</br>Please try again");
                            $("html").addClass("visitor");
                            $("html").removeClass("subscriber");
                            $("#show_login").val("True");

                        }
                        else{
                             $("html").removeClass("visitor")
                         $("html").addClass("subscriber")
                         $("#show_login").val("False");
                        
                        user=username;
                        
                        localStorage.setItem("username", username);
                        $("#"+expanded+" .login").html("Welcome  "+user);
                        $("#"+expanded+" .sign_up").html("Welcome  "+user);
                        makeAllAttendActive();     
                        location.reload();
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


	var date="";
        date=parseDate(data[i]["fields"]["on_date"]).toString();
        var tmp = date.split(" ");
        var date=tmp[0];
        var month=convertToIntMonth(tmp[1]);
        var number=tmp[2];
        var year= tmp[3];
	
        var html="<div class='item'><div class='poster'"+
        "style='background-image:url(/static/"+data[i]["fields"]["poster"]["fields"]["file"]+")'></div>"+
        "<input type='hidden' value='"+data[i]["fields"]["attends"]+"'/>"+
        "<input type='hidden' value='"+data[i]["pk"]+"'/><div class='info'>"+
        "<span class='date'>"+ number+"/"+month+"/"+year+"</br></span><span class='artist'>"+
        //"<span class='date'>"+date+" "+number+" "+month+" "+year+"</br></span><span class='artist'>"+
        data[i]["fields"]["artists"][0]["fields"]["name"]+"</br></span>"+
        "<span class='city'>"+data[i]["fields"]["venue"]["fields"]["city"]+"</span><span class='venue'></br>"+
        data[i]["fields"]["venue"]["fields"]["name"]+" </span></div>"+
        "<div class='attend'> </div></div>";
		//console.log(html);
		//users_attends[i]=data[i]["pk"];
        $("#my_concerts_exp .search_content").append(html);
		i++;
        });
   //console.log(users_attends);

    //on poster click show event
    $("#my_concerts_exp .search_content .item ").live("click", function() {

        var my_concerts_event_id=parseInt($(this).children().next().next().val());
        //console.log("event id",my_concerts_event_id);
        show_poster_view();
        $("#poster_view_body").addClass("by_my_concerts");

        $.ajax({
          type: "GET",
          url: "/event/?event_id="+my_concerts_event_id,
          success:function(data){
            //console.log(data.events[0]);    
            populate_poster_view_via_search(data.events[0]);  

          }
        })
        /*
                var i=0;
    //window.location.href = "/event?event_id="+$(this).next().val();
        var search_event_id=parseInt($(this).children().next().val());
        console.log("event id",search_event_id);

        $.each(JSONsearch_results.events, function(){
            if(search_event_id==JSONsearch_results.events[i]["Id"])
            {
                
                $("#poster_view_body").addClass("by_search");
                populate_poster_view_via_search(JSONsearch_results.events[i]);
                show_poster_view();
                
            }
            i++;
        });

*/
    
    });

}


var JSONsearch_results;
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
                    JSONsearch_results=data;
                    //console.log("events from artist", data);
                    $("#search_by-artist .search_content").html("");
                    var i=0;
		            if(data.events.length==0)
			        {
			        // console.log("no concerts");
			         $(".search_content").append("No cocerts found!");
			        }
                    $.each(data.events, function(){
                        var date="";
                        date=parseDate(data.events[i]["Date"]).toString();
                        var tmp = date.split(" ");
                        var date=tmp[0];
                        var month=convertToIntMonth(tmp[1]);
                        var number=tmp[2];
                        var year= tmp[3];

                        //if the user is already logged in make attend active
                        if($("html").hasClass("subscriber") || $("#show_login").attr("value")=="False"){
                        //console.log("search by artist if the user is already logged in make attend active");
                        for(j=0; j<users_attends.length; j++)
                        {
                            if(data.events[i]["Id"]==users_attends[j])
                            {
                                var html="<div class='item'><div class='poster'"+
                                "style='background-image:url(/static/"+data.events[i]["Poster"]+")'></div><input class='search_event_id' type='hidden' value='"+data.events[i]["Id"]+"'/><div class='info'>"+
                                //"<span class='date'>"+date+" "+ number+" / "+month+" / "+year+"</br></span><span class='artist'>"+
                                "<span class='date'>"+ number+"/"+month+"/"+year+"</br></span><span class='artist'>"+
                                data.events[i]["artists"][0]["artist"]+"</br></span>"+
                                "<span class='place'>"+data.events[i]["venue"]["venueCity"]+"</br>"+
                                data.events[i]["venue"]["venueName"]+" </span></div><div class='alert'><div class='alert_text'>Please login</div></div>"+
                                "<div class='attend attend_active'> <div class='attend_number' >"+data.events[i]["Attends"]+"</div></div></div>";
                                break;
                            }
                            else
                            {
                                var html="<div class='item'><div class='poster'"+
                                "style='background-image:url(/static/"+data.events[i]["Poster"]+")'></div><input class='search_event_id' type='hidden' value='"+data.events[i]["Id"]+"'/><div class='info'>"+
                                //"<span class='date'>"+date+" "+ number+" / "+month+" / "+year+"</br></span><span class='artist'>"+
                                "<span class='date'>"+ number+"/"+month+"/"+year+"</br></span><span class='artist'>"+
                                data.events[i]["artists"][0]["artist"]+"</br></span>"+
                                "<span class='city'>"+data.events[i]["venue"]["venueCity"]+"</span></br><span class='venue'>"+
                                data.events[i]["venue"]["venueName"]+" </span></div><div class='alert'><div class='alert_text'>Please login</div></div>"+
                                "<div class='attend'> <div class='attend_number' >"+data.events[i]["Attends"]+"</div></div></div>";
                            }
                        }
                        //$('body').find('.search_by-artist .search_content .attend').removeClass("attend_active");
                        //makeAttendActive();
                        }
                        else
                        {
                            var html="<div class='item'><div class='poster'"+
                                "style='background-image:url(/static/"+data.events[i]["Poster"]+")'></div><input class='search_event_id' type='hidden' value='"+data.events[i]["Id"]+"'/><div class='info'>"+
                                //"<span class='date'>"+date+" "+ number+" / "+month+" / "+year+"</br></span><span class='artist'>"+
                                "<span class='date'>"+ number+"/"+month+"/"+year+"</br></span><span class='artist'>"+
                                data.events[i]["artists"][0]["artist"]+"</br></span>"+
                                "<span class='city'>"+data.events[i]["venue"]["venueCity"]+"</span></br><span class='venue'>"+
                                data.events[i]["venue"]["venueName"]+" </span></div><div class='alert'><div class='alert_text'>Please login</div></div>"+
                                "<div class='attend attend_active'> <div class='attend_number' >"+data.events[i]["Attends"]+"</div></div></div>";
                        }
                        
                        
                        $(".search_content").append(html);
                        i++;
                     });

                    
                   

                    $(".search_by-artist .search_content .attend").click(function(e){

                        e.stopPropagation();
                        if($(this).hasClass("attend_active"))
                            {
                                if($("html").hasClass("visitor") || $("#show_login").attr("value")=="True")
                                  {
                                    $(this).prev().fadeIn();
                                    //$(this).prev().css("display","block");
                                    
                                  }
                                  $(".search_by-artist .search_content .attend").mouseleave(function(){
                                    $(this).prev().fadeOut();
                                });
                                return;

                            }

                        /*for(i=0; i<users_attends.length; i++)
                        {
                          if($(this).prev().prev().val()==users_attends[i])
                            {return;}
                        }
                        */

                        $(this).css("background-image","url(/static/icons/attend-active.png)");
                        $(this).addClass("attend_active");

                       // console.log("attend clicked",$(this).prev().prev().val());
                        var attends=parseInt($(this).find(".attend_number").text());
                        $(this).find(".attend_number").text(attends+1);
                        attend_event($(this).prev().prev().val());

                    });
                }
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
			//console.log("got user events", data);
            users_json=data;
			var i=0;
            users_attends=new Array();

            $.each(data, function(){
                users_attends[i]=data[i]["pk"];
            i++;
            });
            //console.log(users_attends,users_attends.length);

            
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
