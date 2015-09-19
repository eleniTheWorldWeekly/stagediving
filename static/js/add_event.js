function get_this_date(){

var fullDate = new Date()
console.log(fullDate);
//convert month to 2 digits
/*var twoDigitMonth = ((fullDate.getMonth().length+1) === 1)? (fullDate.getMonth()+1) : '0' + (fullDate.getMonth()+1);

var currentDate = fullDate.getDate() + "/" + twoDigitMonth + "/" + fullDate.getFullYear();
*/

var twoDigitMonth=fullDate.getMonth()+1;

var currentDate = fullDate.getFullYear() + "-" + twoDigitMonth + "-" + fullDate.getDate();

$(".date").attr("value",currentDate);

}

function makePopUp(){
    if(popupStatus==0){
	$("#backgroundPopup").css({
	"opacity": "0.9"
	});
	$("#backgroundPopup").fadeIn("slow");
	$("#popupContact").fadeIn("slow");
	popupStatus = 1;}

}

 function disablePopup(){
//disables popup only if it is enabled

	if(popupStatus==1){
	$("#backgroundPopup").fadeOut("slow");
	$("#popupContact").fadeOut("slow");
	popupStatus = 0;
        $("#results1").html("");

	}
        }
function select_day(){

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

var venue_exist=0;

function venueAyto(){
                suggestV= new Array();

                var i=0;

                $.getJSON("getVenues?", function(data){
                    
                    

                    $.each(data.Venues, function(){
                        suggestV[i]=data.Venues[i]["venueName"];
                        i++;
                    });
                    
                   // $("input.venue_nam").focus(console.log("what the fuck "+suggestV));
                   // $('input.venue_nam').autocomplete({source:suggestV});
                   $('input.venue_nam').autocomplete({
                        source:suggestV,
                        select: function(event, ui) {
                            venue_exist=1;
                            console.log(ui.item.value,venue_exist);
                            var i=0;
                        $.each(data.Venues, function(){

                        if(ui.item.value==data.Venues[i]["venueName"])
                         {
                             console.log(data.Venues[i]["venueInfo"]);
                             $(".venue_address").attr("value",data.Venues[i]["venueAddr"]);
                             $(".venue_country").attr("value",data.Venues[i]["venueCountry"]);
                             $(".venue_url").attr("value",data.Venues[i]["venueUrl"]);
                             $(".venue_genre").attr("value",data.Venues[i]["venueInfo"]);
                             $(".venue_phone").attr("value",data.Venues[i]["venuePhone"]);
                             $(".venue_capacity").attr("value",data.Venues[i]["venueCapac"]);

                         }

                        i++;
                    });
                        }
                    });
                });

                //console.log(x);
                //return false;
            }
var popupStatus = 0;
$(document).ready(function() {
	get_this_date();
        select_day();
        venueAyto();
        $(".close").click(function(){

            window.location.replace("main.html");
        })
        console.log(venue_exist);
        $(".add_another_artst").click(addmoreArtist);
        $(".save_event").click(save_event);

        $("form").submit(function(){
            var poster_src="";
            poster_src =poster_src+ "posters/"+$("#add_e_poster").attr("value").substring(12);
            console.log(poster_src);
            $(".add_event .main .left .poster").html("");
            $(".add_event .main .left .poster").css("background-image","url("+poster_src+")");
           
        })

        $(".add_poster").click(function(){
            console.log("make pop up");
            makePopUp();
            console.log(popupStatus);
        })

        $("#popupContactClose").click(function(){
            console.log("disable pop up");
                disablePopup();
                console.log(popupStatus);
                 //makeTheWall();
              //   location.reload();
                });

        $("#submitPoster").click(function(){
            console.log("disable pop up");
                disablePopup();
                console.log(popupStatus);
                 //makeTheWall();
              //   location.reload();
                });
    
});

var n_artists=3;
function addmoreArtist(){

    console.log("add more artist");
    n_artists++;
    //<input type="text" class="field artist" />
    $("#add_e_artist3").after("<input type='text' class='field artist' id='add_e_artist"+n_artists+"' />");

}


function save_event(){

    if(venue_exist==0)
        {
             var str2     = "t="+$("#add_e_venue_nam").attr("value")+"&address="+
             $("#add_e_venue_address").attr("value")+"&info="+$("#add_e_venue_genre").attr("value")+
             "&url="+$("#add_e_venue_url").attr("value")+"&city="+$("#add_e_town").attr("value")
         +"&country="+$("#add_e_venue_country").attr("value")+"&phone="+$("#add_e_phone").attr("value")
     +"&capacity="+$("#add_e_capacity").attr("value")+"&x=0&y=0";
     
      console.log(str2);
            var html = $.ajax({
                    type: "GET",
                    data: str2,
                     async:false,
                    url: "CreateVenue"
                }).responseText;
            console.log(html);
        }

                    var str="";
                    console.log(n_artists);
                    for( k=1; k <=n_artists; k++){
                        if($("#add_e_artist"+k).attr("value")!=""){
                        str=str+"artist="+$("#add_e_artist"+k).attr("value");
                        str=str+"&";
                        console.log(  $("#add_e_artist"+k).attr("value") );
                    }
                    };

                    
                    if($("#add_e_poster").attr("value").substring(12)==''){
                        str     = str+"date="+
                        $("#add_e_date").attr("value")+"&place="+$("#add_e_venue_nam").attr("value")+"&price="+$("#add_e_entrance").attr("value")+
                        "&time="+$("#add_e_time").attr("value")+"&poster=default_poster.jpg";

                    }
                    else{
                        str     = str+"date="+
                        $("#add_e_date").attr("value")+"&place="+$("#add_e_venue_nam").attr("value")+"&price="+$("#add_e_entrance").attr("value")+
                        "&time="+$("#add_e_time").attr("value")+"&poster="+$("#add_e_poster").attr("value");

                    }
                        console.log(str);
                    var result = $.ajax({
                        type: "GET",
                        data: str,
                        async:false,
                        url: "addEvent"
                    }).responseText;

                    console.log(result);
                    $("#results").html("");
                    $("#results").html(result);
                        
                    $("#add_e_venue_nam").attr("value","");
                    
                    $("#add_e_venue_address").attr("value","");
                    $("#add_e_venue_genre").attr("value","");
                    $("#add_e_venue_url").attr("value","");
                    $("#add_e_town").attr("value","");
                    $("#add_e_venue_country").attr("value","");
                    $("#add_e_phone").attr("value","");
                    $("#add_e_capacity").attr("value","");
                    $("#add_e_date").attr("value","");
                        

                 //   return false;


}