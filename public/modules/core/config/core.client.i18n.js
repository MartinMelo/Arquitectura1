/**
 * Created by Tyno on 24/10/2014.
 */
angular.module('core').config(function($translateProvider) {
    $translateProvider.translations('es', {
        SIGN_UP: 'Registrarse',
        SIGN_IN: 'Loguearse'
    }).translations('en', {
        SIGN_UP: 'Sign up',
        SIGN_IN: 'Sign in'
    });
});
