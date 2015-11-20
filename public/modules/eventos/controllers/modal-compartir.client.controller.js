'use strict';

angular.module('eventos').controller('ModalCompartirController', ['$scope','$http','$rootScope',
	function($scope, $http, $rootScope) {

		$scope.buscar = function(){
			var url = '/user/username/' + this.username;
            $http.get(url).success(function(data){
                $scope.usuarios = data;
            });
		};
		
		var sacarUsuario = function(user){
			var index = $scope.usuarios.indexOf(user);
			$scope.usuarios.splice(index, 1);
		};
		
		$scope.compartir = function(user){
			$scope.error = false;
			$scope.success = false;
			var datos = {
				usuario: user._id,
				evento: $rootScope.evento._id
			};
			var url = '/eventos/compartir/' + JSON.stringify(datos);
            $http.get(url)
            	.success(function(data){
	                $scope.error = false;
	                $scope.success = true;
	                sacarUsuario(user);
                    var mensaje = {
                        topic: 'ActualizarInvitaciones/'+user._id,
                        payload:{}
                    };
                    $scope.socket.emit('ActualizarInvitaciones', mensaje);
	            })
	            .error(function(error){
	            	$scope.error = true;
	            	sacarUsuario(user);
	            });
		};
	}
]);
