var commit_venue = true;
var artist_ids = []
var poster_id = -1
var venue_id = -1


function get_this_date(){

var fullDate = new Date();

//convert month to 2 digits

var twoDigitMonth=fullDate.getMonth()+1;

var currentDate = fullDate.getDate()+ "-" + twoDigitMonth + "-" + fullDate.getFullYear() ;

//Date field is empty
//$(".date").attr("value",currentDate);

}


/*function select_day(){

		var dates = $( ".date" ).datepicker({
			defaultDate: "+1w",
			changeMonth: true,
			numberOfMonths: 1,
			dateFormat: "yy-mm-dd",
			onSelect: function( selectedDate ) {
				console.log(selectedDate);
			}
		});
}
*/


function handleFileSelect(evt) {
	 $("#poster").css("-webkit-background-size","cover" );
	   $("#poster").css("background-size:","cover" );
	var file_name="";
    var files = evt.target.files; // FileList object 
    // Loop through the FileList and render image files as thumbnails.
    for (var i = 0, f; f = files[i]; i++) {

      // Only process image files.
      if (!f.type.match('image.*')) {
        continue;
      }
      var reader = new FileReader();
      // Closure to capture the file information.
      reader.onload = (function(theFile) {
        return function(e) {
	  
           $("#poster").css("background-image","url("+e.target.result+")");
           
           file_name=theFile.name;
          // console.log(file_name);
           //$(".image #image_url").val(file_name);
        };      
      })(f);
      // Read in the image file as a data URL.
      reader.readAsDataURL(f); 
    }
}

