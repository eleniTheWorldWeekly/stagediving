var n_cols;           //the number of the columns on the wall
var col_width;        //the width of each column
var json;             //to json poy epistrefei to retrieve concerts (synarthsh poy kalei ton servlet retrieve concerts kai epistrefei synaylies)

// paradeigma json
//json={"events":[{"N":1,"Id":2,"Date":"2011-05-08","Price":"8","Time":"21:30:00","Score":8,"Poster":"146410.jpg","venue":{"venueName":"Warehouse","venueInfo":"apothikh /poluxvros","venueUrl":"http://www.reverbnation.com/venue/1012102","venueAddr":"Basani 7","venueCity":"Volos","venueCountry":"Greece","venueX":39,"venueY":22,"venuePhone":"6948 688706","venueCapac":200},"artists":[{"artist":"Vodka Juniors"}]},{"N":2,"Id":3,"Date":"2011-05-09","Price":"8","Time":"21:30:00","Score":2,"Poster":"146416.jpg","venue":{"venueName":"Warehouse","venueInfo":"apothikh /poluxvros","venueUrl":"http://www.reverbnation.com/venue/1012102","venueAddr":"Basani 7","venueCity":"Volos","venueCountry":"Greece","venueX":39,"venueY":22,"venuePhone":"6948 688706","venueCapac":200},"artists":[{"artist":"Vodka Juniors"}]},{"N":3,"Id":9,"Date":"2011-06-11","Price":"8","Time":"21:00:00","Score":9,"Poster":"TN_146390.JPG","venue":{"venueName":"Warehouse","venueInfo":"apothikh /poluxvros","venueUrl":"http://www.reverbnation.com/venue/1012102","venueAddr":"Basani 7","venueCity":"Volos","venueCountry":"Greece","venueX":39,"venueY":22,"venuePhone":"6948 688706","venueCapac":200},"artists":[{"artist":"Bad Movies"}]},{"N":4,"Id":6,"Date":"2011-06-15","Price":"25","Time":"19:00:00","Score":1,"Poster":"TN_146312.JPG","venue":{"venueName":"Warehouse","venueInfo":"apothikh /poluxvros","venueUrl":"http://www.reverbnation.com/venue/1012102","venueAddr":"Basani 7","venueCity":"Volos","venueCountry":"Greece","venueX":39,"venueY":22,"venuePhone":"6948 688706","venueCapac":200},"artists":[{"artist":"Prodigy"},{"artist":"Moby"},{"artist":"Sublime"}]},{"N":5,"Id":7,"Date":"2011-06-16","Price":"25","Time":"19:00:00","Score":5,"Poster":"TN_146347.JPG","venue":{"venueName":"Warehouse","venueInfo":"apothikh /poluxvros","venueUrl":"http://www.reverbnation.com/venue/1012102","venueAddr":"Basani 7","venueCity":"Volos","venueCountry":"Greece","venueX":39,"venueY":22,"venuePhone":"6948 688706","venueCapac":200},"artists":[{"artist":"Bad Movies"},{"artist":"Prodigy"}]}]}
var jsonRecommended;  //to json poy epistrefei to retrieve recommended concerts
var user="";          //metablhth pou apothikeuei to username tou xrhsth meta apo sign up h login
var userId=0;         //to id tou xrhsth poy exei kanei login h sign up
var tracked_cities;   //oi poleis tis opoies o xrhsths exei kanei  track (exei dhlwsei oti ton endiaferoun)
var wallView=1;       //metablhth shmaia h opoia me 1 dhlwnei oti briskomaste se wallView enw me 0 oti eimaste se list view twn afiswn
var openExpanded="";  //metablhth shmaia gia to an to expanded menu einai anoixto h oxi
var users_town="";    //apothikeush polhs sthn opoia brisketai o xrhsths
var totalNumberOfConcerts;    //synolikos arithmos sunauliwn pou epistrefei to servlet RetrieveConcerts


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


initialize();       //mallon axrhsth
getAddress();       //get users address


//console.log(geoplugin_latitude(),geoplugin_longitude());
tracked_cities=new Array();

