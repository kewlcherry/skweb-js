Songkick.Component.TrackingSpec = JS.Test.describe("Component.Tracking", function() { with(this) {
  before(function() { with(this) {
    // These tests assume a logged in user
    stub(Songkick, "getUser").returns({})
  }})

  describe("for tracking buttons", function() { with(this) {
    fixture('<div class="tracking">\
              <form action="/trackings" method="post" data-tracking-text="Track artist" data-stop-tracking-text="Stop tracking">\
                <input type="hidden" name="relationship_type" value="concerts">\
                <input type="hidden" name="subject_id" value="209604">\
                <input type="hidden" name="subject_type" value="Artist">\
                <input type="hidden" name="success_url" value="http://songkick.local/artists/209604-eric-bibb">\
                <input type="submit" class="artist" value="Track artist">\
              </form>\
            </div>')

    before(function() { with(this) {
      this.events = new Songkick.EventBus
      this.tracking = new Songkick.Component.Tracking({
        el: '.tracking',
        events: events,
        unTrackAction: "/trackings/untrack"
      })
      this.xhr = fakeXHR()
      stub(jQuery, "post").returns(xhr)
    }})

    describe("_formSubmitted", function() { with(this) {
      before(function() { with(this) {
        this.event = {}
        stub(event, "preventDefault")
        this.form = $('.artist').parent()
      }})

      context("when form submission has previously failed", function() { with(this) {
        before(function() { with(this) {
          tracking._failure = true
        }})

        it("should not prevent the default event", function() { with(this) {
          expect(event, "preventDefault").exactly(0)
          tracking._formSubmitted(event, form)
        }})
      }})

      context("with no previous failure", function() { with(this) {
        before(function() { with(this) {
          stub(events, "trigger")
        }})

        it("adds a 'pending' class to the button", function() { with(this) {
          tracking._formSubmitted(event, form)
          assertEqual(1, form.find('.pending').length)
        }})
      }})
    }})

    describe("server interaction", function() { with(this) {
      before(function() { with(this) {
        stub(events, "trigger")
      }})

      it("makes an XHR call when 'Track artist' is clicked", function() { with(this) {
        expect(jQuery, "post").given("/trackings", match(/relationship_type=concerts/)).returning(xhr)
        $("input[type=submit]").parent().submit()
      }})
    }})

    describe("user interface behaviour", function() { with(this) {
      describe("on a successful response from the server", function() { with(this) {
        define("succeed", function() { with(this) {
          $(".artist").parent().submit()
          xhr.resolve()
        }})

        it("changes the form action to untrack", function() { with(this) {
          succeed()
          assertEqual("/trackings/untrack", $("form").attr("action"))
        }})

        it("changes the button's value to Stop tracking", function() { with(this) {
          succeed()
          assertEqual('Stop tracking', $('.artist').val())
        }})

        it("removes the 'pending' class from the button", function() { with(this) {
          succeed()
          assertEqual(0, $('form .pending').length)
        }})

        it("adds a 'selected' class to the button", function() { with(this) {
          succeed()
          assert($(".artist").hasClass("selected"))
        }})
      }})

      describe("on an unsuccessful response from the server", function() { with(this) {
        define("fail", function() { with(this) {
          stub(jQuery.prototype, "click")
          $(".artist").parent().submit()
          xhr.reject()
        }})

        it("does not change the button's value", function() { with(this) {
          fail()
          assertEqual('Track artist', $('.artist').val())
        }})

        it("does not add a 'selected' class to the button", function() { with(this) {
          fail()
          assert(!$(".artist").hasClass("selected"))
        }})
      }})
    }})

    describe("analytics", function() { with(this) {
      before(function() { with(this) {
        stub("pageTracker", {})
        new Songkick.Analytics.Google(events)
      }})

      it("logs when 'Track artist'", function() { with(this) {
        expect(pageTracker, "_trackPageview").given("/behaviour/trackings/track/concerts/Artist/209604")
        $(".artist").submit()
      }})
    }})
  }})

  describe("for untracking buttons", function() { with(this) {
    fixture('<div class="tracking">\
              <form action="/trackings/untrack" method="post" data-tracking-text="Track artist" data-stop-tracking-text="Stop tracking">\
                <input type="hidden" name="relationship_type" value="concerts">\
                <input type="hidden" name="subject_id" value="209604">\
                <input type="hidden" name="subject_type" value="Artist">\
                <input type="hidden" name="success_url" value="http://songkick.local/artists/209604-eric-bibb">\
                <input type="submit" class="artist selected" value="Stop tracking">\
              </form>\
            </div>')

    before(function() { with(this) {
      this.events = new Songkick.EventBus
      this.tracking = new Songkick.Component.Tracking({
        el: ".tracking",
        events: events,
        trackAction: "/trackings",
        unTrackAction: "/trackings/untrack"
      })
      this.xhr = fakeXHR()
      stub(jQuery, "post").returns(xhr)
    }})

    describe("server interaction", function() { with(this) {
      before(function() { with(this) {
        stub(events, "trigger")
      }})

      it("makes an XHR call when 'Track artist' is clicked", function() { with(this) {
        expect(jQuery, "post").given("/trackings/untrack", match(/relationship_type=concerts/)).returning(xhr)
        $("input[type=submit]").parent().submit()
      }})
    }})

    describe("user interface behaviour", function() { with(this) {
      describe("on a successful response from the server", function() { with(this) {
        define("succeed", function() { with(this) {
          $(".artist").parent().submit()
          xhr.resolve()
        }})

        it("changes the form action to untrack", function() { with(this) {
          succeed()
          assertEqual("/trackings", $("form").attr("action"))
        }})

        it("changes the button’s value to Track artist", function() { with(this) {
          succeed()
          assertEqual('Track artist', $('.artist').val())
        }})

        it("removes the 'pending' class from the button", function() { with(this) {
          succeed()
          assertEqual(0, $('form .pending').length)
        }})

        it("removes the 'selected' class from the button", function() { with(this) {
          succeed()
          assert(!$(".artist").hasClass("selected"))
        }})
      }})

      describe("on an unsuccessful response from the server", function() { with(this) {
        define("fail", function() { with(this) {
          stub(jQuery.prototype, "click")
          $(".artist").parent().submit()
          xhr.reject()
        }})

        it("does not change the button's value", function() { with(this) {
          fail()
          assertEqual('Stop tracking', $('.artist').val())
        }})

        it("does not remove the 'selected' class from the button", function() { with(this) {
          fail()
          assert($(".artist").hasClass("selected"))
        }})
      }})
    }})

    describe("analytics", function() { with(this) {
      before(function() { with(this) {
        stub("pageTracker", {})
        new Songkick.Analytics.Google(events)
      }})

      it("does not log 'Track artist'", function() { with(this) {
        expect(pageTracker, "_trackPageview").exactly(0)
        $(".artist").submit()
      }})
    }})
  }})

  describe("for attendance buttons", function() { with(this) {
    fixture('<div class="attendance">\
              <form method="post" action="/trackings">\
                <input type="hidden" name="relationship_type" value="im_going">\
                <input type="hidden" name="subject_id" value="9881638">\
                <input type="hidden" name="subject_type" value="Concert">\
                <input type="hidden" name="success_url" value="%2Fconcerts%2F9881638%3Dhtml"\
                <input type="hidden" name="user_id" value="18787">\
                <input class="im-going" type="submit" value="I\'m going">\
              </form>\
              <form method="post" action="/trackings">\
                <input type="hidden" name="relationship_type" value="i_might_go">\
                <input type="hidden" name="subject_id" value="9881638">\
                <input type="hidden" name="subject_type" value="Concert">\
                <input type="hidden" name="success_url" value="%2Fconcerts%2F9881638%3Dhtml"\
                <input type="hidden" name="user_id" value="18787">\
                <input class="i-might-go" type="submit" value="I might go">\
              </form>\
            </div>')

    before(function() { with(this) {
      this.events = new Songkick.EventBus
      this.tracking = new Songkick.Component.Tracking({
        el: '.attendance',
        events: events
      })
      this.xhr = fakeXHR()
      stub(jQuery, "post").returns(xhr)
    }})



    describe("analytics", function() { with(this) {
      before(function() { with(this) {
        stub("pageTracker", {})
        new Songkick.Analytics.Google(events)
      }})

      it("logs when 'I’m going is clicked'", function() { with(this) {
        expect(pageTracker, "_trackPageview").given("/behaviour/trackings/track/im-going/Concert/9881638")
        $(".im-going").submit()
      }})

      it("logs when 'I might go' is clicked", function() { with(this) {
        expect(pageTracker, "_trackPageview").given("/behaviour/trackings/track/i-might-go/Concert/9881638")
        $(".i-might-go").submit()
      }})
    }})
  }})

  describe("app:initialize", function() { with(this) {
    fixture('<div class="tracking"><form></form></div>\
            <div class="attendance"><form></form></div>')

    context("when there is a logged in user", function() { with(this) {
      before(function() { with(this) {
        this.events = new Songkick.EventBus
        stub(Songkick, "getUser").returns({})
        stub("new", Songkick.Component, "Tracking")
      }})

      it("creates a Tracking component for trackings", function() { with(this) {
        expect("new", Songkick.Component, "Tracking").given({
          el: hasClass('tracking'),
          events: events,
          trackAction: '/trackings',
          unTrackAction: '/trackings/untrack'
        })
        Songkick.EventBus.trigger("app:initialize", {events: events})
      }})

      it("creates a Tracking component for attendance", function() { with(this) {
        expect("new", Songkick.Component, "Tracking").given({
          el: hasClass('attendance'),
          events: events,
          trackAction: '/trackings',
          unTrackAction: '/trackings/untrack'
        })
        Songkick.EventBus.trigger("app:initialize", {events: events})
      }})
    }})
  }})
}})

