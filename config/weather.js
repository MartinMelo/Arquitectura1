'use strict';
var http = require('http');
var apiKey = process.env.WEATHER_API_KEY;
exports.from = function(datos, publicar) {
        var lat = datos.lat;
        var lon = datos.lon;
        var path = '/data/2.5/weather?lat='+ lat +'&lon='+ lon  +'&APPID='+apiKey;
        var options = {
            host: 'api.openweathermap.org',
            port: 80,
            path: path,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
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
