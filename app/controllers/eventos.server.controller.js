'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Evento = mongoose.model('Evento'),
	User = mongoose.model('User'),
	_ = require('lodash');

/**
 * Create a Evento
 */
exports.create = function(req, res) {
	var evento = new Evento(req.body);
	evento.user = req.user;

	evento.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(evento);
		}
	});
};

/**
 * Show the current Evento
 */
exports.read = function(req, res) {
	res.jsonp(req.evento);
};

/**
 * Update a Evento
 */
exports.update = function(req, res) {
	var evento = req.evento ;

	evento = _.extend(evento , req.body);

	evento.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(evento);
		}
	});
};

/**
 * Delete an Evento
 */
exports.delete = function(req, res) {
	var evento = req.evento ;

	evento.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(evento);
		}
	});
};

/**
 * List of Eventos
 */
exports.list = function(req, res) { 
	Evento.find().sort('-created').populate('user','displayName').populate('assistants', 'displayName').exec(function(err, eventos) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(eventos);
		}
	});
};
/**
 * List of Eventos publicos
 */
exports.eventosPorTipo = function(req, res,next, tipo) {
	Evento.find({tipo: tipo}).sort('-rating').populate('user','displayName').exec(function(err, eventos) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(eventos);
		}
	});
};
/**
 * List of Eventos publicos
 */
exports.eventosSubscriptos = function(req, res,next,id) {
	Evento.find({ assistants:  id }).sort('-created').populate('user','displayName').exec(function(err, eventos) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(eventos);
		}
	});
};

/**
 * Evento middleware
 */
exports.eventoByID = function(req, res, next, id) { 
	Evento.findById(id).populate('user','displayName').populate('assistants', 'displayName').exec(function(err, evento) {
		if (err) return next(err);
		if (! evento) return next(new Error('Failed to load Evento ' + id));
		req.evento = evento ;
		next();
	});
};

exports.compartir = function(req, res, next, datosACompartir){
	var params = JSON.parse(datosACompartir);
	User.findById(params.usuario).exec(function(err, usuario) {
		if (err) return next(err);
		if (! usuario) return next(new Error('Failed to load User ' + id));
		var index = usuario.invitaciones.indexOf(params.evento);
		var compartido = index >= 0;
		if(compartido){
			return res.status(400).send({
				message: errorHandler.getErrorMessage('Ya fue invitado a este evento')
			});
		}
		else{
			usuario.invitaciones.push(params.evento);
			usuario.save(function(err) {
				if (err) {
					return res.status(400).send({
						message: errorHandler.getErrorMessage(err)
					});
				} else {
					next();
				}
			});
		}
	});
};

exports.asistir = function(req, res, next, datos) {
	
	var params = JSON.parse(datos);
	
	if(params.invitado){
		User.findById(params.usuario).exec(function(err, usuario) {
			if (err) return next(err);
			if (! usuario) return next(new Error('Failed to load User ' + id));
			var index = usuario.invitaciones.indexOf(params.evento);
			var compartido = index >= 0;
			if(compartido){
				usuario.invitaciones.splice(index, 1);			
			}
			usuario.save(function(err) {
				if (err) {
					return res.status(400).send({
						message: errorHandler.getErrorMessage(err)
					});
				} else {
					next();
				}
			});
		});
		
	}
	
	Evento.findById(params.evento).exec(function(err, evento) {
		if (err) return next(err);
		if (! evento) return next(new Error('Failed to load Evento ' + id));
		var index = evento.assistants.indexOf(params.usuario);
		var esAsistente = index >= 0;
			if(esAsistente){
				evento.assistants.splice(index, 1);
			}
			else{
			evento.assistants.push(params.usuario);
			}
			evento.save(function(err) {
				if (err) {
					return res.status(400).send({
						message: errorHandler.getErrorMessage(err)
					});
				} else {
					next();
				}
			});
	});
};

/**
 * Evento authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.evento.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
