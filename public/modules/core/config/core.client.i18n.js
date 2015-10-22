'use strict';

/**
 * Created by Tyno on 24/10/2014.
 */
angular.module('core').config(function($translateProvider) {
    $translateProvider.translations('es', {
        SIGN_UP: 'Registrarse',
        SIGN_IN: 'Loguearse',
        NOMBRE: 'Nombre',
        TIPO: 'Tipo',
        LUGAR: 'Lugar',
        FECHA: 'Date'
    }).translations('en', {
        SIGN_UP: 'Sign up',
        SIGN_IN: 'Sign in',
        NOMBRE: 'Name',
        TIPO: 'Type',
        LUGAR: 'Location',
        FECHA: 'Date'
    });
});
