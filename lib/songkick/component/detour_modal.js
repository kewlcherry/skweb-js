Songkick.Component.DetourModal = Songkick.Class({
  initialize: function(events) {
    events.bind('ui:attendance:click', this.showModal, this);
  },
  showModal: function(event) {
    $(".detour-modal-ad").detach().appendTo("body");
    $(".detour-modal-ad").css("display", "block");
    $(".detour-modal-ad .close").on("click", function(event) {
      $(".detour-modal-ad").css("display", "none");
    });
  }
});

Songkick.EventBus.bind("app:initialize", function(config) {
  new Songkick.Component.DetourModal(config.events);
});
