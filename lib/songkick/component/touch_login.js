Songkick.Component.TouchLogin = function(){
  var is_touch_device =  ('ontouchstart' in document.documentElement ||
                          (window.DocumentTouch && document instanceof DocumentTouch)),

  getParameterByName=  function(name) {  //copied from songkick.js
    var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
    return match ? decodeURIComponent(match[1].replace(/\+/g, ' ')) : null;
  };

  if (is_touch_device) {
    window.location = "https://" + window.location.hostname + "/oauth/login?success_url=" + encodeURIComponent(getParameterByName('success_url'));
  }
};



