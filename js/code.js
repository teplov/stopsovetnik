$(document).ready(function() {


  var hash = window.location.hash || null;

//console.log(hash);
  if (hash && hash === '#lightbox') {
      $('.overlay, .lightbox').show();
  }


  $('.overlay').click(function() {
    $('.overlay, .lightbox').hide();
    window.location.hash = '';
  });

  $('.open_lightbox').click(function () {
    $('.overlay, .lightbox').show();
  });

});
