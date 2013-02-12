Songkick.Analytics.Snowplow = Songkick.Class({
  initialize: function(events) {
    events.bind('ui:tickets:buy-button:click', this.logTicketButtonClick, this);
    events.bind('ui:attendance:click', this.logAttendanceChange, this);
    events.bind('ui:facebook:connect', this.logFacebookConnect, this);
    events.bind('ui:itunes:track', this.logItunesImportTrack, this);
    //events.bind('ui:attendance:tray:click', this.logAttendanceChangeTray, this);
  },

  logTicketButtonClick: function(event) {
    var category = 'outbound';
    var action = 'ticket_vendors';
    var properties = event.analyticsProperties;
    properties.vendor = event.vendor;
    this._logToSnowplow(category, action, properties);
  },
  
  logAttendanceChange: function(event) {
    var category = 'trackings';
    var action = event.type;
    var properties = {};
    properties.subject_type = event.subject.type;
    properties.subject_id = event.subject.id;
    this._logToSnowplow(category, action, properties);
  },

  logFacebookConnect: function(event) {
    var category = 'fb-connect';
    var action = event.rel;
    var properties = {};
    this._logToSnowplow(category, action, properties);
  },

  logItunesImportTrack: function(event) {
    var category = 'import';
    var action = 'itunes';
    var properties = {};
    this._logToSnowplow(category, action, properties);
  },

  _logToSnowplow: function(category, action, properties) {
    var user_properties = Songkick.getAnalyticsUserProperties();
    for (p in user_properties) {
      properties[p] = user_properties[p];
    }
    var props = [];
    for(var p in properties) {
      props.push(encodeURIComponent(p) + "=" + encodeURIComponent(properties[p]));
    }
    props = props.join("&");

    JS.require('snowplowTracker', function(event) {
      snowplowTracker.trackEvent(category, action, null, props, null);
    });
  },
});

Songkick.EventBus.bind('app:initialize', function(config) {
  if (config.features && config.features.snowplow) {
    JS.require('snowplowTracker', function() {
      properties = Songkick.getAnalyticsUserProperties();
      var props = [];
      for(var p in properties) {
        props.push(encodeURIComponent(p) + "=" + encodeURIComponent(properties[p]));
      }
      props = props.join("&");

      snowplowTracker.trackPageView(props);  
      snowplowTracker.enableLinkTracking();
    });
    new Songkick.Analytics.Snowplow(config.events);
  }
});
