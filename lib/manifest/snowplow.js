JS.Packages(function() { with(this) {
  loader(function(callback) {
    window.snowplowTracker = SnowPlow.getTracker('d2hroqhjafvywk');
    callback();
  })
    .requires('SnowPlow')
    .provides('snowplowTracker');
}});

