'use strict';

// Eventos controller
angular.module('eventos').controller('EditarEventoController', ['$http', '$scope', '$stateParams', '$location', 'Authentication', 'Eventos',
	function($http, $scope, $stateParams, $location, Authentication, Eventos) {
		$scope.authentication = Authentication;


		// Update existing Evento
		$scope.update = function() {
			
			var evento = $scope.evento;

			evento.$update(function() {
				$location.path('eventos/' + evento._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};


		// Find existing Evento
		$scope.findOne = function() {
			$http.get('/eventos/' + $stateParams.eventoId).success(function(data){
				$scope.evento = data;
				$scope.center = {
					latitude: $scope.evento.place.coords.latitude,
					longitude: $scope.evento.place.coords.longitude
				};
				$scope.map = {
					center: $scope.center,
					zoom: 8,
					markers: [$scope.evento.place]
				};
			});
		};

		$scope.go_to_event = function(){
			$location.path('eventos/' + $scope.evento._id);
		};
	}
]);
