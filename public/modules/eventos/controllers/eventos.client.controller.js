'use strict';

// Eventos controller
angular.module('eventos').controller('EventosController', ['$http', '$scope', '$stateParams', '$location', 'Authentication', 'Eventos',
	function($http, $scope, $stateParams, $location, Authentication, Eventos) {


		// Remove existing Evento
		$scope.remove = function(evento) {
			if ( evento ) { 
				evento.$remove();

				for (var i in $scope.eventos) {
					if ($scope.eventos [i] === evento) {
						$scope.eventos.splice(i, 1);
					}
				}
			} else {
				$scope.evento.$remove(function() {
					$location.path('eventos');
				});
			}
		};

		// Update existing Evento
		$scope.update = function() {
			var evento = $scope.evento;

			evento.$update(function() {
				$location.path('eventos/' + evento._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Eventos
		$scope.find = function() {
			var config;
			config = {
			  method: 'GET',
			  url: 'http://localhost:8083/api/v1/event',
			  headers: {
			  }
			};
			$http(config).success(function(data) {
			  console.log(data);
			  $scope.eventos = data._embedded.event;
			}).error(function(error) {
			  return console.log(error);
			});
		};

		// Find existing Evento
		$scope.findOne = function() {
			$scope.evento = Eventos.get({ 
				eventoId: $stateParams.eventoId
			});
		};
	}
]);
