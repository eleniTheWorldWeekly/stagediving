var n_cols;           //the number of the columns on the wall
var col_width;        //the width of each column
var json;             //to json poy epistrefei to retrieve concerts (synarthsh poy kalei ton servlet retrieve concerts kai epistrefei synaylies)
var filter;
// paradeigma json
//json={"events":[{"N":1,"Id":2,"Date":"2011-05-08","Price":"8","Time":"21:30:00","Score":8,"Poster":"146410.jpg","venue":{"venueName":"Warehouse","venueInfo":"apothikh /poluxvros","venueUrl":"http://www.reverbnation.com/venue/1012102","venueAddr":"Basani 7","venueCity":"Volos","venueCountry":"Greece","venueX":39,"venueY":22,"venuePhone":"6948 688706","venueCapac":200},"artists":[{"artist":"Vodka Juniors"}]},{"N":2,"Id":3,"Date":"2011-05-09","Price":"8","Time":"21:30:00","Score":2,"Poster":"146416.jpg","venue":{"venueName":"Warehouse","venueInfo":"apothikh /poluxvros","venueUrl":"http://www.reverbnation.com/venue/1012102","venueAddr":"Basani 7","venueCity":"Volos","venueCountry":"Greece","venueX":39,"venueY":22,"venuePhone":"6948 688706","venueCapac":200},"artists":[{"artist":"Vodka Juniors"}]},{"N":3,"Id":9,"Date":"2011-06-11","Price":"8","Time":"21:00:00","Score":9,"Poster":"TN_146390.JPG","venue":{"venueName":"Warehouse","venueInfo":"apothikh /poluxvros","venueUrl":"http://www.reverbnation.com/venue/1012102","venueAddr":"Basani 7","venueCity":"Volos","venueCountry":"Greece","venueX":39,"venueY":22,"venuePhone":"6948 688706","venueCapac":200},"artists":[{"artist":"Bad Movies"}]},{"N":4,"Id":6,"Date":"2011-06-15","Price":"25","Time":"19:00:00","Score":1,"Poster":"TN_146312.JPG","venue":{"venueName":"Warehouse","venueInfo":"apothikh /poluxvros","venueUrl":"http://www.reverbnation.com/venue/1012102","venueAddr":"Basani 7","venueCity":"Volos","venueCountry":"Greece","venueX":39,"venueY":22,"venuePhone":"6948 688706","venueCapac":200},"artists":[{"artist":"Prodigy"},{"artist":"Moby"},{"artist":"Sublime"}]},{"N":5,"Id":7,"Date":"2011-06-16","Price":"25","Time":"19:00:00","Score":5,"Poster":"TN_146347.JPG","venue":{"venueName":"Warehouse","venueInfo":"apothikh /poluxvros","venueUrl":"http://www.reverbnation.com/venue/1012102","venueAddr":"Basani 7","venueCity":"Volos","venueCountry":"Greece","venueX":39,"venueY":22,"venuePhone":"6948 688706","venueCapac":200},"artists":[{"artist":"Bad Movies"},{"artist":"Prodigy"}]}]}
var jsonRecommended;  //to json poy epistrefei to retrieve recommended concerts
var user="";          //metablhth pou apothikeuei to username tou xrhsth meta apo sign up h login

var tracked_cities;   //oi poleis tis opoies o xrhsths exei kanei  track (exei dhlwsei oti ton endiaferoun)





var wallView=1;       //metablhth shmaia h opoia me 1 dhlwnei oti briskomaste se wallView enw me 0 oti eimaste se list view twn afiswn
var openExpanded="";  //metablhth shmaia gia to an to expanded menu einai anoixto h oxi
var users_town="";    //apothikeush polhs sthn opoia brisketai o xrhsths
var totalNumberOfConcerts=0;    //synolikos arithmos sunauliwn pou epistrefei to servlet RetrieveConcerts
var min_thumb_height=270;

// delay function : prevent from multiple calls
var delay = (function(){
  var timer = 0;
  return function(callback, ms){
    clearTimeout (timer);
    timer = setTimeout(callback, ms);
  };
})();




