var mongoose = require("mongoose");
var Schema = mongoose.Schema; //object; "a scheme to follow"

var User = new Schema({
	username: {type: String, required: true},
	Password: {type: String, required: true},
	Email: {type: String, required: true}
});

module.exports = mongoose.model("Users", User) //name of collection, Schema