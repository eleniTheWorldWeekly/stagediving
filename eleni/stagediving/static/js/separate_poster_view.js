//var turl = "https://twitter.com/share?url=" + encodeURIComponent(article.link) + "&text=" + encodeURIComponent(article.title);
//var fburl = "http://www.facebook.com/share.php?u="+encodeURIComponent(article.link)+"&t="+encodeURIComponent(article.title);
//var gurl = "https://plusone.google.com/_/+1/confirm?hl=en&url="+encodeURIComponent(article.link)+"&title="+encodeURIComponent(article.title);

var this_object=null;
var right_width;
var video_columns;
var image_columns;


// delay function : prevent from multiple calls
var delay = (function(){
  var timer = 0;
  return function(callback, ms){
    clearTimeout (timer);
    timer = setTimeout(callback, ms);
  };
})();


$(document).ready(function() {

//make poster fix
$("#poster_view #main #left #poster").one('load',function() {
        console.log($("#poster_view #main #left #poster").height());
        $("#poster_view #main #left").sticky({topSpacing:-($("#poster_view #main #left #poster").height()-($(window).height()-95) )});
       

});


//fix day
 var date=$("#poster_view > #main > #right > .date").html();
console.log(date);
var tmp = date.split(" ");
var date=tmp[0];
var month=convertToIntMonth(tmp[2]);
var number=tmp[1];
var year= tmp[3];
console.log(date,number,month, year);
$("#poster_view > #main > #right > .date").html(date+" "+number+" / "+month+" / "+year);

//poster view responsive
var window_width=$(window).width();
$("#poster_view").css("width",window_width*0.8);
$("#header").css("width",window_width*0.8);
$("#poster_view").css("margin-left",window_width*0.2/2);
$("#left").css("width",(window_width*0.8*0.5)-10);
$("#right").css("width",(window_width*0.8*0.5)-10);
right_width=(window_width*0.8*0.5)-10;






//video responsive
if(right_width>=490)
{
  video_columns=2;

}
else
{
  video_columns=1;
}
console.log(right_width,"number of columns",video_columns);

//on window resize fix the columns with 100ms delay
$(window).resize(function() {
delay(function(){
  
 
$("#poster_view #main #left #poster").one('load',function() {
        console.log($("#poster_view #main #left #poster").height());
        $("#poster_view #main #left").sticky({topSpacing:-($("#poster_view #main #left #poster").height()-($(window).height()-95) )});
       

});

  //poster view responsive
 window_width=$(window).width();
$("#poster_view").css("width",window_width*0.8);
$("#header").css("width",window_width*0.8);
$("#poster_view").css("margin-left",window_width*0.2/2);
$("#left").css("width",(window_width*0.8*0.5)-10);
$("#right").css("width",(window_width*0.8*0.5)-10);
right_width=(window_width*0.8*0.5)-10;

console.log("on resize right_width",right_width);


//images responsive

if(right_width<440)
        {
          image_columns=2;
          $(".images").css("height","276px");
        }
        else
        {
          image_columns=3;
          $(".images").css("height","184px");
        }


var nArt=1;
$('.artists div').each(function(index) {
  $("#art"+nArt+" > .images").html("");
  make_image_grid(nArt);
        $.ajax({
                url: "http://ws.audioscrobbler.com/2.0/?method=artist.getimages&artist="+
                $(this).html()+"&api_key=75904470b83768ccf1292302837281c3&format=json",
                dataType: 'json',
                async: false,
                success: function(jsonLastfm){
                  src=new Array();
                  $.each(jsonLastfm.images.image, function(index,elem){
                    src[index]=elem.sizes.size[2]["#text"];
                  });
                }
                });
        src=src.splice(0, 6);
        putArtistImages(src,nArt);
        nArt++;

});
        

        

//images responsive
/*
        if(right_width<440)
        {
          image_columns=2;
          $(".images").css("height","276px");
        }
        else
        {
          image_columns=3;
          $(".images").css("height","184px");
        }
*/
console.log("image colms",image_columns);



//video responsive
if(right_width>=490)
{
  video_columns=2;

}
else
{
  video_columns=1;
}
console.log(right_width,"number of columns",video_columns);
for(i=1; i<nArtists; i++)
{
	make_video_grid(nArtists);
}



console.log("number of columns",video_columns);
   }, 100);
});


//make the map   codeAddress(json.event["venue"]["venueAddr"],json.event["venue"]["venueCity"],json.event["venue"]["venueCountry"]);
var address="";
address=$("#venue_address").html()+","+$("#venue_city").html()+" "+$("#venue_country").html();
codeAddress(address);





//add poster
var poster_url="";
poster_url=$("#event_poster").html();
//$("#poster_view #main #left #poster").css("background-image","url(/static/"+poster_url+")");
$("#poster_view #main #left #poster").attr("src","/static/"+poster_url+"");

$("#poster_view #main #left #poster").one('load',function() {
        console.log($("#poster_view #main #left #poster").height());
        $("#poster_view #main #left").sticky({topSpacing:-($("#poster_view #main #left #poster").height()-($(window).height()-90) )});
        //$("#poster_view #main #left").sticky({topSpacing:-$(window).height()-$("#poster_view #main #left #poster").height()});

    });



//pernw tis plhrofories ths sugkekrimenhs sunaulias bash to ID ths


    /*$.ajax({
            type: "GET",
            url: "getEventsInfoById?id="+id_param,
            dataType: 'json',
            async: false,
            success:function(data){
              json=data;
            }
          })*/

    //getAttends();
    //make_poster_view(id_param);
    var url=window.location.href;
    var turl = "https://twitter.com/share?url=" + url + "&text=" + $('.artists div').html();
    var fburl = "http://www.facebook.com/share.php?u="+url+"&t="+$('.artists div').html();
    var gurl = "https://plusone.google.com/_/+1/confirm?hl=en&url="+url+"&title="+$('.artists div').html();
    //console.log(turl);


    //emfanizei ston xrhsth ton xarth me thn topothesia tou venue ustera apo epilogh tou xrhsth
    $(".map_open").click(function(event){
      console.log(map_open);
      event.stopPropagation();
		 	if(map_open==0)
		 	{
		 		$(".map_canvas").height(324);
				$("#map_icon").next().html("Close Map");
		 		map_open=1;
		 	}
		 	else{
            $(".map_canvas").height(0);
            $("#map_icon").next().html("Show Map");
		 			  map_open=0;
          }
		});

    //kleinontas o xrhsth thn selida epistrefei sthn kentrikh selida
    $("#close_poster_view").click(function(){
     
    //$("#close_poster_view").css("background-image"," url(/static/icons/close.jpg)");
     window.location.replace("/home/");
    });




/* facebook */
	$("#facebook").click(function(event) {
        console.log("in here!!!");

    var width  = 575,
        height = 400,
        left   = ($(window).width()  - width)  / 2,
        top    = ($(window).height() - height) / 2,
        url    = this.href,
        opts   = 'status=1' +
                 ',width='  + width  +
                 ',height=' + height +
                 ',top='    + top    +
                 ',left='   + left;

    window.open(fburl, 'facebook', opts);

    return false;
  	});




/* tweet */
	$("#twitter").click(function(event) {
        console.log("in here!!!");

    var width  = 575,
        height = 400,
        left   = ($(window).width()  - width)  / 2,
        top    = ($(window).height() - height) / 2,
        url    = this.href,
        opts   = 'status=1' +
                 ',width='  + width  +
                 ',height=' + height +
                 ',top='    + top    +
                 ',left='   + left;

    window.open(turl, 'twitter', opts);

    return false;
  	});



/* google */
	$("#google").click(function(event) {
        console.log("in here!!!");


    var width  = 575,
        height = 400,
        left   = ($(window).width()  - width)  / 2,
        top    = ($(window).height() - height) / 2,
        url    = this.href,
        opts   = 'status=1' +
                 ',width='  + width  +
                 ',height=' + height +
                 ',top='    + top    +
                 ',left='   + left;

    window.open(gurl, 'google', opts);

    return false;
  	});


//artist info

document.title = $('.artists div').html();


$('.artists div').each(function(index) {

  console.log($(this).html());
  complete_artists_info($(this).html());

});
console.log("nArtists-1",nArtists-1);
});


