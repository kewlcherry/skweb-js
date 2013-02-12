Songkick.Touch = Songkick.Class({
  is_touch_device : ('ontouchstart' in document.documentElement)? true : false,
  initialize: function() {
    if(this.is_touch_device) {
      $('.hover-for-touch').on('click',function(){ $(this).toggleClass('hover');});
    }
  }
});

Songkick.EventBus.bind('app:initialize', function(config) {
  new Songkick.Touch();
});
