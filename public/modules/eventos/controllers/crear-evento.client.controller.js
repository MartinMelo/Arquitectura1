'use strict';

angular.module('eventos').controller('CrearEventoController', ['$scope', 'Authentication', 'Eventos',
	function($scope, Authentication, Eventos) {
		$scope.authentication = Authentication;
		
		// Create new Evento
		$scope.create = function() {
			// Create new Evento object
			var evento = new Eventos ({
				name: this.name,
				date: this.date,
				place: this.place
			});

			// Redirect after save
			evento.$save(function(response) {
				$location.path('eventos/' + response._id);

				// Clear form fields
				$scope.name = '';
				$scope.date = '';
				$scope.place = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};
	}
]);
