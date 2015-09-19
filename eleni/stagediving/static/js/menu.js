
function get_next_week_date(){
    
    var fullDate = new Date();

    //console.log(fullDate,fullDate.getMonth().toString().length+1);
    
    if((fullDate.getMonth().toString().length+1) == 1)
    {
       var twoDigitMonth='0' + (fullDate.getMonth()+1);

    }
    else
    {
        var twoDigitMonth=(fullDate.getMonth()+1);
    }
    //convert month to 2 digits
    
    var currentDate = fullDate.getDate() + "-" + twoDigitMonth + "-" + fullDate.getFullYear() ;
    $("input.from").attr("value",currentDate);

    var date = new Date();
    date.setDate(date.getDate() + 30);
    //convert month to 2 digits
    if((date.getMonth().toString().length+1) == 1)
    {
       var twoDigitMonth='0' + (date.getMonth()+1);

    }
    else
    {
        var twoDigitMonth=(date.getMonth()+1);
    }

    var nextWeekDate = date.getDate() + "-" + twoDigitMonth + "-" + date.getFullYear() ;
    $("input.to").attr("value",nextWeekDate);
    //get_combined_events("all", currentDate , nextWeekDate, tracked_cities);
    get_combined_events("all", currentDate , nextWeekDate, tracked_cities);
}