/*var concertsID_attends= new Array();

//apothikeuei ston pinada concertsID_attends ta attend pou exei kathe sunaulia
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

function make_image_grid(nArtists)
{
	var image_col_width;
	var min_image_col_width=160;//140 + 20px margin
	var image_columns=parseInt(right_width/min_image_col_width);
	if(image_columns==2)
	{
		//$("#art"+nArtists+" > .images").css("height","276px");
		image_col_width=((right_width-20)/2)-1;
	}
	else if(image_columns==3)
	{
		//$("#art"+nArtists+" > .images").css("height","184px");
		image_col_width=((right_width-40)/3)-1;
	}

	  for(i=1; i<=image_columns; i++)
	  {
	    $("#art"+nArtists+" > .images").append("<div class='image_col' id='image_col"+i+"' style='width:"+image_col_width+"px;'></div>");
	  }

	

	 for(i=1; i<=image_columns; i++)
	  {
      if(i!=image_columns)
      {
        $("#art"+nArtists+" > .images > #image_col"+i).css("margin-right","20px");
      }
	  //$("#image_col"+i).css("margin-right",""+image_col_margin_right+"px");
	  for(j=1; j<=6/image_columns; j++)
	  {
	     var div=jQuery('<div/>', {
	      id:nArtists+'img'+i*j
	      }).addClass("image").css("width",image_col_width).css("height",image_col_width/1.5).appendTo("#art"+nArtists+" > .images > #image_col"+i);


	  }
	}

	$.ajax({
		        url: "http://ws.audioscrobbler.com/2.0/?method=artist.getimages&artist="+
		        $("#art"+nArtists+" > .artist_info > #artist_name").html()+"&api_key=75904470b83768ccf1292302837281c3&format=json",
		        dataType: 'json',
		        async: false,
		        success: function(jsonLastfm){
		          src=new Array();
		          $.each(jsonLastfm.images.image, function(index,elem){
		            src[index]=elem.sizes.size[2]["#text"];
		          });
		        }
		        });
		src=src.splice(0, 6);
		putArtistImages(src,nArtists);

}



/*
function make_video_grid(nArtists)
{
	$("#art"+nArtists+" > .videos").html(	"<div class='video_box' style='float:left;'><div id='"+nArtists+"vid1' ></div></div><div class='video_box' style='float:right;'><div id='"+nArtists+"vid2' ></div></div><div class='video_box' style='float:left;'><div  id='"+nArtists+"vid3'></div></div><div class='video_box' style='float:right;'><div  id='"+nArtists+"vid4' ></div></div>");

	getArtistVideo($("#art"+nArtists+" > .artist_info > #artist_name").html(),nArtists);
        
        //artist responsive
        if(video_columns==1)
        {
         //edw kathorizw to platos toy ekswterikou koutiou kai pio katw otan fortvsei to video
         // loadVideo kathorizw k to platow toy video
          $(".video_box").css("width",right_width-2);
          $(".video_box").css("height",(right_width-2)/1.5);
          for(j=1; j<=nArtists; j++)
          {
            $("#"+j+"vid1").css("width",right_width-2);
            $("#"+j+"vid2").css("width",right_width-2);
            $("#"+j+"vid3").css("width",right_width-2);
            $("#"+j+"vid4").css("width",right_width-2);
            $("#"+j+"vid1").css("height",(right_width-2)/1.5);
            $("#"+j+"vid2").css("height",(right_width-2)/1.5);
            $("#"+j+"vid3").css("height",(right_width-2)/1.5);
            $("#"+j+"vid4").css("height",(right_width-2)/1.5);
          }
	  
	
        }
        
        else if(video_columns==2)
        {
	       for(j=1; j<=nArtists; j++)
          {
            $("#"+j+"vid1").css("width","235px");
            $("#"+j+"vid2").css("width","235px");
            $("#"+j+"vid3").css("width","235px");
            $("#"+j+"vid4").css("width","235px");
            $("#"+j+"vid1").css("height","150px");
            $("#"+j+"vid2").css("height","150px");
            $("#"+j+"vid3").css("height","150px");
            $("#"+j+"vid4").css("height","150px");

            $("#art"+j+"> .videos > .video_box").each(function(index){
              $(this).css("width","235px");
             $(this).css("height","150px");
              if(index==0 || index==1)
              {
              var video_box_margin_buttom=right_width-470;
                $(this).css("margin-bottom",""+video_box_margin_buttom+"px");
              }

            })
          }


         
        }
        

	

}
*/

