Songkick.Component.DatePicker = Songkick.Class({
  _identifier:  '.datepicker',
  _clonePair:   false,
  
  DEFAULT_OPTIONS: {
    changeFirstDay:   false,
    changeMonth:      true,
    changeYear:       true,
    constrainInput:   false,
    showOn:           'button', 
    buttonImage:      SK_ASSET_HOST + '/images/icons/calendar_add.png', 
    buttonImageOnly:  true,
    yearRange:        "1900:2020",
    
    onSelect: function(dateString, datePicker) {
      Songkick.Component.DatePicker.updateSelects(dateString, datePicker.input.parent());
    }
  },
  
  initialize: function(clonePair, identifier) {
    this._clonePair  = clonePair  || this._clonePair;
    this._identifier = identifier || this._identifier;
    
    this.hideSelects();
    this.createDatePickerInput();
    
    $(this._identifier).parents('form').submit(function(){
      $('.date-picker-input').attr('disabled', 'disabled');
    });
  },
  
  hideSelects: function() {
    $(this._identifier).children().hide();
  },
  
  createDatePickerInput: function() {
    var self = this;
    $(this._identifier).each(function(index, datePicker) {
      var datePickerId    = $(datePicker).attr('id'),
          datePickerInput = $(document.createElement("input"));
      
      datePickerInput.attr({
        id:         'datepicker-' + datePickerId,
        type:       'text',
        name:       datePickerId + '[all]',
        value:      self.dateFromSelects(datePicker)
      });
      
      datePickerInput.addClass('date-picker-input').addClass('text');
      $.each(['keyup', 'blur'], function(i, eventName) {
        datePickerInput.bind(eventName, function() {
          Songkick.Component.DatePicker.updateSelects($(this).val(), datePicker);
        });
      });
      
      $(datePicker).append(datePickerInput);
      datePickerInput.datepicker(self.DEFAULT_OPTIONS);
      $('label[for="date[day]"]').attr("for", "date[all]");
    });
  },
  
  dateFromSelects: function(datePicker) {
    var day = $(datePicker).find('select[name*=day]');
    datePicker = $(datePicker);
    
    if (parseInt(day.val(), 10) === -1) return undefined;
  
    var selectedDate = datePicker.find('select[name*=month]').val() + '/' +
                       datePicker.find('select[name*=day]').val()   + '/' +
                       datePicker.find('select[name*=year]').val();
    
    return selectedDate;
  }
});

Songkick.Component.DatePicker.updateSelects = function(dateString, datePicker) {
  var datePickerId = $(datePicker).attr('id');
  if (dateString === "") {
    var day = $('#' + datePickerId + '-day').find("option[value=-1]");
    day.attr("selected", "selected");
    return true;
  }
  
  var dateArray = dateString.split('/');
  $.each(dateArray, function(i, value) { dateArray[i] = parseInt(value, 10) });
  
  var day, month, year;
  
  if (dateArray[0] > 12) {
    day   = $('#' + datePickerId + '-day').find("option[value=" + dateArray[0] + "]");
    month = $('#' + datePickerId + '-month').find("option[value=" + dateArray[1] + "]");
  } else {
    day   = $('#' + datePickerId + '-day').find("option[value=" + dateArray[1] + "]");
    month = $('#' + datePickerId + '-month').find("option[value=" + dateArray[0] + "]");
  }
  year = $('#' + datePickerId + '-year').find("option[value=" + dateArray[2] + "]");

  if (day.attr("value") && month.attr("value") && year.attr("value")) {
    day.attr("selected", "selected");
    month.attr("selected", "selected");
    year.attr("selected", "selected");
    return true;
  }
};

Songkick.EventBus.bind('app:initialize', function() {
  new Songkick.Component.DatePicker(false, '#event-date');
  new Songkick.Component.DatePicker(false, '#event-end-date');
});

