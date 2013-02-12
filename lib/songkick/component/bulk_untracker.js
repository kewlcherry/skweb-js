Songkick.Component.BulkUntracker = Songkick.Class({
  initialize: function(options) {
    var selector = options.selector,
    responsiveTrackSelector = '.responsive-layout li:not(.deleted-responsive):not(.pending-tracking) input[type=checkbox]',
    responsiveUntrackSelector  ='.responsive-layout .un-tracker li.deleted-responsive:not(.pending-tracking) input[type=checkbox]';

    var self = this;
    $(selector).find('.select-all').bind('change',function(){
      self.selectAll(selector,this)
    });
    $(selector).find('ul input[type=checkbox]').bind('change',function(){
      self.toggleDeleted(selector,this)
    });
    $('#page').on('click',responsiveTrackSelector,    function(){ self.TrackArtist(this);     });
    $('#page').on('click',responsiveUntrackSelector,  function(){ self.UntrackArtist(this);   });
  },

  selectAll: function(form,selectAll){
    var checked = $(selectAll).attr('checked') === 'checked' ? 'checked' : null,
        victims = $(form).find('ul input[type=checkbox]'),
        deleted = checked === 'checked';

    victims.attr('checked', checked);
    victims.parents('li').toggleClass('deleted', deleted);
    $(form).find('.select-all').attr('checked', checked);
  },

  toggleDeleted: function(form,checkbox){
    $(form).find('.select-all').attr('checked', null);
    $(checkbox).parents('li').toggleClass('deleted');
  },

  TrackArtist: function(dom){
    var values  = this.formValues(dom),
    li          = $(dom).parents('li');

    li.addClass('pending-tracking');
    this.track('/trackings/untrack',values)
    .done(function(){
      li.removeClass('pending-tracking').addClass('deleted-responsive')
    })
    .fail(function(){
      li.removeClass('pending-tracking');
    });
  },

  UntrackArtist: function(dom){
    values = this.formValues(dom);
    li = $(dom).parents('li');
    li.addClass('pending-tracking');
    this.track('/trackings',values).done(function(){
      $(li).removeClass('deleted-responsive').removeClass('pending-tracking')
    })
    .fail(function(){
      li.removeClass('pending-tracking');
    });
  },

  formValues :function(checkbox) {
    var rawFormValues = $(checkbox.form).serializeArray(),
    formValues        = [];

    $(rawFormValues).each(function(){
        if (this.name == 'subject_ids[]') return
        formValues.push(this);
    })
    formValues.push({name: checkbox.name.replace('s[]',''), value:checkbox.value })
    return formValues;
  },
  track : function(url,form_values){
    var dfr = $.Deferred();
    $.post(url,form_values)
    .success(function(){  dfr.resolve(); })
    .fail(function(){     dfr.reject();  });
    return dfr;
  }
});


Songkick.EventBus.bind('app:initialize', function() {
  new Songkick.Component.BulkUntracker({selector: '.artist-listings form'});
});





