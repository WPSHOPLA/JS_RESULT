$(document).ready(function() {

  // FEATURES PAGE TWENTY TWENTY
  // ******************************
  $('a.features-dev-tab[data-toggle="tab"]').on('shown.bs.tab', function (e) {
    $("#features .development-before-after").twentytwenty({default_offset_pct: 0.7});
  });

});