$(document).ready(function() {

document.getElementById('fileupload').addEventListener('change',handleFileSelect, false);


$("#poster").css("background-image","url(/static/icons/overlay.png)");


var date = $( ".datepicker" ).datepicker({
    defaultDate: "+1w",
    changeMonth: true,
    numberOfMonths: 1,
    //dateFormat: "yy-mm-dd",
    dateFormat: "dd-mm-yy"
  });






/*
the functions below are required for CSRF protection
*/
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



/*isos auta den xreiazontai*/
$(".search_artist").live("click", function(event) {
    //console.log($(event.currentTarget).val())
    search_by_artist($("#artist_field").val());

});

$(".remove_artist_row").live("click", function() { 
	var artist_ID=parseInt($(this).next().next().val());
	var index=artist_ids.indexOf(artist_ID);
	artist_ids.remove(index);
	//console.log("artist_ids",artist_ids);
	//artist_ids.splice($(this).parent().attr('id'),1);
	$(this).parent().parent().remove();
	//console.log("artist_ids",artist_ids);
	num_of_artists--;
	
})



$(".edit_artist_row").live("click", function() { 
	$(this).parent().parent().find(".add_event_artist_box").toggleClass("close").toggleClass("open");

	if($(this).parent().parent().find(".add_event_artist_box").hasClass("close"))
	{
		$(this).parent().parent().css("border-bottom-style","dashed");
	}
	
})


$("#add_image_url").live("click", function(){

	var artist_id=$(this).parent().parent().attr('id');
	var img_url=$(".artists_field#"+artist_id+" .add_event_row #artist_image_url").val();
	//console.log(artist_id,img_url );

	for(j=1; j<=6; j++)
	{
		if($(".artists_field#"+artist_id +" .add_ev_art_img_content #add_ev_art_img"+j).hasClass("empty"))
		{
			if(j==1)
			{
				$(".add_event_artist_row .artist_image").css("background-image","url("+img_url+")");
			}
			$(".artists_field#"+artist_id +" .add_ev_art_img_content #add_ev_art_img"+j).css("background-image","url("+img_url+")");
			$(".artists_field#"+artist_id +" .add_ev_art_img_content #add_ev_art_img"+j).removeClass("empty");
			return;
		}
	}
	
});


$("#add_video_url").live("click", function(){
	video_numb++;
	if (video_numb<=4)
	{

		/*$(this).parent().next().append("<div id='add_ev_art_vid"+video_numb+"'><div class='thumb_video' ></div>"+
		"<div id='remove_add_ev_art_vid'></div></div>");
		$("#add_ev_art_vid"+video_numb+" .thumb_video").oembed($(this).prev().val());*/
		parts=$(this).prev().val().split('?v=');
		//console.log(parts[0]);
		$(this).parent().next().append("<div id='add_ev_art_vid"+video_numb+"'>"+
		"<iframe  width:'227' height:'125' src='http://www.youtube.com/embed/"+parts[1]+"' frameborder='0' allowfullscreen></iframe><div id='remove_add_ev_art_vid'></div></div>");
		
		

		//$(".artists_field#"+id_of_artist+" .add_ev_art_vid_content #add_ev_art_vid"+(j+1)).html("<iframe  width:'227' height:'125' src='http://www.youtube.com/embed/"+parts[0]+"' frameborder='0' allowfullscreen></iframe><div id='remove_add_ev_art_vid'></div>");

	}
	else
	{
		video_numb--;
	}
	//console.log("num of videos",video_numb);

	
	
	
	//$("#add_ev_art_vid1 iframe").css({"width":"148", "height":"90"});
	
});

$("#remove_add_ev_art_img").live("click", function(){
	$(this).parent().css("background-image","url(/static/icons/overlay.png)");
	$(this).parent().addClass("empty");

});

$("#remove_add_ev_art_vid").live("click", function(){
	$(this).parent().remove();
	video_numb--;
	//console.log("num of videos",video_numb);

});

$('#fileupload').fileupload({
    /* ... */
    /*progressall: function (e, data) {
        var progress = parseInt(data.loaded / data.total * 100, 10);
        $('#progress .bar').css(
            'width',
            progress + '%'
        );
    },*/
    datatype:"json",
    add: function (e, data) {
         //console.log("add", data)
         data.submit()
    },
    done: function (e, data) {
        //console.log("done", data)
        data_result = JSON.parse(data.result)[0];
        $("#poster").css("-webkit-background-size","cover" );
	$("#poster").css("background-size:","cover" );
	$("#poster").css("background-image","url(/static/posters/" + data_result.name + ")" );
        // add poster's id in a hidden field as a foreign key
       // console.log("done", data_result);
        poster_id = data_result.id;

    }
});


	get_this_date();

        


	$("#add_another_artist_submit").click(function(){


	name = $("#artist_autocomplete").val();
	
	
	if (name.length > 0 && name.length < 100){
		$.ajax({
			url: "/artist/",
			type: "POST",
			dataType: "json",
			data: {name: name},
//artist fields : name, bio, images("url,url,..."), videos ("url,url,...")
//epistrefei ola ta pedia apothikeuei h ananewnei thn eggrafh tou artist
// GET /artist?query=blablabla epistrefei mono ta pedia name,bio,images,videos
			success: function( data ) {

				log_artist(data);
				
			}
		
		});
	}
	
	
	
	return false;
	});


	
/*koni
 	$("#add_venue_submit").click(function(){
            name = $("#venue_autocomplete").val()
            if (name.length > 0 && name.length < 255 && commit_venue == true){
		$.ajax({
			url: "/venue/",
                        type: "POST",
			dataType: "json",
			data: {name: name,info:$("#id_info").val(),country:$("#id_country").val(),
				url:$("#id_url").val(),city:$("#id_city").val(),
				capacity:parseInt($("#id_capacity").val()) || 0,address:$("#id_address").val(),
				phone:$("#id_phone").val()},
				success: function( data ) {
					if(data.success == true){
						console.log("successfully added venue")
                               			log_venue(data);
					}
                            		else console.log("something bad happened")
					}
				});
           }
           
           return false;
	});
*/

        $("#save_event").click(function(){

		name = $("#venue_autocomplete").val();
  		//console.log(artist_ids,name,poster_id )
		if (artist_ids.length == 0 || name.length == 0 || poster_id == -1){
			$("#message").html("please add missing info ");
			return;
		}
  		else{

            if (name.length > 0 && name.length < 255 && commit_venue == true){
			$.ajax({
				url: "/venue/",
                        	type: "POST",
				dataType: "json",
				data: {name: name,info:$("#id_info").val(),country:$("#id_country").val(),
				url:$("#id_url").val(),city:$("#id_city").val(),
				capacity:parseInt($("#id_capacity").val()) || 0,address:$("#id_address").val(),
				phone:$("#id_phone").val()},
				success: function( data ) {
					if(data.success == true){
						//console.log("successfully added venue")
                               			venue_id = data.pk;
						save_event();
					}
                            		else //console.log("something bad happened")
				}
					
			});
           	}
			else if(name.length > 0 && name.length < 255 && commit_venue == false)
			{
				save_event();
			}
		}

	});
/*
    $("input#artist_autocomplete.field.ui-autocomplete-input").live('keydown', function(event){
    	event.preventDefault();
    var keycode = (event.keyCode ? event.keyCode : event.which);
    console.log(event.which);
    if (event.which == '13') {
    	event.preventDefault();
    	console.log("'heyyy");
        $('#add_another_artist_submit').trigger('click');
    }
	});
*/


        $( "#artist_autocomplete" ).autocomplete({
		source: function( request, response ) {
			$.ajax({
				url: "/event/events/ajax/list/artist/",
				dataType: "jsonp",
				data: {
					name_startsWith: request.term
					},
				success: function( data ) {
					response( $.map( data, function( item ) {
					return {
						label: item.fields.name,
						value: item.fields.name,
						obj: item
						}
					}));
				}
			});
		},
		minLength: 2,
		select: function( event, ui ) {

			//console.log(ui.item.obj);
			log_artist( ui.item.obj );

			},
		open: function() {
			//$( this ).removeClass( "ui-corner-all" ).addClass( "ui-corner-top" );
			},
		close: function() {
			//$( this ).removeClass( "ui-corner-top" ).addClass( "ui-corner-all" );
			}
	});


	$( "#venue_autocomplete" ).autocomplete({
		source: function( request, response ) {
			$.ajax({
				url: "/event/events/ajax/list/venue/",
				dataType: "jsonp",
				data: {
					name_startsWith: request.term
					},
				success: function( data ) {
                   			if(data.length == 0){
                    				$("#venue_form").show();

//on select city put the value in the field
						$("select").change(function () {
						  var str = "";
						  $("select option:selected").each(function () {
							str += $(this).text() + " ";
						      });
						  $("#id_city").val(str);
						})
						.trigger('change');

						commit_venue = true;
                   			}
                   			else{
						response( $.map( data, function( item ) {
							//console.log(item.fields.city);
                        				return {
								label: item.fields.name +", "+ item.fields.city,
								value: item.fields.name+", "+item.fields.city,
								obj: item
								}
							}));
					}
                                     
				}
			});
		},
		minLength: 2,
		select: function( event, ui ) {
			commit_venue = false;
			log_venue( ui.item.obj);
			},
		open: function() {
			//$( this ).removeClass( "ui-corner-all" ).addClass( "ui-corner-top" );
			},
		close: function() {
			//$( this ).removeClass( "ui-corner-top" ).addClass( "ui-corner-all" );
			}
		});
    });





