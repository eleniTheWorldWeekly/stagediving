var n_cols;
var col_width;
var json;       //to json poy epistrefei to retrieve concerts
var user="";
var userId=0;

$(document).ready(function() {

if(localStorage.getItem("username")!=null){
    $(".login > .results").html("Welcome  "+localStorage.getItem("username"));
    console.log("local storage: "+localStorage.getItem("username")+localStorage.getItem("userid"));
    userId=localStorage.getItem("userid");
    
}
else{
    console.log("user has not loged in in the past");
}

//dhmioyrgia sthlvn toy grid

 make_grid();

//retrieve concerts

var str2="";
str2=str2+"towns=Volos&";
str2=str2+"starts=&ends=";
             $.ajax({
                type: "GET",
                url: "retrieveConcerts",
                data: str2,
                dataType: 'json',
                async: false,
                success:function(data){
                json=data;
                make_wall(json);
                }
             })

//on window resize fix the columns
$(window).resize(function() {
     make_grid();
     make_wall(json);
});



get_next_week_date();
$(".imageWall").hover(
  function () {
    $(".wall_view").css("color","#CCCCCC");
  },
  function () {
    $(".wall_view").css("color","white");
  	}
	);


$(".imageList").hover(
  function () {
    $(".list_view").css("color","white");
  },
  function () {
    $(".list_view").css("color","#CCCCCC");
  	}
	);

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
	hide_expanded($(this).parent());


});

$(".track_cities_button").click(function(){

   show_expanded($(this).attr("class"));
});

$(".cities_buttom").click(function(){

	check_town($(this));

});

//login action
$(".login > form > button ").click(login);

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
                                   // filter_run();
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
    $(".wall").html("");
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



			//console.log(col_width);

			for(i=1; i<=n_cols; i++)
			{

			var div=jQuery('<div/>', {
    				class: 'col'+i+' col',
    				}).appendTo(".wall");


			}
       //kathorismos platous expanded menu
       if(n_cols==1){
           $(".expanded").css("width",col_width-40);
       }
       else{
       $(".expanded").css("width",2*col_width-40);
       }
}


//data: to json poy exei epistrepsei to retrieveConcerts
//Dhmioyrgei ton toixo
function make_wall(data)
{
 var i=0;
 var col=1;

 $.each(data.events, function(){
  if(col==n_cols+1){col=1;}
  var div_poster=jQuery('<div/>', {
    	class: 'poster'
    	}).appendTo(".col"+col);

  var img=new Image();
  $(div_poster).append(img);
  $(img).addClass("col");
  $(img).attr('src',"posters/"+data.events[i]["Poster"]);
  $(img).fadeIn();
  $(img).attr('alt',data.events[i]["concertID"]);
  col++;
  i++;
  })
  $(".col").css("width",col_width);

}