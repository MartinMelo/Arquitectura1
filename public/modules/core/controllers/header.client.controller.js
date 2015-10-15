'use strict';

angular.module('core').controller('HeaderController', ['$scope', 'Authentication', 'Menus','pascalprecht.translate','$rootScope','$locale',
	function($scope, Authentication, Menus,$translate,$rootScope,$locale) {
		$scope.authentication = Authentication;
		$scope.isCollapsed = false;
		$scope.menu = Menus.getMenu('topbar');
		$translate.useSanitizeValueStrategy('sanitize');


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
