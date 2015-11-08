'use strict';

angular.module('eventos').controller('ModalCompartirController', ['$scope','Users',
	function($scope, Users) {

		$scope.buscar = function(){
			$scope.usuarios = Users.findOne({
				username: this.username
			});
		}
	}
]);
