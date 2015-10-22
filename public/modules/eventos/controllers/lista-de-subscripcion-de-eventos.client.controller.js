'use strict';

angular.module('eventos').controller('ListaDeSubscripcionDeEventosController', ['$scope','$http','Authentication',
	function($scope,$http,Authentication) {


		// Obtiene la lista de eventos publicos
		$scope.listaDeSubscripciones = function() {
			var id = Authentication.user._id;
			$http.get('/eventosSubscriptos/'+id)
				.success(function(data){
					$scope.eventosSubscriptos = data;
				})
				.error(function(error){
					$scope.eventosSubscriptos = [];
				});
		};
	}
]);