/*
//upologizei thn hmeromhnia pou tha exoume mia bdomada meta thn hmeromhnia pou exoume shmera (pedio From) kai sumplhrvnei to pedio To
function get_next_week_date(){
    var fullDate = new Date();
    var date = new Date();
    date.setDate(date.getDate() + 30);
    console.log("next month date",date);
    console.log(fullDate);

    //convert month to 2 digits
    var twoDigitMonth = ((fullDate.getMonth().length+1) === 1)? (fullDate.getMonth()+1) : '0' + (fullDate.getMonth()+1);
    //var currentDate = fullDate.getFullYear() + "-" + twoDigitMonth + "-" + fullDate.getDate();
    var currentDate = fullDate.getDate() + "-" + twoDigitMonth + "-" + fullDate.getFullYear() ;
    $("input.from").attr("value",currentDate);
    var nextWeekDate=fullDate.getDate()+8;
    var nextWeekMonth=fullDate.getMonth()+1;
    var nextWeekYear=fullDate.getFullYear();
    if(fullDate.getDate()+8>=30){
        nextWeekDate=(fullDate.getDate()+8) % 8;
        if(nextWeekDate==0){
            nextWeekDate=1;
        }
        nextWeekMonth=nextWeekMonth+1;
        if(nextWeekMonth==13){
        nextWeekMonth=1;
        nextWeekYear=fullDate.getFullYear()+1;
	}
    nextWeekMonth=((nextWeekMonth.length+1) === 1)? (nextWeekMonth) : '0' + (nextWeekMonth);
    }




//var nextWeekDate=nextWeekYear +"-"+nextWeekMonth+"-"+nextWeekDate;

nextWeekMonth++;
var nextWeekDate=fullDate.getDate() +"-"+nextWeekMonth +"-"+nextWeekYear;

$("input.to").attr("value",nextWeekDate);
get_combined_events("all", currentDate , nextWeekDate, tracked_cities);

}
*/
//sinarthsh show_expanded
//emfanizei to analogo expanded analoga me thn epilogh tou xrhsth
function show_expanded(exp_ID){

	nav_open();
    if( ((exp_ID=='search_by_artist') && (openExpanded=="search_by-artist")) || ((exp_ID=='track_cities_button') && (openExpanded=="track_city")) || ((exp_ID=='image_login') && (openExpanded=="login_register"))  || ((exp_ID=='image_add_event') && (openExpanded=="add_event_exp")) || ((exp_ID=='my_concerts') && (openExpanded=="my_concerts_exp")) || ((exp_ID=='aboutSD') && (openExpanded=="AboutSD")))
    {
        nav_close();
        hide_expanded($("#"+openExpanded));
        return;
    }
    else if(openExpanded!="")
    {
        hide_expanded($("#"+openExpanded));
    }

   if(exp_ID=='search_by_artist')
   {

       $("#"+exp_ID).parent().css("background","#333333");
  	$("#search_by-artist").animate({"left": "240px"},"slow", "easeOutCirc");
       $("#search_by-artist span.close").css("background-image"," url(/static/icons/close.jpg)");
       openExpanded="search_by-artist";
       $("#search").click(function(){
            search_by_artist($("#artist_field").val());
       });

    /*   search_by_artist();
       $("#search_by_artist_button").click(function(){
        $.ajax({
            type: "GET",
            url: "searchByArtist?artist="+$("#search_by_artist_artist").val(),
            dataType: 'json',
            async: false,
            success:function(data){
                $("#search_by-artist .search_content").html("");
                var i=0;
                console.log(JSON.stringify(data));
                $.each(data.events, function(){
                    var html="<div class='item'><div class='poster'"+
                            "style='background-image:url(/static/posters/"+data.events[i]["Poster"]+")'></div><div class='info'>"+
                            "<span class='date'>"+data.events[i]["Date"]+"</br></span><span class='artist'>"+
                            data.events[i]["artists"][0]["artist"]+"</br></span>"+
                            "<span class='place'>"+data.events[i]["venue"]["venueCity"]+"</br>"+
                            data.events[i]["venue"]["venueName"]+" </span></div>"+
                            "<div class='attend'> </div></div>";
                    $(".search_content").append(html);
                    i++;
                 });
            }
        })
        console.log($("#search_by_artist_artist").val());
       })
*/
   }
   else if(exp_ID=='track_cities_button')
    {
        $("#track_city span.close").css("background-image"," url(/static/icons/close.jpg)");
        openExpanded="track_city";
        //$("#track_city").css("left",240);
	$("#track_city").animate({"left": "240px"},"slow", "easeOutCirc");
    }
	else if(exp_ID=='image_login')
   {
    $("#"+exp_ID).parent().css("background","#333333");
////////////////
    if($("html").hasClass("subscriber") || $("#show_login").attr("value")=="False")
    {
        $("#login_register h2").html("LOGIN");
        $("#login_register .login").html("Welcome "+localStorage.getItem("username")+
                    "</br><form><button id='log_out' > Log out </button></form>");
        $('#log_out').bind('click', function() {
            //ajax call gia logout
            logout();
            
            $('body').find('.thumb .attend').addClass("attend_active");
            $('body').find('.search_by-artist .search_content .attend').addClass("attend_active");
            $('body').find('#list_view_exp #list_view_conten .item .attend').addClass("attend_active");

            user="";
            $("#login_register .login").html("You are now logged out");
            return false;
        });
    }
    else
    {
        create_login();
    }

        openExpanded="login_register";
	   
	$("#login_register").animate({"left": "240px"},"slow", "easeOutCirc");
        $("#login_register span.close").css("background-image"," url(/static/icons/close.jpg)");
	}
    else if(exp_ID=="image_add_event")
    {    
        $("#"+exp_ID).parent().css("background","#333333");  
        /*
        window.location.replace("/event");
        */
        openExpanded="add_event_exp";
        //$("#add_event_exp").css("left",240);
    	$("#add_event_exp").animate({"left": "240px"},"slow", "easeOutCirc");
        $("#add_event_exp span.close").css("background-image"," url(/static/icons/close.jpg)"); 
        
        
        if($("html").hasClass("visitor") || $("#show_login").attr("value")=="True"){
            
            $("#add_event_exp #add_event_content #main").hide();
            $("#add_event_exp #add_event_content .you_have_to_login").show();
             $('#add_event_login').live('click', function() {
                login("add_event_exp");
                return false;
                });
            $("#add_event_exp .login .register").bind('click', function() {
                $("#add_event_exp #add_event_content .sign_up").show();
                $('#add_event_sign_up').live('click', function() {
                    signUp("add_event_exp");
                    return false;
                    });
                $("#add_event_exp #add_event_content .login").hide();
                return false;
            });

            $("#add_event_exp .sign_up .login_now").bind('click', function() {
                $("#add_event_exp #add_event_content .sign_up").hide();
                $("#add_event_exp #add_event_content .login").show();
                $('#add_event_login').live('click', function() {
                login("add_event_exp");
                return false;
                });
                return false;
            });

        }
        else
        {
            $("#add_event_exp #add_event_content #main").show();
            $("#add_event_exp #add_event_content .you_have_to_login").hide();
        }
        
        

    }
    else if(exp_ID=="my_concerts")
    {
        $("#"+exp_ID).parent().css("background","#333333");
        $("#my_concerts_exp .search_content").html("");
        openExpanded="my_concerts_exp";
        //$("#my_concerts_exp").css("left",240);
	    $("#my_concerts_exp").animate({"left": "240px"},"slow", "easeOutCirc");
        $("#my_concerts_exp span.close").css("background-image"," url(/static/icons/close.jpg)");

        if($("html").hasClass("subscriber") || $("#show_login").attr("value")=="False"){
            //console.log("user logged "+localStorage.getItem("username"));
            feelUsersConcerts(users_json);
        }
        else{
            $("#my_concerts_exp .search_content").html("You have to login first!");
            }
	

	
    }
    else if(exp_ID=="aboutSD"){
        $("#"+exp_ID).parent().css("background","#333333");
        //$("#AboutSD").css("left",240);
	$("#AboutSD").animate({"left": "240px"},"slow", "easeOutCirc");
        $("#AboutSD span.close").css("background-image"," url(/static/icons/close.jpg)");
        openExpanded="AboutSD";
    }
    //console.log(openExpanded);
}





