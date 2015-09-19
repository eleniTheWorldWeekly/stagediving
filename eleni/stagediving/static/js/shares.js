

function fbshare(id,name,date,venue,town,image_src){
//console.log(id,name,image_src);
//with this the title is the same as the url
//var fburl = "http://www.facebook.com/share.php?u="+"http://localhost:8084/final/poster_view.html?id="+id+"&t="+"mplamplam";
//with this we do not have title
//var fburl = "http://www.facebook.com/share.php?u=http://stagediving.gr/home/?event_id="+id+"&t="+name; 
//$fb_status_with_new_line = "Text before new line" . "
//    " . "Text after new line";
name=name.replace(/ /g,"+");
var fburl='http://www.facebook.com/sharer.php?s=100&p[title]='+name+'&p[summary]='+date + "+" + venue+"+in+"+ town+'&p[url]=http://stagediving.gr/?event_id='+id+'&p[images][0]=http://stagediving.gr'+image_src;
console.log(fburl);
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

}


function twshare(id,text){

//var text=name+date +"|"+ venue ;
//console.log(text);
//var turl = "https://twitter.com/share?text="+text;
var turl = "https://twitter.com/share?url=http://stagediving.gr/?event_id=" +id+ "&text=" + text ;
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


}

function gooshare(id,name){
    //console.log(id,name);

var gurl = "https://plusone.google.com/_/+1/confirm?hl=en&url="+"http://stagediving.gr/?event_id="+id+"&title="+name;

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

}
