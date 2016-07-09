var _ = require("lodash")
var series = function(df, colname){
  var series_data = df.data_values[colname]
  var series_length = _.keys(series_data).length
  return {
    //Average
    mean: () => _(series_data).values().mean(),
    //Standard Deviation
    sd: function(){
      var series_mean = this.mean()
      var variance = _.reduce(series_data, (series_val, accum) => accum+(series_mean-series_val)^2, 0)
      var sd = Math.sqrt(variance)
      return(sd)
    },
    //Standard Error
    se: function(){
      return this.sd()/Math.sqrt(series_length)
    }
  }
}
var dataframe = function(data_array, id_var){
  var frame_data = {};
  //Gotta make sure there are not repeat ids (otherwise we throw an error)
  if(id_var==null){
    id_var = "id"
  }
  _.reduce(data_array, (first_row, row, row_num) => {
    var id_val = row[id_var];
    if(id_val == null){
      throw "Invalid ID value for row "+row_num
    }
    _.forEach(row, (col_val, col_name) => {
      if(frame_data[col_name]==null){
        if(first_row){
          frame_data[col_name] = {}
        }
        else{
          throw "Row #"+row_num+" contains a previously undeclared column: "+col_name
        }
      }
      frame_data[col_name][id_val] = col_val;
    })
    return 0;
  }, 1)
  //Type checking?
  /*_.each(frame_data, (column, col_name)  => {
    return _.reduce(column, (col_item, prev_type) => {
      if(prev_type==null){
        return typeof(col_item)
      }
      return prev_type==typeof(col_item)
    }, undefined)
  })*/
  var frame = {
    data_values: frame_data,
    $: function(colname){
      return series(this, colname)
    }
  }
  return frame;
}
var test_data = [{id: 1, name: "Jordan", age: 20}, {id: 2, name: "Jillian", age: 17}]
var test_df = dataframe(test_data)
var age_series = test_df.$("age")
console.log("Mean:", age_series.mean())
console.log("SD:", age_series.sd())
console.log("SE:", age_series.se())
