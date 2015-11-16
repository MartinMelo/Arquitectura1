'use strict';


angular.module('core').controller('HomeController', ['$scope', '$http', 'Authentication',
	function($scope, $http, Authentication) {
		// This provides Authentication context.
		$scope.authentication = Authentication;
		console.log($scope.authentication);
		
		$scope.invitaciones = function(data){
			var list = Authentication.user.invitaciones;
			$scope.invitaciones = [];
			var i, item, len;
			for (i = 0, len = list.length; i < len; i++) {
			  item = list[i];
			  $http.get('/eventos/' + item).success(function(evento){
                $scope.invitaciones.push(evento);
              });
			}
		};
				
	}
]);