
(function(){
var OneKicker = Songkick.Class({
  artists: [],
  _appletHTML: '<applet code="com/songkick/OneKicker.class" archive="/plugins/OneKicker.jar"  mayscript    type="application/x-java-applet"><param name="bgcolor" value="#f7f7f7"><param name="fontcolor" value="000000"><param name="codebase_lookup" value="false"></applet>',
  _appletInjected:  false,
  appletLoaded:     false,
  _scanComplete:    false,
  _postCompleted:   false,
  _error:           false,
  MAX_ARTISTS:      400,
  _started_at:      new Date(),
  initialize: function(events){
    this.setupListeners();
    this._events    = events;
    this.catchAllErrors;
    window.onunload = function(){};
  },

  catchAllErrors : function(){
    var self = this;
    window.onerror = function(errorMessage, url, line) {
      self.onError(errorMessage + " line:" + line)
      return true;
    };
  },

  injectApplet: function(appletContainer) {
    if (this._appletInjected) return;
    $(appletContainer).append(this._appletHTML);
    this._onInjection();
  },

  setupListeners: function(){
  var self = this;
  $('.skip').on('click', function(){ self.recordSkip(); });

  $('.scan-library').on('click',function(){
    $('.step-one').fadeOut('fast',function(){
      $('.step-two').fadeIn('fast');
      setTimeout(function(){ self.injectApplet("#itunes-applet"); }, 4000);
      setTimeout(function(){ self.ifAppletFailsToLoad(); }, 25000);
    });
  });
  },

  recordSkip: function(e) {
    this._events.trigger('ui:itunes:track', encodeURIComponent("skip") );
    setTimeout(function(){location.href = '/calendar'; }, 100);
    e.preventDefault();
  },

  onLoad: function(loadInfo) {
    this.appletLoaded = true;
    var self = this;
    setTimeout(function(){
      if ( self._error) { return; }
      $('.step-two').fadeOut('fast',function(){ $('.step-three').fadeIn('fast'); });
    },1500);
  },

  onError: function(e){
    var error = e.exception || 'unknown';
    this._error = true;
    $('.itunes > *').hide();
    $('.step-five').fadeIn('fast');
    this._events.trigger('ui:itunes:track', encodeURIComponent(SK.logged_in_user.id + "-" + error) );
  },

  onPermissionsError: function() { this.onError({exception: 'no-permissions'});  },
  failedImport:       function() { this.onError({exception: 'failed-import'});   },
  _onInjection:       function() { this._appletInjected = true;     },

  ifAppletFailsToLoad: function(){
    if  (this.appletLoaded === true) return;
    $("#itunes-applet").css({height: 'auto', width: 'auto', overflow: 'visible'});
  },

  onITunesImportStart: function(e) {
    $('.java-disabled').remove();
    var self = this;
    this._started_at = new Date();
    setTimeout(function(){ self.rotateNames(); },600);
  },

  onTrackArtistFromITunes: function(artist) {
    this.artists.push(artist);
  },

  onITunesImportComplete: function(e) {
    if (this._scanComplete) return;
    var self = this;
    this.postJson().done(function(){ self.successfulImport(); }).fail(function(){ self.failedImport(); });
  },

  rotateNames: function(){
    var self = this;
    setTimeout(function(){
      if (self._postCompleted === true) return;
      var random_id = Math.floor(self.artists.length * Math.random());
      var artist    = self.artists[random_id];
      self.rotateNames();
      if (artist === undefined) return
      $('.itunes .artists').prepend('<li>' + artist.name + '</li>');
    },400);
  },

  successfulImport: function(){
    var completed_at = new Date(),
    self = this,
    time = (completed_at - this._started_at > 8000) ? 0 : 8000 - (completed_at - this._started_at);
    setTimeout(function(){
      self._postCompleted = true;
      self._events.trigger('ui:itunes:track', encodeURIComponent("success") );
       $('.step-three').fadeOut('fast',function(){
          $('.step-four').fadeIn('fast');
          setTimeout(function(){ location.href = '/calendar?itunes=success'; }, 4000);
        });
    },time)
  },

  postJson: function(){
    return $.ajax({
      type: 'POST',
      url: '/trackings/bulk',
      data:JSON.stringify(this.constructJson()),
      contentType: 'application/json',
      dataType: 'json'
    });
  },

  constructJson: function(){
    var payload = {
      "providers" :[{
        "service": "itunes",
        "version": 1,
        "data": {
          "artists": this.artists.slice(0,this.MAX_ARTISTS)
        }
      }]
    };

    payload.captureTime     = parseInt((new Date().getTime() / 1000),10);
    payload.clientOs        = navigator.platform;
    payload.clientPlatform  = jQuery.uaMatch(navigator.userAgent).browser;
    return payload;
  }

});

 Songkick.EventBus.bind('app:initialize', function(config) {
  Songkick.Component.OneKicker = new OneKicker(config.events);
});

}());


