JS.Packages(function() { with(this) {
  var scheme = window.location.protocol;
  
  file(scheme + '//platform.twitter.com/widgets.js')
    .provides('twttr', 'twttr.events');
}});
