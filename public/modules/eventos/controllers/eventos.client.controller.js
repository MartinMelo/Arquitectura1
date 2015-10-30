'use strict';

// Eventos controller
angular.module('eventos').controller('EventosController', ['$http', '$scope', '$stateParams', '$location', 'Authentication', 'Eventos',
	function($http, $scope, $stateParams, $location, Authentication, Eventos) {
		$scope.authentication = Authentication;
		$scope.noImage = 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/300px-No_image_available.svg.png';
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
		// Obtiene la lista de eventos publicos
		$scope.eventosPublicos = function() {
			$http.get('/eventosPorTipo/publico').success(function(data){
				$scope.eventosPublicos = data;
			});
		};

		$scope.cargarClima = function(){
			//SOCKET.IO CALL

		};
		// Find existing Evento
		$scope.findOne = function() {
			$http.get('/eventos/' + $stateParams.eventoId).success(function(data){
				$scope.evento = data;
				$scope.is_assistant = is_assistant($scope.authentication.user, $scope.evento);
				$scope.cargarClima();
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
			var idUsuario = $scope.authentication.user._id;
			var idevento = $scope.evento.id ;
			var url = '/asistir/' + idUsuario + '/' + idevento;
			console.log(url);
			$http.get(url).success(function(data){
				$scope.is_assistant = true;
			});

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
