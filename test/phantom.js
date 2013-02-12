phantom.injectJs('../vendor/jstest.js')

var webpage  = new WebPage(),
    format   = JS.Console.envvar('FORMAT') || 'spec',
    reporter = new JS.Test.Reporters.PhantomJS({format: format}, webpage)

webpage.open('test/browser.html')

