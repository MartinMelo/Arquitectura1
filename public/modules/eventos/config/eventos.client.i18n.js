'use strict';

/**
 * Created by Tyno on 24/10/2014.
 */
angular.module('eventos').config(function($translateProvider) {
    $translateProvider.translations('es', {
        PRIVADO: 'Privado',
        PUBLICO: 'Publico',
        NUEVO_EVENTO: 'Nuevo evento',
        URL_DE_LA_IMAGEN:'Url de la imagen',
        CREAR_EVENTO: 'Crear evento',
        POR_FAVOR_INGRESE_UNA_FECHA_VALIDA:'Por favor ingre una fecha valida',
        POR_FAVOR_INGRESE_UN_NOMBRE: 'Por favor ingrese un nombre',
        POR_FAVOR_INGRESE_UN_TIPO:'Por favor ingrese un tipo',
        POR_FAVOR_INGRESE_UN_LUGAR:'Por favor ingrese un lugar',
        EVENTOS_PUBLICOS_MAS_POPULARES:'Eventos publicos mas populares',
        EVENTOS_DEL_USUARIO:'Eventos del usuario',
        SUBSCRIPCIONES_A_EVENTOS:'Subscripciones a eventos',
        RATING: 'Rating',
        GUARDAR:'Guardar',
        COMPARTIR_CON: 'Compartir con',
        EDITAR: 'Editar'
    }).translations('en', {
        PRIVADO: 'Private',
        PUBLICO: 'Public',
        NUEVO_EVENTO: 'New event',
        URL_DE_LA_IMAGEN:'Image\'s url',
        CREAR_EVENTO: 'Create event',
        POR_FAVOR_INGRESE_UNA_FECHA_VALIDA:'Please fill a valid date',
        POR_FAVOR_INGRESE_UN_NOMBRE: 'Please fill the nombre',
        POR_FAVOR_INGRESE_UN_TIPO:'Please fill the tipo',
        POR_FAVOR_INGRESE_UN_LUGAR:'Please fill select a location',
        EVENTOS_PUBLICOS_MAS_POPULARES:'Most popular events',
        EVENTOS_DEL_USUARIO:'User\'s events',
        SUBSCRIPCIONES_A_EVENTOS:'Subscriptions to events',
        RATING: 'Rating',
        GUARDAR:'Save',
        COMPARTIR_CON: 'Share with',
        EDITAR: 'Edit'
    });
});