$(document).ready(function()
{



//check an to url einai ths morfhs http://stagediving.gr/home/?event_id=7 gia na emfanisw to poster view kateutheian

var url=location.search;
if (url.indexOf("event_id") >= 0)
{
  var eventID=url.substring((0,10));
  $("html").addClass("poster_view_via_share");
	//console.log("poster view!!",url,eventID);
	show_poster_view();

  $.ajax({
  type: "GET",
  url: "/event/?event_id="+eventID,
  success:function(data){
    //console.log(data.events[0]);    
    populate_poster_view_via_search(data.events[0]);                 
  }
  })

}



$.ajax({
            url: "/active_cities/",
            type: "GET",
            dataType: "json",
                success: function( data ) 
                { 
                //console.log(data);
                $.each(data, function(index,elem){
                  $("div#track_city .city .cities_buttom").each(function(){
                    if( $(this).attr('id').toLowerCase()==data[index].toLowerCase() )
                    {
                      $(this).parent().addClass("available");
                     // console.log($(this).attr('id'));
                    }
          
                  })
                  
                  })
                }
        });


$("#logo").click(function(){

  window.location.href = "/";
})

$(".posterWall").live({
  mouseenter: function(event){

    thumb_show(event,$(this));
    var o1 = $(this).children("div").find(".attend").offset();
    var o2 = $(this).offset();
    var dx = o1.left - o2.left;
    var dy = o1.top - o2.top;
    //var distance = Math.sqrt(dx * dx + dy * dy);
   // console.log("posterWall distance top",o2.top,"attend distance top",o1.top);
    var distance=o1.top-o2.top;
    //console.log(distance);
   
    
  },
  mouseleave: function(event){
    thumb_hidden(event,$(this));
  }
}); 

jQuery(document).ajaxSend(function(event, xhr, settings) {
    function getCookie(name) {

        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

    function sameOrigin(url) {
        // url could be relative or scheme relative or absolute
        var host = document.location.host; // host + port
        var protocol = document.location.protocol;
        var sr_origin = '//' + host;
        var origin = protocol + sr_origin;
        // Allow absolute or scheme relative URLs to same origin
        return (url == origin || url.slice(0, origin.length + 1) == origin + '/') ||
            (url == sr_origin || url.slice(0, sr_origin.length + 1) == sr_origin + '/') ||
            // or any other URL that isn't scheme relative or absolute i.e relative.
            !(/^(\/\/|http:|https:).*/.test(url));
    }

    function safeMethod(method) {
        return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
    }

    if (!safeMethod(settings.type) && sameOrigin(settings.url)) {
        xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
    }
});

//initialize();       //mallon axrhsth
//getAddress();       //get users address


//scrollbar sta expanded menu
/*$('#my_concerts_exp').slimScroll({
    height: ''+$(window).height()+'px',
    railVisible: true,
    alwaysVisible: true,
     color: '#000'
});
*/

$(".expanded").mouseenter(function(){
      $('.expanded').removeClass('hideExpandedThumb');
    }).mouseleave(function(){
      $('.expanded').addClass('hideExpandedThumb');
    });

$("#wall").mouseenter(function(){
      $('#wall').removeClass('hideWallThumb');
    }).mouseleave(function(){
      $('#wall').addClass('hideWallThumb');
    });







//dhmioyrgia sthlvn toy grid
 make_grid();


tracked_cities=new Array();
//arxikopoihsh twn pediwn #num_cities kai #display_cities sto expanded menu
$("#num_cities").text("0");
$("#display_cities").text("");

//retrieve concerts apo browser tou xrhsth
var retrievedObject = localStorage.getItem('towns');
tracked_cities=JSON.parse(retrievedObject);     //apothikeush polewn sthn metablhth tracked_cities




//Epishs bazw tis tyxon poleis pou eixe kanei track sto pedio #display_cities kai #num_cities sto expanded menu
//an tracked_cities=0 kalw get_combined_events(filter, date_from, date_to, towns) me towns=[THessaloniki, Athens,polh toy xrhsth]
//alliws towns=tracked_cities
if (tracked_cities==null || tracked_cities.length==0){
  
  tracked_cities=["Thessaloniki"];


var default_cities='{"cities":[{"name":"Alexandroupoli"},{"name":"Agrinio"},{"name":"Athens"},{"name":"Chalcis"},{"name":"Chania"},{"name":"Heraklion"},{"name":"Ioanina"},{"name":"Kalamata"},{"name":"Katerini"},{"name":"Kavala"},{"name":"Kozani"},{"name":"Lamia"},{"name":"Larisa"},{"name":"Patras"},{"name":"Rhodes"},{"name":"Serres"},{"name":"Thessaloniki"},{"name":"Trikala"},{"name":"Veria"},{"name":"Volos"},{"name":"Xanthi"}]}';
  var cities_arr = eval("(" + default_cities + ")");
  //console.log(cities_arr,cities_arr.cities[5]);
  
  
  //console.log(geoplugin_latitude(),geoplugin_longitude(),geoplugin_region());
     $.ajax({
        url: "http://api.geonames.org/findNearbyPostalCodesJSON?lat="+geoplugin_latitude()+"&lng="+geoplugin_longitude()+"&username=eleni",
        dataType: 'json',
        async: false,
        success: function(jsongeonames){
	
	
	$.each(jsongeonames.postalCodes, function(index,elem){
		//console.log(elem.placeName);
	   for(i=0; i<cities_arr.cities.length; i++)
		
		{	
			if( (cities_arr.cities[i].name===elem.placeName)&& (i!=2) && (i!=16) )
			{
				tracked_cities.push(cities_arr.cities[i].name);
				//console.log("found!");
			}
		}
	    
         });
        }
     });
  }

  $("#num_cities").text(tracked_cities.length);
  //console.log(tracked_cities);
  for(m=0; m<tracked_cities.length; m++){
    $("#"+tracked_cities[m]).css("background-image","url(/static/icons/selected.jpg)");
    $("#"+tracked_cities[m]).next().addClass("checked");
    $("#display_cities").append(tracked_cities[m]+",");
  }
  //get_combined_events(filter, date_from, date_to, tracked_cities);



//get_combined_events("all", "31-04-2013" , "01-05-2013", tracked_cities);
//get_combined_events("all", "30-09-2012" , "01-05-2013", tracked_cities);

/*
$.ajax({
  type: "GET",
  url: "/event/events/",
  success:function(data){
    json=data;
    console.log(json.events.length);
    make_wall(json); 
    make_list_view(json);                           //ftiaxnv ton toixo
  }
})
*/




//on window resize fix the columns with 100ms delay
//sto resize me poster view open exoume problhma me to footer k krasarei
$(window).resize(function() {

  //close poster view if open
  $("#background_slider").css({
        "opacity": "0",
        "visibility": "hidden",
        "z-index":"-1"
     });
    
     $("#poster_view_body").animate({"top":$(window).height()},"slow");

     $("#poster_view_body").css("visibility","hidden");
     document.body.style.overflow = "auto";
     $("#poster_view #header").css("position","relative");
     $("#poster_view #main #left").css("position","relative");
     poster_view_resize2();
  delay(function(){
  //$footer.waypoint('remove');
  
  make_grid();
  
  lastIdConcert=0;
  last_col=1;
  totalNumberOfConcerts=0;
  get_combined_events("all", $("#from").val() , $("#to").val(), tracked_cities);

  }, 100);
});


get_next_week_date();
//funcions to call for the poster view

initialize_poster_view();
$("#poster_view_body").css("top",$(window).height()+"px");

//redirect to poster view on poster click
$(".posterWall").live("click", function(){

 
  populate_poster_view($(this));
  $("img#poster").imagesLoaded(function( $images, $proper, $broken ){

        show_poster_view();

  });
  
    
  
});



//css allagh gia wall_buttom, list_buttom
$(".wall_buttom").hover(
  function () {
    if(wallView==0){
      $("#wall_view").css("color","white");
      $("#imageWall").css("background-image","url(/static/icons/wall-view-over.png)");
    }
  },
  function () {
    if(wallView==0){
    $("#wall_view").css("color","#CCCCCC");
    $("#imageWall").css("background-image","url(/static/icons/wall-view.png)");
    }
  }
);

$("#list_buttom").click(function(){

  nav_open();
  $("#list_view_exp span.close").css("background-image"," url(/static/icons/close.jpg)");
  if(wallView==1){
    if(openExpanded!="")
      {
        hide_expanded($("#"+openExpanded));
      }
    openExpanded="list_view_exp";
    $("#list_view_exp").animate({"left": "240px"},"slow", "easeOutCirc");
    //$("#list_view_exp").css("left",240);
    $("#list_view").css("color","white");
    $("#imageList").css("background-image","url(/static/icons/list_view_white.gif)");
    $("#wall_view").css("color","#CCCCCC");
    $("#imageWall").css("background-image","url(/static/icons/wall-view.png)");
    wallView=0;
  }
});

$("#list_buttom").hover(
  function () {
    if(wallView==1){
      $("#list_view").css("color","white");
      $("#imageList").css("background-image","url(/static/icons/list_view_white.gif)");
    }
  },
  function () {
    if(wallView==1){
      $("#list_view").css("color","#CCCCCC");
      $("#imageList").css("background-image","url(/static/icons/list_view_1.jpg)");
    }
  }
);
/*
$(".nav_buttons").hover(
  function () {
    $(this).css("background"," #333");
  },
  function () {
    $(this).css("background"," #242424");
  }
);
*/
$("span.close").hover(
  function () {
    $("span.close").css("background-image"," url(/static/icons/close-over.png)");
  },
  function () {
    $("span.close").css("background-image"," url(/static/icons/close.jpg)");
  }
);


$(".wall_buttom").click(function(){
  if(wallView==0){
    nav_close();
    hide_expanded($("#"+openExpanded));
  }
  wallView=1;
});


//set default view af posters=all
filter="all";

//css allagh gia all_buttom, recomended_buttom, popular_buttom

//sthn epilogh all emfanizontai oles oi sunaulies
$("#image_all").click(function(){
  filter="all";
  $("#image_all").css("background-image","url(/static/icons/selected.jpg)");
	$("#image_popular").css("background-image","url(/static/icons/no_selected.jpg)");
	$("#image_recomended").css("background-image","url(/static/icons/no_selected.jpg)");
  $('.posterWall').remove();
  last_col=1;
  lastIdConcert=0;
  totalNumberOfConcerts=0;
  $('#list_view_conten').html("");
  //console.log("show all the concerts without filters");
  get_combined_events(filter, $("#from").val() , $("#to").val(), tracked_cities);
  
});

$("#image_popular").click(function(){
	filter="popular";
	$("#image_popular").css("background-image","url(/static/icons/selected.jpg)");
	$("#image_all").css("background-image","url(/static/icons/no_selected.jpg)");
	$("#image_recomended").css("background-image","url(/static/icons/no_selected.jpg)");
	$('.posterWall').remove();
  	last_col=1;
  	lastIdConcert=0;
    totalNumberOfConcerts=0;
  	$('#list_view_conten').html("");
	//console.log("show popular events filtered by date");
	$('.posterWall').remove();
	$("#list_view_exp #list_view_conten .item").remove();
	get_combined_events(filter, $("#from").val() , $("#to").val(), tracked_cities);
  // popular_sort();
});

$("#image_recomended").click(function(){

  filter="free";
  $("#image_popular").css("background-image","url(/static/icons/no_selected.jpg)");
  $("#image_all").css("background-image","url(/static/icons/no_selected.jpg)");
  $("#image_recomended").css("background-image","url(/static/icons/selected.jpg)");
  $('.posterWall').remove();
    last_col=1;
    lastIdConcert=0;
    totalNumberOfConcerts=0;
    $('#list_view_conten').html("");
  //console.log("show popular events filtered by date");
  $('.posterWall').remove();
  $("#list_view_exp #list_view_conten .item").remove();
  get_combined_events(filter, $("#from").val() , $("#to").val(), tracked_cities);
  // popular_sort();


});



//show menu expanded
$(".nav_buttons").click(function(){
  show_expanded($(this).children().attr("id"));
  
});


//close expanded
$("span.close").click(function(){
   nav_close();
  $(this).css("background-image","url(/static/icons/close-active.png)");
  hide_expanded($(this).parent());
  
});

$("#background_slider").click(function(){
 // console.log("close everything open");
  if($("html").hasClass("expanded_open"))
  {
    nav_close();
    hide_expanded($("#"+openExpanded));
    
  }
  else if($("html").hasClass("poster_view"))
  {
    $("html").removeClass("poster_view");
  $("html").removeClass("poster_view_via_share ");
  $("#poster_view_body").removeClass("by_search");
  $("#poster_view_body").removeClass("by_my_concerts");

  $("#poster_view #header").css("position","relative");
      $("#poster_view #main #left").css("position","relative");
      $("#poster_view_body").animate({"top":$(window).height()},"slow",function(){
    $("#poster_view_body").css("visibility","hidden");
        document.body.style.overflow = "auto";
    $("#background_slider").css({
    "opacity": "0",
    "visibility": "hidden",
    "z-index":"-1"
        });
  });

  ///adeiasma koutiwn youtube
  $("#poster_view_body .video_box").each(function(){
      var wanted_id=$(this).children().attr("id");
      var wanted_style=$(this).children().attr("style");
      $(this).html("<div id="+wanted_id+" style="+wanted_style+"></div>")


  })
  }


})

//show track cities expanded
$("#track_cities_button").click(function(){
  show_expanded($(this).attr("id"));
});


//check city
$(".cities_buttom").click(function(){
  
  console.log($(this).attr("id"));
  if($(this).parent().hasClass("available"))
  check_town($(this));
});

/*$(".city.available").click(function(){
  
  console.log($(this).children().attr("id"));
  check_town($(this).find(".cities_buttom"));
});*/
//login action
$("#login").click(login);





// search by_artist
$("#artist_field").live("keyup", function(event) {
  if (event.keyCode === 13) {
    return search_by_artist($(event.currentTarget).val());
  }
});





//on poster click show event
    //window.location.href = "/event?event_id="+$(this).children().attr("alt");
  $("#search_by-artist .search_content .item").live("click", function() {
        var i=0;
    //window.location.href = "/event?event_id="+$(this).next().val();
        var search_event_id=parseInt($(this).children().next().val());
        //console.log("event id",search_event_id);

        $.each(JSONsearch_results.events, function(){
            if(search_event_id==JSONsearch_results.events[i]["Id"])
            {
                
                $("#poster_view_body").addClass("by_search");
                populate_poster_view_via_search(JSONsearch_results.events[i]);
                show_poster_view();
                
            }
            i++;
        });



  });


$("#artist_field").keypress(function() {
  $("fieldset#artist").css("border","#F00 solid 1px")
});


//remove poster
$(".thumb > .removePoster").live("click",function(e){
  e.stopPropagation();
  //console.log("remove poster with ID",$(this).parent().find(".eventID").val() );
  delete_poster_confirmation($(this));
  
});

// concert share via facebook, twitter, googleshare
$(".thumb > .facebook_share").live("click",function(e){
  e.stopPropagation();
  var image_src=$(this).parent().parent().find("img.col").attr("src");
  fbshare($(this).parent().find(".eventID").val(),$(this).parent().find(".thumb_artist").html(),$(this).parent().find(".thumb_date").html(),$(this).parent().find(".thumb_venue").html(),$(this).parent().find(".thumb_town").html(),image_src);
});

$(".thumb > .twitter_share").live("click",function(e){
  e.stopPropagation();
  var twitter_text=""+$(this).parent().find(".thumb_artist").html()+ " "+$(this).parent().find(".thumb_date").html()+" *"+$(this).parent().find(".thumb_venue").html()+ "* "+$(this).parent().find(".thumb_town").html();
  twshare($(this).parent().find(".eventID").val(),twitter_text );
});
/*
$(".thumb > .share").live("click",function(e){
  e.stopPropagation();
  gooshare($(this).parent().find(".eventID").val(),$(this).parent().find(".thumb_artist").html()+"@"+$(this).parent().find(".thumb_venue").html());
});
*/





$(window).load(function() {

$('.no-fouc').removeClass('no-fouc');

/*
  
  //footer gia infinite scroll
  
  $footer = $('footer'),
  opts = {
    offset: '100%'
    
  };


  $footer.waypoint(function(event, direction) {
    //console.log($("#wall").height());
    event.stopPropagation();
    if (direction === 'down') {
      
      //$("footer").hide();
      $footer.waypoint('remove');
      console.log("footer");
      //get_combined_events(filter, lastdateConcert , $("#to").val(), tracked_cities);
      // if(totalNumberOfConcerts>lastIdConcert)
      // {
      //   make_wall(json);
      // }
      //delay(function(){
      //   $footer.waypoint(opts);
        
      //  console.log("footer offset",$footer.offset().top);
      
      //}, 1000);
      
      $('img').imagesLoaded(function( $images, $proper, $broken ){

        $footer.waypoint(opts);

        });
                              
    }
                                
  }, opts);
*/
});


  $("#sd_social_fb").click(function(){

    window.open('https://www.facebook.com/stage.diving.3?fref=ts');
  })

  $("#sd_social_twitter").click(function(){

     window.open('https://twitter.com/iLovStageDiving');
  })


$("#link_to_add_event").live("click",function(){
  show_expanded("image_add_event");


})


});







//Date Picker
$(function() {

  var dates = $( "#from, #to" ).datepicker({
    defaultDate: "+1w",
    changeMonth: true,
    numberOfMonths: 1,
	  //dateFormat: "yy-mm-dd",
	dateFormat: "dd-mm-yy",
	  onSelect: function( selectedDate ) {
      var option = this.id == "from" ? "minDate" : "maxDate",
	    instance = $( this ).data( "datepicker" ),
	    date = $.datepicker.parseDate(instance.settings.dateFormat || $.datepicker._defaults.dateFormat,selectedDate, instance.settings );
      //console.log("dateFormat"+instance.settings.dateFormat,"selectedDate"+selectedDate,"settings"+instance.settings);
	    dates.not( this ).datepicker( "option", option, date );
      if(this.id == "to" && $("#from").attr("value")!=""){
        //console.log("from to");
        //filter_run();
      	$('.posterWall').remove();
        	last_col=1;
        	lastIdConcert=0;
          totalNumberOfConcerts=0;
        	$('#list_view_conten').html("");
      	$('.posterWall').remove();
      
        get_combined_events(filter, $("#from").val() , $("#to").val(), tracked_cities);
        //make_infinite_scroll();

      }
      else if(this.id == "from" && $("#to").attr("value")!=""){
        //console.log("from from");
        
      	$('.posterWall').remove();
        	last_col=1;
        	lastIdConcert=0;
          totalNumberOfConcerts=0;
        	$('#list_view_conten').html("");
      	$('.posterWall').remove();
      	get_combined_events(filter, $("#from").val() , $("#to").val(),tracked_cities);

        //make_infinite_scroll();

      }
    }
  });

//kalw ton serer events
//oi parametroi starts kai ends kathorizoun to xroniko diasthma mesa sto opoio tha einai oi sunaulies oi opoies tha emfanistoun ston xrhsth
//se authn thn periptwsh einai kena efoson o xrhsths den exei kanei thn antistoixh epilogh apo to menu

//get_combined_events(filter, $("#from").val(), $("#to").val(), tracked_cities);

});


function delete_poster_confirmation(element)
{

    var windowScrollCount   = $(this).scrollTop();
    //console.log( windowScrollCount);



  $("#background_slider").css({
        "opacity": "1",
        "visibility": "visible",
        "z-index":"1"
    });

$("#delete_confirmation").css({
        "opacity": "1",
        "visibility": "visible",
        "z-index":"6",
        "top":windowScrollCount+"px"
    });

document.body.style.overflow = "hidden";
$("#confirmation_yes").live("click",function(e){
  element.parent().parent().remove();
  $.ajax({
            url: "/event/"+element.parent().find(".eventID").val(),
            type: "DELETE",
            dataType: "json",
                success: function( data ) {
                       // console.log( data);
                }
        });



  $("#background_slider").css({
        "opacity": "0",
        "visibility": "hidden",
        "z-index":"0"
    });

$("#delete_confirmation").css({
        "opacity": "0",
        "visibility": "hidden",
        "z-index":"0"
    });


  })

$("#confirmation_no").live("click",function(e){
  $("#background_slider").css({
        "opacity": "0",
        "visibility": "hidden",
        "z-index":"0"
    });

$("#delete_confirmation").css({
        "opacity": "0",
        "visibility": "hidden",
        "z-index":"0"
    });
 
  })

 document.body.style.overflow = "visible";
}




//taksinomei bash attend
function popular_sort()
{
 // console.log(concertsID_attends);
}




function make_list_view(json){
  var i=0;
  var attent;
  $.each(json.events, function(){
    /*for (var k = 0; k < concertsID_attends.length; k++) {
      if(concertsID_attends[k][0]==json.events[i]["Id"]){
        attent=concertsID_attends[k][1];
      }
    }*/

    var date="";

    date=parseDate(json.events[i]["Date"]).toString();
    var tmp = date.split(" ");
    var date=tmp[0];
    var month=convertToIntMonth(tmp[1]);
    var number=tmp[2];
    var year= tmp[3];
    var time;
    time=parseDate(json.events[i]["Date"]).toString();
    tmp = time.split(" ");
    //time=tmp[4];

    time=tmp[4].substring(0,5);
    time= (parseInt(time)+2)+ tmp[4].substring(2,5);
  
    var html="<div class='item'><div class='poster poster_col' style='background-image:url(/static/"+json.events[i]["Poster"]+")'></div><input type='hidden' value='"+json.events[i]["Id"]+"'/>"+
    "<div class='date date_col'>"+number+"/"+month+"/"+year+"</div>"+
    "<div class='artist artists_col'>"+json.events[i]["artists"][0]["artist"]+"</br>"+"</div>"+
    "<div class='city_time_venue_col'><span class='city'>"+json.events[i]["venue"]["venueCity"]+"</span><br />"+
    "<span class='time'>"+time+"</span><br /><span class='venue'>"+json.events[i]["venue"]["venueName"]+"</span></div>"+
    "<div class='entrance entrance_col'>€"+json.events[i]["Price"]+"</div><div class='alert'><div class='alert_text'>Please login</div></div><div class='attend attend_col attend_active'>"+
    "<div class='attend_number'>"+json.events[i]["Attends"]+"</div></div></div>";
    $("#list_view_conten ").append(html);
    i++;
  });
//$("#list_view_conten ").append("<div id='list_view_footer'></div>");



$("#list_view_exp #list_view_conten .item").bind('click', function() {
 // console.log($(this).children().next().val());
  //window.location.href = "/event?event_id="+$(this).children().next().val();
  var list_view_event_id=parseInt($(this).children().next().val());

  $(".posterWall").each(function(){

        
        if(parseInt($(this).find(".eventID").val()) == list_view_event_id)
        {
          
          //console.log($(this).find(".thumb_artist").html());
          populate_poster_view($(this));
          show_poster_view();
          return;
        }
      })


});




$("#list_view_exp #list_view_conten .item .attend").click(function(e){

    e.stopPropagation();
    if($(this).hasClass("attend_active"))
    {
      if($("html").hasClass("visitor") || $("#show_login").attr("value")=="True")
      {
        $(this).prev().fadeIn();
        //$(this).prev().css("display","block");
        
      }
      $("#list_view_exp #list_view_conten .item .attend").mouseleave(function(){
        $(this).prev().fadeOut();

      })
        return;

    }
    /*
    for(i=0; i<users_attends.length; i++)
    {
      if($(this).prev().prev().prev().prev().prev().val()==users_attends[i])
        {return;}
    }
    */
    
    $(this).css("background-image","url(/static/icons/attend-active.png)");
    $(this).addClass("attend_active");

    //console.log("attend clicked",$(this).prev().prev().prev().prev().prev().val());
    var attends=parseInt($(this).find(".attend_number").text());
    $(this).find(".attend_number").text(attends+1);

    attend_event($(this).prev().prev().prev().prev().prev().val());

});


//console.log("list_view_height",$("#list_view_conten").height());
/*$footer_list = $('#list_view_footer'),
  opts = {
    offset: $("#list_view_conten").height()
  };

  $footer_list.waypoint(function(event, direction) {
  
      event.stopPropagation();
      if (direction === 'down') {
        console.log("list_view_footer");
      }
     
     //$footer_list.waypoint(opts);
 
    
  }, opts);
*/


}



//dhmiourgei sthles analoga me to megethos toy parathirou
function make_grid(){

    $(".wallContainer").html("");
    // console.log($(window).height());
		//console.log($(window).width());
		var min_col=250;										       //minimum column 11px megalitero apo auto poy theloume
		var main_cont=$(window).width()-240;			 //platos parathiroy xoris to menu (220px)
		n_cols=parseInt(main_cont/min_col);		     //arithmos sthlwn
		//console.log("main content"+main_cont);
		//console.log("sthles"+main_cont/min_col ,parseInt(main_cont/min_col), "kathe mia " );

    //platos sthlhs
		//megistos arithmow sthlwn=5


    if(n_cols>=5)
    {
      n_cols=5;
      col_width=main_cont/n_cols-6;
    }
    else if(n_cols==4)
		{
			col_width=main_cont/n_cols-6;
		}
		else if(n_cols==3)
		{
		 col_width=main_cont/n_cols-8;
    }
		else if(n_cols==2)
		{
			col_width=main_cont/n_cols-11;
		}
		else
		{
			col_width=main_cont/n_cols-22;
  	}
    


		for(i=1; i<=n_cols; i++)
		{
		  var div=jQuery('<div/>', {
      
      id:'col'+i
    	}).appendTo(".wallContainer");
    }


    
    //getAttends();

    //kathorismos platous expanded menu
    if(n_cols==1){
      $(".expanded").css("width",col_width-40);
    }
    else{
      $(".expanded").css("width",2*col_width-40);
    }
    $("#login_register").css("width",col_width-20);

    //kathorismos search artist field
    $("#search_by-artist fieldset").css("width",$(".expanded").width()-49);
    //$("#search_by-artist fieldset").css("width",500);

}


var concertsID_attends= new Array();
var last_col=1;
var lastIdConcert=0; //metraei sinolika poses afises exei diksi
var lastdateConcert="";


//Sunaarthsh make_wall
//Dhmioyrgei ton toixo
//data: to json poy exei epistrepsei to retrieveConcerts
function make_wall(data)
{
var userId=-1;
if($("#user").attr("value")=="AnonymousUser" )
{ 
  $("html").addClass("visitor");
  $("html").removeClass("subscriber");
  
}
else
{

  username=$("#user").attr("value");
  user=username;
  localStorage.setItem("username", username);
  $("html").addClass("subscriber");
  $("html").removeClass("visitor");
  //to userId to xrhsth RENDER apo server
  userId=$("#user_id").attr("value");

}

//console.log(data);
 var i=0;                 //metraei etsi oste kathe fora na emfanizontai 20 afises kai me scrolldown na emfanizontai oi upoloipes 20 k.t.l.
 var col=last_col;        //krataei thn teleutaia sthlh sthn opoia topothetithike afisa esti wste sto scroll down h epomenh afisa na mpei sthn swsth sthlh

//console.log( "first id Concert"+lastIdConcert + "last column"+ last_col);
$.each(data.events, function(){
//console.log(userId,data.events[i]["_by"]);
  
  
  if(i==21)     //an exeis balei hdh 20 afises stamata
  {
    //console.log( "last id Concert"+lastIdConcert);
    //return false;
  }
  
  if(col==n_cols+1){col=1;}
  var div_poster=jQuery('<div/>', {
    class: 'posterWall'
    }).css("width",col_width-20).appendTo("#col"+col);
  var img=new Image();
  var attends;
  $(div_poster).append(img);
  $(img).addClass("col");
  $(img).addClass("vissible");
  $(img).attr('src',"/static/"+data.events[i]["Poster"]);
  
  $(img).attr('alt',data.events[i]["Id"]);
  $(".col").css("width",col_width-20-20);           //20 margin of div poster 10*2
  $(img).load(function () {
  $(img).parent().fadeIn();
  //console.log($(img).next().height());
  });


var date="";
date=parseDate(data.events[i]["Date"]).toString();
//date2=$.datepicker.parseDate('dd-mm-yy', ((data.events[lastIdConcert]["Date"]).toString()));

var tmp = date.split(" ");
var date=tmp[0];
var month=convertToIntMonth(tmp[1]);
var number=tmp[2];
var year= tmp[3];
var time=tmp[4].substring(0,5);
time= (parseInt(time)+2)+ tmp[4].substring(2,5);
var artist_details="";
var more_text="";

  for(k=0;k<data.events[i]["artists"].length;k++)
	{
		artist_details=artist_details+"<input type='hidden' class='artist' value='"+data.events[i]["artists"][k]["artist"]+"'>";
		
	}
  if(data.events[i]["artists"].length!=1)
  {
    more_text="<br><span>& "+(data.events[i]["artists"].length-1)+" more</span>";
  }
  //console.log(i);
  var artist_1=removePunctuation(data.events[i]["artists"][0]["artist"]);

  //console.log(artist_1,data.events[i]["artists"][0],data.events[i]["artists"][0]["artist"]);
  var div_thumb="<div class='thumb'><div class='removePoster' ></div>"+artist_details+"<input type='hidden' class='wall_id' value='"+lastIdConcert+"'/><input type='hidden' class='venue_address' value='"+data.events[i]["venue"]["venueAddr"]+"'><input type='hidden' class='venue_country' value='Greece'><input type='hidden' class='event_description' value='"+data.events[i]["description"]+"'>"+
  "<div class='thumb_date'>"+number+"/"+month+"/"+year+"</div>"+
  "<div class='thumb_artist'>"+artist_1+"</div>"+ more_text +
  "<div class='thumb_info'>Town: <span class='thumb_town'>"+data.events[i]["venue"]["venueCity"]+"</span>"+
  "</br>Time: <span class='thumb_time'>"+time+"</span></br>"+
  "Venue: <span class='thumb_venue'>"+data.events[i]["venue"]["venueName"]+"</span></br>"+
  "Entrance: <span class='thumb_entrance'>€ "+data.events[i]["Price"]+"</span></div>"+
  "<input type='hidden' class='eventID' value='"+data.events[i]["Id"]+"'>"+"<div class='alert'><div class='alert_text'>Please login</div></div><div class='attend attend_active' id='thumb_attend'><div class='attend_number' >"+data.events[i]["Attends"]+"</div></div>"+
  "<div class='facebook_share'></div>"+
  "<div class='twitter_share'></div>"+
  "</div>";
  
  $(div_poster).append(div_thumb);

    


  if(data.events[i]["_by"]==userId)
  {
    //console.log("this has been made by me!");
    $(img).next().find(".removePoster").show();

  }
  col++;
  i++;
  lastIdConcert++;
  number++;
  lastdateConcert=""+number+"-"+month+"-"+year;
  
})
totalNumberOfConcerts=lastIdConcert-1;

//css of alert
$(".thumb .alert").css("margin-left",$(".posterWall").width()-126);

//console.log("show login",!$("show_login").attr("value"));


if($("html").hasClass("subscriber") || $("#show_login").attr("value")=="False"){
  get_user_events();
}




last_col=col;
//console.log("last column",col,"last date concert",lastdateConcert);
$("img").load(function () {
  make_thumbnail();
});




}

function removePunctuation(a)
{
  var r=a.toLowerCase();
    r = r.replace(new RegExp("έ", 'g'), "ε");
    r = r.replace(new RegExp("ά", 'g'), "α");
    r = r.replace(new RegExp("ό", 'g'), "ο");
    r = r.replace(new RegExp("ί", 'g'), "ι");
    r = r.replace(new RegExp("ή", 'g'), "η");
    r = r.replace(new RegExp("ύ", 'g'), "υ");
    r = r.replace(new RegExp("ώ", 'g'), "ω");
    // bla bla
    return r;

}

function convertToIntMonth(monText) {
//Your arrays for the valid months for which you can throw exception (I did not do it) if the parameter is out of these 12.
        var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        var monInt=0;
        for (i = 0; i < 12; i++) {
//in this loop, we'll check for the match in parameter and array items.
            if (monText == monthNames[i])
            { 
//If match is found, we'll return the +1 value of actual match (as month array's index goes from 0 to 11, and we require it from 1 to 12)
            monInt=i+1
            }
        }
        return monInt;
    }

//meta thn epituxhmenh sundesh tou xrhsth ta attends stis afises ginontai active wste na mporei na ta pathsei
//ensomatwnetai sthn get_users_attends

function makeAllAttendActive(){

    $('body').find('.thumb .attend').removeClass("attend_active");
    $('body').find('#list_view_exp #list_view_conten .item .attend').removeClass("attend_active");
   
}

function parseDate(input) {
  var parts = input.toString().match(/(\d+)/g);
  return new Date(parts[0], parts[1]-1, parts[2], parts[3], parts[4]);

}

/*
//pinakas concertsID_attends krataei ta attends apo oles tis sinaulies
var concertsID_attends= new Array();



//sunarthsh getAttends apothhkeuei ston disdiastato pinaka concertsID_attends ta attends olwn twn sunauliwn

function getAttends(){
$.ajax({
  type: "GET",
  url: "getEventsAttends",
  dataType: 'json',
  async: false,
  success:function(data){
    var i=0;
    $.each(data.attends, function(){
      concertsID_attends[i]=new Array(1);
      concertsID_attends[i][0]=data.attends[i]["eventId"];
      concertsID_attends[i][1]=data.attends[i]["nAttends"];
      i++;
    });
  }
})
}
*/


/*

function getAttendByid(id){

    for (var k = 0; k < concertsID_attends.length; k++) {
        console.log(concertsID_attends[k][0]);
        if(concertsID_attends[k][0]==id){
            console.log(concertsID_attends[k][0],"nattends" ,concertsID_attends[k][1] );
            return concertsID_attends[k][1];

        }
        else
        {return 0;}

    }

}
*/

//dhmiourgei ta thumbnail tou toixou
function make_thumbnail()
{

//ana sthles
$('.thumb').each(function(index) {
  var prev_height=$(this).prev().height()+20;
  var prev_width=$(this).prev().width()+20;
  $(this).css("margin-top","-"+prev_height+"px");
  $(this).css("height",prev_height+"px");
  $(this).css("width",prev_width+"px");

 /* for (var k = 0; k < concertsID_attends.length; k++) {
    if(concertsID_attends[k][0]==$(this).prev().attr("alt")){
      $(this).find(".attend_number").html(concertsID_attends[k][1]);
    }
  }*/
});




$(".thumb > .attend").click(function(e){

    
    e.stopPropagation();
    if($(this).hasClass("attend_active"))
    {
     
      if($("html").hasClass("visitor") || $("#show_login").attr("value")=="True")
      {

        $(this).prev().fadeIn();
        
      }


      $(".thumb > .attend").mouseleave(function(){
        $(this).prev().fadeOut();

      })

      return;
    }
    /*
    for(i=0; i<users_attends.length; i++)
    {
      if($(this).parent().prev().attr("alt")==users_attends[i])
        {return;}
    }
    */
    
    $(this).css("background-image","url(/static/icons/attend-active.png)");
    $(this).addClass("attend_active");

    //console.log("attend clicked",$(this).parent().prev().attr("alt"));
    var attends=parseInt($(this).find(".attend_number").text());
    $(this).find(".attend_number").text(attends+1);
    attend_event($(this).parent().prev().attr("alt"));

});



}

/*
var geocoder;

function getAddress(){


  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(successFunction, errorFunction);
  }
}

//Get the latitude and the longitude;
function successFunction(position) {
    var lat = position.coords.latitude;
    var lng = position.coords.longitude;
    codeLatLng(lat, lng)
}

function errorFunction(){
    console.log("Geocoder failed");
}

  function initialize() {
geocoder = new google.maps.Geocoder();

  }

  function codeLatLng(lat, lng) {

    var latlng = new google.maps.LatLng(lat, lng);
    geocoder.geocode({'latLng': latlng}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        if (results[1]) {
          users_town=results[0].address_components[2].long_name;
          console.log(users_town);
        }
        else
        {
          alert("No results found");
        }
      }
      else
      {
        alert("Geocoder failed due to: " + status);
      }
    });
  }


*/
var thumb_normal_height=0;

function thumb_show(event,item) {
    event.stopPropagation();
    item.children().next().show();
   
    //item.children().next().fadeIn("fast");
    if(item.children().next().height()<min_thumb_height)
    {
      
      thumb_normal_height=item.children().next().height();
      item.children().css("height",min_thumb_height-20);
      item.children().next().css("height",min_thumb_height);
      item.children().next().css("margin-top","-"+min_thumb_height+"px");
    }

}

function thumb_hidden(event,item){
    if(thumb_normal_height!=0)
    {
      item.children().css("height",thumb_normal_height-20);
      item.children().next().css("height",thumb_normal_height);
      thumb_normal_height=0;
      item.children().next().css("margin-top","-"+thumb_normal_height+"px");
    }
    event.stopPropagation();
    item.children().next().hide();
    //item.children().next().fadeOut("fast");
}

(function($){$.fn.hoverIntent=function(f,g){var cfg={sensitivity:7,interval:100,timeout:0};cfg=$.extend(cfg,g?{over:f,out:g}:f);var cX,cY,pX,pY;var track=function(ev){cX=ev.pageX;cY=ev.pageY};var compare=function(ev,ob){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);if((Math.abs(pX-cX)+Math.abs(pY-cY))<cfg.sensitivity){$(ob).unbind("mousemove",track);ob.hoverIntent_s=1;return cfg.over.apply(ob,[ev])}else{pX=cX;pY=cY;ob.hoverIntent_t=setTimeout(function(){compare(ev,ob)},cfg.interval)}};var delay=function(ev,ob){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);ob.hoverIntent_s=0;return cfg.out.apply(ob,[ev])};var handleHover=function(e){var ev=jQuery.extend({},e);var ob=this;if(ob.hoverIntent_t){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t)}if(e.type=="mouseenter"){pX=ev.pageX;pY=ev.pageY;$(ob).bind("mousemove",track);if(ob.hoverIntent_s!=1){ob.hoverIntent_t=setTimeout(function(){compare(ev,ob)},cfg.interval)}}else{$(ob).unbind("mousemove",track);if(ob.hoverIntent_s==1){ob.hoverIntent_t=setTimeout(function(){delay(ev,ob)},cfg.timeout)}}};return this.bind('mouseenter',handleHover).bind('mouseleave',handleHover)}})(jQuery);


function attend_event(event_id){



		$.ajax({
			url: "/event/",
      			type: "PUT",
			dataType: "json",
			data: {event_id:event_id },
			success: function( data ) {
				if(data.success == true) 
        {}//console.log("successfully attended event")
            			else 
          {}        //console.log("something bad happened in attend event")
			}
		});

}

//4



  
