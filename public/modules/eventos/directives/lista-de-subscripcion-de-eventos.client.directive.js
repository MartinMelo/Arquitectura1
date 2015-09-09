'use strict';

angular.module('eventos').directive('listaDeSubscripcionDeEventos', [
	function() {
		return {
			templateUrl: 'modules/eventos/views/lista-de-subscripcion-de-eventos.client.view.html',
			restrict: 'E',
			link: function postLink(scope, element, attrs) {
			}
		};
	}
]);
