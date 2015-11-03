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
		$scope.cargarClima = function(){
            var id = $scope.evento.place;
			$scope.socket.on('weather/+' +id,function(msg){
				console.log('Response'+ msg);
			});
			var mensaje = {
				topic: 'weather',
				payload:{id: id}
			};
			$rootScope.socket.emit('weather' , mensaje);

		};
	}
]);
