Songkick.Component.TouchLogin = function(){
  $('.twitter input[type=checkbox], #facebook-post-stream').on('change', function(event){ event.currentTarget.form.submit() });
}();
