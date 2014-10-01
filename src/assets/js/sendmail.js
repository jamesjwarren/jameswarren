//
// sendmail.js
// AJAX powered contact form
// --------------------------------------------------

jQuery(document).ready(function(){

  jQuery("#contact-form").submit(function(e){

    e.preventDefault(); // prevent default form behaviour

    // get form field values
    var name = jQuery("#name").val();
    var email = jQuery("#email").val();
    var text = jQuery("#text").val();
    var subject = jQuery("#subject").val();
    // structure input into POST
    var dataString = 'name=' + name + '&email=' + email + +'&subject' + subject + '&text=' + text;

    // email validation function
    var isValidEmail = function (emailAddress) {
      var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
      return pattern.test(emailAddress);
    };

    // check input validation
    if(isValidEmail(email) && (text.length>3) && (name.length>1)) {
      jQuery.ajax({
        type:"POST",
        url:"/lib/sendmail.php",
        data:dataString,
        success:function(){
          // data POSTED successfully
          // show success message
          jQuery("#submit").fadeOut(100);
          jQuery('.success').delay(100).fadeIn(400);
          jQuery('#text').addClass('sent');
        }
      });
    } else {
      // show error message
      jQuery("#submit").fadeOut(100);
      jQuery('.error').delay(100).fadeIn(400);
      jQuery('#text').removeClass('sent');
    }

    return false;
  });

  // re-focus animation
  jQuery("#contact-form input, #contact-form textarea").focus(function(){
    jQuery(".error").fadeOut(200);
    jQuery(".success").fadeOut(200);
    jQuery("#submit").delay(200).fadeIn(400);
  });
});