var num_of_artists=0;


function log_artist( message ) {

$( "#artist_autocomplete" ).attr('value','');
//close all the open boxes
$(".add_event_artist_box").each(function () {
	$(this).removeClass("open");
	$(this).addClass("close");
	$(this).parent().css("border-bottom-style","dashed");
	
});

artist_ids.push(message.pk);
var src="";
//console.log(message);
$( "<div class='artists_field' id="+num_of_artists+"/>" ).prependTo("#artist_results");
show_artists_fields(num_of_artists,message);
$.ajax({
              url: "http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist="+
              message.fields.name+"&api_key=75904470b83768ccf1292302837281c3&format=json",
              dataType: 'json',
              async: false,
              success: function(jsonLastfm){
                //console.log(jsonLastfm);
                 var artist_1=removePunctuation(message.fields.name);
                 //console.log(artist_1);
                if(jsonLastfm.error!=6)
                {
                   //bio=jsonLastfm.artist.bio.summary;
                   $(".artists_field#"+num_of_artists).prepend("<div class='add_event_artist_row'><div class='artist_image' style='background-image:url("+jsonLastfm.artist.image[1]["#text"]+")'></div><div class=artist_name>"+artist_1+"</div><div class='remove_artist_row'>Remove</div><div class='edit_artist_row'>Edit</div><input type='hidden' value='"+message.pk+"'/>");
                   populate_artist_info(num_of_artists,jsonLastfm.artist.bio.summary,message.fields.name);
                }

                else
                {
                	$(".artists_field#"+num_of_artists+" .add_event_artist_box").prepend("<div class='user_info add_event_row'>No data found in last.fm </br> Complete some data for your poster</div>");
                	$(".artists_field#"+num_of_artists).prepend("<div class='add_event_artist_row'><div class='artist_image' '></div><div class=artist_name>"+artist_1+"</div><div class='remove_artist_row'>Remove</div><div class='edit_artist_row'>Edit</div><input type='hidden' value='"+message.pk+"'/></div></div>");
                }
                
               
              }
            });


num_of_artists++;



	
}



