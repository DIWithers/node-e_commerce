var mongoose = require("mongoose");
var Schema = mongoose.Schema; //object; "a scheme to follow"

var User = new Schema({
	username: {type: String, required: true},
	password: {type: String, required: true},
	email: {type: String, required: true},
	token: {type: String, required: true},
	tokenExpDate : Date
});

module.exports = mongoose.model("Users", User) //name of collection, Schema