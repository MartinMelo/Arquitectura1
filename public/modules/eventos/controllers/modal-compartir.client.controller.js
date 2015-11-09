'use strict';

angular.module('eventos').controller('ModalCompartirController', ['$scope','Users',
	function($scope, Users) {

		$scope.buscar = function(){
			console.log(Users);
			$scope.usuarios = Users.findOne({
				username: this.username
			});
		};
	}
]);