function hide_expanded(parent){

    $(".nav_buttons").css("background","#242424");
    openExpanded="";
    if(parent.attr("id")=="track_city"){
		store_cities();
	}
   // if(parent.attr("class")=="list_view_exp expanded"){
    if(parent.attr("id")=="list_view_exp"){
		wallView=1;
        $("#wall_view").css("color","white");
        $("#imageWall").css("background-image","url(/static/icons/wall-view-over.png)");
        $("#list_view").css("color","#CCCCCC");
        $("#imageList").css("background-image","url(/static/icons/list_view_1.jpg)");
	}
	
	else if(parent.attr("id")=="add_event_exp")
	{
        num_of_artists=0;
        commit_venue = true;
        artist_ids = [];
        poster_id = -1;
        venue_id = -1;
        available_artist_ids=[];
        video_numb=0;
        $("#form_add_poster").removeClass("with_poster");
		$("#id_price").val("");
		
        $("#id_on_date").val("");
        $("#id_description").val("");
        $("#id_url").val("");
        $("#id_address").val("");
        $("#id_city").val("");
        $("#id_name").val("");
        $("#venue_form").hide();
        $(".add_event_row.venue_fields").hide();
        $( "#venue_autocomplete" ).show();
        //$("#poster").css("background-image","url(/static/icons/overlay.png)");
        $("#poster").css("background-size","initial");
		$("#artist_results").html("");
		$("#artist_autocomplete").val("");
        $("#venue_autocomplete").val("");
        $("#message").html("");

	}
    //parent.css("left",-1000);
	parent.animate({"left": "-1000px"},"slow", "easeOutCirc");
}


function filter_run(){

    localStorage.setItem('towns', JSON.stringify(tracked_cities));
    last_col=1;
    lastIdConcert=0;
   // console.log("from filter run filter:,",filter,$("#from").val(),$("#to").val(), tracked_cities);
    $('.posterWall').remove();
    $("#list_view_exp #list_view_conten .item").remove();
    get_combined_events(filter, $("#from").val(), $("#to").val(), tracked_cities);
 
}

function get_combined_events(filter, date_from, date_to, towns){


//console.log(filter,towns,date_from,date_to);
/*
if(date_from.length==0 || date_from==null)
{
    date_from='30-04-2013';
}
console.log(filter,towns,date_from,date_to);
*/
/* 
Combined event search. To pote tha tn kaleseis einai thema diko s ( px otan pataei to popular)

orismata:
  filter : pairnei times ena apo ta 3 ("all", "popular", "recommended")
  date_from : arxiki hmeromhnia , typou Date (javascript)
  date_to: teliki hmeromhnia , typou Date (javascript)


argotera tha valume kai orismata tyxon tracked cities
gia pinaka tracked cities blepe filter_run sinarthsh
*/

//var date_from = new Date(date_from); // DONT DO THIS, it causes server errors
//var date_to = new Date(date_to);
//console.log("date_from", date_from, "date_to", date_to);

        $.ajax({
            url: "/event/",
            type: "GET",
            dataType: "json",
            // dont work //
            //data:  {param:"combined", query:"query", filter:filter, date_from:"01-01-2013", date_to:"01-01-2014" },
            data:  {param:"combined", query:"query", filter:filter, date_from:date_from, date_to: date_to, towns:JSON.stringify(towns) },

                success: function( data ) {
                        //console.log("got events from get_combined_events", data);
                       // console.log("clear list_view");
                        make_wall(data);
                        make_list_view(data);
                        /*$(window).load(function () {
                             $footer = $('footer'),
                              opts = {
                                offset: '100%'
                              };
                              
                          })
*/
                }
        });

}


//fuctions to avoid background scroll when a window is open

function nav_open() {
    /*$("#background_slider").css({
        "opacity": "0.9"
    });
    $("#background_slider").fadeIn("slow");
    */
    $("html").addClass("expanded_open");
    $("#background_slider").css({
        "opacity": "1",
        "visibility": "visible",
        "z-index":"1"
    });
    document.body.style.overflow = "hidden";
}

function nav_close() {
    /*$("#background_slider").fadeOut("slow");*/
    $("html").removeClass("expanded_open");
    $("#background_slider").css({
        "opacity": "0",
        "visibility": "none",
        "z-index":"-1"
    });
    document.body.style.overflow = "auto";
}
