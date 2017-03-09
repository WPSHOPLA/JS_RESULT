$(document).ready(function() {

  // SEARCH STUFF
  $('#search-query').lunrSearch({
    indexUrl: '/search.json',             // URL of the `search.json` index data for your site
    results:  '#search-results',          // jQuery selector for the search results container
    entries:  '.entries',                 // jQuery selector for the element to contain the results list, must be a child of the results element above.
    template: '#search-results-template'  // jQuery selector for the Mustache.js template
  });

  // hide search results when search input is un-focus
  // this could probably be made a bit better..
  $("body").click(function(){
    $("#search-results").hide();
    $("#search").removeClass("focused");
    $("#search input").val("");
  });


  // Search focus
  $("#search").click(function(e){
    e.stopPropagation();
    $(this).addClass("focused");
  });

  $("#search input").on("focus", function(e){
    e.stopPropagation();
    $("#search").addClass("focused");
  });

  // auto focus on Search for 404 page
  $(".page-404 #search input").focus();


  // optimize for keyboard
  $('#search-query').on('keyup', function() {
    var input = $(this);
    if(input.val().length === 0) {
        input.addClass('empty');
    } else {
        input.removeClass('empty');
    }
  });

  $("#search-query, #search-results").keydown(function(event){

    var prev;
    var el;

    // down arrow
    if (event.which == "40")
    {
      event.preventDefault();

      if ($("#search-results .entries a").hasClass("focused"))
      {
        el = $("#search-results .entries a.focused").next("a");
        prev = $("#search-results .entries a.focused");
      }else{
        el = $("#search-results .entries a").first();
      }

      focusSearchEntry(el);
      if ((el.length != 0) && (prev.length != 0)){deFocusPrevSearchEntry(prev)};
      return false;
    }


    // up arrow
    if (event.which == "38")
    {
      event.preventDefault();

      el = $("#search-results .entries a.focused").prev("a");
      prev = $("#search-results .entries a.focused");
      focusSearchEntry(el);
      if ((el.length != 0) && (prev.length != 0)){deFocusPrevSearchEntry(prev)};
      return false;
    }

  });

});


function focusSearchEntry(el){
  el.focus();
  el.addClass("focused");
}


function deFocusPrevSearchEntry(el){
  el.removeClass("focused");
}
