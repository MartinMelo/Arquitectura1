'use strict';

var app =angular.module('eventos');
app.config(function(uiGmapGoogleMapApiProvider) {
	uiGmapGoogleMapApiProvider.configure({
		//    key: 'your api key',
		v: '3.20', //defaults to latest 3.X anyhow
		libraries: 'weather,geometry,visualization'
	});
});

app.controller('CrearEventoController', ['$scope', '$location', 'Authentication', 'Eventos','uiGmapGoogleMapApi',
	function($scope, $location, Authentication, Eventos,maps) {
		$scope.authentication = Authentication;
		$scope.tipos=['publico', 'privado'];
		$scope.tipo= $scope.tipos[0];
		$scope.map = {
            center: { latitude: -34, longitude: -40 },
            zoom: 3,
            markers: [],
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
