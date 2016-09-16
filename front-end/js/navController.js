ecommerceApp.controller("navController", function($scope, $location, $cookies) {
	$scope.$watch(function() {
		return $location.path();
	}, function(path) {
			var cookie = ($cookies.get("token"))
			if (cookie) {
				$("#user-nav").show();
				$scope.nav = $("user-nav").html('' + 
					'<nav class="navbar navbar-default navbar-fixed-top options-navbar" id="options-navbar">' +
						'<div class="container-fluid">' + //use '+' to account for whitespace
							'<div class="row row-centered">' +
								'<div class="col-sm-2 col-sm-offset-2 text-center options">' +
									'<a ng-href="/#/">' +
										'<img src="../images/menu.png" id="coffee-cup">' +
											'<h4 id="home-nav">1. HOME</h4>' +
									'</a>' +
								'</div>' +
								'<div class="col-sm-2 text-center options">' +
									'<a ng-href="/#/options">' +
										'<img src="../images/menu.png" id="knobs">' +
											'<h4 id="home-nav">2. OPTIONS</h4>' +
									'</a>' +
								'</div>' +
								'<div class="col-sm-2 text-center options">' +
									'<a ng-href="/#/delivery">' +
										'<img src="../images/menu.png" id="truck">' +
											'<h4 id="home-nav">3. DELIVERY</h4>' +
									'</a>' +
								'</div>' +
								'<div class="col-sm-2 text-center options">' +
									'<a ng-href="/#/payment">' +
										'<img src="../images/menu.png" id="wallet">' +
											'<h4 id="home-nav">4. PAYMENT</h4>' +
									'</a>' +
								'</div>' +
							'</div>' +
						'</div>' +
					'</nav>'
				); //end of $scope.nav
			}
		});
		
}); //end of controller