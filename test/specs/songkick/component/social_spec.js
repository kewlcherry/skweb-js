Songkick.Component.SocialSpec = JS.Test.describe("Component.Social", function() { with(this) {
  fixture('<div class="component social">\
            <a href="http://www.facebook.com/sharer.php?u=http%3A%2F%2Fsongkick.com%2Fshared%2Furl" target="_blank" class="button facebook-share">Share</a>\
          </div>')
  
  before(function() { with(this) {
    stub(twttr, "events", new Songkick.EventBus)
    this.events = new Songkick.EventBus
    this.social = new Songkick.Component.Social({
      selector: ".social.component",
      events: events
    })
  }})
  
  describe("Events", function() { with(this) {
    describe("with a Share on Facebook button", function() { with(this) {
      before(function() { with(this) {
        stub(window, "open")
      }})
      
      it("Triggers an event when the Share (on Facebook) button is clicked", function() { with(this) {
        expect(events, "trigger").given("ui:facebook:share:click", {
          url: 'http%3A%2F%2Fsongkick.com%2Fshared%2Furl',
          encoded: true
        })
        $('.button.facebook-share').click()
      }})
      
      it("launches a popup window for the share dialog", function() { with(this) {
        expect(window, "open").given("http://www.facebook.com/sharer.php?u=http%3A%2F%2Fsongkick.com%2Fshared%2Furl", "sharer", "toolbar=0,status=0,width=626,height=436")
        $('.button.facebook-share').click()
      }})
    }})
    
    describe("with a Tweet button", function() { with(this) {
      before(function() { with(this) {
        this.iframe = document.createElement("iframe")
        iframe.src = "http://platform.twitter.com/widgets/tweet_button.html#_=1314791441117&count=horizontal&counturl=http%3A%2F%2Fexample.com%2F&id=twitter_tweet_button_0&lang=en&original_referer=http%3A%2F%2Fof1-dev-james%3A8000%2Fspec%2Fjavascript%2Fbrowser.html&text=Foo&url=http%3A%2F%2Fexample.com%2Fpath%3Futm_medium%3Dfoo%26utm_source%3Dsongkick&via=songkick"
      }})
      
      it("triggers an event when the 'Tweet' button is clicked", function() { with(this) {
        expect(events, "trigger").given("ui:twitter:tweet", {
          url: "http://example.com/path?utm_medium=foo&utm_source=songkick",
          encoded: false
        })
        twttr.events.trigger("tweet", {type: "tweet", target: iframe})
      }})
    }})
  }})
  
  describe("app:initialize", function() { with(this) {
    it("creates a social component with the default selector and event bus", function() { with(this) {
      expect("new", Songkick.Component, "Social").given({
        selector: ".social.component",
        events: events
      })
      Songkick.EventBus.trigger("app:initialize", {events: events})
    }})
  }})
}})

