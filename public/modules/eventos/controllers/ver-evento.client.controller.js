'use strict';

angular.module('eventos').controller('VerEventoController', ['$scope','$location','$rootScope','Eventos','$http','$stateParams','Authentication','$modal',
	function($scope,$location,$rootScope,Eventos,$http,$stateParams,Authentication,$modal) {
        $scope.socket = $rootScope.socket;
        $scope.authentication = Authentication;
        $scope.noImage = 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/300px-No_image_available.svg.png';
        // Find existing Evento
        $scope.cargarEvento = function() {
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
                $scope.is_assistant = is_assistant($scope.authentication.user, $scope.evento);
                $scope.is_invited = is_invited($scope.authentication.user, $scope.evento);
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
			
		var is_invited = function(user, evento) {
            var i, evento_tmp, len;
            for (i = 0, len = user.invitaciones.length; i < len; i++) {
                evento_tmp = user.invitaciones[i];
                if (evento_tmp === evento._id) {
                    return true;
                }
            }
            return false;
        };
		
		$scope.cancel_invitation = function(){
			var datos = {
            	usuario: $scope.authentication.user._id,
            	evento: $scope.evento._id
            };
			var url = '/eventos/cancelarInvitacion/' + JSON.stringify(datos);
            console.log(url);
            $http.get(url).success(function(data){
				$scope.is_invited = false;
            });
		};
		
        $scope.assist = function() {
            var usuario = $scope.authentication.user._id;
            $scope.evento.assistants.push(usuario);
            var idUsuario = $scope.authentication.user._id;
            var idevento = $scope.evento._id;
            var datos = {
            	usuario: idUsuario,
            	evento: idevento,
            	invitado: $scope.is_invited
            };
            var url = '/eventos/asistir/' + JSON.stringify(datos);
            console.log(url);
            $http.get(url).success(function(data){
                $scope.is_assistant = !$scope.is_assistant;
                $scope.is_invited = false;
            });

        };
		$scope.cargarClima = function(){
            var id = $scope.evento.place.id;
            var latitud = $scope.evento.place.coords.latitude;
            var longitud = $scope.evento.place.coords.longitude;
			$scope.socket.on('weather/' +id,function(msg){
				console.log('Response'+ msg.payload);
				$scope.clima  = JSON.parse(msg.payload);
				if(!$scope.clima.weather){
					$scope.clima = undefined					
				}
				else{
					$scope.$apply();
				}
			});
			var mensaje = {
				topic: 'weather',
				payload:{id: id, lat: latitud, lon: longitud}
			};
			$scope.socket.emit('weather' , mensaje);
		};
        $scope.abrirModalParaCompartir = function(){
        	$rootScope.evento = $scope.evento;
            var modalInstance = $modal.open({
                templateUrl: 'modules/eventos/views/modal-compartir.client.view.html',
                size: 'lg',
            });
            modalInstance.result.then(function (result) {
                console.info('El resultado es: ' + result);
            }, function () {
                console.info('Modal dismissed at: ' + new Date());
            });
        };
	}
]);
