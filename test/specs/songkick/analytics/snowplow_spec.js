Songkick.Analytics.SnowplowSpec = JS.Test.describe("Analytics.Snowplow", function() { with(this) {
  before(function() { with(this) {
    this.events = new Songkick.EventBus;
    this.snowplowAnalytics = new Songkick.Analytics.Snowplow(events);
  }})
      
  it("logs when a ticket link is clicked", function() { with(this) {
    expect(this.snowplowAnalytics, "_logToSnowplow").given("outbound", "ticket_vendors", {vendor:"ABC Tickets"});
    events.trigger("ui:tickets:buy-button:click", {vendor: "ABC Tickets", analyticsProperties: {}});
  }})

  it("logs when Facebook Connect actions happen", function() { with(this) {
    expect(this.snowplowAnalytics, "_logToSnowplow").given("fb-connect", "login", {});
    events.trigger("ui:facebook:connect", {rel: "login"});
  }})

  it("logs when itunes import actions happen", function() { with(this) {
    expect(this.snowplowAnalytics, "_logToSnowplow").given("import", "itunes", {});
    events.trigger("ui:itunes:track", {});
  }})

  it("logs when 'I'm going' buttons are clicked", function() { with(this) {
    expect(this.snowplowAnalytics, "_logToSnowplow").given("trackings", "im-going", {"subject_id": 9881638, "subject_type": "Concert" } );
    events.trigger("ui:attendance:click", {
      type: "im-going",
      subject: {
        type: "Concert",
        id: 9881638
      }
    })
  }})
}})

