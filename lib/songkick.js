Songkick = {
  Class: function(superclass, instanceMethods, classMethods) {
    if (typeof superclass !== 'function') {
      classMethods = instanceMethods;
      instanceMethods = superclass;
      superclass = null;
    }
    var klass = function() { this.initialize.apply(this, arguments) },
        bridge;

    if (superclass) {
      bridge = function() {};
      bridge.prototype = superclass.prototype;
      klass.prototype = new bridge();
      klass.prototype.constructor = klass;
    }

    klass.prototype.initialize = function() {};
    this.extend(klass.prototype, instanceMethods);
    this.extend(klass, classMethods);
    return klass;
  },

  extend: function(target, source) {
    if (!source) return;
    for (var key in source) {
      if (target[key] === source[key]) continue;
      target[key] = source[key];
    }
    return target;
  },

  boot: function(environment) {
    this.ENVIRONMENT = environment;
    Songkick.EventBus.trigger('app:initialize', {
      events: Songkick.EventBus
    });
  },

  getUser: function() {
    var user = SK.logged_in_user;
    if (user && user.id) {
      return user;
    } else {
      return null;
    }
  },

  getAnalyticsUser: function() {
    var user = SK.logged_in_user;
    if(user) {
      return user.analyticsUserType;
    } else {
      return null;
    }
  },

  getAnalyticsUserProperties: function() {
    var properties = {};
    if (SK.pageview_analytics_variables) {
      for (p in SK.pageview_analytics_variables) {
        properties[p] = SK.pageview_analytics_variables[p];
      }
    }
    var user = SK.logged_in_user;
    if (SK.logged_in_user) {
      if (user.id) {
        properties.user_id = user.id;
      }
      if (user.analyticsUserType) {
        properties.user_type = user.analyticsUserType;
      }
    }
    return properties;
  },

  getParameterByName: function(name) { //http://james.padolsey.com/javascript/bujs-1-getparameterbyname/
    var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
    return match ? decodeURIComponent(match[1].replace(/\+/g, ' ')) : null;
  }

};

