'use strict';
var xml2json = require('xml2json');
module.exports = function(io, services) {
    var weather = services.weather;
    io.on('connection', function (socket) {
        console.log('Socket.io Corriendo con id: ' + socket.id);
        socket.on('weather',function(json){
            publishWeather(json.payload);
        });
    });

    function publishWeather(request){
        var id= request.id;
        weather.from(id, function(xml){
            var json = xml2json.toJSON(xml);
            io.sockets.emit('weather/'+id,
                {
                    'topic': 'weather/'+id,
                    'payload': json
                }
            );
        });
    }
};
