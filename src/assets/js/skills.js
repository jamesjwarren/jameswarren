//
// Skills.js
// CSS animation triggers for skills section
// --------------------------------------------------

$(document).ready(function () {

  $("[data-toggle='popover']").popover({ trigger: 'hover' });
  $("[data-toggle='tooltip']").tooltip();

  var wrapper = '#skills .wrapper',
      targetA = '#ux',
      targetB = '#dev';

  $(targetA).click(function(){
    $(this).toggleClass('open');

    if($(targetB).hasClass('open')){
      // targetB is open, so close it
      $(targetB).toggleClass('open');
      // remove associated position class from wrapper
      $(wrapper).toggleClass('open-right');
    }

    // set correct position class on wrapper
    $(wrapper).toggleClass('open-left');
  })

  $(targetB).click(function(){
    $(this).toggleClass('open');

    if($(targetA).hasClass('open')){
      // targetA is open, so close it
      $(targetA).toggleClass('open');
      // remove associated position class from wrapper
      $(wrapper).toggleClass('open-left');
    }

    // set correct position class on wrapper
    $(wrapper).toggleClass('open-right');
  })

  var chartToggle = 0;

  $(targetB).click(function(){
    if (chartToggle == 0) {
      setTimeout("chartAnimate('.chart', 'up')", 800);
      chartToggle = 1;
    } else {
      chartAnimate('.chart', 'down');
      chartToggle = 0;
    }
  });
});

// bar chart animation
var chartAnimate = function(chart, direction){
  var bars = $(chart).find('.bar'); // find individual bars within chart
  bars.each(function(){
    if(direction == 'up') {
      var val = $(this).attr('data-perc'); // get percent value from attribute
      val = val + "%";
      $(this).css( "height", val ); // set height to attribute value
    } else {
      $(this).css( "height", "0%" ); // reset height to zero
    }
  });
}
