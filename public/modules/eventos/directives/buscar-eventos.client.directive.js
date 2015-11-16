'use strict';

angular.module('eventos').directive('buscarEventos', ['$http',
	function($http) {
		return {
			templateUrl: 'modules/eventos/views/buscar-eventos.client.view.html',
			restrict: 'E',
			link: function postLink(scope, element, attrs) {

                scope.buscarEvento = function(){
                    if(this.aBuscar.length >= 3){
                        $http.get('/eventos/buscar/'+ this.aBuscar).success(function(data){
                            scope.eventos = data;
                        }).error(function(error){
                            console.log('Se rompio todo: ' + error);
                        });
                    }else{
                        scope.eventos = [];
                    }
                }
			}
		};
	}
]);
