'use strict';

angular.module('eventos').controller('ModalCompartirController', ['$scope','$http','$rootScope',
	function($scope, $http, $rootScope) {

		$scope.buscar = function(){
			var url = '/user/username/' + this.username;
            $http.get(url).success(function(data){
                $scope.usuarios = data;
            });
		};
		
		$scope.compartir = function(user){
			var datos = {
				usuario: user._id,
				evento: $rootScope.evento._id
			};
			var url = '/eventos/compartir/' + JSON.stringify(datos);
            console.log(url);
            $http.get(url)
            	.success(function(data){
	                console.log("lo hizo " + data);
	            })
	            .error(function(error){
	            	console.log(error);	
	            });
		};
	}
]);
