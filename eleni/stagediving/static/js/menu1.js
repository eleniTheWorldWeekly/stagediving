

//upologizei thn hmeromhnia pou tha exoume mia bdomada meta thn hmeromhnia pou exoume shmera (pedio From) kai sumplhrvnei to pedio To
function get_next_week_date(){
    var fullDate = new Date();
    console.log(fullDate);
    //convert month to 2 digits
    var twoDigitMonth = ((fullDate.getMonth().length+1) === 1)? (fullDate.getMonth()+1) : '0' + (fullDate.getMonth()+1);
    var currentDate = fullDate.getFullYear() + "-" + twoDigitMonth + "-" + fullDate.getDate();
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


var nextWeekDate=nextWeekYear +"-"+nextWeekMonth+"-"+nextWeekDate;

$("input.to").attr("value",nextWeekDate);
}

//sinarthsh show_expanded
//emfanizei to analogo expanded analoga me thn epilogh tou xrhsth
function show_expanded(clas){
    if(openExpanded!="")
    {
        hide_expanded($("#"+openExpanded));
    }
   
   if(clas=='search_by_artist')
   {    
       $("#search_by-artist").css("left",240);
       $("#search_by-artist span.close").css("background-image"," url(static/icons/close.jpg)");
       openExpanded="search_by-artist";
       search_by_artist();
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
                            "style='background-image:url(posters/"+data.events[i]["Poster"]+")'></div><div class='info'>"+
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
   }
   else if(clas=='track_cities_button')
    {
        $(".track_city span.close").css("background-image"," url(static/icons/close.jpg)");
        openExpanded="track_city";
        $(".track_city").css("left",240);
    }
	else if(clas=='image_login')
   {
        //if(localStorage.getItem("username")!=null || user!="" || sessionStorage.setItem('logged_in')=="yes"){
            create_login();
            if(user!="" || sessionStorage.getItem('logged_in')=="yes")
            {
                $(".login_register.expanded h2").html("LOGIN");
                $(".login_register.expanded .login").html("Welcome "+localStorage.getItem("username")+" Id: "+localStorage.getItem("userid")+
                    "</br><form><button id='log_out' > Log out </button></form>");
                    $('#log_out').bind('click', function() {
                        sessionStorage.removeItem('logged_in');
                        $('body').find('.thumb .attend').addClass("attend_active");
                        user="";
                        $(".login_register.expanded .login").html("You are now logged out");
                        return false;
                    });
            }
        //}
        else{
                create_sign_up();
                console.log("user has not loged in in the past");   
            }
        openExpanded="login_register";
	    $("#login_register").css("left",240);
        $("#login_register span.close").css("background-image"," url(static/icons/close.jpg)");
	}
    else if(clas=="image_add_event")
    {
        window.location.replace("event");
    }
    else if(clas=="my_concerts")
    {
        $("#my_concerts_exp .search_content").html("");
        openExpanded="my_concerts_exp";
        $("#my_concerts_exp").css("left",240);
        $("#my_concerts_exp span.close").css("background-image"," url(static/icons/close.jpg)");
        if(user!="" || sessionStorage.getItem('logged_in')=="yes"){
            console.log("user logged"+localStorage.getItem("username")+localStorage.getItem("userid"));
            feelUsersConcerts();
        }
        else{
            $(".my_concerts_exp .search_content").html("You have to login first!");
            }             
    }
    else if(clas=="aboutSD"){
        $("#AboutSD").css("left",240);
        $("#AboutSD span.close").css("background-image"," url(static/icons/close.jpg)");
        openExpanded="AboutSD";
    }
    console.log(openExpanded);
}

//shnarthsh search_by_artist
//pragmatopoiei anazhthsh bash onoma kallitexnh
//sto pedio tou onomatos pou sumplhrwnei o xrhsths xrhsimopoieitai auto completion


function hide_expanded(parent){
    openExpanded="";
    if(parent.attr("class")=="track_city expanded"){
		store_cities();
	}
    if(parent.attr("class")=="list_view_exp expanded"){
		wallView=1;
        $(".wall_view").css("color","white");
        $(".imageWall").css("background-image","url(static/icons/wall-view-over.png)");
        $(".list_view").css("color","#CCCCCC");
        $(".imageList").css("background-image","url(static/icons/list_view_1.jpg)");
	}
    parent.css("left",-1000);
}


function filter_run(){
   
    var str2="";
    localStorage.setItem('towns', JSON.stringify(tracked_cities));
    lastIdConcert=0;
    if(tracked_cities.length!=0)
    {
        console.log(tracked_cities,tracked_cities.length);
        for (i = 0; i < tracked_cities.length; i++) {
            str2=str2+"towns="+tracked_cities[i]+"&";
        }
    }
    else
    {
        str2=str2+"towns="+"Athens"+"&";     
    }              
    str2=str2+"starts=&ends=";
    console.log(str2);
    $.ajax({
        type: "GET",
        url: "retrieveConcerts3",
        data: str2,
        dataType: 'json',
        async: false,
        success:function(data){
            $('.posterWall').remove();
            if(data.events==null){
                console.log("empty!!");
            }
            else{
                json=data;
                totalNumberOfConcerts=json.events.length;
                last_col=1;
                console.log("Number of result"+totalNumberOfConcerts)
                make_wall(json);
                }
            }
    })
}
