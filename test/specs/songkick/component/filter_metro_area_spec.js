Songkick.Component.filterMetroAreaSpec = JS.Test.describe("Component.filterMetroArea", function() { with(this) {
  fixture('<div class="filter-metro-area search">\
    <li class="small-city ">\
      <div class="actions">\
        <form action="/session/filter_metro_area" method="post" id="small-city">\
          <input type="hidden" name="_method" value="put">\
          <input type="hidden" name="metro_area_id" value="17835">\
          <input type="submit" value="Save location">\
        </form>\
      </div>\
      <a href="/metro_areas/17835-us-los-angeles"><img src="http://maps.google.com/maps/api/staticmap?center=34.0862,-118.376&amp;zoom=1&amp;size=50x50&amp;sensor=false&amp;markers=color:0xf80046|34.0862,-118.376" width="50" height="50" class="profile-pic"></a>\
      <p class="subject">\
        <a href="/metro_areas/17835-us-los-angeles">Los Angeles, CA, US</a>\
          including Pasadena\
      </p>\
    </li>\
  </div>')

  before(function() { with(this) {
    Songkick.Component.filterMetroArea()
  }})

  describe("filtermetroarea", function() { with(this) {
    it("submits the change location form when the link is clicked", function() { with(this) {
      expect($('form#small-city')[0], 'submit')
      $('.small-city a:first-child').click()
    }})
  }})

}})
