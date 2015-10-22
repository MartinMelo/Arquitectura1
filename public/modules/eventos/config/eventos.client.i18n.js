'use strict';

/**
 * Created by Tyno on 24/10/2014.
 */
angular.module('eventos').config(function($translateProvider) {
    $translateProvider.translations('es', {
        PRIVADO: 'Privado',
        PUBLICO: 'Publico',
        NUEVO_EVENTO: 'Nuevo evento',
        URL_DE_LA_IMAGEN:'Url de la imagen'
    }).translations('en', {
        PRIVADO: 'Private',
        PUBLICO: 'Public',
        NUEVO_EVENTO: 'New event',
        URL_DE_LA_IMAGEN:'Image\'s url'
    });
});
