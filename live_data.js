var rp = require('request-promise')
var crypto = require('crypto');
var md5 = crypto.createHash("md5")
require("./dataframe")
var url="https://www.reddit.com/r/tifu/search.json?q=pokemon+go&sort=new&restrict_sr=on&t=all"
var data_source = function(url, old_hash){
  var refresh_rate = 5; //in minutes
  var old_hash = old_hash;
  var fetchData = function(){
    rp(url)
    .catch(function(err) {
      console.log("Could not fetch the data! Error:", err)
      return Promise.reject("Could not fetch the data!")
    })
    .then(function(resp) {
      if(md5(resp)==this.old_hash){
        return Promise.reject("Same data as previous pull.")
      }
      console.log(JSON.parse(resp).data.children)
      old_hash = md5(resp);
      return this;
    });
  }
  return {
    refresh_rate,
    fetchData,
    old_hash
  }
}
var reddit_data = data_source(url)
console.log(reddit_data)
reddit_data = reddit_data.fetchData()
console.log(reddit_data)
/*setInterval(() => {
  reddit_data = reddit_data.fetchData()
}, reddit_data.refresh_rate*60*1000)*/