function parseDate(input) {
  var parts = input.toString().match(/(\d+)/g);
  return new Date(parts[0], parts[1]-1, parts[2], parts[3], parts[4]);

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


function make_video_grid(nArtists)
{
  $("#art"+nArtists+" > .videos").html( "<div class='video_box' style='float:left;'><div id='"+nArtists+"vid1' ></div></div><div class='video_box' style='float:right;'><div id='"+nArtists+"vid2' ></div></div><div class='video_box' style='float:left;'><div  id='"+nArtists+"vid3'></div></div><div class='video_box' style='float:right;'><div  id='"+nArtists+"vid4' ></div></div>");

  getArtistVideo($("#art"+nArtists+" > .artist_info > #artist_name").html(),nArtists);
        
        //artist responsive
        if(video_columns==1)
        {
         //edw kathorizw to platos toy ekswterikou koutiou kai pio katw otan fortvsei to video
         // loadVideo kathorizw k to platow toy video
          $(".video_box").css("width",right_width-2);
          $(".video_box").css("height",(right_width-2)/1.5);
          for(j=1; j<=nArtists; j++)
          {
            $("#"+j+"vid1").css("width",right_width-2);
            $("#"+j+"vid2").css("width",right_width-2);
            $("#"+j+"vid3").css("width",right_width-2);
            $("#"+j+"vid4").css("width",right_width-2);
            $("#"+j+"vid1").css("height",(right_width-2)/1.5);
            $("#"+j+"vid2").css("height",(right_width-2)/1.5);
            $("#"+j+"vid3").css("height",(right_width-2)/1.5);
            $("#"+j+"vid4").css("height",(right_width-2)/1.5);
          }
    
  
        }
        
        else if(video_columns==2)
        {
         for(j=1; j<=nArtists; j++)
          {
            video_width=(right_width-20)/2;
            $("#"+j+"vid1").css("width",video_width);
            $("#"+j+"vid2").css("width",video_width);
            $("#"+j+"vid3").css("width",video_width);
            $("#"+j+"vid4").css("width",video_width);
            $("#"+j+"vid1").css("height",video_width/1.5);
            $("#"+j+"vid2").css("height",video_width/1.5);
            $("#"+j+"vid3").css("height",video_width/1.5);
            $("#"+j+"vid4").css("height",video_width/1.5);

            $("#art"+j+"> .videos > .video_box").each(function(index){
              $(this).css("width",video_width+1);
             $(this).css("height",(video_width/1.5)+1);
              /*if(index==0 || index==1)
              {
              var video_box_margin_buttom=right_width-470;
                $(this).css("margin-bottom",""+video_box_margin_buttom+"px");
              }*/

            })
          }


        /*$(".video_box").each(function(index) {
         $(this).css("width","235px");
         $(this).css("height","150px");
          if(index==0 || index==1)
          {
          var video_box_margin_buttom=right_width-470;
            $(this).css("margin-bottom",""+video_box_margin_buttom+"px");
          }
          });
*/
         
        }
        

  

}


function gup( name )
{
  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regexS = "[\\?&]"+name+"=([^&#]*)";
  var regex = new RegExp( regexS );
  var results = regex.exec( window.location.href );
  if( results == null )
    return "";
  else
    return results[1];
}

var json;
var map_open= 0 ;     //map_open=0 xarths kleistos
var nArtists=1;         //plhthos kallitexnvn pou summetexoun sthn sugkekrimenh sunaulia

/*function make_poster_view(id){
  nArtists=1;
  get_event_info_by_id(id);
}




//sumplhrwnei sthn selida ta stoixeia ths sunaulias

function get_event_info_by_id(id){

  $("#poster_view #main #right .artists").html("");
  $("#poster_view #main #right .artists_details").html("");
  var i=0;
  for (var k = 0; k < concertsID_attends.length; k++) {
    if(concertsID_attends[k][0]==id){
      var attends=concertsID_attends[k][1];
    }
  }
  codeAddress(json.event["venue"]["venueAddr"],json.event["venue"]["venueCity"],json.event["venue"]["venueCountry"]);
  $("#poster_view #main #left #poster").css("background-image","url(posters/"+json.event["Poster"]+")");
  $("#poster_view #main #right .date").html(json.event["Date"]);
  $("#poster_view #main #right #attend #attend_number").html(attends);
  $("#poster_view_town").html(json.event["venue"]["venueCity"]);
  $.each(json.event["artists"], function(index,elem){
    $(".poster_view #main #right .artists").append(json.event["artists"][index]["artist"]+"</br>");
    complete_artists_info(json.event["artists"][index]["artist"]);
  });
  $(".poster_view_time").html(json.event["Date"]);
  $(".poster_view_venue").html(json.event["venue"]["venueName"]);
  $(".poster_view_entrance").html("€ "+json.event["Price"]);
  $(".venue_name").html(json.event["venue"]["venueName"]);
  $("#poster_view #main #right #venue_info #info").html("Genre: "+json.event["venue"]["venueInfo"]+
  "</br>Url: "+json.event["venue"]["venueUrl"]+"</br>Address: "+json.event["venue"]["venueAddr"]+
  ", " +json.event["venue"]["venueCity"]+""+json.event["venue"]["venueCountry"]+"</br>Phone: "
  +json.event["venue"]["venuePhone"]+"</br>Capacity: "+json.event["venue"]["venueCapac"]);
}

*/
var geocoder;
var map;
var infowindow = new google.maps.InfoWindow();
var marker;
var image= "/static/icons/pin-on-google-map.png";;




//topothetei ston xarth bullet me to shmeio tou venue opou ginetai h synaylia
function codeAddress(addr,city,country) {

  var blackAndWhiteStyles = [
  {
    stylers: [
      { saturation: -99 },
      { hue: "#6600ff" },
      { lightness: -43 }
    ]
  }
];

  // Create a new StyledMapType object, passing it the array of styles,
  // as well as the name to be displayed on the map type control.
  var blackAndWhiteType = new google.maps.StyledMapType(blackAndWhiteStyles,
    {name: "Stage Diving"});

  // Create a map object, and include the MapTypeId to add
  // to the map type control.
  var mapOptions = {
    zoom: 15,
    center: new google.maps.LatLng(-34.397, 150.644),
    mapTypeControlOptions: {
      mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'black_white']
    }
  };
  map = new google.maps.Map(document.getElementById('map_canvas'),
    mapOptions);

  //Associate the styled map with the MapTypeId and set it to display.
  map.mapTypes.set('black_white', blackAndWhiteType);
  map.setMapTypeId('black_white');




    var address=addr+" ,"+city + " "+country;
    geocoder = new google.maps.Geocoder();
    geocoder.geocode( { 'address': address}, function(results, status) {

      if (status == google.maps.GeocoderStatus.OK) {

        map.setCenter(results[0].geometry.location);
        marker = new google.maps.Marker({
            map: map,
            position: results[0].geometry.location,
            title: 'Venue',
            clickable: false,
            icon: image
        });
      } else {
        console.log("Geocode was not successful for the following reason: " + status);
      }
    });

   return true;



  }




