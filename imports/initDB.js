// load require node modules
var colors = require('colors');

//Import Mongo Client
var MongoClient = require('mongodb').MongoClient;

// MongoDB url definition
var url = 'mongodb://artsan:dbconstrom@ds135790.mlab.com:35790/constrom'
// var url = 'mongodb://localhost:27017/constrom';
// mongo ds135790.mlab.com:35790/constrom -u artsan -p dbconstrom

// database init function definition
function init(callback) {
  MongoClient.connect(url, function(err, db) {
    if (err) {
      console.log('\n ☒ Database is Down... '.bgRed);
      callback(err, null);
    } else {
      console.log('\n ☑ Database is Up!!! '.bgGreen);
      callback(null, db);
    }
  });
}

module.exports = init;
