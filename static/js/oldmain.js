var n_cols;
var col_width;
var json;       //to json poy epistrefei to retrieve concerts
//json={"events":[{"N":1,"Id":2,"Date":"2011-05-08","Price":"8","Time":"21:30:00","Score":8,"Poster":"146410.jpg","venue":{"venueName":"Warehouse","venueInfo":"apothikh /poluxvros","venueUrl":"http://www.reverbnation.com/venue/1012102","venueAddr":"Basani 7","venueCity":"Volos","venueCountry":"Greece","venueX":39,"venueY":22,"venuePhone":"6948 688706","venueCapac":200},"artists":[{"artist":"Vodka Juniors"}]},{"N":2,"Id":3,"Date":"2011-05-09","Price":"8","Time":"21:30:00","Score":2,"Poster":"146416.jpg","venue":{"venueName":"Warehouse","venueInfo":"apothikh /poluxvros","venueUrl":"http://www.reverbnation.com/venue/1012102","venueAddr":"Basani 7","venueCity":"Volos","venueCountry":"Greece","venueX":39,"venueY":22,"venuePhone":"6948 688706","venueCapac":200},"artists":[{"artist":"Vodka Juniors"}]},{"N":3,"Id":9,"Date":"2011-06-11","Price":"8","Time":"21:00:00","Score":9,"Poster":"TN_146390.JPG","venue":{"venueName":"Warehouse","venueInfo":"apothikh /poluxvros","venueUrl":"http://www.reverbnation.com/venue/1012102","venueAddr":"Basani 7","venueCity":"Volos","venueCountry":"Greece","venueX":39,"venueY":22,"venuePhone":"6948 688706","venueCapac":200},"artists":[{"artist":"Bad Movies"}]},{"N":4,"Id":6,"Date":"2011-06-15","Price":"25","Time":"19:00:00","Score":1,"Poster":"TN_146312.JPG","venue":{"venueName":"Warehouse","venueInfo":"apothikh /poluxvros","venueUrl":"http://www.reverbnation.com/venue/1012102","venueAddr":"Basani 7","venueCity":"Volos","venueCountry":"Greece","venueX":39,"venueY":22,"venuePhone":"6948 688706","venueCapac":200},"artists":[{"artist":"Prodigy"},{"artist":"Moby"},{"artist":"Sublime"}]},{"N":5,"Id":7,"Date":"2011-06-16","Price":"25","Time":"19:00:00","Score":5,"Poster":"TN_146347.JPG","venue":{"venueName":"Warehouse","venueInfo":"apothikh /poluxvros","venueUrl":"http://www.reverbnation.com/venue/1012102","venueAddr":"Basani 7","venueCity":"Volos","venueCountry":"Greece","venueX":39,"venueY":22,"venuePhone":"6948 688706","venueCapac":200},"artists":[{"artist":"Bad Movies"},{"artist":"Prodigy"}]}]}
var user="";
var userId=0;
var tracked_cities;
var wallView=1;
var openExpanded="";
var users_town="";
// delay function : prevent from multiple calls
var delay = (function(){
  var timer = 0;
  return function(callback, ms){
    clearTimeout (timer);
    timer = setTimeout(callback, ms);
  };
})();


