// LazyPromise encapsulates an asynchronous task, with an interface similar to
// that of a Deferred object. The task is not run until at least one callback is
// added, and only one instance of the task runs at any time. The task may be
// asynchronous.
//
// For example, you can use this to implement Facebook login, where concurrent
// independent bits of code require a Facebook session but you need to make sure
// the user doesn't see multiple Facebook login windows. In this example, the
// Facebook login process is the task you want to encapsulate, and multiple
// code paths can attach callbacks to it.
//
// See the tests for examples.

Songkick.LazyPromise = Songkick.Class({
  initialize: function(task, context) {
    this._task    = task;
    this._context = context;
    this._state   = 'idle';
    this.reset();
  },

  reset: function() {
    this._callbacks = [];
    this._errbacks  = [];
  },

  callback: function(callback, context) {
    this._callbacks.push([callback, context]);
    this.execute();
    return this;
  },

  errback: function(callback, context) {
    this._errbacks.push([callback, context]);
    this.execute();
    return this;
  },

  succeed: function() {
    this._state = 'succeeded';
    var callback;
    while (callback = this._callbacks.shift())
      callback[0].apply(callback[1], arguments);
    this.reset();
    return this;
  },

  fail: function() {
    this._state = 'failed';
    var callback;
    while (callback = this._errbacks.shift())
      callback[0].apply(callback[1], arguments);
    this.reset();
    return this;
  },

  execute: function() {
    if (this._state !== 'idle' && this._state !== 'failed') return;
    this._state = 'running';

    var self    = this,
        succeed = function() { self.succeed.apply(self, arguments) },
        fail    = function() { self.fail.apply(self, arguments) };

    this._task.call(this._context, succeed, fail);
    return this;
  }
});

