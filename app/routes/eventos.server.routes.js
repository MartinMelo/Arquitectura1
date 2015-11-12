'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var eventos = require('../../app/controllers/eventos.server.controller');

	// Eventos Routes
	app.route('/eventos')
		.get(eventos.list)
		.post(users.requiresLogin, eventos.create);

	app.route('/eventos/:eventoId')
		.get(eventos.read)
		.put(users.requiresLogin, eventos.hasAuthorization, eventos.update)
		.delete(users.requiresLogin, eventos.hasAuthorization, eventos.delete);
		
	app.route('/eventos/:eventoId/assistants')
		.get(eventos.read);

	app.route('/eventosPorTipo/:tipo')
		.get(eventos.read);
	app.route('/eventosSubscriptos/:idUsuario')
		.get(users.requiresLogin, eventos.read);
	app.route('/eventos/asistir/:datos')
		.get(users.requiresLogin, eventos.read);
	app.route('/eventos/compartir/:datosACompartir')
		.get(users.requiresLogin, eventos.read);	
	
	// Finish by binding the Evento middleware
	app.param('eventoId', eventos.eventoByID);
	app.param('tipo', eventos.eventosPorTipo);
	app.param('datos', eventos.asistir);
	app.param('idUsuario', eventos.eventosSubscriptos);
	app.param('datosACompartir', eventos.compartir);
};
