Songkick.Analytics.Google = Songkick.Class({
  initialize: function(events) {
    events.bind('ui:tickets:buy-button:click', this.logTicketButtonClick, this);
    events.bind('ui:attendance:click', this.logAttendanceChange, this);
    events.bind('ui:facebook:connect', this.logFacebookConnect, this);
    events.bind('ui:itunes:track', this.itunesImportTrack, this);
    events.bind('ui:attendance:tray:click', this.logAttendanceChangeTray, this)
  },

  logTicketButtonClick: function(event) {
    this._logToGoogleAnalytics('/outbound/ticket_vendors/' + encodeURIComponent(event.vendor));
  },

  logAttendanceChange: function(event) {
    var path = '/behaviour/trackings/track/' + [event.type, event.subject.type, event.subject.id].join('/');
    this._logToGoogleAnalytics(path);
  },

  logAttendanceChangeTray: function(event) {
    var path = '/behaviour/trackings/track/tray/' + [event.type, event.subject.type, event.subject.id].join('/');
    this._logToGoogleAnalytics(path);
  },

  logFacebookConnect: function(event) {
    var path = '/behaviour/fb-connect/';
    this._logToGoogleAnalytics(path);
  },

  _logToGoogleAnalytics: function(url) {
    JS.require('pageTracker', function() { pageTracker._trackPageview(url);});
  },

  itunesImportTrack: function(status){
    var path = '/import/itunes/' + status;
    this._logToGoogleAnalytics(path);
  }
});

Songkick.EventBus.bind('app:initialize', function(config) {
  JS.require('pageTracker', function() {
    var userType = Songkick.getAnalyticsUser();

    pageTracker._setCustomVar(1, 'logged-in-status', userType, 3);
    pageTracker._trackPageview();
  });
  new Songkick.Analytics.Google(config.events);
});

