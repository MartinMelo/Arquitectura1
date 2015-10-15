'use strict';

angular.module('eventos').controller('ListaDeSubscripcionDeEventosController', ['$scope',
	function($scope) {


		// Obtiene la lista de eventos publicos
		$scope.listaDeSubscripciones = function() {
			$http.get('/eventosSubscriptos').success(function(data){
				$scope.eventosSubscriptos = data;
			});
		};
	}
]);
