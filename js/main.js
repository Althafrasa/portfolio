(function ($) {
  "use strict";

  // Hide spinner after page load
  function hideSpinner() {
    setTimeout(() => {
      const spinner = $('#spinner');
      if (spinner.length) spinner.removeClass('show');
    }, 300); // slight delay so spinner is visible on fast loads
  }
  hideSpinner();

  // Initialize WOW.js animations (if available)
  if (typeof WOW === 'function') {
    new WOW().init();
  }

  // Facts counter (using counterUp plugin)
  if ($.fn.counterUp) {
    $('[data-toggle="counter-up"]').counterUp({
      delay: 10,
      time: 2000,
    });
  }

  // Typed.js - animated typing effect
  if ($('.typed-text-output').length === 1 && typeof Typed === 'function') {
    const typedStrings = $('.typed-text').text();
    new Typed('.typed-text-output', {
      strings: typedStrings.split(', '),
      typeSpeed: 100,
      backSpeed: 20,
      smartBackspace: false,
      loop: true,
    });
  }

  // Smooth scrolling for .btn-scroll anchors
  $(".btn-scroll").on('click', function (event) {
    if (this.hash !== "") {
      event.preventDefault();

      // Disable clicks while animating scroll
      $(".btn-scroll").prop("disabled", true);

      $('html, body').animate(
        { scrollTop: $(this.hash).offset().top },
        1000,
        'easeInOutExpo',
        () => $(".btn-scroll").prop("disabled", false)
      );
    }
  });

  // Animate skill progress bars when in viewport (waypoint)
  if ($.fn.waypoint) {
    $('.skill').waypoint(() => {
      $('.progress .progress-bar').each(function () {
        const progressValue = $(this).attr("aria-valuenow");
        $(this).css("width", progressValue + '%');
      });
    }, { offset: '80%' });
  }

  // Portfolio filtering with Isotope
  if ($.fn.isotope) {
    const $portfolioIsotope = $('.portfolio-container').isotope({
      itemSelector: '.portfolio-item',
      layoutMode: 'fitRows',
    });

    $('#portfolio-flters li').on('click', function () {
      $("#portfolio-flters li").removeClass('active');
      $(this).addClass('active');

      const filterValue = $(this).data('filter');
      $portfolioIsotope.isotope({ filter: filterValue });
    });
  }

  // Testimonials carousel with Owl Carousel
  if ($.fn.owlCarousel) {
    $(".testimonial-carousel").owlCarousel({
      autoplay: true,
      smartSpeed: 1500,
      dots: true,
      loop: true,
      items: 1,
      autoplayHoverPause: true, // pause on hover for better UX
      autoplayTimeout: 5000,    // slower autoplay so users can read
    });
  }

  // Back to top button behavior with debounce for performance
  const $backToTop = $('.back-to-top');
  let scrollTimeout;

  $(window).on('scroll', () => {
    if (scrollTimeout) clearTimeout(scrollTimeout);

    scrollTimeout = setTimeout(() => {
      if ($(window).scrollTop() > 100) {
        if (!$backToTop.is(':visible')) {
          $backToTop.fadeIn('slow');
        }
      } else {
        if ($backToTop.is(':visible')) {
          $backToTop.fadeOut('slow');
        }
      }
    }, 100); // debounce scroll event to reduce event calls
  });

  $backToTop.on('click', (e) => {
    e.preventDefault();
    $('html, body').animate({ scrollTop: 0 }, 1000, 'easeInOutExpo');
  });

})(jQuery);
