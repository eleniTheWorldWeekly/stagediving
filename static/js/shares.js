

function fbshare(id,name){

var fburl = "http://www.facebook.com/share.php?u="+"http://localhost:8084/final/poster_view.html?id="+id+"&t="+name;

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


function twshare(id,name){
var turl = "https://twitter.com/share?url=" + encodeURIComponent("http://localhost:8084/final/poster_view.html?id=" +id)+ "&text=" + name;
console.log("url "+encodeURIComponent("http://localhost:8084/final/poster_view.html?id=" +id));
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
var gurl = "https://plusone.google.com/_/+1/confirm?hl=en&url="+"http://localhost:8084/final/poster_view.html?id="+id+"&title="+name;

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