# FUNCTIONS
cycleImages = ->
  $active = $(".bgCycler .active")
  $next = (if ($(".bgCycler .active").next().length > 0) then $(".bgCycler .active").next() else $(".bgCycler img:first"))
  $next.addClass "active"
  $active.removeClass "active"
  return

scrollTo = (scrollTo, speed) ->
  $("html, body").animate
    scrollTop: scrollTo
  , speed


# VARIABLES
transitionSpeed = 500


# DOCUMENT READY
$(document).ready ->


  # ROTATE
  $(".rotate").Morphext
    animation: "fadeInLeft"
    speed: 3000

  # LAZY LOAD IMAGES (BASED ON SCROLL THRESHOLD)
  $("img.lazy").lazyload()

  # HOME BACKGROUND CYCLER
  $(".bgCycler").fadeIn 2500
  bgCycler = setInterval (->
    cycleImages()
  ), 6000

  # LAZY LOAD DELAYED IMAGES
  $("img.lazy-delayed").lazyload event: "lazy-delayed"

  # LAZY LOAD BG CYCLER IMAGES
  $(".bgCycler img").not(":first").each ->
    setTimeout (->
      $(this).trigger "lazy-delayed"
      return
    ), 1000
    return


  $(".fabric").click ->
    $(".section-fabric").css("background-image", "url('" + $(this).attr("data-original").replace("/palette", "") + "')")
    return



  $(".royalSlider").click ->
    $("html, body").animate
      scrollTop: $(this).offset().top
    , transitionSpeed
    return


  # MARQUEE SLIDER
  # ==============
  $("#marqueeSlider").royalSlider
    imageScaleMode: "fill"
    controlsInside: false
    navigateByClick: false
    sliderDrag: false
    loop: true
    slidesSpacing: 0
    globalCaption: true
    arrowsNavAutoHide: false
    controlNavigation: "arrows"
    numImagesToPreload: 2

  marqueeSlider = $("#marqueeSlider").data("royalSlider")


  # VERSATILITY SLIDER
  # ==================
  $("#versatilitySlider").royalSlider
    controlNavigation: "thumbnails"
    imageScaleMode: "fill"
    arrowsNav: false
    keyboardNavEnabled: true
  versatilitySlider = $("#versatilitySlider").data("royalSlider")
  $("#versatilitySlider .rsThumbs .rsThumb").removeClass("rsNavSelected")
  $("#versatilitySlider").click ->
    $(".section-multifunctional").addClass("visible-full")
    versatilitySlider.updateSliderSize()
    s.refresh()
    return

  # EXPRESS SLIDER
  # ==============
  $("#expressSlider").royalSlider
    imageScaleMode: "fill"
    controlsInside: false
    navigateByClick: true
    loop: true
    slidesSpacing: 0
    globalCaption: true
    arrowsNavAutoHide: false
    controlNavigation: "arrows"
    numImagesToPreload: 2
    autoPlay:
      enabled: false
      pauseOnHover: false



  # PRELOAD UNITS FOR LANDING PAGE
  $([
    "/images/sets/2.png"
    "/images/sets/3.png"
    "/images/sets/4.png"
    "/images/sets/5.png"
  ]).preload()


  # PRELOAD UNITS FOR LANDING PAGE
  $([
    "/images/fabrics/purple.jpg"
    "/images/fabrics/red.jpg"
    "/images/fabrics/golden.jpg"
    "/images/fabrics/silver.jpg"
    "/images/fabrics/turqoise.jpg"
    "/images/fabrics/charcoal.jpg"
    "/images/fabrics/dessert.jpg"
    "/images/fabrics/raw.jpg"
  ]).preload()


  # INCREMENT UNITS
  units = 1
  $(".sidebar-cta .btn-add, .sidebar-cta .btn-subtract").click ->

    if $(this).hasClass("btn-add")
      if (units >= 5) #max 5
        $(".sidebar-cta-video").addClass "pulse"
        return false

      units++
    else
      if (units <= 1) #min 1
        return false

      units--

    # UPDATE NUMBER
    $(".unit-count span").html(units)

    # CHANGE GRAPHIC
    $("#landing .units img").attr("src","/images/sets/" + units + ".png")


  # LANDINGPAGE PULSE TIMEOUTS
  $(".sidebar-cta .btn.pulse").click ->
    $(this).removeClass "pulse"

    return

  # VARIABLES
  landingHeightDecrease = ($(window).height())# this is how much the landing slide decreases in height (60% of window height)
  landingHeight = ($(window).height()) #this is the landing height after scrolling down
  videoMarqueeOffset = landingHeight
  videoMarqueePreEnd = videoMarqueeOffset + $("#marqueeSlider").height() - 300
  videoMarqueeEnd = videoMarqueeOffset + $(window).height()


  # SIDEBAR CTA VIDEO CLICK ACTIVATE VIDEO
  $(".sidebar-cta-video").click ->
    $("#marqueeSlider .rsPlayBtnIcon").click()


  # SCROLL TO VIDEO WHEN IT IS IS PLAYED
  # ===================================
  marqueeSlider.ev.on "rsOnCreateVideoElement", (e, url) ->
    $("html, body").animate
      scrollTop: videoMarqueeOffset
    , transitionSpeed
    return


  # INITIALIZE SKROLLR.
  s = skrollr.init()


  # UPDATE SKROLLR AFTER LANDINGSLIDE SHRINK
  skrollrUpdated = false

  scrollPos = $(window).scrollTop()
  updateSkrollr(scrollPos)

  $(window).scroll ->
    clearInterval(bgCycler)
    scrollPos = $(window).scrollTop()
    updateSkrollr(scrollPos)


  return



updateSkrollr = (scrollPos) ->
  if ((scrollPos > $(window).height()) && (skrollrUpdated == false))
    s.refresh($("#landing"))
    skrollrUpdated = true
    return
  return
