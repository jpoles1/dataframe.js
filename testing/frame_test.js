require("mocha")
const assert = require('assert');
var df = require("../dataframe")
describe("Dataframe Functionality", function(){
  it("Allows the user to create a dataframe using a well-formatted object", (done)=>{
    var test_df = df(test_data)
    console.log(test_df)
    done();
  })
  it("Allows the user to create a dataframe using an ill-formatted object", (done)=>{
    var test_df = df(invalid_data)
    console.log(test_df)
    done();
  })
  it("Allows the user to aggregate a table", (done)=>{
    var test_df = df(big_test_data);
    var agg_mean = test_df.aggregate((agg_series) => {
      agg_df = df(agg_series)
      return agg_df.$("age").mean()
    }, "group")
    console.log(agg_mean)
    var overall_mean = test_df.aggregate((agg_series) => {
      agg_df = df(agg_series)
      return agg_df.$("age").mean()
    }, null)
    console.log(overall_mean["aggregated"], test_df.$("age").mean())
    assert(overall_mean == test_df.$("age").mean())
    done()
  })
})
