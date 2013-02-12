JS.Packages(function() { with(this) {
  var scheme = window.location.protocol;
  
  file(scheme + '//connect.facebook.net/en_US/all.js')
    .provides('FB');
}});

