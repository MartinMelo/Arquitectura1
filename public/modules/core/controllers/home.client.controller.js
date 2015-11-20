'use strict';


angular.module('core').controller('HomeController', ['$scope', '$http', 'Authentication','$rootScope',
	function($scope, $http, Authentication,$rootScope) {
		// This provides Authentication context.
		$scope.authentication = Authentication;
        $scope.socket = $rootScope.socket;

		$scope.cargarInvitaciones = function(eventoId){
			var list = Authentication.user.invitaciones;
			list.push(eventoId);
			$scope.invitaciones = [];
			var i, item, len;
			for (i = 0, len = list.length; i < len; i++) {
			  item = list[i];
			  $http.get('/eventos/' + item).success(function(evento){
                $scope.invitaciones.push(evento);
              });
			}
		};
		var namespace = 'ActualizarInvitaciones/'+ $scope.authentication.user._id;
		$scope.socket.on(namespace,function(msg){
			$scope.cargarInvitaciones(msg.payload.eventoId);
		});
	}
]);
