'use strict';

angular.module('eventos').controller('CrearEventoController', ['$http', '$scope', 'Authentication', 'Eventos',
	function($http, $scope, Authentication, Eventos) {
		$scope.authentication = Authentication;

		// Create new Evento
		$scope.create = function() {
			var config;
			config = {
			  method: 'POST',
			  url: 'http://localhost:8083/api/v1/event/',
			  data: {
				name: this.name,
				date: this.date,
				place: this.place
				}
			};
			$http(config).success(function(location) {
			  console.log(location);
			  $location.path('eventos/' + location);
			  $scope.name = '';
			  $scope.date = '';
		      $scope.place = '';
			}).error(function(error) {
			  return console.log(error);
			});
			
		};
	}
]);
