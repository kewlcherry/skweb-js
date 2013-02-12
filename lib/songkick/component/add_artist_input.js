Songkick.Component.AddArtistInput = Songkick.Class({
  initialize: function(target, label) {
    var artists = $(target),
        buttonLocation = $( target + ' ~ .form-footer');
        button = $('<input type="submit" value="'+ label + '">');
    var noToAdd = 5;
    buttonLocation.append(button);

    button.bind('click', function() {
      var formName = artists[0].className.replace(/-/g, '_').replace(/\./g, '');
      var index = artists.find('li').length;
      for (var i=0; i < noToAdd; i++) {
        var input = $('<li><input type="text" name="event[' + formName + '][' + (index + i) + ']" tabindex="10" id="'+ artists[0].className + '-' + (index + i) + '"></li>');
        artists.append(input);
      }
      return false;
    });
  }
});

Songkick.EventBus.bind('app:initialize', function() {
  new Songkick.Component.AddArtistInput('#page .headliner-names', 'Add more…');
  new Songkick.Component.AddArtistInput('#page .support-names', 'Add more…');
  new Songkick.Component.AddArtistInput('#page .artists', 'Add more…');
});