$(document).ready(function() {
initialize();
getAddress();

//console.log(geoplugin_latitude(),geoplugin_longitude());
tracked_cities=new Array();
$("#num_cities").text("0");
$("#display_cities").text("");

/*if(localStorage.getItem("username")!=null){
    //$(".login > .results").html("Welcome  "+localStorage.getItem("username"));
    console.log("local storage: "+localStorage.getItem("username")+localStorage.getItem("userid"));
    //userId=localStorage.getItem("userid");

}
else{
    create_sign_up();
    console.log("user has not loged in in the past");
}*/





//dhmioyrgia sthlvn toy grid

 make_grid();



//retrieve concerts
var retrievedObject = localStorage.getItem('towns');
tracked_cities=JSON.parse(retrievedObject);
console.log(tracked_cities);
var str2="";



if (tracked_cities==null || tracked_cities.length==0){
        console.log(users_town);
        str2=str2+"towns=volos&towns=Athens&towns=Thessaloniki&towns=Larisa&";      //default town
        //str2=str2+"towns="+users_town+"&";
}

else {

    for(m=0; m<tracked_cities.length; m++){
        str2=str2+"towns="+tracked_cities[m]+"&";
        $("#"+tracked_cities[m]).css("background-image","url(icons/selected.jpg)");
        $("#"+tracked_cities[m]).next().addClass("checked");
	for (var i=0; i<tracked_cities.length; i++){
        $("#display_cities").append(tracked_cities[i]+",");

        }
        $("#num_cities").text(tracked_cities.length);
    }
}



str2=str2+"starts=&ends=";
             $.ajax({
                type: "GET",
                url: "retrieveConcerts3",
                data: str2,
                dataType: 'json',
                async: false,
                success:function(data){
                json=data;
                make_wall(json);
                }
             })

make_list_view(json);
//on window resize fix the columns with 100ms delay
$(window).resize(function() {
    delay(function(){
      //alert('Resize...');
      make_grid();
     make_wall(json);
    }, 100);
});


get_next_week_date();


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

$(".image_all").click(function(){
	$(".image_all").css("background-image","url(icons/selected.jpg)");
	$(".image_popular").css("background-image","url(icons/no_selected.jpg)");
	$(".image_recomended").css("background-image","url(icons/no_selected.jpg)");
	});

$(".image_popular").click(function(){
	$(".image_popular").css("background-image","url(icons/selected.jpg)");
	$(".image_all").css("background-image","url(icons/no_selected.jpg)");
	$(".image_recomended").css("background-image","url(icons/no_selected.jpg)");
	});
$(".image_recomended").click(function(){
	$(".image_recomended").css("background-image","url(icons/selected.jpg)");
	$(".image_all").css("background-image","url(icons/no_selected.jpg)");
	$(".image_popular").css("background-image","url(icons/no_selected.jpg)");
	});

$(".nav_buttons").click(function(){

         show_expanded($(this).children().attr("class"));

});


$("span.close").click(function(){
        $(this).css("background-image","url(icons/close-active.png)");
	hide_expanded($(this).parent());


});

$(".track_cities_button").click(function(){

   show_expanded($(this).attr("class"));
});

$(".cities_buttom").click(function(){

	check_town($(this));

});

//login action
$("#login").click(login);



if(sessionStorage.setItem('logged_in')=="yes"){


    makeAttendActive();
}



$(".posterWall  ").click(function(){

   /* $(".poster_view").fadeIn("slow");
    console.log("poster clicked",$(this).children().attr("alt"));
    make_poster_view($(this).children().attr("alt"));

    $(".poster_view .close_poster_view").click(function(){
    $(".poster_view").fadeOut("slow");

    });*/


    window.location.href = "poster_view.html?id="+$(this).children().attr("alt");
})



$(".thumb > .facebook_share").click(function(){

    event.stopPropagation();
    fbshare($(this).parent().prev().attr("alt"),$(this).prev().prev().prev().html());

});

$(".thumb > .twitter_share").click(function(){

    event.stopPropagation();
    twshare($(this).parent().prev().attr("alt"),$(this).prev().prev().prev().prev().html());

});

$(".thumb > .share").click(function(){

    event.stopPropagation();
    gooshare($(this).parent().prev().attr("alt"),$(this).prev().prev().prev().prev().prev().html());

});



$(".map_open").click(function(){
//initialize2();
console.log(map_open);
event.stopPropagation();
		 		if(map_open==0)
		 		{
		 			$(".map_canvas").height(324);

					$(".map_icon").next().html("Close Map");
		 			map_open=1;
		 		}
		 		else{
		 			$(".map_canvas").height(0);
					$(".map_icon").next().html("Show Map");
		 			map_open=0;
		 		}


		});


$(window).load(function() {
    //footer gia infinite scroll
//$(".wall").append("<footer>  </footer>");


$footer = $('footer'),
	opts = {
		offset: '100%'
	};

	$footer.waypoint(function(event, direction) {

                if (direction === 'down') {
                console.log("footer");
		$footer.waypoint('remove');
                make_wall(json);
		//$('.wallContainer').append("<div class='article'><p>Loading more itemsdsfgsdfgdgsdfgdsgfgsdgdgsg</p></div>");
		$footer.waypoint(opts);
                }
               event.stopPropagation();


	}, opts);




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
					date = $.datepicker.parseDate(
						instance.settings.dateFormat ||
						$.datepicker._defaults.dateFormat,
						selectedDate, instance.settings );
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






//dhmiourgei sthles analoga me to megethos toy parathirou
function make_grid(){
    $(".wallContainer").html("");
                        // console.log($(window).height());
			//console.log($(window).width());
			var min_col=230;										//minimum column 11px megalitero apo auto poy theloume

			var main_cont=$(window).width()-240;			//platos parathiroy xoris to menu (220px)
			n_cols=parseInt(main_cont/min_col);		//arithmos sthlwn
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
       getAttends();
}
var lastIdConcert=0;
var concertsID_attends= new Array();
var last_col=1;
//data: to json poy exei epistrepsei to retrieveConcerts
//Dhmioyrgei ton toixo
function make_wall(data)
{

 var i=lastIdConcert;
 var col=last_col;
 var numOfConcerts=0;



  while(numOfConcerts<=20){


  $.each(data.attends, function(){
  if(col==n_cols+1){col=1;}
  var div_poster=jQuery('<div/>', {
    	class: 'posterWall'
 //   	}).appendTo(".col"+col);
 }).css("width",col_width-20).appendTo(".col"+col);
  var img=new Image();
  $(div_poster).append(img);
  $(img).addClass("col");
  $(img).addClass("vissible");
  $(img).attr('src',"posters/"+data.events[i]["Poster"]);
  $(img).fadeIn();
  $(img).attr('alt',data.events[i]["Id"]);
  $(".col").css("width",col_width-20-20); //20 margin of div poster 10*2




  var div_thumb="<div class='thumb'><div class='thumb_date'>"+data.events[i]["Date"]+"</div>"+
      "<div class='thumb_artist'>"+data.events[i]["artists"][0]["artist"]+"</div>"+
"<div class='thumb_info'>Πόλη: <span class='thumb_town'>"+data.events[i]["venue"]["venueCity"]+"</span>"+
"</br>Ώρα: <span class='thumb_time'>"+data.events[i]["Time"]+"</span></br>"+
"Χώρος: <span class='thumb_venue'>"+data.events[i]["venue"]["venueName"]+"</span></br>"+
"Είσοδος: <span class='thumb_entrance'>€ "+data.events[i]["Price"]+"</span></div>"+
"<div class='attend attend_active' id='thumb_attend'><div class='attend_number' >0</div></div>"+
"<div class='facebook_share'></div>"+
    "<div class='twitter_share'></div>"+
    "<div class='share'></div></div>";
 $(div_poster).append(div_thumb);

 /* var div_thumbnail=jQuery('<span/>', {
    class: 'col'
 }).css("z-index",-3).appendTo(div_poster);*/

  col++;
  i++;
  numOfConcerts++;
}
)};
  lastIdConcert=i;
  last_col=col;
  console.log("last column",col);
//  $(".col").css("width",col_width);
$("img").load(function () {

   make_thumbnail();

});



}

var concertsID_attends= new Array();
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


function make_thumbnail(){




//console.log("make_thumb");
//ana sthles
$('.thumb').each(function(index) {
    var prev_height=$(this).prev().height()+20;
    var prev_width=$(this).prev().width()+20;
    $(this).css("margin-top","-"+prev_height+"px");
    $(this).css("height",prev_height+"px");
    $(this).css("width",prev_width+"px");
   // console.log("thumb"+index+"height:"+$(this).prev().css("height"));



   for (var k = 0; k < concertsID_attends.length; k++) {
        //console.log(concertsID_attends[k][0]);
        if(concertsID_attends[k][0]==$(this).prev().attr("alt")){
           // console.log(concertsID_attends[k][0],"nattends" ,concertsID_attends[k][1] );
            $(this).find(".attend_number").html(concertsID_attends[k][1]);

        }

    }
});


$(".posterWall").hover(function() {

    $(this).children().next().show();


},
function(){

    event.stopPropagation();
    $(this).children().next().hide();

});




$(".thumb > .attend").click(function(){

    event.stopPropagation();
    if($(this).hasClass("attend_active"))
    {return;}
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
    codeLatLng(lat, lng)
}

function errorFunction(){
    alert("Geocoder failed");
}

  function initialize() {
    geocoder = new google.maps.Geocoder();



  }

  function codeLatLng(lat, lng) {

    var latlng = new google.maps.LatLng(lat, lng);
    geocoder.geocode({'latLng': latlng}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
      //console.log(results)
        if (results[1]) {
         //formatted address
         //alert(results[0].formatted_address)
        // alert(results[0].address_components[2].long_name);
         users_town=results[0].address_components[2].long_name;
         console.log(users_town);
        //find country name
        //city data
        //alert(city.short_name + " " + city.long_name)


        } else {
          alert("No results found");
        }
      } else {
        alert("Geocoder failed due to: " + status);
      }
    });
  }