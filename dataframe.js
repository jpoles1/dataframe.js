var dataframe = function(data_array, id_var){
  var frame_data = {};
  //Gotta make sure there are not repeat ids (otherwise we throw an error)
  if(id_var==null){
    id_var = "id"
  }
  data_array.forEach((row) => {
    var id_val = row[id_var];
    if(id_val == null){
      var numbered_ids = Object.keys(data_array).filter((row_name) => parseInt(row_name))
      id_val = Math.max(numbered_ids)+1
    }
    Object.keys(row).forEach((col_name) => {
      if(frame_data[col_name]==null){
        frame_data[col_name] = {}
      }
      frame_data[col_name][id_val] = row[col_name];
    })
  })
  var frame = {
    data_values: frame_data,
    $: function(colname){
      return this.data_values[colname]
    }
  }
  return frame;
}
var test_data = [{id: 1, name: "Jordan", age: 20}, {id: 2, name: "Jillian", age: 17}]
console.log(dataframe(test_data).$("age"))
