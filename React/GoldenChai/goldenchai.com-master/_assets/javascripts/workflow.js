$(document).ready(function() {

  // workflow CONTENT SLIDERS (HORIZONTAL)
  $('#workflow-slider').royalSlider({
    controlsInside: false,
    navigateByClick: false,
    globalCaption: true,
    arrowsNavAutoHide: false,
    numImagesToPreload: 10
  });

  setTimeout(function(){
    $("#workflow-slider .twentytwenty-container").twentytwenty({default_offset_pct: 0.5});
  }, 400);


  $("[data-activate-slide-popup]").click(function(e){
    var popup = $(this).attr("data-activate-slide-popup");
    $("#" + popup).addClass("active");

    e.preventDefault();
  });

  $("[data-close-popup]").click(function(e){
    $(".slide-popup").removeClass("active");

    e.preventDefault();
  });

  // DEPLOY BUTTON
  $(".slide-graphic-deploy").click(function(){
    $(".slide-deploy").addClass("deployed");
    $("#workflow .arrow-down").addClass("active");
  });

});