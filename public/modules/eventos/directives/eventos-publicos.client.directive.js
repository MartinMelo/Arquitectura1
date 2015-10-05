'use strict';

angular.module('eventos').directive('eventosPublicos', [
	function() {
		return {
			templateUrl: 'modules/eventos/views/eventos-publicos.client.view.html',
			restrict: 'E',
			link: function postLink(scope, element, attrs) {
			}
		};
	}
]);
