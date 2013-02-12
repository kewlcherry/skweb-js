Songkick.Component.TasteImport = Songkick.Class({
  initialize: function(target) {
    var fieldToValidate = $(target + ' input[required]')[0];
    var formToSubmit = $(target);
    
    formToSubmit.bind('submit', function() {
      if (fieldToValidate.value === '')     return false;
      if (fieldToValidate.type !== 'email') return true;
      return /.+@.+\./.test(fieldToValidate.value);
    });
  }
});

Songkick.EventBus.bind('app:initialize', function(config) {
  new Songkick.Component.TasteImport('.pandora');
  new Songkick.Component.TasteImport('.lastfm');
});
