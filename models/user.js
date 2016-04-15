var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var config = require('../config'); 
mongoose.connect(config.database, function() {
  console.log("connected to mongodb!")
});
module.exports = mongoose.model('User', new Schema({
  name       : {type: String, unique : true, required : true, dropDups: true},
  password   : {type: String, required : true},
  email      : {type: String},
  karma      : {type: Number, default: 0},
  heard      : [String],
  liked      : {type: Array, unique: true, default: ["0"]},
  submissions: [String],
  created    : {type: Date, default: Date.now}
}));