//arxikopoihsh twn pediwn #num_cities kai #display_cities sto expanded menu
$("#num_cities").text("0");
$("#display_cities").text("");


//dhmioyrgia sthlvn toy grid
 make_grid();



//retrieve concerts apo browser tou xrhsth
var retrievedObject = localStorage.getItem('towns');
var str2="";
tracked_cities=JSON.parse(retrievedObject);     //apothikeush polewn sthn metablhth tracked_cities


//an den uparxoun apothikeumenes poleis ston browser, default poleis gia to RetrieveConcerts mpainoun oi thessaloniki, athina kai larisa,
//alliws bazw tis poleis sto str2 me to opoio tha kanw thn klhsh.
//Epishs bazw tis tyxon poleis pou eixe kanei track sto pedio #display_cities kai #num_cities sto expanded menu

if (tracked_cities==null || tracked_cities.length==0){
  console.log(users_town);
  str2=str2+"towns=volos&towns=Athens&towns=Thessaloniki&towns=Larisa&";      //default town
  //str2=str2+"towns="+users_town+"&";
}
else{
  console.log(tracked_cities);
  for(m=0; m<tracked_cities.length; m++){
    str2=str2+"towns="+tracked_cities[m]+"&";
    $("#"+tracked_cities[m]).css("background-image","url(icons/selected.jpg)");
    $("#"+tracked_cities[m]).next().addClass("checked");
    $("#display_cities").append(tracked_cities[m]+",");
  }
  $("#num_cities").text(tracked_cities.length);
}


//kalw ton servlet retrieveConcerts
//oi parametroi starts kai ends kathorizoun to xroniko diasthma mesa sto opoio tha einai oi sunaulies oi opoies tha emfanistoun ston xrhsth
//se authn thn periptwsh einai kena efoson o xrhsths den exei kanei thn antistoixh epilogh apo to menu
str2=str2+"starts=&ends=";
$.ajax({
  type: "GET",
  url: "event/events/",
  //data: str2,
  //dataType: 'json',
  //async: false,
  success:function(data){
    json=data;
    console.log(json.events.length);
    totalNumberOfConcerts=json.events.length;
    make_wall(json);                            //ftiaxnv ton toixo
  }
})


//make_list_view(json);



//on window resize fix the columns with 100ms delay
$(window).resize(function() {
  delay(function(){
  //alert('Resize...');
  make_grid();
  lastIdConcert=0;
  last_col=1;
  make_wall(json);
  }, 100);
});

get_next_week_date();



//css allagh gia wall_buttom, list_buttom
$(".wall_buttom").hover(
  function () {
    if(wallView==0){
      $(".wall_view").css("color","white");
      $(".imageWall").css("background-image","url(icons/wall-view-over.png)");
    }
  },
  function () {
    if(wallView==0){
    $(".wall_view").css("color","#CCCCCC");
    $(".imageWall").css("background-image","url(icons/wall-view.png)");
    }
  }
);

$(".list_buttom").click(function(){
  $(".list_view_exp span.close").css("background-image"," url(icons/close.jpg)");
  if(wallView==1){
    if(openExpanded!="")
      {
        hide_expanded($("#"+openExpanded));
      }
    openExpanded="list_view_exp";
    $(".list_view_exp.expanded").css("left",240);
    $(".list_view").css("color","white");
    $(".imageList").css("background-image","url(icons/list_view_white.gif)");
    $(".wall_view").css("color","#CCCCCC");
    $(".imageWall").css("background-image","url(icons/wall-view.png)");
    wallView=0;
  }
});

$(".list_buttom").hover(
  function () {
    if(wallView==1){
      $(".list_view").css("color","white");
      $(".imageList").css("background-image","url(icons/list_view_white.gif)");
    }
  },
  function () {
    if(wallView==1){
      $(".list_view").css("color","#CCCCCC");
      $(".imageList").css("background-image","url(icons/list_view_1.jpg)");
    }
  }
);

$(".wall_buttom").click(function(){
  if(wallView==0){
    hide_expanded($("#"+openExpanded));
  }
  wallView=1;
});


