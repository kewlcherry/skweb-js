JS.packages(function() { with(this) {
  var ROOT = JS.ENV.ROOT || '.';

  file(ROOT + '/test/spec_helper.js')
    .provides('SpecHelper')
    .requires('JS.Test');

  autoload(/^(.*)Spec$/,     {from: ROOT + '/test/specs', require: '$1'});
  autoload(/^(.*)\.[^\.]+$/, {from: ROOT + '/lib', require: '$1'});
  autoload(/^(.*)$/,         {from: ROOT + '/lib'});

  pkg('jQuery').provides('jQuery.fn');
  pkg('jQuery.fn.mentionsInput').requires('_', 'jQuery.fn.elastic');

  pkg('Songkick.Component').requires('jQuery', 'jQuery.ui', 'Songkick.Events');
  pkg('Songkick.Analytics').requires('Songkick.Events', 'SnowPlow');
  pkg('Songkick.Facebook').requires('Songkick.LazyPromise');
}});
