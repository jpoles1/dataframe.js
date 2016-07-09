require("mocha")
var df = require("../dataframe")
describe("Dataframe Functionality", function(){
  it("Allows the user to create a dataframe using a well-formatted object", (done)=>{
    var test_df = df(test_data)
    console.log(test_df)
    done();
  })
})