//css allagh gia all_buttom, recomended_buttom, popular_buttom
$(".image_all").click(function(){
  $(".image_all").css("background-image","url(icons/selected.jpg)");
	$(".image_popular").css("background-image","url(icons/no_selected.jpg)");
	$(".image_recomended").css("background-image","url(icons/no_selected.jpg)");
  $('.posterWall').remove();
  totalNumberOfConcerts=jsonRecommended.events.length;
  last_col=1;
  lastIdConcert=0;
  $('.list_view_conten').html("");
  make_wall(json);
  make_list_view(json);
});

$(".image_popular").click(function(){
	$(".image_popular").css("background-image","url(icons/selected.jpg)");
	$(".image_all").css("background-image","url(icons/no_selected.jpg)");
	$(".image_recomended").css("background-image","url(icons/no_selected.jpg)");
  // popular_sort();
});

$(".image_recomended").click(function(){
	$(".image_recomended").css("background-image","url(icons/selected.jpg)");
	$(".image_all").css("background-image","url(icons/no_selected.jpg)");
	$(".image_popular").css("background-image","url(icons/no_selected.jpg)");
  $("#display_cities").text("");
  $('.posterWall').remove();
  $('.list_view_conten').html("");
  //jsonRecommended
  //retrieve concerts
  var retrievedObject = localStorage.getItem('towns');
  var str2="";
  tracked_cities=JSON.parse(retrievedObject);
  if (tracked_cities==null || tracked_cities.length==0){
    console.log(users_town);
    str2=str2+"towns=volos&towns=Athens&towns=Thessaloniki&towns=Larisa&";      //default town
    //str2=str2+"towns="+users_town+"&";
  }
  else {
    console.log(tracked_cities);
    for(m=0; m<tracked_cities.length; m++){
    str2=str2+"towns="+tracked_cities[m]+"&";
    $("#"+tracked_cities[m]).css("background-image","url(icons/selected.jpg)");
    $("#"+tracked_cities[m]).next().addClass("checked");
    $("#display_cities").append(tracked_cities[m]+",");
    }
  $("#num_cities").text(tracked_cities.length);
  }
  str2=str2+"starts=&ends=";
  $.ajax({
    type: "GET",
    url: "retrieveRecommendedConcerts",
    data: str2,
    dataType: 'json',
    async: false,
    success:function(data){
      jsonRecommended=data;
      console.log(jsonRecommended.events.length);
      totalNumberOfConcerts=jsonRecommended.events.length;
      last_col=1;
      lastIdConcert=0;
      make_wall(jsonRecommended);
    }
  })

  make_list_view(jsonRecommended);
});



//show menu expanded
$(".nav_buttons").click(function(){
  show_expanded($(this).children().attr("class"));
});


//close expanded
$("span.close").click(function(){
  $(this).css("background-image","url(icons/close-active.png)");
	hide_expanded($(this).parent());
});


//show track cities expanded
$(".track_cities_button").click(function(){
  show_expanded($(this).attr("class"));
});


//check city
$(".cities_buttom").click(function(){
  check_town($(this));
});


//login action
$("#login").click(login);
console.log(sessionStorage.getItem('logged_in'));
if(sessionStorage.getItem('logged_in')=="yes"){
  makeAttendActive();
}


//redirect to poster view on poster click
$(".posterWall  ").click(function(){
  window.location.href = "poster_view.html?id="+$(this).children().attr("alt");
})


// concert share via facebook, twitter, googleshare
$(".thumb > .facebook_share").click(function(e){
  e.stopPropagation();
  fbshare($(this).parent().prev().attr("alt"),$(this).prev().prev().prev().html());
});

$(".thumb > .twitter_share").click(function(e){
  e.stopPropagation();
  twshare($(this).parent().prev().attr("alt"),$(this).prev().prev().prev().prev().html());
});

$(".thumb > .share").click(function(e){
  e.stopPropagation();
  gooshare($(this).parent().prev().attr("alt"),$(this).prev().prev().prev().prev().prev().html());
});


