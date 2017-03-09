function collapseMarquee(navName)
{
  $("#marquee-wrapper #marquee .marquee-headline h1").hide();

  if (navName)
  {
    $("body").addClass("visited-" + navName);
    $("#marquee-wrapper #marquee .marquee-headline .headline-" + navName).show();
  }else{
    $("#marquee-wrapper #marquee .marquee-headline .headline-default").show();
  }

  $("#manifestos").addClass("transitioning collapsed");
  $("#manifestos").removeClass("transitioned");

  setTimeout(function(){
    $("#manifestos").removeClass("collapsed");
  }, marqueeTransitionSpeed);

  setTimeout(function(){
    $("#manifestos").removeClass("transitioning");
  }, 700);
}

function activateFirstTab()
{
  $("body").addClass("manifesto-durability");
  $("body").addClass("page-manifestos");
  $("#marquee .nav li:eq(0)").addClass("active");
}


function toggleSummary(tabPane)
{
  var summaryEl = tabPane.find(".content-summary");
  var frontEl = tabPane.find(".content-front");;
  var backArrow = tabPane.find(".arrow-backward");

  backArrow.toggleClass("arrow-expand");

  tabPane.toggleClass("summary-active");

  frontEl.toggleClass("active");

  summaryEl.toggleClass("active");
}
