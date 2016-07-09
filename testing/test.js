global.test_data = [{id: 1, name: "Jordan", age: 20}, {id: 2, name: "Jillian", age: 17}]
global.invalid_data = [{id: 1, name: "Jordan", age: 20}, {id: "Jillian", name: 2, age: "17"}]
require("./frame_test")
require("./series_test")
