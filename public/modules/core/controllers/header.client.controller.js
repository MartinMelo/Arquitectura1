'use strict';

angular.module('core').controller('HeaderController', ['$scope', 'Authentication', 'Menus','$translate','$rootScope','$locale','$location',
	function($scope, Authentication, Menus,$translate,$rootScope,$locale,$location) {
		$scope.authentication = Authentication;
		$scope.isCollapsed = false;
		$scope.menu = Menus.getMenu('topbar');

		/**
		 * Creo la coneccion de Socket.io
		 * @type {string}
		 */
		var ip= $location.$$host +':'+$location.$$port;
		$rootScope.socket = io.connect(ip);
		$rootScope.socket.on('connect',function(){
			console.log('Conectado');
		});
		$scope.toggleCollapsibleMenu = function() {
			$scope.isCollapsed = !$scope.isCollapsed;
		};

		// Collapsing the menu after navigation
		$scope.$on('$stateChangeSuccess', function() {
			$scope.isCollapsed = false;
		});
		$rootScope.changeLanguage = function (langKey) {
			$translate.use(langKey);
		};
		$rootScope.changeLanguage($locale.id.split('-')[0]);
	}
]);
