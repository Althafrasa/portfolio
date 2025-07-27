(function ($) {
  "use strict";

  // Hide spinner after page load with smooth delay
  function hideSpinner() {
    setTimeout(() => {
      const spinner = $('#spinner');
      if (spinner.length) spinner.removeClass('show');
    }, 300); // 300ms delay for smoothness
  }
  hideSpinner();

  // Initialize WOW.js animations
  if (typeof WOW === 'function') {
    new WOW().init();
  }

  // Dynamically add WOW + Animate.css classes for animations
  $(document).ready(function() {
    $('.title').addClass('wow animate__fadeInUp').attr('data-wow-delay', '0.2s');
    $('.portfolio-item').addClass('wow animate__zoomIn').attr('data-wow-delay', '0.4s');
    $('.btn-primary').addClass('wow animate__bounceIn').attr('data-wow-delay', '0.6s');
    $('.back-to-top').addClass('wow animate__bounceIn');
    
    // Reinit WOW after adding classes
    if (typeof WOW === 'function') {
      new WOW().init();
    }
  });

  // Facts counter
  if ($.fn.counterUp) {
    $('[data-toggle="counter-up"]').counterUp({
      delay: 10,
      time: 2000,
    });
  }

  // Typed.js typing effect
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

  // Smooth scroll for .btn-scroll anchors
  $(".btn-scroll").on('click', function (event) {
    if (this.hash !== "") {
      event.preventDefault();
      $(".btn-scroll").prop("disabled", true);

      $('html, body').animate(
        { scrollTop: $(this.hash).offset().top },
        1000,
        'easeInOutExpo',
        () => $(".btn-scroll").prop("disabled", false)
      );
    }
  });

  // Animate skills progress bars
  if ($.fn.waypoint) {
    $('.skill').waypoint(() => {
      $('.progress .progress-bar').each(function () {
        const progressValue = $(this).attr("aria-valuenow");
        $(this).css("width", progressValue + '%');
      });
    }, { offset: '80%' });
  }

  // Portfolio isotope filter & active class toggle
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
      autoplayHoverPause: true,
      autoplayTimeout: 5000,
    });
  }

  // Back to top button with debounce, fade, and bounce animation
  const $backToTop = $('.back-to-top');
  let scrollTimeout;

  $(window).on('scroll', () => {
    if (scrollTimeout) clearTimeout(scrollTimeout);

    scrollTimeout = setTimeout(() => {
      if ($(window).scrollTop() > 100) {
        if (!$backToTop.is(':visible')) {
          $backToTop.fadeIn('slow').addClass('animate__animated animate__bounceIn');
        }
      } else {
        if ($backToTop.is(':visible')) {
          $backToTop.fadeOut('slow').removeClass('animate__animated animate__bounceIn');
        }
      }
    }, 100);
  });

  $backToTop.on('click', (e) => {
    e.preventDefault();
    $('html, body').animate({ scrollTop: 0 }, 1000, 'easeInOutExpo');
  });

})(jQuery);
