//
// Skills.js
// CSS animation triggers for skills section
// --------------------------------------------------

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
