//= require './lib/readmore.min'


$(document).ready(function() {
  $(window).scroll(function(){
    var scrollPos = $(window).scrollTop();
    if (scrollPos > 3){
      $("header").addClass("collapsed");
    }else{
      $("header").removeClass("collapsed");
    }
  });


  // ACCORDION AUTO SCROLL FOR MOBILE
  // **************************************
  if ($("body").hasClass("screen_xs"))
  {
    $(".primary-accordion .panel-title").click(function(){
      var collapsedAccordionItemHeight = 110;

      $(this).parent(".panel").toggleClass("active");
      $(this).parent(".panel").siblings().removeClass("active");

      $('html, body').animate({
        scrollTop: ($(this).parent(".panel").index() * collapsedAccordionItemHeight)
        }, 50);
    });
  }

});
