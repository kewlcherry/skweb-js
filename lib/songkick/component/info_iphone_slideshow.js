Songkick.Component.InfoIphoneSlideshow = Songkick.Class({
  initialize: function() {
    var self = this;
    setInterval(function(){ self.slideSwitch() }, 5000);
  },

  slideSwitch: function() {
    var active = $('.stand-first img.handset.active');

    if ( active.length == 0 ) active = $('.stand-first img.handset:last');

    var next =  active.next().length ? active.next()
        : $('.stand-first img.handset:first');

    active.addClass('last-active');

    next.css({opacity: 0.0})
        .addClass('active')
        .animate({opacity: 1.0}, 1000, function() {
            active.removeClass('active last-active');
        });
  }
});

Songkick.EventBus.bind('app:initialize', function() {
  new Songkick.Component.InfoIphoneSlideshow();
});
