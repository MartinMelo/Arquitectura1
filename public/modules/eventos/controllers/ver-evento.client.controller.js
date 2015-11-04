'use strict';

angular.module('eventos').controller('VerEventoController', ['$scope','$location','$rootScope','Eventos','$http','$stateParams','Authentication',
	function($scope,$location,$rootScope,Eventos,$http,$stateParams,Authentication) {
        $scope.socket = $rootScope.socket;
        $scope.authentication = Authentication;
        $scope.noImage = 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/300px-No_image_available.svg.png';
        // Find existing Evento
        $scope.cargarEvento = function() {
            $http.get('/eventos/' + $stateParams.eventoId).success(function(data){
                $scope.evento = data;
                $scope.is_assistant = is_assistant($scope.authentication.user, $scope.evento);
                $scope.cargarClima();
            });
        };
        $scope.assistants = function(){
            $location.path('eventos/' + $scope.evento._id + '/assistants');
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
            var idevento = $scope.evento._id;
            var datos = {
            	usuario: idUsuario,
            	evento: idevento
            };
            var url = '/eventos/asistir/' + JSON.stringify(datos);
            console.log(url);
            $http.get(url).success(function(data){
                $scope.is_assistant = !$scope.is_assistant;
            });

        };
		$scope.cargarClima = function(){
            var id = $scope.evento.place.id;
            var latitud = $scope.evento.place.coords.latitude;
            var longitud = $scope.evento.place.coords.longitude;
			$scope.socket.on('weather/' +id,function(msg){
				console.log('Response'+ msg.payload);
			});
			var mensaje = {
				topic: 'weather',
				payload:{id: id, lat: latitud, lon: longitud}
			};
			$scope.socket.emit('weather' , mensaje);
		};
	}
]);
