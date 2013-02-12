Songkick.LazyPromiseSpec = JS.Test.describe("LazyPromise", function() { with(this) {
  before(function() { with(this) {
    stub("FB", {})
    this.task = function(succeed, fail) {
      FB.login(function(response) {
        var auth
        if (auth = response.authResponse)
          succeed(auth.accessToken, auth.expiresIn)
        else
          fail()
      })
    }
  }})
  
  define("promise", function() { with(this) {
    return this._promise = this._promise || new Songkick.LazyPromise(task)
  }})
  
  it("does not run the task on creation", function() { with(this) {
    expect(FB, "login").exactly(0)
    promise()
  }})
  
  it("runs the task when a callback is added", function() { with(this) {
    expect(FB, "login").exactly(1)
    promise().callback(function() {})
  }})
  
  it("runs the task when an errback is added", function() { with(this) {
    expect(FB, "login").exactly(1)
    promise().errback(function() {})
  }})
  
  it("runs the task once when many errbacks are added", function() { with(this) {
    expect(FB, "login").exactly(1)
    promise().errback(function() {})
    promise().errback(function() {})
  }})
  
  context("when the task succeeds", function() { with(this) {
    before(function() { with(this) {
      return stub(FB, "login").yields([
        { authResponse: {accessToken: "token", expiresIn: 3600} }
      ])
    }})
    
    it("passes the success arguments to the callback", function() { with(this) {
      expect("log").given("token", 3600)
      promise().callback(function(a, b) { log(a, b) })
    }})
    
    it("does not invoke the errbacks", function() { with(this) {
      expect("log").exactly(0)
      promise().errback(function(a, b) { log(a, b) })
    }})
    
    it("does not retry the task when more callbacks are added", function() { with(this) {
      expect(FB, "login").exactly(1)
      promise().callback(function() {})
      promise().callback(function() {})
    }})
  }})
  
  context("when the task fails", function() { with(this) {
    before(function() { with(this) {
      stub(FB, "login").yields([{}])
    }})
    
    it("invokes the errbacks", function() { with(this) {
      expect("log")
      promise().errback(function() { log() })
    }})
    
    it("does not invoke the callbacks", function() { with(this) {
      expect("log").exactly(0)
      promise().callback(function(a, b) { log(a, b) })
    }})
    
    it("retries the task when more callbacks are added", function() { with(this) {
      expect(FB, "login").exactly(2)
      promise().callback(function() {})
      promise().callback(function() {})
    }})

    it("runs callbacks if the task succeeds on the second attempt", function() { with(this) {
      stub(FB, "login").yields(
        [{ authResponse: null }],
        [{ authResponse: {accessToken: "foo", expiresIn: 3600} }])

      var called = false
      promise().callback(function() { called = true })
      assert( !called )

      promise().callback(function() { called = true })
      assert( called )
    }})
  }})
}})

