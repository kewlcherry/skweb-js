Songkick.Component.Social = Songkick.Class({
  FB_WIN_HEIGHT: 436,
  FB_WIN_WIDTH:  626,

  initialize: function(options) {
    this._selector = options.selector;
    this._eventBus = options.events;

    this._setupListeners();
  },

  _setupListeners: function() {
    var self = this;

    $(this._selector).find('.button.facebook-share').click(function() {
      var href = $(this).attr('href'),
          url  = href.split('?u=')[1];
      
      self._eventBus.trigger('ui:facebook:share:click', {url: url, encoded: true});
      open(href, 'sharer', 'toolbar=0,status=0,width=' + self.FB_WIN_WIDTH + ',height=' + self.FB_WIN_HEIGHT);
      return false;
    });

    JS.require('twttr', function() {
      twttr.events.bind('tweet', function(tweet) {
        var share = tweet.target.src.match(/\&url=([^\&]+)/),
            url   = share && decodeURIComponent(share[1]);
        
        if (!url) return;
        self._eventBus.trigger('ui:twitter:tweet', {url: url, encoded: false});
      });
    });
  }
});

Songkick.EventBus.bind('app:initialize', function(config) {
  new Songkick.Component.Social({
    selector: '.social.component',
    events:   config.events
  });
});
