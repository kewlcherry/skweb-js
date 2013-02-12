Songkick.Component.FriendsPlans = Songkick.Class({
  initialize: function(fb) {
    var component = $('#friends-plans')
    var self = this;

    if (component.find('.not-connected').length > 0) {
      fb.getLoginStatus(function(response) {
        if (response.status === 'connected') {
          self.reloadComponent();
        }
      });
      
    }
    
    self.dismissComponent();
  },
  reloadComponent: function() {
    $('#friends-plans').html("<h1 class=\"empty\"><img src=\"/images/nw/furniture/spinners/large.gif\" title=\"Fetching your friends’ plans\" alt=\"Fetching your friends’ plans\" width=\"64\" height=\"64\" class=\"spinner\"></h1>");
    $.ajax({
      url: "/home",
      context: $('#friends-plans')
    }).done(function(data) {
      $(this).html($(data).find('#friends-plans'));
    });
  },
  
  dismissComponent: function() {  
    var selector = $('#friends-plans .close');
    var container = selector.parent().parent();

    selector.bind('click', function() {
        $.cookie('dismissed_friends_plans', true, { expires: 36000, path: '/' });

        container.animate({
          height: '0'
        }, 1000, function (){
            container.remove()
        });
      });
  }
});

Songkick.EventBus.bind('facebook:initialized', function(fb) {
  new Songkick.Component.FriendsPlans(fb);
});
