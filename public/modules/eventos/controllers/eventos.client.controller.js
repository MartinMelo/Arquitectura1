'use strict';

// Eventos controller
angular.module('eventos').controller('EventosController', ['$http', '$scope', '$stateParams', '$location', 'Authentication', 'Eventos',
	function($http, $scope, $stateParams, $location, Authentication, Eventos) {
		$scope.authentication = Authentication;

		
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
			$scope.eventos = Eventos.query();
		};
		// Obtiene la lista de eventos publicos
		$scope.eventosPublicos = function() {
			$http.get('/eventosPorTipo/publico').success(function(data){
				$scope.eventosPublicos = data;
			});
		};

		//Lista de invitaciones 
		$scope.invitaciones = function(){
			console.log($scope.authentication);
			$http.get('/eventosCompartidos/' + $scope.authentication).success(function(data){
				console.log(data);
				$scope.eventosCompartidos = data;
			});
		};
		
		// Find existing Evento
		$scope.findOne = function() {
			$http.get('/eventos/' + $stateParams.eventoId).success(function(data){
				$scope.evento = data;
				$scope.is_assistant = is_assistant($scope.authentication.user, $scope.evento);
				$scope.cargarClima();
			});
		};

		$scope.go_to_event = function(){
			$location.path('eventos/' + $scope.evento._id);
		};
	}
]);
