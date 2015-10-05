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
		required: 'Please fill Evento name',
		trim: true
	},
	place: {
		type: String,
		default: '',
		required: 'Please fill Evento place',
		trim: true
	},
	tipo: {
		type: String,
		default: 'privado',
		required: 'Please fill Evento place'
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
		type: Date
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	},
	assistants: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

mongoose.model('Evento', EventoSchema);
