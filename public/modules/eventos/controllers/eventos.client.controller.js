'use strict';

// Eventos controller
angular.module('eventos').controller('EventosController', ['$http', '$scope', '$stateParams', '$location', 'Authentication', 'Eventos',
	function($http, $scope, $stateParams, $location, Authentication, Eventos) {
		$scope.authentication = Authentication;
		
		$scope.assistants = function(){
			$location.path('eventos/' + $scope.evento._id + '/assistants');
		};
		
		$scope.go_to_event = function(){
			$location.path('eventos/' + $scope.evento._id);
		};
		
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

		// Find existing Evento
		$scope.findOne = function() {
	        $scope.evento = Eventos.get({ 
				eventoId: $stateParams.eventoId
			});
			//tengo que cambiar esto para no traerlo dos veces al mismo evento
			$http.get('/eventos/' + $stateParams.eventoId).success(function(data){
	            var evento = data;
				$scope.is_assistant = is_assistant($scope.authentication.user, evento);
	        });
		};
		
		var is_assistant = function(user, evento) {
			var i, assitant, len;
			for (i = 0, len = evento.assistants.length; i < len; i++) {
			  assitant = evento.assistants[i];
			  if (assitant._id === user._id) {
			    return true;
			  }
			}
			return false;
		};
		
		$scope.assist = function() {
			var usuario = $scope.authentication.user._id;
			$scope.evento.assistants.push(usuario);
			$scope.update();
			$scope.is_assistant = true;
		};
		
		$scope.no_assist = function() {
            var usuario = $scope.authentication.user._id;
            var index = $scope.evento.assistants.indexOf(usuario);
            $scope.evento.assistants.splice(index, 1);
            $scope.update();
            $scope.is_assistant = false;
		};
	}
]);
