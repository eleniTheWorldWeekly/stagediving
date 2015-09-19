$(document).ready(function() {
    
    //placeCover($("body"));
    $(".site.lrcontent").css("margin-top",0);
	$(".site.lrcontent").css("margin-left",0);
	$(".site.lrcontent").css("margin-bottom",0);
	$(".lrdiscoverwidget").height($(window).height());
	$(".site.lrcontent").css("margin",0);
	console.log(  $("input[name='submit']").val());
	console.log($(".submit").val());
   /* $("input[name='submit']").click(function(){
	console.log("clicked");
       $(".first").hide();
       $(".second").show(); 
    });
    

	$(".submit").bind("click", function(e){
	console.log('clicked');
	});

	*/

	    $('#twitter_link').click(function() {
    window.open('http://www.twitter.com/iLovStageDiving');
      });
    //place the catchphrase
    //console.log()
    //$("#catchphrase").css("left",$("#logo span").position().left+40);
    //$("#catchphrase").css("top",$("#logo span").position().top + 160);
    //$("#catchphrase").width($("#logo span").first().width());
    //console.log("diving width "+$("#logo span").first().width());
});

/*function placeCover(container){
    //console.log("the id of the section "+container.width())
    $bgimg = container.find(".cover");
    $preloader=$("#preloader");

    $bgimg.load(function() {
        var $this=$(this);
        FullScreenBackground($this,container);
        $preloader.fadeOut("fast");
        $this.delay(200).fadeIn("slow");
    });
}

function FullScreenBackground(theItem,theContainer){
    var winWidth=$(window).width();
    var winHeight=$(window).height();
    var imageWidth=$(theItem).width();
    var imageHeight=$(theItem).height();
    var picHeight = imageHeight / imageWidth;
    var picWidth = imageWidth / imageHeight;
    if ((winHeight / winWidth) < picHeight) {
        $(theItem).css("width",winWidth);
        $(theItem).css("height",picHeight*winWidth);
    } else {
        $(theItem).css("height",winHeight);
        $(theItem).css("width",picWidth*winHeight);
    };
    //$(theContainer).css("width",winWidth-($theBorder*2));
    //$(theContainer).css("height",winHeight-($theBorder*2));
    $(theItem).css("margin-left",(winWidth- $(theItem).width())/2);
    $(theItem).css("margin-top",(winHeight- $(theItem).height())/2);
}*/
