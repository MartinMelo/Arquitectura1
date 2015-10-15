'use strict';

angular.module('eventos').controller('CrearEventoController', ['$scope', '$location', 'Authentication', 'Eventos',
	function($scope, $location, Authentication, Eventos) {
		$scope.authentication = Authentication;
		$scope.tipos=['publico', 'privado'];
		$scope.tipo= $scope.tipos[0];

		// Create new Evento
		$scope.create = function() {
			// Create new Evento object
			var evento = new Eventos ({
				name: this.name,
				date: this.date,
				place: this.place,
				image: this.image,
				tipo: this.tipo
			});

			// Redirect after save
			evento.$save(function(response) {
				$location.path('eventos/' + response._id);

				// Clear form fields
				$scope.name = '';
				$scope.date = '';
				$scope.place = '';
				$scope.tipo = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};
	}
]);