//make infinite scroll
$(window).load(function() {
  //footer gia infinite scroll
  $footer = $('footer'),
	opts = {
		offset: '100%'
	};

/*$footer.waypoint(function(event, direction) {
    if (direction === 'down') {
      console.log("footer");
	    $footer.waypoint('remove');
      if(totalNumberOfConcerts>lastIdConcert)
      {
        make_wall(json);
      }
		  //$('.wallContainer').append("<div class='article'><p>Loading more itemsdsfgsdfgdgsdfgdsgfgsdgdgsg</p></div>");
		  $footer.waypoint(opts);
    }
    event.stopPropagation();
  }, opts);*/
});

});





//Date Picker
$(function() {
  var dates = $( "#from, #to" ).datepicker({
    defaultDate: "+1w",
    changeMonth: true,
    numberOfMonths: 1,
	  dateFormat: "yy-mm-dd",
	  onSelect: function( selectedDate ) {
      var option = this.id == "from" ? "minDate" : "maxDate",
	    instance = $( this ).data( "datepicker" ),
	    date = $.datepicker.parseDate(instance.settings.dateFormat || $.datepicker._defaults.dateFormat,selectedDate, instance.settings );
	    dates.not( this ).datepicker( "option", option, date );
      if(this.id == "to" && $("#from").attr("value")!=""){
        console.log("from to");
        filter_run();
      }
      else if(this.id == "from" && $("#to").attr("value")!=""){
        console.log("from from");
        // filter_run();
      }
    }
  });
});




//taksinomei bash attend
function popular_sort()
{
  console.log(concertsID_attends);
}


function make_list_view(json){
  var i=0;
  var attent;
  $.each(json.events, function(){
    for (var k = 0; k < concertsID_attends.length; k++) {
      if(concertsID_attends[k][0]==json.events[i]["Id"]){
        attent=concertsID_attends[k][1];
      }
    }
    var html="<div class='item'><div class='poster poster_col' style='background-image:url(posters/"+json.events[i]["Poster"]+")'></div>"+
    "<div class='date date_col'>"+json.events[i]["Date"]+"</div>"+
    "<div class='artist artists_col'>"+json.events[i]["artists"][0]["artist"]+"</br>"+"</div>"+
    "<div class='city_time_venue_col'><span class='city'>"+json.events[i]["venue"]["venueCity"]+"</span><br />"+
    "<span class='time'>"+json.events[i]["Time"]+"</span><br /><span class='venue'>"+json.events[i]["venue"]["venueName"]+"</span></div>"+
    "<div class='entrance entrance_col'>€"+json.events[i]["Price"]+"</div><div class='attend attend_col'>"+
    "<div class='attend_number'>"+attent+"</div></div></div>";
    $(".list_view_conten ").append(html);
    i++;
  });
}



//dhmiourgei sthles analoga me to megethos toy parathirou
function make_grid(){

    $(".wallContainer").html("");
    // console.log($(window).height());
		//console.log($(window).width());
		var min_col=230;										       //minimum column 11px megalitero apo auto poy theloume
		var main_cont=$(window).width()-240;			 //platos parathiroy xoris to menu (220px)
		n_cols=parseInt(main_cont/min_col);		     //arithmos sthlwn
		//console.log("main content"+main_cont);
		//console.log("sthles"+main_cont/min_col ,parseInt(main_cont/min_col), "kathe mia " );

    //platos sthlhs
		if(n_cols>=4)
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

    //console.log(n_cols);

		for(i=1; i<=n_cols; i++)
		{
		  var div=jQuery('<div/>', {
      //	class: 'col'+i+' col',
      class: 'col'+i,
    	}).appendTo(".wallContainer");
    }


    //pinakas concertsID_attends krataei ta attends apo oles tis sinaulies
    //getAttends();

    //kathorismos platous expanded menu
    if(n_cols==1){
      $(".expanded").css("width",col_width-40);
      $(".list_view_exp.expanded").css("width",950);
    }
    else{
      $(".expanded").css("width",2*col_width-40);
      $(".list_view_exp.expanded").css("width",950);
    }
    $(".login_register.expanded").css("width",col_width-20);
}


