$(document).ready(function() {

  updateSite();

  // INITIALIZE SKROLLR. (IT"LL BE DESTROYED AND RE-INITIALIZED ON WINDOW RESIZE.)
  skrollrStylesheets.refresh();
  var s = skrollr.init();


  // ON WINDOW RESIZE: APPLY MOBILE CLASS FOR SMALL SCREENS, AND DESKTOP FOR LARGER
  $( window ).resize(function() {
    updateSite(true);
  });


  // ALSO UPDATE SKROLLR AND BODY CLASSES ON ORIENTATION CHANGE
  window.addEventListener("orientationchange", (function() {
    updateOrientationClass();
    updateSkrollr();
    updateSite(true);
  }), false);


  function updateOrientationClass(){
    windowWidth = $(window).width();
    windowHeight = $(window).height();

    // DETECT ORIENTATION
    if(windowHeight < windowWidth){
      $("body").addClass("orientation-landscape");
    }else{
      $("body").removeClass("orientation-landscape");
    }
  }


  // MOBILE NAV
  // ************************************
  $("#mobile-nav-icon").click(function(){
    var windowHeight = $(window).height() + 50;
    s.animateTo(windowHeight, { duration: 400 });
  });


  var refresh;
  var screenChange;

  function updateSite(refresh){

    // window variables
    windowWidth = $(window).width();
    windowHeight = $(window).height();

    // SCREEN WIDTH DETECTION (MOBILE, TABLET, DESKTOP)
    // ************************************************
    if ((windowWidth > {{ site.mobile_end_width }}) && (windowWidth <= {{ site.tablet_end_width }}))
    {
      // ITS A TABLET SIZED WINDOW!
      if ($("body").hasClass("screen-tablet")){return "";}
      $("body").removeClass("screen-mobile screen-laptop screen-desktop");
      $("body").addClass("screen-tablet");
      screenChange = true;
    }
    else if (windowWidth <= {{ site.mobile_end_width }})
    {
      // ITS A MOBILE SIZED WINDOW!
      if ($("body").hasClass("screen-mobile")){return "";}
      $("body").removeClass("screen-tablet screen-laptop screen-desktop");
      $("body").addClass("screen-mobile");
      screenChange = true;
    }
    else if (windowWidth <= {{ site.laptop_end_width }})
    {
      // ITS A LAPTOP SIZED WINDOW!
      if ($("body").hasClass("screen-laptop")){return "";}
      $("body").removeClass("screen-tablet screen-mobile screen-desktop");
      $("body").addClass("screen-laptop");
      screenChange = true;
    }
    else
    {
      // ITS A DESKTOP SIZED WINDOW!
      if ($("body").hasClass("screen-desktop")){return "";}
      $("body").removeClass("screen-tablet screen-mobile screen-laptop");
      $("body").addClass("screen-desktop");
      screenChange = true;
    }

    updateOrientationClass();


    // DETERMINE WHETHER TO DISPLAY SITE AS SINGLE ONE-PAGE OR MULTIPLE PAGES
    // ***************************************
    if ($("body").hasClass("index"))
    {
      var isSubpage;

      if ((windowWidth <= {{ site.multipages_start_width }}))
      {
        if ((!screenChange) && ($("body").hasClass("site-multiple-pages"))){return "";}

        $("body").removeClass("site-single-page page-features page-workflow");
        $("body").addClass("site-multiple-pages page-manifestos");

        if (refresh){
          updateSkrollr();
        }

      }else{

        if ((!screenChange) && ($("body").hasClass("site-single-page"))){return "";}

        $("body").removeClass("site-multiple-pages");
        $("body").addClass("site-single-page");

        if (refresh){
          updateSkrollr();
        }
      }
    }else{

      if (refresh){
        updateSkrollr();
      }
    }
  }


  function updateSkrollr(){
    s.destroy();
    skrollrStylesheets.refresh();
    s = skrollr.init();
  }



  var scrollSpeed;

  // DEEP LINK STUFF (HASH CHANGE)
  $.history.on('load change push pushed', function(event, url, type) {

    if (event.type === "load"){
      scrollSpeed = 0;
    }else{
      scrollSpeed = {{ site.default_scroll_speed }};
    }

    var scrollPos = $(window).scrollTop();

    switch(url){
      case "/info":
        activateFooter($(".footer-nav-cta.footer-nav-info"));
        break;

      case "/contact":
        activateFooter($(".footer-nav-cta.footer-nav-contact"));
        break;

      case "/manifestos":
        if ($("body").hasClass("footer-active")){
          collapseFooter();
        }
        if ((event.type != "push") && (event.type != "pushed") && (scrollPos > {{ site.manifestos_start }}))
        {
          smoothPageScroll({{ site.manifestos_start }}, scrollSpeed, "manifestos");
        }else{
          updatePageMeta("manifestos");
        }

        break;

      case "/durability":
        if ($("body").hasClass("footer-active")){
          collapseFooter();
        }
        if ((event.type != "push") && (event.type != "pushed") && (scrollPos > {{ site.manifestos_start }}))
        {
          smoothPageScroll({{ site.manifestos_start }}, scrollSpeed, "manifestos");
        }else{
          updatePageMeta("manifestos");
        }

        $('#marquee .nav .nav-durability').trigger('click');
        break;

      case "/usability":
        if ($("body").hasClass("footer-active")){
          collapseFooter();
        }
        if ((event.type != "push") && (event.type != "pushed") && (scrollPos > {{ site.manifestos_start }}))
        {
          smoothPageScroll({{ site.manifestos_start }}, scrollSpeed, "manifestos");
        }else{
          updatePageMeta("manifestos");
        }

        $('#marquee .nav .nav-usability').trigger('click');
        break;

      case "/art":
        if ($("body").hasClass("footer-active")){
          collapseFooter();
        }
        if ((event.type != "push") && (event.type != "pushed") && (scrollPos > {{ site.manifestos_start }}))
        {
          smoothPageScroll({{ site.manifestos_start }}, scrollSpeed, "manifestos");
        }else{
          updatePageMeta("manifestos");
        }

        $('#marquee .nav .nav-art').trigger('click');
        break;

      case "/workflow":
        if ($("body").hasClass("footer-active")){
          collapseFooter();
        }
        if ((event.type != "push") && (event.type != "pushed") && (scrollPos !== {{ site.workflow_start }}))
        {
          smoothPageScroll({{ site.workflow_start }}, scrollSpeed, "workflow");
        }else{
          updatePageMeta("workflow");
        }

        break;


      case "/features":
        if ($("body").hasClass("footer-active")){
          collapseFooter();
        }
        if ((event.type != "push") && (event.type != "pushed") && (scrollPos !== {{ site.features_start }}))
        {
          smoothPageScroll({{ site.features_end }}, scrollSpeed, "features");
        }else{
          updatePageMeta("features");
        }

        break;

      default:
        if ($("body").hasClass("footer-active")){
          collapseFooter();
        }
        break;
    }

    // alert(event.type + ': ' + url);
  }).listen('hash');



  var hashname = window.location.hash;

  // LAZY LOAD SUBPAGES IF NOT MOBILE AND ON INDEX PAGE
  // **************************************************
  if ($("body").hasClass("site-single-page") && ((hashname == "") || (hashname == "#/manifestos")))
  {
    // LAZY LOAD PAGES
    setTimeout(function(){
      loadPages();
    }, 2500);

    $(window).scroll(function() {
      loadPages();
    });    
  }else{
    // load pages instantly
    loadPages();
  }


  function loadPages(){
    if (!$("body").hasClass("subpages-loaded")){

      // SUBPAGES
      $.get("/pages/workflow.html", function(data) {
        $("section#workflow").html(data);
      });

      $.get("/pages/features.html", function(data) {
        $("section#features").html(data);
        setTimeout(function(){
          updateSkrollr(true);
        }, 100);
      });

      $("body").addClass("subpages-loaded");
    }
  }

  // CONTROL OF WHAT NEEDS TO GET ACTIVATED AT WHICH SCROLL POSITIONS.
  $(window).scroll(function() {
    if (!$("body").hasClass("transitioning") && !$("body").hasClass("site-multiple-pages"))
    {
      scrollPos = $(window).scrollTop();
      if (scrollPos < {{ site.workflow_pre_start }}){
        if (!$("body").hasClass("page-manifestos")){
          $.history.push("/manifestos");
        }
      }else if ((scrollPos > {{ site.workflow_pre_start }}) && (scrollPos < {{ site.features_pre_start }})){
        if (!$("body").hasClass("page-workflow")){
          $.history.push("/workflow");
        }
      }else if ((scrollPos > {{ site.features_pre_start }}) && (scrollPos <= {{ site.features_start }})){
        if (!$("body").hasClass("page-features")){
          $.history.push("/features");
        }
      }
    }
  });


  // SCROLL TO THE NEW PAGE
  function smoothPageScroll(scrollTo, scrollSpeed, pageName){

    setTimeout(function(){
      updatePageMeta(pageName);
    }, (scrollSpeed/2));

    $("body").addClass("transitioning");
    $("html, body").animate({
      scrollTop: scrollTo
    }, scrollSpeed, function(){
      $("body").removeClass("transitioning");
    });
  }


  // Update the URL and body class names
  function updatePageMeta(activePage){
    clearBodyPageClasses();

    $("body").addClass("page-" + activePage);
  }

  // FUNCTION TO CLEAR ALL BODY CLASSES START WITH "page-"
  function clearBodyPageClasses(){
    var element = $("body");
    var classes = element.attr('class').split(/\s+/);

    var pattern = /^page-/;

    for(var i = 0; i < classes.length; i++){
      var className = classes[i];

      if(className.match(pattern)){
        element.removeClass(className);
      }
    }
  }
});