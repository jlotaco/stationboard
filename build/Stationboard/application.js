// If your dizmo has a back side, include this function. Otherwise you
// can delete it!

var  base = "http://transport.opendata.ch/v1/";
var connections;

function showBack() {
    dizmo.showBack();
}

function getNextConnections(departure) {
	var response,_url;
	_url = base + "stationboard?station="+encodeURI(departure);
	$.ajax({
        url: _url
    }).then(function(data) {
       console.log(data);
       response = data;
       connections = data;
       $('#front').empty();

       $("#front").append(connections.station.name + " [" +connections.stationboard[0].name+"]"
       	+connections.stationboard[0].to + "   " + connections.stationboard[0].stop.departure );

       $("#front").append('<br>');
       $("#front").append('<br>');
       $("#front").append('<br>');

       $("#front").append(connections.station.name + " [" +connections.stationboard[1].name+"]"
       	+connections.stationboard[1].to + "   " + connections.stationboard[1].stop.departure );




    });

    return response;

}

// As soon as the dom is loaded, and the dizmo is ready, instantiate the main class
window.document.addEventListener('dizmoready', function() {
    // Your code should be in here so that it is secured that the dizmo is fully loaded
    document.getElementById('doneBtn').onclick = function() {
        dizmo.showFront();
    };

    setInterval(function(){getNextConnections("Winterthur, Schloss")}, 5000);


});
