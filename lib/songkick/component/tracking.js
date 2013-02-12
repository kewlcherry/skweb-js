Songkick.Component.Tracking = Songkick.Class({
  initialize: function(options) {
    this._allForms       = $(options.el).find('form');
    this._trackAction    = options.trackAction;
    this._unTrackAction  = options.unTrackAction;
    this._events         = options.events;

    this._setupListeners();
  },

  _setupListeners: function(){
    var self = this;
    this._allForms.bind('submit', function(e) {
      self._formSubmitted(e, $(this));
    });
  },

  _formSubmitted: function(event, form) {
    if (this._failure) return;

    event.preventDefault();

    this._postForm(form);

    if (form.attr('action') !== this._unTrackAction) {
      this._events.trigger('ui:attendance:click', this._getDataFromForm(form));
      if ($('.attendance-tray').length > 0) {
        this._events.trigger('ui:attendance:tray:click', this._getDataFromForm(form));
      }
    }
  },

  _postForm: function(form) {
    if (!Songkick.getUser()) return;

    var self = this;

    form.append('<div class="pending">&nbsp;</div>');
    $.post(form.attr('action'), form.serialize())
      .success(function() { self._formSuccessfullyPosted(form); })
      .error(function()   { self._formFailure(form);            });
  },

  _formSuccessfullyPosted: function(form) {
    form = $(form);
    this._allForms.find("input[type='submit']").removeClass('selected');
    form.find('.pending').remove();

    var unTracked  = (form.attr('action') === this._unTrackAction),
        formButton = form.find("input[type='submit']"),
        newAction  = unTracked ? this._trackAction : this._unTrackAction,
        trackText  = form.data('tracking-text'),
        stopText   = form.data('stop-tracking-text');

    form.attr('action', newAction);
    form.siblings('form').attr('action', this._trackAction);

    if (unTracked) {
      if (trackText) formButton.val(trackText);
      formButton.removeClass('selected');
    } else {
      if (stopText) formButton.val(stopText);
      formButton.addClass('selected');
    }
  },

  _formFailure: function(form){
    this._failure = true;
    form.find("input[type='submit']").click();
  },

  _getDataFromForm: function(form){
    return {
      type: form.find('[name=relationship_type]').val().replace(/_/g, '-'),
      subject: {
        type: form.find('[name=subject_type]').val(),
        id:   form.find('[name=subject_id]').val()
      }
    };
  }
});

Songkick.EventBus.bind('app:initialize', function(config) {
  function setup(selector) {
    $(selector).each(function(i, node) {
      new Songkick.Component.Tracking({
        el: node,
        events: config.events,
        trackAction : '/trackings',
        unTrackAction:'/trackings/untrack'
      });
    });
  }

  setup('.attendance');
  setup('.tracking');
});
