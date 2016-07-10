require("mocha")
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
    console.log("Overall Mean", df(agg_mean).$("aggregated").mean())
    done()
  })
})
