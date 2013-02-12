 Songkick.Component.Navigation = Songkick.Class({
  responsiveSizeTrigger: 767,
  lastSize: undefined,
  _window: $(window),
  initialize: function(){
    if (!$('body').hasClass('mobile-enabled')) return;
    this.addResponsiveClass();
    this.addSetupListeners();
    this.addResizeListener();
  },
  addSetupListeners: function(){
    $('html').on('click','body.responsive-layout .nav > .drop-down',function(e) {
      $(e.target).parents('ul').find('ul li').hide();
      $(e.target).parents('li').find('ul li').slideToggle('fast');
      e.preventDefault();
    });
  },
  addResizeListener: function(){
    var self= this;
    jQuery(window).resize(function(){
      if(self._window.width() == self.lastSize) return;
      self.lastSize = self._window.width();
      self.addResponsiveClass();
    });
  },
  addResponsiveClass: function(){
    if (this._window.width() < this.responsiveSizeTrigger) {
      $("body").addClass("responsive-layout");
    } else {
      $('.nav li').attr('style','');
      $("body").removeClass("responsive-layout");
    }
  }
});

 Songkick.EventBus.bind('app:initialize', function() {
  new Songkick.Component.Navigation();
});

