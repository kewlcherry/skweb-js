JS.ENV.SpecHelper = new JS.Module('SpecHelper', {
  extend: {
    ClassMethods: new JS.Module({
      fixture: function(html) {
        this.before(function() {
          jQuery('#fixture').html(html);
        });
        this.after(function() {
          jQuery('#fixture').empty();
        });
      },
      
      fixtureFrom: function(url, selector) {
        var doc     = null,
            element = null,
            fixture = null;
        
        var xhr = jQuery.ajax({url: url});
        
        xhr.success(function(response) {
          doc = jQuery(response);
          element = doc.find(selector)[0];
          if (!element) return;
          
          fixture = jQuery('<div>').append(element).html();
          
          if (window.console) {
            console.log('Fixture from', url, selector);
            console.log(fixture);
          }
        });
        
        this.before(function(resume) {
          xhr.success(function() {
            if (fixture) jQuery('#fixture').html(fixture);
            
            resume(function() {
              if (!fixture)
                throw new Error('Failed to find selector "' + selector + '" at ' + url);
            });
          });
          
          xhr.error(function(response) {
            resume(function() {
              throw new Error('Failed to load fixture from ' + url);
            });
          });
        });
        
        this.after(function() {
          jQuery('#fixture').empty();
        });
      },
      
      jsonFixtureFrom: function(file) {
        var path = JS.ENV.ROOT + '/spec/fixtures/' + file,
            xhr  = jQuery.ajax({url: path});
        
        this.before(function(resume) {
          var self = this;
          xhr.success(function(response) {
            self.json = JSON.parse(response);
            resume();
          });
        });
      }
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

