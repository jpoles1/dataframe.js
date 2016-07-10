var Lazy = require("lazy.js")
module.exports = function(data_array, id_var){
  var series = function(df, colname){
    var series_data = Lazy(df.data_values[colname])
    var series_length = series_data.size();
    if(series_length  < 1){
      throw "Request for Empty Series"
    }
    return {
      series_data,
      //Average
      //mean :: [numeric] -> numeric
      mean: () => {
        return series_data.values().sum()/series_length
      },
      //Standard Deviation
      //sd :: [numeric] -> numeric
      sd: function(){
        var series_mean = this.mean()
        var variance = series_data.reduce((series_val, accum) => {
          return accum+(series_mean-series_val)^2
        }, 0)
        var sd = Math.sqrt(variance)
        return(sd)
      },
      //Standard Error
      //se :: [numeric] -> numeric
      se: function(){
        return this.sd()/Math.sqrt(series_length)
      }
    }
  }
  var frame_data = {};
  //Gotta make sure there are not repeat ids (otherwise we throw an error)
  if(id_var==null){
    id_var = "id"
  }
  Lazy(data_array).reduce((first_row, row, row_num) => {
    var id_val = row[id_var];
    if(id_val == null){
      throw "Invalid ID value for row "+row_num
    }
    Lazy(row).forEach((col_val, col_name) => {
      if(frame_data[col_name]==null){
        if(first_row){
          frame_data[col_name] = {}
        }
        else{
          throw "Row #"+row_num+" contains a previously undeclared column: "+col_name
        }
      }
      frame_data[col_name][row_num] = col_val;
    })
    return 0;
  }, 1)
  var frame = {
    id_var,
    data_array,
    data_values: frame_data,
    //aggregate :: String -> Series
    $: function(colname){
      return series(this, colname)
    },
    //aggregate :: ([a] -> b) -> String -> [b]
    aggregate: function(agg_func, by){
      var by_groups = this.$(by).series_data.values().uniq()
      return by_groups.map((group, row_num) => {
        var group_data = this.data_array.filter((row) => row[by] == group);
        return {id: row_num, group, aggregated: agg_func(group_data)}
      }).toArray()
    }
  }
  return frame;
}
