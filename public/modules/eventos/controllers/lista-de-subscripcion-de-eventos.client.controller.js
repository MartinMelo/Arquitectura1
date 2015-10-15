'use strict';

angular.module('eventos').controller('ListaDeSubscripcionDeEventosController', ['$scope','$http',
	function($scope,$http) {


		// Obtiene la lista de eventos publicos
		$scope.listaDeSubscripciones = function() {
			$http.get('/eventosSubscriptos').success(function(data){
				$scope.eventosSubscriptos = data;
			});
		};
	}
]);
