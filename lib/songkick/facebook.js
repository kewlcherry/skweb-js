Songkick.Facebook = {
  init: function(appId, requiredPermissions, options) {
    options                   = options || {};
    this._events              = options.events;
    this._requiredPermissions = requiredPermissions.join(',');

    FB.init({
      appId      : appId,
      channelUrl : '//www.songkick.com/channel.html',
      cookie     : true,
      oauth      : true,
      status     : true,
      xfbml      : true
    });
    FB.Event.subscribe('auth.statusChange',this._authChange);
    FB.Event.subscribe('edge.create', this._handleLike)

    this._events.trigger("facebook:initialized", FB);

    this._initUIHandlers();


    // Lazy promise encapsulating the process of connecting to Facebook. The
    // promise wrapper initiates the process when callbacks are added, and only
    // allows one login process to be running at any time.
    this._connection = new Songkick.LazyPromise(function(succeed, fail) {
      FB.login(function(response) {
        var auth = response.authResponse;
        if (auth) {
          succeed(auth.accessToken, auth.expiresIn);
        } else {
          fail();
        }
      }, {scope: this._requiredPermissions});
    }, this);
  },
  _authChange: function(response) {
    if (response.status != 'connected') return;
    var auth  = response.authResponse;
    var token     = { access_token: auth.accessToken, expires_in: auth.expiresIn };
    Songkick.EventBus.trigger('facebook:sendToken', token);
  },
  _initUIHandlers: function() {
    if (this._uiReady) return;
    var self = this;

    $('body').on('submit', 'form.facebook-connect', function(event) {
      if (!$(this).attr('data-require-facebook') && SK.logged_in_user.id) return true;
      event.preventDefault();

      self._events.trigger('ui:facebook:connect', {});
      var formToSubmit = $(this);

      self.authenticatedSubmitFromForm(formToSubmit);
      return false;
    });

    this._uiReady = true;
  },

  _handleLike: function(href, widget) {
    var sharedUrl = href + '?utm_source=facebook&utm_campaign=fblike';
    if (widget._attr && widget._attr.ref) {
      sharedUrl += '&utm_content=' + widget._attr.ref;
    }
    this._events.trigger('ui:facebook:like', {url: sharedUrl, encoded: false});
  },

  // Public interface for establishing a Facebook connection. Establishes a
  // Facebook connection and posts the Facebook account data to our server,
  // synchronously to cause a page refresh. It redirects either to the current
  // page, or the success_url param of the current page. success_url can also
  // be passed as an option.

  authenticatedSubmitFromForm: function(form)  {
    var self = this;
    var formToSubmit = form[0];

    if(!formToSubmit.elements['success_url']) throw new Error('Facebook.importLikes needs a success_url.');

    this._connection.callback(function(accessToken, expiresIn) {

      var params = Songkick.extend({access_token: accessToken, expires_in: expiresIn}, {});

      self._formFieldAppender(formToSubmit, params);
      formToSubmit.submit();
    });
  },

  _formFieldAppender: function(form, params) {
    for (var key in params) {
      if (!params.hasOwnProperty(key)) continue;
      input = $('<input name="' + key + '" value="' + params[key] + '" type="hidden">');
      form.appendChild(input[0]);
    }
  }
};

Songkick.extend(Songkick.Facebook, Songkick.Events);
