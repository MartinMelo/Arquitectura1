'use strict';

// Eventos controller
angular.module('eventos').controller('EditarEventoController', ['$http', '$scope', '$stateParams', '$location', 'Authentication', 'Eventos',
	function($http, $scope, $stateParams, $location, Authentication, Eventos) {
		$scope.authentication = Authentication;
        $scope.tipos=['publico', 'privado'];
        $scope.currentDate = new Date();

		// Update existing Evento
		$scope.update = function() {
			
			var evento = $scope.evento;
            evento.place = $scope.place;
            evento.tipo = $scope.tipo;
            $http.put('/eventos/' + evento._id,evento).success(function(data){
                $location.path('eventos/' + evento._id);
            }).error(function(error){
                $scope.error = error.data.message;
            });
		};


		// Find existing Evento
		$scope.cargarEvento = function() {
			$http.get('/eventos/' + $stateParams.eventoId).success(function(data){
				$scope.evento = data;
				$scope.place = data.place;
                $scope.initTipo(data.tipo);
				$scope.center = {
					latitude: $scope.evento.place.coords.latitude,
					longitude: $scope.evento.place.coords.longitude
				};
				$scope.map = {
					center: $scope.center,
					zoom: 8,
					markers: [$scope.evento.place],
					events: {
						click: function(map, eventName, originalEventArgs){
							var e = originalEventArgs[0];
							var lat = e.latLng.lat(),lon = e.latLng.lng();
							var marker = {
								id: Date.now(),
								coords: {
									latitude: lat,
									longitude: lon
								}
							};
							$scope.map.markers = [marker];
							$scope.place = marker;
							$scope.$apply();
						}
					}
				};
			});
		};
		//Se Selecciono un punto en el mapa.
		$scope.markerSeleccionado = function(map, eventName, originalEventArgs){
			var e = originalEventArgs[0];
			var lat = e.latLng.lat(),lon = e.latLng.lng();
			var marker = {
				id: Date.now(),
				coords: {
					latitude: lat,
					longitude: lon
				}
			};
			$scope.map.markers.push(marker);
			console.log($scope.map.markers);
			$scope.$apply();
		};
		$scope.go_to_event = function(){
			$location.path('eventos/' + $scope.evento._id);
		};
        $scope.initTipo= function(tipo){
            if(tipo === 'publico'){
                $scope.tipo = $scope.tipos[0];
            }else{
                $scope.tipo = $scope.tipos[1];
            }
        }
	}
]);
