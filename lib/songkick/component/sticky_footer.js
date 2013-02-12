Songkick.Component.StickyFooter = Songkick.Class({
  initialize: function(options) {
    var selector = $(options.selector);
    var footerContainer = selector.parent();
    selector.bind('click', function() {
      if(footerContainer[0].className.match('logged-in')) {
        $.cookie('dismissed_logged_in_footer', true, { expires: 31, path: '/' });
      } else {
        $.cookie('dismissed_footer', true, { path: '/' });
      }

      footerContainer.animate({
        bottom: '-200px'
      }, 1000, function (){
          selector.parent().remove()
        });
    });
  }
});

Songkick.EventBus.bind('app:initialize', function() {
  new Songkick.Component.StickyFooter({
    selector: '.sticky-footer a.close'
  });
});
