Songkick.Component.CitySelectorSpec = JS.Test.describe("Component.CitySelector", function() { with(this) {
  describe("in the search state", function() { with(this) {
    fixture('<div class="city-selector">\
              <span class="selected-small-city hidden">\
                <input type="hidden" value="" name="venue[small_city_id]">\
                <strong></strong>\
                <input type="submit" name="venue[small_city_change]" value="Change city">\
              </span>\
              \
              <span class="search-small-city">\
                <input type="text" name="venue[small_city_query]" id="small_city_query" value="london">\
                <input type="submit" name="small_city_search" value="Search">\
              </span>\
\
              <ul class="options search-ui selections">\
                <li>\
                  <input class="radio" id="small_city_id_24426" name="venue[small_city_id]" type="radio" value="24426" />\
                  <label for="small_city_id_24426">London, UK</label>\
                </li>\
                <li>\
                  <input class="radio" id="small_city_id_27374" name="venue[small_city_id]" type="radio" value="27374" />\
                  <label for="small_city_id_27374">London, ON, Canada</label>\
                </li>\
                <li>\
                  <input class="radio" id="small_city_id_105876" name="venue[small_city_id]" type="radio" value="105876" />\
                  <label for="small_city_id_105876">London, KY, US</label>\
                </li>\
              </ul>\
            </div>')
    
    before(function() { with(this) {
      this.city_selector = new Songkick.Component.CitySelector({
        selector: ".city-selector",
        suffix: "small-city"
      })
      this.element       = $(".city-selector")
      this.selected_city = element.find(".selected-small-city")
      this.search_city   = element.find(".search-small-city")
      this.options       = element.find("ul.search-ui")
    }})
    
    context("when a city is selected", function() { with(this) {
      before(function() { with(this) {
        element.find("li:first-child input").click()
      }})
      
      it("hides the search field when a city is selected", function() { with(this) {
        assert(search_city.hasClass("hidden"))
      }})
      
      it("hides the options list", function() { with(this) {
        assert(options.hasClass("hidden"))
      }})
      
      it("shows the selected city", function() { with(this) {
        assert(!selected_city.hasClass("hidden"))
        assertEqual("London, UK", selected_city.find("strong").html())
      }})
    }})
  }})
}})

