JS.cache = false;                 // Force browser to always download code for tests
delete JS.Package.loader.fetch;   // Disable prefetching since some code is not eval-safe

JS.debug = true;

JS.require('JS.Test', 'SpecHelper', function(Test, Helper) {
  Test.Unit.TestCase.include(Helper);

  // Stubs for 3rd party services
  JS.ENV.SK          = {};
  JS.ENV._gat        = {};
  JS.ENV.pageTracker = {_trackPageview: function() {}, _setCustomVar: function() {}};
  JS.ENV.twttr       = {events: {bind: function() {}}};

  JS.require(
    'SongkickSpec',
    'Songkick.LazyPromiseSpec',
    'Songkick.Analytics.GoogleSpec',
    'Songkick.Analytics.SnowplowSpec',
    'Songkick.Component.BulkUntrackerSpec',
    'Songkick.Component.TrackingSpec',
    'Songkick.Component.SocialSpec',
    'Songkick.Component.TicketsSpec',
    'Songkick.Component.CitySelectorSpec',
    'Songkick.Component.filterMetroAreaSpec',

    function() { Test.autorun() })
});

