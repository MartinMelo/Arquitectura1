'use strict';

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
        weather.from(request, function(json){
            io.sockets.emit('weather/'+id,
                {
                    'topic': 'weather/'+id,
                    'payload': json
                }
            );
        });
    }
};
