var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");
var mongoUrl = "mongodb://localhost:27017/ecommerce"; //ecommerse is database
var User = require("../models/users");
mongoose.connect(mongoUrl);

//Include bcrypt to store hashed pass
var bcrypt = require("bcrypt-nodejs");


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post("/register", function(req, res, next) {
	// if (req.body.password !== req.body.password2) {
	// 	res.json({
	// 		message: "noPasswordMatch" //res.data.message, better on front end form validation
	// 	})
	// }
	
	var userToAdd = new User({
		username: req.body.username,
		password: brcrypt.hashSync(req.body.password),
		email: req.body.email
	});
	userToAdd.save();
	console.log(req);
	res.json({
		message:"added"
		// name: req.body.username
	});
});

router.post("/login", function(req, res, next) {
	User.findOne({
		username: req.body.username
	}, function (error, document){
		//document is the document returned from our Mongo query
		//doc will have a prop in each field, we need to check the pw in the database against the hashed bcrypt version
		if (document === null) {
			//no match
			res.json({failure: "NoUser"});
		}
		else {
			//Run comparesync - first param is the english pw, second param is the hash. Will return true if equal
			var loginResult = becrypt.compareSync(req.body.password, document.password); //(english, hashed password)
			if (loginResult) {
				//pw correct, login
				res.json({
					success: "userFound"
				});
			}
			else {
				res.json({
					failure: "badPass"
				});
			}
		}
	})
});
// router.get("/getUsers", function(req, res, next) {
// 	User.find({}, function(error, documents) {
// 		if (error){
// 			res.json(error);
// 		}
// 		else {
// 			res.json(documents);
// 		}
		
// 	});
// });
	







module.exports = router;
