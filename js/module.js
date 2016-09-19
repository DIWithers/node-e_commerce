var ecommerceApp = angular.module("ecommerceApp", ["ngRoute", "ngCookies"]);

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
// // ecommerceApp.config(['$resourceProvider', function($resourceProvider) {
// //   // Don't strip trailing slashes from calculated URLs
// //   $resourceProvider.defaults.stripTrailingSlashes = false;
// // }]);

// ///////FACTORIES/////
// ecommerceApp.factory("UserService", ["$resource", function($resource) {
// 	//guest user, not logged in
// 	var user = {
// 		firstName: "guest",
// 		lastName: "user",
// 		preferredCurrency: "USD",
// 		shoppingCart: {
// 			items: [],
// 			totalItems: 0,
// 			total: 0
// 		},

// 	};
// 	var resource = function() {
// 		return $resource("ecommerceApp/rest/user/:id",
// 			{id: "@id"}
// 		)};
// 	return {
// 		getResource: function() {
// 			return resource;
// 		},
// 		getCurrentUser: function() {
// 			return user;
// 		},
// 		setCurrentUser: function(userObj) {
// 			user = userObj;
// 		},
// 		loadUser: function(id) {
// 			user = resource.get(id);
// 		}
// 	}

// }]);
// ecommerceApp.factory("AuthService", ["$resource", "$rootScope", "$http", "$location", 
// 	function($resource, $rootScope, $http, $location, AuthenticationService) {
// 		var authFactory = {
// 			authData: undefined
// 		};
// 		authFactory.getAuthData =  function() {
// 			return this.authData;
// 		};
// 		authFactory.setAuthData = function() {
// 			this.authData = {
// 				authId: authData.authId,
// 				authToken: authData.authToken,
// 				authPermission: authData.authPermission
// 			};
// 			//broadcast this event to all interested listeners
// 			$rootScope.$broadcast("authChanged");
// 		};
// 		authFactory.login = function (user, functionObj) {
// 			return AuthenticationService.login(user, functionObj);
// 		};
// 		return authFactory;
// 	}]);
// ecommerceApp.factory("AuthenticationService", ["$resource", 
// 	function($resource) {
// 		return $resource("/ecommerceApp/rest/auth",
// 			{},
// 			{
// 				"login": { method: "POST"}
// 			}
// 		);
// 	}]);
// ecommerceApp.factory("auth_http_Request_Interceptor", ["$injector",
// 	function($injector) {
// 		var auth_http_Request_Interceptor = {
// 			request: function ($request) {
// 				var authFactory =  $injector.get("AuthService");
// 				if (authFactory.isAuthenticated()) {
// 					$request.headers["auth-id"] = authFactory.getAuthData().authId;
// 					$request.headers["auth-token"] = authFactory.getAuthData().authToken;
// 				}
// 				return $request;
// 			}
// 		};
// 		return auth_http_Request_Interceptor;
// 	}]);