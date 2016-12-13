var mongoose = require("mongoose");
var Schema = mongoose.Schema; //object; "a scheme to follow"

var User = new Schema({
	username: {type: String, required: true},
	password: {type: String, required: true},
	email: {type: String, required: true},
	token: {type: String, required: true},
	tokenExpDate : Date
	plan: String,
	total: Number,
	fullName: String,
	address1: String,
	address2: String,
	city: String,
	state: String,
	zipCode: String
});

module.exports = mongoose.model("Users", User) //name of collection, Schema