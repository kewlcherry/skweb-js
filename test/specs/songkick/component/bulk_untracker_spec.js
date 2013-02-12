Songkick.Component.BulkUntrackerSpec = JS.Test.describe("Component.BulkUntracker", function() { with(this) {
  fixture('<form action="/trackings/untrack" method="post">\
            <fieldset>\
              <label for="untrack-all"><span><input type="checkbox" id="untrack-all" class="select-all"></span> Select all</label>\
            </fieldset>\
            <ul class="un-tracker">        \
              <li>\
                <label><input type="checkbox" name="subject_ids[]" id="subject_id_72550" value="72550"></label>\
              </li>\
              <li>\
                <label><input type="checkbox" name="subject_ids[]" id="subject_id_933366" value="933366"></label>\
              </li>\
            </ul>\
            <fieldset>\
              <label for="untrack-all-bottom"><span><input type="checkbox" id="untrack-all-bottom" class="select-all"></span> Select all</label>\
            </fieldset>\
          </form>')
  
  before(function() { with(this) {
    new Songkick.Component.BulkUntracker({selector: 'form'})
    this.selectAllTop    = $("#untrack-all")
    this.selectAllBottom = $("#untrack-all-bottom")
    this.first           = $("#subject_id_72550")
    this.second          = $("#subject_id_933366")
  }})
  
  describe('when I tick select all', function() { with(this) {
    before(function() { with(this) {
      selectAllTop.attr("checked", true)
      selectAllTop.change()
    }})
    
    it("selects all the artists, and marks them as deleted", function() { with(this) {
      assert(first.attr('checked'))
      assert(second.attr('checked'))
      assert(selectAllBottom.attr('checked'))
      assert(first.parent().parent().hasClass('deleted'))
      assert(second.parent().parent().hasClass('deleted'))
    }})
    
    describe("and then I uncheck one artist", function() { with(this) {
      before(function() { with(this) {
        second.attr("checked", false)
        second.change()
      }})
      
      it("unchecks 'Select all'", function() { with(this) {
        assert(!selectAllTop.attr("checked"))
        assert(!selectAllBottom.attr("checked"))
      }})
      
      it("leaves the other artist checked, and marked deleted", function() { with(this) {
        assert(first.attr("checked"))
        assert(first.parent().parent().hasClass('deleted'))
      }})
    }})
  }})
  
  describe('when I tick select all at the bottom', function() { with(this) {
    before(function() { with(this) {
      selectAllBottom.attr("checked", true)
      selectAllBottom.change()
    }})
    
    it("selects all the artists", function() { with(this) {
      assert(first.attr('checked'))
      assert(second.attr('checked'))
      assert(selectAllTop.attr('checked'))
      assert(first.parent().parent().hasClass('deleted'))
      assert(second.parent().parent().hasClass('deleted'))
    }})
  }})
  
  describe("when I select an artist", function() { with(this) {
    before(function() { with(this) {
      first.attr("checked", true)
      first.change()
    }})
    
    it("does not change any other boxes, or mark them deleted", function() { with(this) {
      assert(!selectAllTop.attr("checked"))
      assert(!selectAllBottom.attr("checked"))
      assert(!second.attr("checked"))
      assert(!second.parent().parent().hasClass('deleted'))
    }})
  }})
}})

