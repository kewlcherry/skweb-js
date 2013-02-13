JS.ENV.SpecHelper = new JS.Module('SpecHelper', {
  extend: {
    ClassMethods: new JS.Module({
      fixture: function(html) {
        var fixture = $('#fixture');
        if (fixture.length === 0) $('body').prepend('<div id="fixture"></div>');

        this.before(function() {
          jQuery('#fixture').html(html);
        });
        this.after(function() {
          jQuery('#fixture').empty();
        });
      },
    }),

    included: function(testSuite) {
      testSuite.extend(this.ClassMethods);
    }
  },
  
  fakeXHR: function() {
    var xhr = new jQuery.Deferred();
    xhr.error = xhr.fail;
    xhr.success = xhr.done;
    xhr.complete = xhr.always;
    return xhr;
  },
  
  hasClass: function(className) {
    return {
      equals: function(node) {
        return node.className === className;
      }
    };
  }
});

JS.Test.Unit.TestCase.include(SpecHelper);

JS.ENV.SK          = {};
JS.ENV._gat        = {};
JS.ENV.pageTracker = {_trackPageview: function() {}, _setCustomVar: function() {}};
JS.ENV.twttr       = {events: {bind: function() {}}};

