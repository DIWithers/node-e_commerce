
ecommerceApp.controller("mainController", function($scope, $http, $location, $cookies) {

	var apiPath = "http://localhost:3000";


	$scope.register = function() {
		// console.log($scope.username);
		$http.post(apiPath + "/register", {
			username: $scope.username,
			password: $scope.password,
			password2: $scope.password2,
			email: $scope.email
		}).then(function successCallback(response) {
			console.log(response);
			if (response.data.message === "added") { //already registered, move fwd
				$cookies.put("token", response.data.token);
				$cookies.put("username", $scope.username);
				$location.path("/options"); 
			}
		}, function errorCallback(response) {
			console.log(response);
		});

	};
	$scope.login = function() {
		$http.post(apiPath + "/login", {
			username: $scope.username,
			password: $scope.password
		}).then(function successCallback(response) {
			console.log(response);
			if(response.data.success === "userFound") {
				$cookies.put("token", response.data.token);
				$cookies.put("username", $scope.username);
				$location.path("/options");
				console.log("Logged In successfully");
			}
			else if(response.data.failure === "NoUser") {
				$scope.errorMessage = "Incorrect username.";
			}
			else if(response.data.failure === "badPass") {
				$scope.errorMessage = "Incorrect Password. Try again.";
			}
			
		}, function errorCallback(response) {
			console.log("Danger, Will Robinson")
		});

	}; //end of function
	$scope.logout = function() {
		$cookies.remove("token");
		$cookies.remove("username");
		$location.path("/");
	}

	//home, login, register != run
	//different controller
// 	if (location.path === "/options") {
// 		$http.get(apiPath + "/getUserData?token=" + $cookies.get("token"))
// 		.then(function successCallback(response) {
// 			//response.data.xxx = whatever res.json was in express
// 			if(response.data.failure === "badToken") {
// 				// $location.path = "/login"; //Goodbye
// 			}
// 			else if(response.data.failure === "noToken") {
// 				// $location.path = "/login"; //No token, bye
// 			}
// 			else {
// 				//token is good, response.data will have their stuff in it
// 				$scope.username = response.data.username;
// 			}

// 		}, function errorCallback(response) {

// 		});
// 	}
    $scope.payOrder = function(userOptions) {
        $scope.errorMessage = "";
        var handler = StripeCheckout.configure({
            key: "pk_test_wvuS7o4sXJu8KdfvJ2VcwyBb",
            image: '../images/bev-button.jpeg',
            locale: 'auto',
            token: function(token) {
                console.log("The token Id is: ");
                console.log(token.id);

                $http.post(apiPath + '/stripe', {
                    amount: $scope.total * 100,
                    stripeToken: token.id,
                    token: $cookies.get('token')
                        //This will pass amount, stripeToken, and token to /payment
                }).then(function successCallback(response) {
                    console.log(response.data);
                    if (response.data.success) {
                        //Say thank you
                        $location.path('/receipt');
                    } else {
                        $scope.errorMessage = response.data.message;
                        //same on the checkout page
                    }
                }, function errorCallback(response) {});
            }
        });
        handler.open({
            name: 'DC Roasters',
            description: 'A Better Way To Grind',
            amount: $scope.total * 100
        });
    };
});

//Set up routes using the routes module
ecommerceApp.config(function($routeProvider) {
	$routeProvider.when("/", {
		templateUrl: "views/main.html",
		controller: "mainController"
	})
	.when("/login", {
		templateUrl: "views/login.html",
		controller: "mainController"
	})
	.when("/register", {
		templateUrl: "views/register.html",
		controller: "mainController"
	})
	.when("/options", {
	templateUrl: "views/options.html",
	controller: "mainController"
	})
	.when("/delivery", {
		templateUrl: "views/delivery.html",
		controller: "mainController"
	})
	.when("/payment", {
		templateUrl: "views/payment.html",
		controller: "mainController"
	});
});
