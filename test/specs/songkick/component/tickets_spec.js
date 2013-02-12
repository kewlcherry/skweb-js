Songkick.Component.TicketsSpec = JS.Test.describe("Component.Tickets", function() { with(this) {
  fixture('<div class="tickets component">\
            <a class="buy-tickets button" title="Ticketmaster UK"><span>Buy tickets</span></a>\
            <a class="vendor" title="See"><img></a>\
            <a class="nothing" href="http://example.com">Something</a>\
          </div>')
  
  before(function() { with(this) {
    this.events = new Songkick.EventBus
    this.tickets = new Songkick.Component.Tickets({
      selector: ".tickets.component",
      events: events
    })
  }})
  
  define("click_buy_link", function() {
    $(".tickets a.button").click()
  })
  
  describe("events", function() { with(this) {
    it("publishes an event when a 'Buy' button is clicked", function() { with(this) {
      expect(events, "trigger").given("ui:tickets:buy-button:click", {analyticsProperties: {}, vendor: "Ticketmaster UK"})
      click_buy_link()
    }})
    
    it("publishes an event when a vendor link is clicked", function() { with(this) {
      expect(events, "trigger").given("ui:tickets:buy-button:click", {analyticsProperties: {},vendor: "See"})
      $(".tickets img").click()
    }})
    
    it("does not publish an event when other links are clicked", function() { with(this) {
      expect(events, "trigger").exactly(0)
      $(".tickets a.nothing").click()
    }})
  }})
  
  describe("analytics integration", function() { with(this) {
    before(function() { with(this) {
      this.analytics = new Songkick.Analytics.Google(events)
    }})
    
    it("logs to Google Analytics when a ticket link is clicked", function() { with(this) {
      expect(pageTracker, "_trackPageview").given("/outbound/ticket_vendors/Ticketmaster%20UK")
      click_buy_link()
    }})
  }})
  
  describe("app:initialize", function() { with(this) {
    it("creates a tickets component with the default selector and event bus", function() { with(this) {
      expect("new", Songkick.Component, "Tickets").given({
        selector: ".tickets.component",
        events: events
      })
      Songkick.EventBus.trigger("app:initialize", {events: events})
    }})
  }})
}})

