Songkick.Component.Tickets = Songkick.Class({
  initialize: function(options) {
    this._selector = options.selector;
    this._events   = options.events;
    this.setupListeners(options);
  },

  setupListeners: function(options) {
    var self = this;
    $(options.selector).find(' .buy-tickets, .vendor').on('click', function(){
      var vendor = $(this).attr('title');
      var analyticsProperties = {};
      $.each($(this).data(), function(key, value) {
        var m;
        if(m = /^analytics(.*)/.exec(key)) {
	  var propertyKey = m[1].replace(/^([A-Z])/, function($1){return $1.toLowerCase();});
	  analyticsProperties[propertyKey] = value;
	}
      });
      options.events.trigger('ui:tickets:buy-button:click', {vendor: vendor, analyticsProperties: analyticsProperties});
    });
  }
});

Songkick.EventBus.bind('app:initialize', function(config) {
  new Songkick.Component.Tickets({
    selector: '.tickets.component',
    events: config.events
  });
});
