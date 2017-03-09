# VARIABLES
transitionSpeed = 500

clickTabBasedOnHash = ->
  $("ul[data-tabs] li > a[href='" + window.location.hash + "'], ul[data-pills] > li > a[href='" + window.location.hash + "']").click()
  setTimeout (->
    window.scrollTo(0,0)
  ), 20
  return


# FUNCTION: UPDATE SCREEN CLASS (BASED ON SCREEN WIDTH)
# =====================================================

# SCREEN SIZES
screen_xs = 480
screen_sm = 768
screen_md = 992
screen_lg = 1450

updateScreenClass = (windowWidth) ->
  if (windowWidth < screen_xs)
    # SCREEN XXS
    if $("body").hasClass "screen_xxs"
      return ""
    $("body").removeClass "screen_xs screen_sm screen_md screen_lg"
    $("body").addClass "screen_xxs"
    return
  else if ((windowWidth < screen_sm && windowWidth >= screen_xs))
    # SCREEN XS
    if $("body").hasClass "screen_xs"
      return ""
    $("body").removeClass "screen_xxs screen_sm screen_md screen_lg"
    $("body").addClass "screen_xs"
    return
  else if ((windowWidth < screen_md && windowWidth >= screen_sm))
    # SCREEN SM
    if $("body").hasClass "screen_sm"
      return ""
    $("body").removeClass "screen_xxs screen_xs screen_md screen_lg"
    $("body").addClass "screen_sm"
    return
  else if ((windowWidth < screen_lg) && (windowWidth > screen_sm))
    # SCREEN MD
    if $("body").hasClass "screen_md"
      return ""
    $("body").removeClass "screen_xxs screen_xs screen_sm screen_lg"
    $("body").addClass "screen_md"
    return
  else
    if ($("body").hasClass("screen_lg"))
      return ""
    $("body").removeClass "screen_xxs screen_xs screen_sm screen_md"
    $("body").addClass "screen_lg"
    return
  return


truncateText = ->
  setTimeout (->
    $(".readmore").readmore
      moreLink: '<a href="#" class="readmore-js-toggle-more">Read more<span></span></a>'
      lessLink: '<a href="#" class="readmore-js-toggle-less">Close</a>'
  ), 200


# DOCUMENT READY
$(document).ready ->

  if $(".readmore").length
    truncateText()

  if (window.location.hash)
    clickTabBasedOnHash()


  # MOBILENAV
  $("#mobilenav i").click (e) ->
    $("body").toggleClass "mobile-nav-active"

    if $("body").hasClass("mobile-nav-active")
      $("body >main, body >footer, body >header #search").bind "click", (ev) ->
        $("body").removeClass "mobile-nav-active"
        $("body >main, body >footer, body >header #search").unbind("click")
        return

    e.preventDefault()
  # MOBILENAV END


  $(window).on "hashchange", ->
    clickTabBasedOnHash()

  $("#infoTabs a[data-toggle=\'tab\']").on "show.bs.tab", (e) ->
    location.hash = e.target.hash.substr(1)
    if $(".readmore").length
      truncateText()


  # COUNTDOWN
  $("#clock").countdown("2015/01/30").on "update.countdown", (event) ->
    $this = $(this).html(event.strftime("" + "<span>%-w</span>w " + "<span>%-d</span>d " + "<span>%H</span>h " + "<span>%M</span>m " + "<span>%S</span>s"))
    return


  # SCREEN WIDTH DETECTION (MOBILE, TABLET, DESKTOP)
  # ************************************************

  windowWidth = $(window).width()
  updateScreenClass(windowWidth)

  $(window).on "resize", ->
    windowWidth = $(window).width()
    updateScreenClass(windowWidth)


#
