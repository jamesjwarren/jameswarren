//
// Scroll.js
// Scrolling animations
// --------------------------------------------------

$(document).ready(function () {

  var body = $('body'),
      links = $('.index .navbar a');

  function scrollTo(slideId, offset) {
    body.animate({
        scrollTop: $(slideId).offset().top - offset
    }, 1000, 'easeInOutQuint');
  }

  // when a link is clicked, get the href and data-offset attribute values and pass to the scrollTo function
  links.click(function (e) {
    e.preventDefault();
    slideId = $(this).attr('href');
    slideId = slideId.substr(1);
    console.log(slideId);

    offset = $(this).attr('data-offset'); // get custom offset attribute
    if(!offset){ offset = 50; } // revert to default offset

    scrollTo(slideId, offset);
  });

  // keyboard scroll easing
  var distance = 350,
      time = 200;
  $(document).keydown(function (e) {
    switch (e.which) {
    case 38: // up
      body.stop().animate({
        scrollTop: $(window).scrollTop() - distance
      }, time);
      break;

    case 40: // down
      body.stop().animate({
        scrollTop: $(window).scrollTop() + distance
      }, time);
      break;

    }
  });
});
