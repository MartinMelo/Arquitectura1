'use strict';

angular.module('eventos').directive('eventosDelUsuario', [
	function() {
		return {
			templateUrl: 'modules/eventos/views/list-eventos.client.view.html',
			restrict: 'E',
			link: function postLink(scope, element, attrs) {
			}
		};
	}
]);
