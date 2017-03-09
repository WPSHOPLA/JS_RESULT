$(document).ready(function() {

  setTimeout(function(){
    if (!$("body").hasClass("screen-mobile"))
    {
      $("#info-accordion .panel:eq(0)").addClass("active");
      $("#info-accordion .panel:eq(0) .accordion-content").addClass("in");
    }
  }, 100);


  // CONTACT FORM SEND SCRIPT
  // *****************

    [].slice.call( document.querySelectorAll( 'button.progress-button' ) ).forEach( function( bttn ) {
      new ProgressButton( bttn, {
        callback : function( instance ) {
          var progress = 0,
            interval = setInterval( function() {
              progress = Math.min( progress + Math.random() * 0.1, 1 );
              instance._setProgress( progress );

              if( progress === 1 ) {
                instance._stop(1);
                clearInterval( interval );
              }
            }, 200 );
        }
      } );
    } );

    $('.progress-button').click(function() {
      var email = $("#email").val();
      var message = $("#message").val();
      var dataString = 'from=' + email + '&subject=GoldenChai inquiry&to=chai@goldenchai.com&message=' + message;
      $.ajax({
        type : "POST",
        url : "/bin/scripts/mailer.php",
        data : dataString,
        cache : false,
        success : function() {

        }
      });
      return false;
    });


  // ACCORDION
  // *****************
  $(".accordion .panel .accordion-title").click(function(){
    var accordionItem = $(this).parent();

    // remove active classes on siblings
    accordionItem.siblings(".panel").removeClass("active");

    if (accordionItem.hasClass("active")){
      // remove active class
      accordionItem.removeClass("active");
    }else{
      // add active class
      accordionItem.addClass("active");
    }
  });


  // SHOW PROFILE IMAGE OF JULIAN
  // ****************************
  $("[data-show-profile]").mouseover(function(){
    $(".accordion-item-about").addClass("show-profile");
  });

  $("[data-show-profile]").mouseout(function(){
    $(".accordion-item-about").removeClass("show-profile");
  });


  // TOGGLE ACCORDION
  // *****************
  $("a[data-accordion]").on("click", function(event){
    $("footer #footer-content > .accordion > .panel").removeClass("active");
    $("footer #footer-content #info-accordion > .panel.accordion-item-" + $(this).attr("data-accordion") + " .accordion-title").trigger("click");
  });


  // ACTIVATE 1st TAB CONTENT IN PROCESS ACCORDION
  // *********************************************
  $(".accordion-item-process .accordion-title").on("click", function(event){
    $(this).parent().find(".nav-tabs li:eq(0) a").trigger("click");
  });



  // FOOTER NAV LINKS
  // *****************
  $(".footer-nav-cta").on("click", function(event){
    if ($(this).hasClass("active")){
      event.preventDefault();
      collapseFooter();
      return false;
    }else{
      activateFooter($(this));
    }
  });


  // FOOTER CHAI INVERT STYLES
  // *************************
  $("#workflow, .footer-chai").on("click", "[data-toggle-invert]", function(event){
    // FIRST LOAD THE VIDEOS
    if (!$("body").hasClass("manifestos-videos-loaded")){

      $.get("/pages/manifestos-videos.html", function(data) {
        $("#manifestos-videos").html(data);
      });

      $("body").addClass("manifestos-videos-loaded");
    }

    // THEN UPDATE CLASSES
    if ((!$("body").hasClass("inverted-mode-1")) && (!$("body").hasClass("inverted-mode-2")))
    {
      $("body").addClass("inverted-mode-1");

      $(".footer-chai p.invert-mode-1").addClass("active");
      $(".footer-chai p.invert-mode-2").removeClass("active");
      $(".footer-chai p.copyright").removeClass("active");
    }
    // else if ($("body").hasClass("inverted-mode-1"))
    // {
    //   $("body").removeClass("inverted-mode-1");
    //   $("body").addClass("inverted-mode-2");

    //   $(".footer-chai p.invert-mode-1").removeClass("active");
    //   $(".footer-chai p.invert-mode-2").addClass("active");
    //   $(".footer-chai p.copyright").removeClass("active");
    // }
    else
    {
      $("body").removeClass("inverted-mode-1 inverted-mode-2");

      $(".footer-chai p.invert-mode-1, .footer-chai p.invert-mode-2").removeClass("active");
      $(".footer-chai p.copyright").addClass("active");
    }
  });


  // LINK TO COLLAPSE FOOTER
  $(".collapseFooter").click(function(e){
    e.preventDefault();
    collapseFooter();
    return false;
  });


  // FOOTER CTA ITEM CLICK
  $(".footer-cta-button").click(function(){
    var targetSlide = $(this).attr("data-slide");

    // first remove all the active classes on the primary footer nav
    $(".footer-nav-cta").removeClass("active");

    // then add active class to the active one
    $(".footer-nav-cta").addClass("active");

    // go to the slide
    footerContentSlider.goTo(targetSlide);
  });

});

function activateFooter(navItem){
  if ($("body").hasClass("screen-mobile") || $("body").hasClass("screen-tablet"))
  {
    $("html, body").animate({
      scrollTop: 0
    }, 400);

    var s = skrollr.init();
    s.destroy();
  }

  navItem.siblings(".footer-nav-cta").removeClass("active");
  navItem.addClass("active");

  // if the footer was not active before, do this..
  if (!$("body").hasClass("footer-active")){

    $("body").addClass("footer-active");

    // collapse footer when clicking on header area
    if (!$("body").hasClass("mobile"))
    {
      setTimeout(function(){
        $("header, .window").one("click", function(event) {
          $("body").removeClass("footer-active");
          collapseFooter();
        });
      }, 300);
    }
  }

  // go to the right tab
  $("#footer-content .tab-pane").removeClass("active in");
  $("#" + navItem.find("a").attr("href").replace("#/", "")).addClass("active in");
}

function collapseFooter(){
  if ($("body").hasClass("screen-mobile") || $("body").hasClass("screen-tablet"))
  {
    var s = skrollr.init();
  }

  // remove footer active classes
  $(".footer-nav-cta").removeClass("active");
  $("body").removeClass("footer-active");
  $("body").addClass("footer-post-active");

  // for mobile, remove hidden classes on accordion items
  // $(".accordion .accordion-item").removeClass("hidden");

  $('.footer-nav-cta').tooltip('destroy');

  if ($("body").hasClass("index"))
  {
    if ($("body").hasClass("page-manifestos")){
      $.history.push("/manifestos");
    }else if ($("body").hasClass("page-workflow")){    
      $.history.push("/workflow");
    }else if ($("body").hasClass("page-features")){    
      $.history.push("/features");
    }
  }else{
    $.history.push("");
  }
}