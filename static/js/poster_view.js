var map_open= 0 ;
var nArtists;
function make_poster_view(id){


nArtists=1;
get_event_info_by_id(id);

}



function get_event_info_by_id(id){
$(".poster_view .main .right .artists").html("");
$(".poster_view .main .right .artists_details").html("");
i=0;
for (var k = 0; k < concertsID_attends.length; k++) {
        //console.log(concertsID_attends[k][0]);
        if(concertsID_attends[k][0]==id){
           // console.log(concertsID_attends[k][0],"nattends" ,concertsID_attends[k][1] );
            var attends=concertsID_attends[k][1];

        }
        
    }

$.each(json.events, function(){
    if(json.events[i]["Id"]==id){
        codeAddress(json.events[i]["venue"]["venueAddr"],json.events[i]["venue"]["venueCity"],json.events[i]["venue"]["venueCountry"]);
       
        $(".poster_view .main .left .poster").css("background-image","url(posters/"+json.events[i]["Poster"]+")");
        $(".poster_view .main .right .date").html(json.events[i]["Date"]);
        $(".poster_view .main .right .attend .attend_number").html(attends);
        $("#poster_view_town").html(json.events[i]["venue"]["venueCity"]);
        $.each(json.events[i]["artists"], function(index,elem){
        $(".poster_view .main .right .artists").append(json.events[i]["artists"][index]["artist"]+"</br>");
        complete_artists_info(json.events[i]["artists"][index]["artist"]);
        });
        $("#poster_view_time").html(json.events[i]["Date"]);

        $("#poster_view_venue").html(json.events[i]["venue"]["venueName"]);
        $("#poster_view_entrance").html("€ "+json.events[i]["Price"]);
        $(".poster_view .main .right .venue_info .venue_name").html(json.events[i]["venue"]["venueName"]);
        $(".poster_view .main .right .venue_info .info").html("Genre: "+json.events[i]["venue"]["venueInfo"]+
        "</br>Url: "+json.events[i]["venue"]["venueUrl"]+"</br>Address: "+json.events[i]["venue"]["venueAddr"]+
    ", " +json.events[i]["venue"]["venueCity"]+""+json.events[i]["venue"]["venueCountry"]+"</br>Phone: "
+json.events[i]["venue"]["venuePhone"]+"</br>Capacity: "+json.events[i]["venue"]["venueCapac"]);

}
    i++;
});


}


var geocoder;
  var map;
  var infowindow = new google.maps.InfoWindow();
  var marker;
var image= "icons/pin-on-google-map.png";;
/*  function initialize2() {

  // Create an array of styles.
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
    zoom: 11,
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

  image = "icons/pin-on-google-map.png";
  // Creating a marker and positioning it on the map
  var marker = new google.maps.Marker({
  position: new google.maps.LatLng(-34.397, 150.644),
  map: map,
   title: 'Venue',
  clickable: false,
  icon: image
  });
}

*/

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
          //console.log("the data "+results[0].geometry.location.lat());
           //console.log("the data "+results[0].geometry.location.lng());
          // console.log("the data "+results[0].geometry.location);
           //document.getElementById('x').value=results[0].geometry.location.lat();
           //document.getElementById('y').value=results[0].geometry.location.lng();
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
                             
                             /*  $.each(jsonLastfm.artist.image, function(index,elem){
                                   src[index]=jsonLastfm.artist.image[1]["#text"];

                               });
                               console.log(src.length);*/
                               
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
                            //var j=1;
                               $.each(jsonLastfm.images.image, function(index,elem){
                                  
                                 
                                  src[index]=elem.sizes.size[2]["#text"];
                           });

                              
                            // var j=1;
                             
                            

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
				//console.log("the data "+JSON.stringify(data));
				var feed = data.feed;
  				var entries = feed.entry || [];
  				
                                for(j=0; j<entries.length; j++)
                                    {

                                        loadVideo(entries[j].media$group.media$content[0].url, false,j,n);
                                    }

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