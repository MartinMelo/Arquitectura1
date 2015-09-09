'use strict';

angular.module('core').controller('HeaderController', ['$scope', 'Authentication', 'Menus','$translate','$rootScope','$locale',
	function($scope, Authentication, Menus,$translate,$rootScope,$locale) {
		$scope.authentication = Authentication;
		$scope.isCollapsed = false;
		$scope.menu = Menus.getMenu('topbar');

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
