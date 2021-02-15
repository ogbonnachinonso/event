
(function ($) {
  "use strict";

  var nav = $('nav');
  var navHeight = nav.outerHeight();

  $('.navbar-toggler').on('click', function () {
    if (!$('#mainNav').hasClass('navbar-reduce')) {
      $('#mainNav').addClass('navbar-reduce');
    }
  })

  // Preloader
  $(window).on('load', function () {
    if ($('#preloader').length) {
      $('#preloader').delay(100).fadeOut('slow', function () {
        $(this).remove();
      });
    }
  });

  // Back to top button
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $('.back-to-top').fadeIn('slow');
    } else {
      $('.back-to-top').fadeOut('slow');
    }
  });
  $('.back-to-top').click(function () {
    $('html, body').animate({
      scrollTop: 0
    }, 1500, 'easeInOutExpo');
    return false;
  });

  /*--/ Star ScrollTop /--*/
  $('.scrolltop-mf').on("click", function () {
    $('html, body').animate({
      scrollTop: 0
    }, 1000);
  });

  /*--/ Star Counter /--*/
  $('.counter').counterUp({
    delay: 15,
    time: 2000
  });

  /*--/ Star Scrolling nav /--*/
  var mainNav_height = $('#mainNav').outerHeight() - 22;
  $('a.js-scroll[href*="#"]:not([href="#"])').on("click", function () {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        var scrollto = target.offset().top - mainNav_height;
        $('html, body').animate({
          scrollTop: scrollto
        }, 1000, "easeInOutExpo");
        return false;
      }
    }
  });

  // Scroll to sections on load with hash links
  if (window.location.hash) {
    var initial_nav = window.location.hash;
    if ($(initial_nav).length) {
      var scrollto_initial = $(initial_nav).offset().top - mainNav_height;
      $('html, body').animate({
        scrollTop: scrollto_initial
      }, 1000, "easeInOutExpo");
    }
  }

  // Closes responsive menu when a scroll trigger link is clicked
  $('.js-scroll').on("click", function () {
    $('.navbar-collapse').collapse('hide');
  });

  // Activate scrollspy to add active class to navbar items on scroll
  $('body').scrollspy({
    target: '#mainNav',
    offset: navHeight
  });
  /*--/ End Scrolling nav /--*/

  /*--/ Navbar Menu Reduce /--*/
  $(window).trigger('scroll');
  $(window).on('scroll', function () {
    var pixels = 50;
    var top = 1200;
    if ($(window).scrollTop() > pixels) {
      $('.navbar-expand-md').addClass('navbar-reduce');
      $('.navbar-expand-md').removeClass('navbar-trans');
    } else {
      if (!$('#navbarDefault').hasClass('show')) {
        $('.navbar-expand-md').removeClass('navbar-reduce');
      }
      $('.navbar-expand-md').addClass('navbar-trans');
    }
    if ($(window).scrollTop() > top) {
      $('.scrolltop-mf').fadeIn(1000, "easeInOutExpo");
    } else {
      $('.scrolltop-mf').fadeOut(1000, "easeInOutExpo");
    }
  });

  /*--/ Star Typed /--*/
  if ($('.text-slider').length == 1) {
    var typed_strings = $('.text-slider-items').text();
    var typed = new Typed('.text-slider', {
      strings: typed_strings.split(','),
      typeSpeed: 80,
      loop: true,
      backDelay: 1100,
      backSpeed: 30
    });
  }

  /*--/ Testimonials owl /--*/
  $('#testimonial-mf').owlCarousel({
    margin: 20,
    autoplay: true,
    autoplayTimeout: 4000,
    autoplayHoverPause: true,
    responsive: {
      0: {
        items: 1,
      }
    }
  });

  // Portfolio details carousel
  $(".portfolio-details-carousel").owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    items: 1
  });

  // Initiate venobox (lightbox feature used in portofilo)
  $(document).ready(function () {
    $('.venobox').venobox({
      'share': false
    });
  });




  const primaryColor = '#4834d4'
  const warningColor = '#f0932b'
  const successColor = '#6ab04c'
  const dangerColor = '#eb4d4b'

  const themeCookieName = 'theme'
  const themeDark = 'dark'
  const themeLight = 'light'

  const body = document.getElementsByTagName('body')[0]

  function setCookie(cname, cvalue, exdays) {
    var d = new Date()
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000))
    var expires = "expires=" + d.toUTCString()
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/"
  }

  function getCookie(cname) {
    var name = cname + "="
    var ca = document.cookie.split(';')
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1)
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length)
      }
    }
    return ""
  }

  loadTheme()

  function loadTheme() {
    var theme = getCookie(themeCookieName)
    body.classList.add(theme === "" ? themeLight : theme)
  }

  function switchTheme() {
    if (body.classList.contains(themeLight)) {
      body.classList.remove(themeLight)
      body.classList.add(themeDark)
      setCookie(themeCookieName, themeDark)
    } else {
      body.classList.remove(themeDark)
      body.classList.add(themeLight)
      setCookie(themeCookieName, themeLight)
    }
  }

  function collapseSidebar() {
    body.classList.toggle('sidebar-expand')
  }

  window.onclick = function (event) {
    openCloseDropdown(event)
  }

  function closeAllDropdown() {
    var dropdowns = document.getElementsByClassName('dropdown-expand')
    for (var i = 0; i < dropdowns.length; i++) {
      dropdowns[i].classList.remove('dropdown-expand')
    }
  }

  function openCloseDropdown(event) {
    if (!event.target.matches('.dropdown-toggle')) {
     
      closeAllDropdown()
    } else {
      var toggle = event.target.dataset.toggle
      var content = document.getElementById(toggle)
      if (content.classList.contains('dropdown-expand')) {
        closeAllDropdown()
      } else {
        closeAllDropdown()
        content.classList.add('dropdown-expand')
      }
    }
  }






  $(function () {
    $(".box-hidden").slice(0, 6).show();
    $("#LoadMore").on('click', function (e) {
      e.preventDefault();
      $(".box-hidden:hidden").slice(0, 3).slideDown();
      if ($(".box-hidden:hidden").length == 0) {
        $("#Load").fadeOut('slow');
      }
    });

  });


})(jQuery);