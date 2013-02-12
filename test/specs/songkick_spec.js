JS.ENV.SongkickSpec = JS.Test.describe("Songkick", function() { with(this) {
  before(function() { with(this) {
    stub("SK", {})
  }})
  
  describe("getUser", function() { with(this) {
    context("with no user set", function() { with(this) {
      before(function() { with(this) {
        stub(SK, "logged_in_user", {id: null})
      }})
      
      it("returns null", function() { with(this) {
        assertNull(Songkick.getUser())
      }})
    }})
    
    context("with a logged in user", function() { with(this) {
      before(function() { with(this) {
        this.user = {id: 18787}
        stub(SK, "logged_in_user", user)
      }})
      
      it("returns the user", function() { with(this) {
        assertSame(user, Songkick.getUser())
      }})
    }})
  }})
}})

