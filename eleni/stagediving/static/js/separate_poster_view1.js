//var turl = "https://twitter.com/share?url=" + encodeURIComponent(article.link) + "&text=" + encodeURIComponent(article.title);
//var fburl = "http://www.facebook.com/share.php?u="+encodeURIComponent(article.link)+"&t="+encodeURIComponent(article.title);
//var gurl = "https://plusone.google.com/_/+1/confirm?hl=en&url="+encodeURIComponent(article.link)+"&title="+encodeURIComponent(article.title);


$(document).ready(function() {

  var id_param = gup( 'id' );
  console.log(id_param, window.location.href);


//pernw tis plhrofories ths sugkekrimenhs sunaulias bash to ID ths


    $.ajax({
            type: "GET",
            url: "getEventsInfoById?id="+id_param,
            dataType: 'json',
            async: false,
            success:function(data){
              json=data;
            }
          })

    getAttends();
    make_poster_view(id_param);
    var url=window.location.href;
    var turl = "https://twitter.com/share?url=" + url + "&text=" + json.event["artists"][0]["artist"];
    var fburl = "http://www.facebook.com/share.php?u="+url+"&t="+json.event["artists"][0]["artist"];
    var gurl = "https://plusone.google.com/_/+1/confirm?hl=en&url="+url+"&title="+json.event["artists"][0]["artist"];
    console.log(turl);


    //emfanizei ston xrhsth ton xarth me thn topothesia tou venue ustera apo epilogh tou xrhsth
    $(".map_open").click(function(){
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

    //kleinontas o xrhsth thn selida epistrefei sthn kentrikh selida
    $(".close_poster_view").click(function(){
      window.location.href = "main.html";
});




/* facebook */
	$(".facebook").click(function(event) {
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
	$(".twitter").click(function(event) {
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
	$(".google").click(function(event) {
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



});


var concertsID_attends= new Array();

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
var nArtists;         //plhthos kallitexnvn pou summetexoun sthn sugkekrimenh sunaulia

function make_poster_view(id){
  nArtists=1;
  get_event_info_by_id(id);
}




//sumplhrwnei sthn selida ta stoixeia ths sunaulias

function get_event_info_by_id(id){

  $(".poster_view .main .right .artists").html("");
  $(".poster_view .main .right .artists_details").html("");
  var i=0;
  for (var k = 0; k < concertsID_attends.length; k++) {     
    if(concertsID_attends[k][0]==id){       
      var attends=concertsID_attends[k][1];
    }
  } 
  codeAddress(json.event["venue"]["venueAddr"],json.event["venue"]["venueCity"],json.event["venue"]["venueCountry"]);
  $(".poster_view .main .left .poster").css("background-image","url(posters/"+json.event["Poster"]+")");
  $(".poster_view .main .right .date").html(json.event["Date"]);
  $(".poster_view .main .right .attend .attend_number").html(attends);
  $("#poster_view_town").html(json.event["venue"]["venueCity"]);
  $.each(json.event["artists"], function(index,elem){
    $(".poster_view .main .right .artists").append(json.event["artists"][index]["artist"]+"</br>");
    complete_artists_info(json.event["artists"][index]["artist"]);
  });
  $("#poster_view_time").html(json.event["Date"]);
  $("#poster_view_venue").html(json.event["venue"]["venueName"]);
  $("#poster_view_entrance").html("€ "+json.event["Price"]);
  $(".poster_view .main .right .venue_info .venue_name").html(json.event["venue"]["venueName"]);
  $(".poster_view .main .right .venue_info .info").html("Genre: "+json.event["venue"]["venueInfo"]+
  "</br>Url: "+json.event["venue"]["venueUrl"]+"</br>Address: "+json.event["venue"]["venueAddr"]+
  ", " +json.event["venue"]["venueCity"]+""+json.event["venue"]["venueCountry"]+"</br>Phone: "
  +json.event["venue"]["venuePhone"]+"</br>Capacity: "+json.event["venue"]["venueCapac"]);
}


var geocoder;
var map;
var infowindow = new google.maps.InfoWindow();
var marker;
var image= "icons/pin-on-google-map.png";;




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
        alert("Geocode was not successful for the following reason: " + status);
      }
    });

   return true;



  }




//sumplhrwnei tis plhrofories gia ton kallitexnh penontas eikones kai bio apo to last.fm kai video apo to youtube
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
        var html="<div id='art"+nArtists+"'><div class='artist_info'><div class='venue_name' id='artist_name'>"+artist+"</div>"+
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
        $(".poster_view .main .right .artists_details").append(html);
        $.ajax({
                url: "http://ws.audioscrobbler.com/2.0/?method=artist.getimages&artist="+
                artist+"&api_key=75904470b83768ccf1292302837281c3&format=json",
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
        getArtistVideo(artist,nArtists);
        nArtists++;
  }



  function loadVideo(playerUrl, autoplay,j,n) {
    j++;
  	swfobject.embedSWF(
      	playerUrl + '&rel=1&border=0&fs=1&autoplay=' +
      	(autoplay?1:0), n+"vid"+j, '235', '150', '9.0.0', false,
      	false, {allowfullscreen: 'true'});
	}


//nArtists+'vid'+j
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