var concertsID_attends= new Array();
var last_col=1;
var lastIdConcert=0; //metraei sinolika poses afises exei diksi



//Sunaarthsh make_wall
//Dhmioyrgei ton toixo
//data: to json poy exei epistrepsei to retrieveConcerts
function make_wall(data)
{

 var i=0;                 //metraei etsi oste kathe fora na emfanizontai 20 afises kai me scrolldown na emfanizontai oi upoloipes 20 k.t.l.
 var col=last_col;        //krataei thn teleutaia sthlh sthn opoia topothetithike afisa esti wste sto scroll down h epomenh afisa na mpei sthn swsth sthlh

console.log( "first id Concert"+lastIdConcert + "last column"+ last_col);
$.each(data.events, function(){
  if(i==21 || totalNumberOfConcerts<=lastIdConcert)     //an exeis balei hdh 20 afises stamata
  {
    console.log( "last id Concert"+lastIdConcert);
    return false;
  }

  if(col==n_cols+1){col=1;}
  var div_poster=jQuery('<div/>', {
    class: 'posterWall'
    }).css("width",col_width-20).appendTo(".col"+col);
  var img=new Image();
  $(div_poster).append(img);
  $(img).addClass("col");
  $(img).addClass("vissible");
  $(img).attr('src',"/"+data.events[lastIdConcert]["Poster"]);
  $(img).fadeIn();
  $(img).attr('alt',data.events[lastIdConcert]["Id"]);
  $(".col").css("width",col_width-20-20);           //20 margin of div poster 10*2
  var div_thumb="<div class='thumb'><div class='thumb_date'>"+data.events[lastIdConcert]["Date"]+"</div>"+
  "<div class='thumb_artist'>"+data.events[lastIdConcert]["artists"][0]["artist"]+"</div>"+
  "<div class='thumb_info'>Πόλη: <span class='thumb_town'>"+data.events[lastIdConcert]["venue"]["venueCity"]+"</span>"+
  "</br>Ώρα: <span class='thumb_time'>"+data.events[lastIdConcert]["Time"]+"</span></br>"+
  "Χώρος: <span class='thumb_venue'>"+data.events[lastIdConcert]["venue"]["venueName"]+"</span></br>"+
  "Είσοδος: <span class='thumb_entrance'>€ "+data.events[lastIdConcert]["Price"]+"</span></div>"+
  "<div class='attend attend_active' id='thumb_attend'><div class='attend_number' >0</div></div>"+
  "<div class='facebook_share'></div>"+
  "<div class='twitter_share'></div>"+
  "<div class='share'></div></div>";
  $(div_poster).append(div_thumb);
  col++;
  i++;
  lastIdConcert++;
})


last_col=col;
console.log("last column",col);
$("img").load(function () {
  make_thumbnail();
});
}

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

  for (var k = 0; k < concertsID_attends.length; k++) {
    if(concertsID_attends[k][0]==$(this).prev().attr("alt")){
      $(this).find(".attend_number").html(concertsID_attends[k][1]);
    }
  }
});


$(".posterWall").hover(function() {

    $(this).children().next().show();


},
function(event){

    event.stopPropagation();
    $(this).children().next().hide();

});


$(".thumb > .attend").click(function(e){

    e.stopPropagation();
    if($(this).hasClass("attend_active"))
    {
        return;}
    $(this).css("background-image","url(icons/attend-active.png)");
    $(this).addClass("attend_active");

    console.log("attend clicked",$(this).parent().prev().attr("alt"));
    var attends=parseInt($(this).find(".attend_number").text());
    $(this).find(".attend_number").text(attends+1);
    var html = $.ajax({
                        type: "GET",
                        async:false,
                        url: "attendEvent?uID="+userId+"&eID="+$(this).parent().prev().attr("alt")
                    }).responseText;

});


}


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
    //codeLatLng(lat, lng)
}

function errorFunction(){
    alert("Geocoder failed");
}

  function initialize() {
  ///////carefull with internet out of comments//////  geocoder = new google.maps.Geocoder();

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

  
