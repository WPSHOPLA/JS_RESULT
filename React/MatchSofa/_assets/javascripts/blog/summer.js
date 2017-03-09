'use strict';

var summer = (function ($) {

    var indexPostClass = '.summer-index-post',
        bgCheckClass = '.bg-check',
        postBgImages = '.bg-img img',
        postCoverImg = '.summer-post-header .bg-img',

    // post animations on homepage
    indexPostAnimate = function () {
        if ($(indexPostClass).length) {
            $(indexPostClass).each(function () {
            var postPos = $(this).offset().top;
            var topOfWindow = $(window).scrollTop(),
                windowHeight = $(window).height();
                if (postPos < topOfWindow + (windowHeight/ 1.4)) {
                    $(this).addClass('fadeInDown');
                }
            });
        }
    },


    headerTitlesBackgroundCheck = function () {
        if ($(bgCheckClass).length && $(postBgImages).length) {
            BackgroundCheck.init({
                targets: bgCheckClass,
                images: postBgImages,
                debug: true
            });
        }
    },

    postHeaderCoverImg = function () {
        var coverImage = $('[alt=cover-image]');
        if (coverImage.length) {
            $(postCoverImg).append('<img src="' + coverImage.attr('src') + '">');
            coverImage.remove();
        }
    },

    // summer javascripts initialization
    init = function () {
        indexPostAnimate();
        $(window).on('scroll', function() {
            indexPostAnimate();
        });
        postHeaderCoverImg();
        headerTitlesBackgroundCheck();
        $('p:has(> img)').addClass('with-image');
    };

    return {
        init: init
    };

})(jQuery);

(function () {
  summer.init();

  setTimeout(function(){
    // All targets
    BackgroundCheck.refresh();
  }, 100);
})();
