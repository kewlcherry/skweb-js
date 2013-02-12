// We don't bundle Analytics with the rest of our code, we always load it from
// Google's servers. Hence this loader code outside of the main manifest.js.
JS.Packages(function() { with(this) {
  var ssl = (JS.ENV.document && 'https:' == document.location.protocol);
  
  // Pick a domain to load from based on where current page is SSL
  var gaJsHost = ssl ? 'https://ssl.' : 'http://www.',
      gaKey    = 'UA-2610254-1';
  
  file(gaJsHost + 'google-analytics.com/ga.js')
    .provides('_gat');
  
  loader(function(callback) {
    try { window.pageTracker = _gat._getTracker(gaKey) } catch (e) {}
    callback();
  })  .provides('pageTracker')
      .requires('_gat');
}});