//sumplhrwnei tis plhrofories gia ton kallitexnh pernontas eikones kai bio apo to last.fm kai video apo to youtube
  function complete_artists_info(artist){

      var bio;
      var src;
      $.ajax({
              url: "http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist="+
              artist+"&api_key=75904470b83768ccf1292302837281c3&format=json",
              dataType: 'json',
              async: false,
              success: function(jsonLastfm){
                bio=jsonLastfm.artist.bio.summary;
              }
            });
        /*var html="<div id='art"+nArtists+"'><div class='artist_info'><div class='venue_name' id='artist_name'>"+artist+"</div>"+
                  "<span class='about' >Biography :</span> </br>"+
                  "<div class='info' id='biography'>"+bio+"</div>"+
                  "</div><span class='about' >Images</span>"+
                  "<div class='images'><table cellspacing='20' style='margin-left: -20px; width:520px;'>"+
                  "<tr ><td  id='"+nArtists+"img1''></td><td  id='"+nArtists+"img2''></td><td  id='"+nArtists+"img3''></td></tr><tr ><td id='"+nArtists+"img4''></td><td id='"+nArtists+"img5''></td>"+
                  "<td id='"+nArtists+"img6''></td></tr></table></div>"+
                  "<span class='about' >Videos</span><div class='videos'>"+
                  "<table cellspacing='20' style='margin-left: -20px; width:520px;'>"+
                  "<tr ><td ><div id='"+nArtists+"vid1'></div></td><td  id=''><div id='"+nArtists+"vid2'></div></td></tr><tr ><td id=''><div id='"+nArtists+"vid3'></div></td><td id=''><div id='"+nArtists+"vid4'></div></td></tr>"+
                  "</table></div></div><hr/>";
                  */

  
    var html="<div id='art"+nArtists+"'><div class='artist_info'><div id='artist_name' class='venue_name'>"+artist+"</div>"+
                  "<span class='about' >Biography :</span> </br>"+
                  "<div class='info' id='biography'>"+bio+"</div>"+
                  "</div><span class='about' >Images</span>"+
                  "<div class='images'>"+
                  "</div><span class='about' >Videos</span><div class='videos'>"+
                  
                  "</div><hr/>";
 
 
        $("#poster_view #main #right .artists_details").append(html);

        

        make_image_grid(nArtists);
        
	make_video_grid(nArtists);
        
        
        nArtists++;
  }



  function loadVideo(playerUrl, autoplay,j,n) {
    j++;
  	swfobject.embedSWF(
      	playerUrl + '&rel=1&border=0&fs=1&autoplay=' +
      	(autoplay?1:0), n+"vid"+j, '235', '150', '9.0.0', false,
      	false, {allowfullscreen: 'true'});

	if(video_columns==1)
    	{
	console.log("video widths ",right_width-2)
      	$("#"+n+"vid"+j).css("width",""+right_width-2+"px");
      	$("#"+n+"vid"+j).css("height",""+(right_width-2)/1.5+"px");
    	}
    else if(video_columns==2)
	{
    video_width=(right_width-20)/2;
		console.log("video_widths 235");
		$("#"+n+"vid"+j).css("width",video_width);
    $("#"+n+"vid"+j).css("height",video_width/1.5);
	}
	
    
}



function getArtistVideo(artist,n){

    $.getJSON("http://gdata.youtube.com/feeds/api/videos?max-results=4&alt=json&q=\n\
    "+artist+"&format=5", function(data){

		var feed = data.feed;
  	var entries = feed.entry || [];

    for(j=0; j<entries.length; j++)
    {
      loadVideo(entries[j].media$group.media$content[0].url, false,j,n);                                }
		});
}


function putArtistImages(src,n){
var l=1;
for(var k=0; k<src.length; k++)
    {
        $("#"+n+"img"+l).css("background-image","url("+src[k]+")");
        l++;
    }
}
