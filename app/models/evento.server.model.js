'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Evento Schema
 */
var EventoSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'POR_FAVOR_INGRESE_UN_NOMBRE',
		trim: true
	},
	place: {
		type: String,
		default: '',
		required: 'POR_FAVOR_INGRESE_UN_LUGAR',
		trim: true
	},
	tipo: {
		type: String,
		default: 'privado',
		required: 'POR_FAVOR_INGRESE_UN_TIPO'
	},
	description: {
		type: String,
		default: ''
	},
	image: {
		type: String,
		default: ''
	},
	requirements: {
		type: String,
		default: ''
	},
	created: {
		type: Date,
		default: Date.now
	},
	date: {
		type: Date,
        required: 'POR_FAVOR_INGRESE_UNA_FECHA_VALIDA'
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	},
	assistants: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

mongoose.model('Evento', EventoSchema);
