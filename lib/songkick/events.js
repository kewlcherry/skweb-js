Songkick.Events = {
  bind: function(type, callback, context) {
    var calls = this._callbacks = this._callbacks || {},
        list  = calls[type] = calls[type] || [];
    
    list.push([callback, context]);
    return this;
  },
  
  trigger : function() {
    var args  = Array.prototype.slice.call(arguments),
        type  = args.shift(),
        calls = this._callbacks,
        list  = calls && calls[type];
    
    if (!list) return this;
    
    for (var i = 0, n = list.length; i < n; i++)
      list[i][0].apply(list[i][1] || this, args);
    
    return this;
  }
};

Songkick.Events.on = Songkick.Events.bind;

Songkick.EventBus = Songkick.Class(
  Songkick.Events,
  Songkick.Events
);

