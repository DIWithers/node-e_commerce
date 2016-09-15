var ecommerceApp = angular.module("ecommerceApp", ["ngRoute", "ngCookies"]);
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
	});
});