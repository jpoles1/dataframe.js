var Lazy = require("lazy.js")
//Setup Testing Framework
global.test_data = [{id: 1, name: "Jordan", age: 20}, {id: 2, name: "Jillian", age: 17}]
global.invalid_data = [{id: 1, name: "Jordan", age: 20}, {id: "Jillian", name: 2, age: "17"}]
//Generate some bigger test data
var num_rows = 100000;
var num_groups = 150;
global.big_test_data = Lazy.range(num_rows)
.map((id) => {
  return {id, group: Math.ceil(Math.random()*num_groups), age: Math.ceil(Math.random()*50)}
})
//Run tests
require("./frame_test")
require("./series_test")
