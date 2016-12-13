
ecommerceApp.controller("mainController", function($scope, $http, $location, $cookies, $rootScope) {

	var apiPath = "http://danielleivywithers.com/node-e_commerce/#:3000";
	// var apiPath = "http://127.0.0.1:3000";


	$scope.register = function() {
		$http.post(apiPath + "/register", {
			username: $scope.username,
			password: $scope.password,
			password2: $scope.password2,
			email: $scope.email
		}).then(function successCallback(response) {
			console.log("success");
			$location.path("/options");
			console.log($scope.username);
			if (response.data.message === "added") { //already registered, move fwd
				$cookies.put("token", response.data.token);
				console.log(response.data.token);
				$cookies.put("username", $scope.username);
				$location.path("/options"); 
			}
		}, function errorCallback(response) {
			console.log("error")
			console.log(response);
		});

	};
	$scope.login = function() {
		console.log("successBefore");
		$http.post(apiPath + "/login", {
			username: $scope.username,
			password: $scope.password
		}).then(function successCallback(response) {
			console.log(response.data.token);
			console.log("successAfter");
			$location.path("/options");
			if(response.data.success === "userFound") {
				$cookies.put("token", response.data.token);
				$cookies.put("username", $scope.username);
				$location.path("/options");
				$rootScope.loggedIn = true;
				console.log("Logged In successfully");
				console.log(response.data.token);

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
	// $scope.isLoggedIn = function() {
	// 	$http.get(apiPath + "/login")
	// 	.success(function(data) {
	// 		console.log(data);
	// 		$rootScope.loggedIn = data;
	// 	})
	// 	.error(function(data) {
	// 		console.log("error: " + data);
	// 	});
	// }
	$scope.logout = function() {
		$cookies.remove("token");
		$cookies.remove("username");
		$location.path("/");
	}

//This option to make it a subscription site:
	$scope.individualPlan = function(){
		console.log("Indiv plan selected");
		console.log(User.token);
		$http.post(apiPath + '/options', {
			token: $cookies.get('token'),
			plan: "Individual",
			total: 7.00
		}).then(function successCallback(response){
			if(response.data.message == 'optionAdded'){
				$scope.choiceMade = true;
				console.log("choiceMade");
				console.log(response);
				$timeout(function(){
					$location.path('/delivery');
				}, 1500);
			}	
		}, function errorCallback(response){
			console.log(error);
			console.log(response);
		})
	};

	//if a customer selects monthly option
	$scope.familyPlan = function(){
		console.log("Fam plan selected");
		$http.post(apiPath + '/options', {
			token: $cookies.get('token'),
			plan: "Family",
			total: 18.00
		}).then(function successCallback(response){
			if(response.data.message == 'optionAdded'){
				console.log(response);
				$scope.choiceMade = true;
				$timeout(function(){
					$location.path('/delivery');
				}, 1500);
			}
		}, function errorCallback(response){
			console.log(response);
		})
	}
	//@ the delivery page to collect customer info
	$scope.address = function(){
		$http.post(apiPath + '/delivery', {
			username: $scope.username,
			fullName: $scope.fullName,
			address1: $scope.address1,
			address2: $scope.address2,
			city: $scope.city,
			state: $scope.state,
			zipCode: $scope.zipCode
		}).then(function successCallback(response){
			console.log(response.data.post);
			if(response.data.post = 'addressAdded'){
				$scope.infoAdded = true;
				$timeout(function(){
				$location.path('/payment');
				}, 3000);
			}
		}, function errorCallback(response){
			console.log(response);
		})	
	};
	$scope.options = [
		{
			name: "Black tea",
			type: "tea"
		},
		{
			name: "Green tea",
			type: "tea"
		},
		{
			name: "White tea",
			type: "tea"
		},
		{
			name: "Oolang Tea",
			type: "tea"
		},
		{
			name: "Mijito Tea",
			type: "tea"
		},
		{
			name: "Rooibos Tea",
			type: "tea"
		},
		{
			name: "Peach Tea",
			type: "tea"
		},
		{
			name: "Iced Tea",
			type: "tea"
		},
		{
			name: "Espresso Coffee",
			type: "coffee"
		},
		{
			name: "Columbian Coffee",
			type: "coffee"
		},
		{
			name: "French Road Coffee",
			type: "coffee"
		},
		{
			name: "Breakfast Blend Coffee",
			type: "coffee"
		}
	]
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
//Use cookies for shopping cart!
//As opposed to a weekly or monthly subscription, we're using the shopping cart.
// $scope.addToCart = function(itemID, quantity, amount){
// 	var oldCart = $cookies.get('cartItems');
// 	if (oldCart === undefined){
// 		var newCart = itemID;
// 	}
// 	else {
// 		newCart = oldCart + "," + itemID;
// 	}
// 	console.log(oldCart);
// 	console.log(newCart);
	
// 	var oldQuantity = $cookies.get('cartQuantity');
// 	if (oldQuantity === undefined){
// 		var newQuantity = quantity;
// 	}
// 	else {
// 		newQuantity = oldQuantity + "," + quantity;
// 	}
	
// 	var oldAmount = $cookies.get('cartAmount');
// 	if (oldAmount === undefined){
// 		var newAmount = amount;
// 	}
// 	else {
// 		newAmount = oldAmount + "," + amount
// 	}

// 	$cookies.put('cartItems', newCart);
// 	$cookies.put('cartQuantity', newQuantity);
// 	$cookies.put('cartAmount', newAmount);
	
// 	newQuantity = newQuantity.split(",");
// 	console.log(quantity);
// 	console.log(newQuantity);
// 	var cartItems = newCart.split(",");
// 		$scope.item = $cookies.get('cartItems').split(',');
// 		$scope.quantity = $cookies.get('cartQuantity').split(',');
// 		$scope.amount = $cookies.get('cartAmount').split(',');
// 		var carts = [];
// 		for(var i = 0; i < cartItems.length; i++){
// 			carts.push({
// 					item: cartItems[i],
// 					quantity: newQuantity[i],
// 					amount: newAmount[i]
// 			})
// 			console.log(carts);	
// 		}
// 		$scope.carts = carts;
// }
// // Remove an item from the shopping cart!
//     $scope.remove = function(index) {
//     	console.log(index);
//     	var removeSelection = $scope.carts[index];
//     	$scope.carts.splice(index, 1);
//     	var newCart = $cookies.get('cartItems').split(',');
// 		var newQuantity = $cookies.get('cartQuantity').split(',');
// 		var newAmount = $cookies.get('cartAmount').split(',');
// 		newCart.splice(index,1);
// 		newQuantity.splice(index,1);
// 		newAmount.splice(index, 1);

// 		if (newCart.length == 1){
// 			newCart = newCart[0];
// 			newQuantity = newQuantity[0];
// 			newAmount = newAmount[0];
// 		}

// 		else {
// 			newCart = newCart.join(',');
// 			newQuantity = newQuantity.join(',');
// 			newAmount = newAmount.join(',');
// 		}
// 		//console.log(newCart);
// 		$cookies.put('cartItems', newCart);
// 		$cookies.put('cartQuantity', newQuantity);
// 		$cookies.put('cartAmount', newAmount);
// 		$scope.total = $scope.getTotal();
// 		$scope.numItems = $scope.getNumItems();
// };
// $scope.getTotal = function() {
//     var total = 0;
//     var cartinfo = $scope.getCart();
//     console.log(cartinfo);
//     for (var i = 0; i < cartinfo.length; i++) {
//         var carts = cartinfo[i];
//         total += parseInt(carts.quantity * carts.amount);
//     }
//     return total;
// }

// $scope.total = $scope.getTotalPrice();
// console.log($scope.total)


// $scope.getNumItems = function() {
//     var numItems = 0;
//     var cartinfo = $scope.getCart();
//     console.log(cartinfo);
//     for (var i = 0; i < cartinfo.length; i++) {
//         var carts = cartinfo[i];
//         numItems += parseInt(carts.quantity);
//     }
//     return numItems;
// }

// $scope.numItems = $scope.getNumItems();
// console.log($scope.numItems)

// $scope.checkout = function(){
// 	 	console.log($scope.name);
// 	 	$http.post(apiPath + '/checkoutData', {
// 	 		name: $scope.name,
// 	 		home: $scope.home,
// 	 		deliver: $scope.deliver,
// 	 		address: $scope.address,
// 	 		city: $scope.city,
// 	 		zip: $scope.zip,
// 	 		phone: $scope.phone,
// 	 		details: $scope.details
// 	 	}).then(function successCallback(response){
// 	 		console.log(response);
// 	 		if(response.data.message == 'added'){
// 	 			$location.path('/cart');
// 	 		}
// 	 	}, function errorCallback(response){
// 	 		console.log(response);
// 	 	});
// 	 };
// $scope.name = $scope.checkout();
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




