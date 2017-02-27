// Floating label headings for the contact form
$(function() {
    $("body").on("input propertychange", ".floating-label-form-group", function(e) {
        $(this).toggleClass("floating-label-form-group-with-value", !!$(e.target).val());
    }).on("focus", ".floating-label-form-group", function() {
        $(this).addClass("floating-label-form-group-with-focus");
    }).on("blur", ".floating-label-form-group", function() {
        $(this).removeClass("floating-label-form-group-with-focus");
    });
});

// Navigation Scripts to Show Header on Scroll-Up
jQuery(document).ready(function($) {
    var MQL = 1000;

    //primary navigation slide-in effect
    if ($(window).width() > MQL) {
        var headerHeight = $('.navbar-custom').height();
        $(window).on('scroll', {
                previousTop: 0
            },
            function() {
                var currentTop = $(window).scrollTop();
                //check if user is scrolling up
                if (currentTop < this.previousTop) {
                    //if scrolling up...
                    if (currentTop > 0 && $('.navbar-custom').hasClass('is-fixed')) {
                        $('.navbar-custom').addClass('is-visible');
                    } else {
                        $('.navbar-custom').removeClass('is-visible is-fixed');
                    }
                } else if (currentTop > this.previousTop) {
                    //if scrolling down...
                    $('.navbar-custom').removeClass('is-visible');
                    if (currentTop > headerHeight && !$('.navbar-custom').hasClass('is-fixed')) $('.navbar-custom').addClass('is-fixed');
                }
                this.previousTop = currentTop;
            });
    }

    $(document).on('scroll', function functionName() {
      var height = $(window).height();

      var currenTop = $(window).scrollTop();
      var width = $(window).width();
      var loaderSize = ((currenTop/(height)))*(width+75);

      console.log(height,currenTop, width, loaderSize);
      $('div.loader').width((loaderSize) + 'px')
    });




});

var goNext = function() {
  var url = window.location.href;
  var pathname = window.location.pathname;
  // console.log(url,pathname );
  if (pathname =='/') {
    window.location.href = "../page/2";
  } else {
    var page = pathname.slice(-1);
    // console.log(page);
    page = parseFloat(page) + 1
    window.location.href = "../page/" + page;
  }

}