Array.prototype.remove = function(from, to) {
  if(this.length==0)
	{return}
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
};

var video_numb;

function show_artists_fields(id_of_artist,msg)
{
	video_numb=0;
	$(".artists_field#"+id_of_artist).append("<div class='add_event_artist_box open'><div class='add_event_row'><label for='add_event_artist_bio'>Bio:</label><div contenteditable='true' id='add_event_artist_bio' class='field'></div></div>"+
		"<div class='add_event_row'><label for='artist_image_url'>Images:</label><input id='artist_image_url' class='field' placeholder='image url'></input><button id='add_image_url'>Upload image</button></div>"+
		"<div class='add_ev_art_img_content'><div id='add_ev_art_img1' class='empty'><div id='remove_add_ev_art_img'></div></div>"+
		"<div id='add_ev_art_img2' class='empty'><div id='remove_add_ev_art_img'></div></div>"+
		"<div id='add_ev_art_img3' class='empty'><div id='remove_add_ev_art_img'></div></div>"+
		"<div id='add_ev_art_img4' class='empty'><div id='remove_add_ev_art_img'></div></div>"+
		"<div id='add_ev_art_img5' class='empty'><div id='remove_add_ev_art_img'></div></div>"+
		"<div id='add_ev_art_img6' class='empty'><div id='remove_add_ev_art_img'></div></div></div>"+
		"<div class='add_event_row'><label for='artist_video_url'>Videos:</label><input id='artist_video_url' class='field' placeholder='youtube video url'></input><button id='add_video_url'>Upload video</button></div>"+
		"<div class='add_ev_art_vid_content'>"+
		"<div id='add_ev_art_vid1'><div class='thumb_video' ></div><div id='remove_add_ev_art_vid'></div></div>"+
		"<div id='add_ev_art_vid2'><div class='thumb_video' ></div><div id='remove_add_ev_art_vid'></div></div>"+
		"<div id='add_ev_art_vid3'><div class='thumb_video' ></div><div id='remove_add_ev_art_vid'></div></div>"+
		"<div id='add_ev_art_vid4'><div class='thumb_video' ></div><div id='remove_add_ev_art_vid'></div></div>"+
		"</div></div>");
		
	
	$.getJSON("http://gdata.youtube.com/feeds/api/videos?max-results=4&alt=json&q="+
	msg.fields.name+"&format=5", function(data){

    //console.log(data);
    
    var entries = data.feed.entry || [];
    var parts;
    var usefull;
    for(j=0; j<entries.length; j++)
    {
      video_numb++;
      parts=entries[j].media$group.media$content[0].url.split('/v/');
      usefull=parts[1].split('?version');
     // console.log(usefull[0]);
      $(".artists_field#"+id_of_artist+" .add_ev_art_vid_content #add_ev_art_vid"+video_numb).html("<iframe  width:'227' height:'125' src='http://www.youtube.com/embed/"+usefull[0]+"' frameborder='0' allowfullscreen></iframe><div id='remove_add_ev_art_vid'></div>");
      //$(".artists_field#"+id_of_artist+" .add_ev_art_vid_content #add_ev_art_vid"+j+" .thumb_video").oembed("http://www.youtube.com/v/BhOO7F6K4Uo?version=3&f=videos&app=youtube_gdata");                        
    }
    });
   
}



