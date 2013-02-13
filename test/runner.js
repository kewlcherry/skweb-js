JS.cache = false;                 // Force browser to always download code for tests
delete JS.Package.loader.fetch;   // Disable prefetching since some code is not eval-safe

JS.require('SpecHelper', function() {
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

    function() { JS.Test.autorun() })
});

