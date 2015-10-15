/**
 * Created by Tyno on 24/10/2014.
 */
angular.module('eventos').config(function($translateProvider) {
    $translateProvider.translations('es', {
        PRIVADO: 'Privado',
        PUBLICO: 'Publico'
    }).translations('en', {
        PRIVADO: 'Private',
        PUBLICO: 'Public'
    });
});