function populate_artist_info(id_of_artist,bio,artisti_name)
{
	$(".artists_field#"+id_of_artist+ " .add_event_row #add_event_artist_bio").html(bio);
	var img_numb=1;

	$.ajax({
            url: "http://ws.audioscrobbler.com/2.0/?method=artist.getimages&artist="+
            artisti_name+"&api_key=75904470b83768ccf1292302837281c3&format=json",
            dataType: 'json',
            async: false,
            success: function(jsonLastfm){
                //console.log(jsonLastfm);
                src=new Array();
                 
                if(jsonLastfm.error!=6 && typeof(jsonLastfm.images.image) !="undefined")
                {
                   
                 if(jsonLastfm.images.image.length > 0)
                 {
                    
                     $.each(jsonLastfm.images.image, function(index,elem){
                     $(".artists_field#"+id_of_artist+" .add_ev_art_img_content #add_ev_art_img"+img_numb).css("background-image","url("+elem.sizes.size[2]["#text"]+")");
                     $(".artists_field#"+id_of_artist+" .add_ev_art_img_content #add_ev_art_img"+img_numb).removeClass("empty");
                     img_numb++;
                     if(img_numb==6)
                     {
                     	return;
                     }
                     });
                 }

                }       
            }
    });
}


function log_venue( venue ) {
 //console.log(venue, venue.fields.address,venue.fields.city,venue.fields.url)
  venue_id = venue.pk;
  $("#venue_info .add_event_row #add_ev_venue_address").html(venue.fields.address);
  $("#venue_info .add_event_row #add_ev_venue_country").html(venue.fields.country);
  $("#venue_info .add_event_row #add_ev_venue_url").html(venue.fields.url);
  $("#venue_info .add_event_row #add_ev_venue_phone").html(venue.fields.phone);

  $(".add_event_row.venue_fields").css("display", "block");
  
  //$("#venue_form #id_country").val(venue.fields.country)
  //$("#venue_form #id_city").val(venue.fields.city)
  //$("#venue_form #id_phone").val(venue.fields.phone)
  //$("#venue_form #id_capacity").val(venue.fields.capacity)
  //$("#venue_form #id_address").val(venue.fields.address)
  //$("#venue_form #id_url").val(venue.fields.url)

  //$("#venue_form").show();
	
}
/*koni
function save_event(){
  console.log(artist_ids,venue_id,poster_id )
	if (artist_ids.length == 0 || venue_id == -1 || poster_id == -1){
		$("#message").html("please add missing info ");
	}
  else{
		
	$.ajax({
		url: "/event/",
        	type: "POST",
		dataType: "json",
		data: {
			date:$("#id_on_date").val(),
			price:$("#id_price").val(),
			time:$("#id_time").val(),
			artist_ids:JSON.stringify(artist_ids),
			venue_id:venue_id,
			poster_id:poster_id },
			success: function( data ) {
			if(data.success == true) 
			{
				console.log("successfully added event");
				$("#message").html("event successfully added");
			}
            		else 
			{
				console.log("something bad happened in save event");
				$("#message").html("something bad happened in save event</br>Maybe there are missing data or the event already exists");
			}			
			}
		});
	}

  return false;

}
*/


function save_event(){


	var price=$("#id_price").val();
	var time=$("#id_time").val();
	if(price=="")
	{
		price="";
	}
	if(time=="")
	{
		time="21:00";
	}


	get_data_for_artists();

	//console.log(artist_ids,venue_id,poster_id );
	/*
	$.ajax({
		url: "/event/",
        	type: "POST",
		dataType: "json",
		data: {
			date:$("#id_on_date").val(),
			price:$("#id_price").val(),
			time:$("#id_time").val(),
			artist_ids:JSON.stringify(artist_ids),
			venue_id:venue_id,
			poster_id:poster_id },
			success: function( data ) {
				if(data.success == true) 
				{
					console.log("successfully added event");
					$("#message").html("event successfully added");
				}
            			else 
				{
					console.log("something bad happened in save event");
					$("#message").html("something bad happened in save event</br>Maybe there are missing data or the event already exists");
				}			
			}
	});
	*/
  	return false;

}


function get_data_for_artists()
{


	var artists_data=new Object();
	//artists_data.artists=[{"name":"vodka"}];
	artists_data.artists[0].artist={"name":"vodka"};
	artists_data.artists.artist={"name":"juniors"};
	//console.log(artists_data);
}

var delay = (function(){
  var timer = 0;
  return function(callback, ms){
    clearTimeout (timer);
    timer = setTimeout(callback, ms);
  };
})();




