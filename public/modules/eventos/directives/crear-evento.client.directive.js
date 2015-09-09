'use strict';

angular.module('eventos').directive('crearEvento', [
	function() {
		return {
			templateUrl: 'modules/eventos/views/create-evento.client.view.html',
			restrict: 'E',
			link: function postLink(scope, element, attrs) {
			}
		};
	}
]);
