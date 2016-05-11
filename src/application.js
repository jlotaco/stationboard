// If your dizmo has a back side, include this function. Otherwise you
// can delete it!

var  base = "http://transport.opendata.ch/v1/";
var conn, intervalid;

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


        conn = data;

        var departure1 = new Date(conn.stationboard[0].stop.departureTimestamp*1000);
        var departure2 = new Date(conn.stationboard[1].stop.departureTimestamp*1000)

        $('#first .time').text(departure1.getHours() + ":" + departure1.getMinutes());

        $('#second .time').text(departure2.getHours() + ":" + departure2.getMinutes());

        $('#first .details').text("to " + conn.stationboard[0].to);
        $('#second .details').text("to " + conn.stationboard[1].to);
        // $('#front').empty();

        // $("#front").append(conn.station.name + " [" +conn.stationboard[0].name+"]"
       	// +conn.stationboard[0].to + "   " + conn.stationboard[0].stop.departure );

        // $("#front").append(conn.station.name + " [" +conn.stationboard[1].name+"]"
       	// +conn.stationboard[1].to + "   " + conn.stationboard[1].stop.departure );




    });

    return response;

}

// As soon as the dom is loaded, and the dizmo is ready, instantiate the main class
window.document.addEventListener('dizmoready', function() {
    // Your code should be in here so that it is secured that the dizmo is fully loaded
    document.getElementById('doneBtn').onclick = function() {
        dizmo.showFront();
    };

    // intervalid = setInterval(function(){getNextConnections("Winterthur, Schloss")}, 5000);


});
