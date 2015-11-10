'use strict';

angular.module('eventos').controller('ModalCompartirController', ['$scope','$http',
	function($scope, $http) {

		$scope.buscar = function(){
			var url = '/user/username/' + this.username;
            $http.get(url).success(function(data){
                $scope.usuarios = data;
            });

		};
	}
]);
