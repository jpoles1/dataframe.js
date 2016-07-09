require("mocha")
var df = require("../dataframe")
describe("Series Functionality", function(){
  it("Allows the user to run summary statistics on a well-formatted series", (done)=>{
    var test_df = df(test_data)
    var age_series = test_df.$("age")
    console.log("Mean:", age_series.mean())
    console.log("SD:", age_series.sd())
    console.log("SE:", age_series.se())
    done()
  })
})
