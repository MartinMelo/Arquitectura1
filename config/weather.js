'use strict';
var http = require('http');
var apiKey = process.env.weatherApiKey;
exports.from = function(id, publicar) {
        var path = '/forecastrss?w='+id+'&u=c';
        var options = {
            host: 'weather.yahooapis.com',
            port: 80,
            path: path,
            method: 'GET',
            headers: {
                'Content-Type': 'application/xml'
            }
        };
        http.get(options, function(res){
            var body = '';
            res.on('data', function(d) {
                body += d;
            });
            res.on('end', function(){
                publicar(body);
            });
            res.on('error', function(error){
                console.log('Error al obtener el clima.');
            });
        });
};
