Songkick.Analytics.GoogleSpec = JS.Test.describe("Analytics.Google", function() { with(this) {
  before(function() { with(this) {
    this.events = new Songkick.EventBus
    this.analytics = new Songkick.Analytics.Google(events)
  }})

  context("when there is a logged in user", function() { with(this) {
    before(function() { with(this) {
      stub(Songkick, "getAnalyticsUser").returns('user')
    }})

    it("tells Google we have a user", function() { with(this) {
      expect(pageTracker, "_setCustomVar").given(1, 'logged-in-status', 'user', 3);
      Songkick.boot();
    }})
  }})

  context("when there is no logged in user", function() { with(this) {
    before(function() { with(this) {
      stub(Songkick, "getAnalyticsUser").returns('visitor')
    }})

    it("tells Google we have a visitor", function() { with(this) {
      expect(pageTracker, "_setCustomVar").given(1, 'logged-in-status', 'visitor', 3);
      Songkick.boot()
    }})
  }})

  it("logs when a ticket link is clicked", function() { with(this) {
    expect(pageTracker, "_trackPageview").given("/outbound/ticket_vendors/ABC%20Tickets")
    events.trigger("ui:tickets:buy-button:click", {vendor: "ABC Tickets"})
  }})

  it("logs when Facebook Connect actions happen", function() { with(this) {
    expect(pageTracker, "_trackPageview").given("/behaviour/fb-connect/")
    events.trigger("ui:facebook:connect")
  }})

  it("logs when 'I'm going' buttons are clicked", function() { with(this) {
    expect(pageTracker, "_trackPageview").given("/behaviour/trackings/track/im-going/Concert/9881638")
    events.trigger("ui:attendance:click", {
      type: "im-going",
      subject: {
        type: "Concert",
        id: 9881638
      }
    })
  }})
}})

