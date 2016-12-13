var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");
var mongoUrl = "mongodb://127.0.0.1:27017/ecommerce"; //ecommerce is database
var User = require("../models/users");
mongoose.connect(mongoUrl);

var config = require("../config/config"); //This is our config module. We have access to:
											//config.secretTestKey
var stripe = require("stripe")(config.secretTestKey);

router.post("/stripe", function(req, res,next) {
	stripe.charges.create({
  		amount: 7.00,
  		currency: "usd",
  		source: req.body.stripeToken, // obtained with Stripe.js
  		// description: "Charge for michael.smith@example.com" //opt.
	}).then((charge) => {
		res.json({
			success: "paid", //re-write to res.redirect//
		});
	}, function(err) {
		res.json({
			failure: "failedPayment"
		});
	});
});
 //  	idempotency_key: "ZPy1TDJHrews1DyM"
	// }, function(err, charge) {
 //  	// asynchronously called
	// });



//stripe - temp spot//
var testSK = "sk_test_KTvK50onYBMW1qUMFeGfXH6o";
var testPK = "pk_test_wvuS7o4sXJu8KdfvJ2VcwyBb";
var liveSK = "sk_live_uFqLUrCvV20sH90viYqOM5mB";
var livePK = "pk_live_YH1pog3uUTNaFzSuO7vNao6J";

//Include bcrypt to store hashed pass
var bcrypt = require("bcrypt-nodejs");
var randToken = require("rand-token").uid;


/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.post("/register", function(req, res, next) {
	// if (req.body.password !== req.body.password2) {
	// 	res.json({
	// 		message: "noPasswordMatch" //res.data.message, better on front end form validation
	// 	})
	// }
	var token = randToken(32);

	var userToAdd = new User({
		username: req.body.username,
		password: bcrypt.hashSync(req.body.password), 
		email: req.body.email,
		token: token,
		tokenExpDate: Date.now() + (30 * 60 * 1000),
		frequency: '',
		total: '',
		fullName: '',
		address1: '',
		address2: '',
		city: '',
		state: '',
		zipCode: ''
	});
	userToAdd.save(function(error, documentAdded) {
		if(error) {
			console.log("!!!!!!!!!");
			console.log(error);

			res.json({
				message: "errorAdding" //res.data.message path
			});
		}
		else {
			res.json({
				message: "added",
				token: token //res.data.token
			});
		}
	});
	
});

router.post("/login", function(req, res, next) {
	
	// var token = randToken(32);
	// User.update(token: token);
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
			var loginResult = bcrypt.compareSync(req.body.password, document.password); //(english, hashed password)
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
router.post("/options", function(req, res, next) {
	User.update(
		{
			token: req.body.token, //This is the droid we are looking for
			plan: req.body.plan,
			// option: req.body.option,
			total: req.body.total
		}
	).exec();
	res.json({
		message: 'optionAdded'
	});
	
});
router.post('/delivery', function(req, res, next){
	User.update({username: req.body.username},{
		fullName: req.body.fullName,
		address1: req.body.address1,
		address2: req.body.address2,
		city: req.body.city,
		state: req.body.state,
		zipCode: req.body.zipCode
		}
	).exec();
		res.json({
		message: 'infoAdded'
	});
});

router.get("/getUserData", function(req, res, next) {
	var userToken = req.query.token; // the xxxxx in ?token=xxxxxx
	if (userToken === undefined) {
		//No token was supplied
		res.json({failure: "noToken"});
	}
	else {
		User.findOne(
			{token: userToken}, //this is the droid we're looking for
			function(error, document) {
				if(document === null) {
					//this token is not in the system
					res.json({failure: "badToken"}); //Angular needs to send them back to the login page
				}
				else {
					res.json({
						username: document.username,
						plan: document.plan,
						frequency: document.frequency,
						token: document.token
						});
				}
			}
		)
	}

});
	







module.exports = router;
