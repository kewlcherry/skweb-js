Songkick.Component.filterMetroArea = function() {
  var initialize = function(){
    setupListeners();
  },
  setupListeners = function(){
    $('.filter-metro-area.search li').on('click', followSaveLocationLink);
  },

  followSaveLocationLink = function(event){
    event.preventDefault();
    $(event.currentTarget).find('form').submit();
  };

  initialize();
};


Songkick.EventBus.bind('app:initialize', Songkick.Component.filterMetroArea);

