Songkick.Component.TimePicker = Songkick.Class({
  initialize: function(options) {
    this._selector = options.selector;
    this.setupListeners(options);
  },

  setupListeners: function(options) {
    var self = this;

    $(".timepicker").timePicker({
      step: 15,
      endTime: new Date(0, 0, 0, 23, 45, 0)
    });

    $(".timepicker").focus(function () {
      if ($(this).val() == "") {
        var defaultTime = "19:00";

        // Set a default time on focus if one hasn't been selected yet
        $(this).val(defaultTime);
        var itemTop = $("li:contains('" + defaultTime + "')").position().top;
        $(options.selector).scrollTop(itemTop);
        $(options.selector).find("li.selected").removeClass("selected");
        $(options.selector).find("li:contains('" + defaultTime + "')").addClass("selected");
      }
    });

    $(".timepicker").blur(function () {
      var timeOptions = [];
      $(options.selector + " > ul > li").each(function() { timeOptions.push($(this).text()) });

      // If the user's selection isn't on the list, clear the input
      if ($.inArray($(this).val(), timeOptions) == -1) {
        $(this).val("");
      }
    });
  }
});

Songkick.EventBus.bind('app:initialize', function() {
  new Songkick.Component.TimePicker({selector: '.time-picker'});
});
