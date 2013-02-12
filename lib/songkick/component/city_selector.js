Songkick.Component.CitySelector = Songkick.Class({
  initialize: function(options) {
    this._element    = $(options.selector);
    this._selected   = this._element.find('.selected-' + options.suffix);
    this._search     = this._element.find('.search-' + options.suffix);
    this._searchUI   = this._element.find('.search-ui');
    this._selections = this._element.find('.selections');
    
    var self = this;
    this._selections.find('input[type=radio]').bind('click', function() {
      self.showSelected(this);
    });
  },
  
  showSelected: function(input) {
    this._selected.removeClass('hidden');
    this._search.addClass('hidden');
    this._search.find('input[type=text]').val('');
    this._searchUI.addClass('hidden');
    
    var label = $('label[for=' + input.id + ']');
    this._selected.find('strong').html(label.html());
  }
});

Songkick.EventBus.bind('app:initialize', function(config) {
  new Songkick.Component.CitySelector({selector: '.venue-form', suffix: 'small-city'});
  new Songkick.Component.CitySelector({selector: '.festival-instance-form', suffix: 'venue'});
  new Songkick.Component.CitySelector({selector: '.concert-form', suffix: 'venue'});
});

