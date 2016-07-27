// If your dizmo has a back side, include this function. Otherwise you
// can delete it!

var  base = "http://transport.opendata.ch/v1/";
var conn, intervalid, departurestation;

function showBack() {
    dizmo.showBack();
}
function calculateHeigt(amountOfEntries) {
    var amount_ = 0;
    if (amount>1){
        amount_ = 10
    }

    return amount*80 + amount_;

}

function getNextConnections(departure) {
	var response,_url;
	_url = base + "stationboard?station="+encodeURI(departure);
	$.ajax({
        url: _url
    }).then(function(data) {
      console.log(data);

        conn = data;
        var category1 = conn.stationboard[0].category

        var departure1 = new Date(conn.stationboard[0].stop.departureTimestamp*1000);

        var departure2 = new Date(conn.stationboard[1].stop.departureTimestamp*1000);

        var departure3 = new Date(conn.stationboard[2].stop.departureTimestamp*1000);

        var departure4 = new Date(conn.stationboard[3].stop.departureTimestamp*1000);

        $('#first .time').text(departure1.getHours() + ":");
        $('#second .time').text(departure2.getHours() + ":");
        $('#third .time').text(departure3.getHours() + ":");
        $('#fourth .time').text(departure4.getHours() + ":");
        if (departure1.getMinutes()<10){
          $('#first .time').text($('#first .time').text() + "0" + departure1.getMinutes());
        }
        else {
          $('#first .time').text($('#first .time').text() + departure1.getMinutes());
        }

        if (departure2.getMinutes()<10){
          $('#second .time').text($('#second .time').text() + "0" + departure2.getMinutes());
        }
        else {
          $('#second .time').text($('#second .time').text() + departure2.getMinutes());
        }

        if (departure3.getMinutes()<10){
          $('#third .time').text($('#third .time').text() + "0" + departure3.getMinutes());
        }
        else {
          $('#third .time').text($('#third .time').text() + departure3.getMinutes());
        }

        if (departure4.getMinutes()<10){
          $('#fourth .time').text($('#fourth .time').text() + "0" + departure4.getMinutes());
        }
        else {
          $('#fourth .time').text($('#fourth .time').text() + departure4.getMinutes());
        }

        $('#first .vehicleicon img').attr('src', getVehicleFromCategory(conn.stationboard[0].category));
        $('#second .vehicleicon img').attr('src', getVehicleFromCategory(conn.stationboard[1].category));
        $('#third .vehicleicon img').attr('src', getVehicleFromCategory(conn.stationboard[2].category));
        $('#fourth .vehicleicon img').attr('src', getVehicleFromCategory(conn.stationboard[3].category));

        $('#first .destination').text(conn.stationboard[0].name + " to " + conn.stationboard[0].to);
        $('#second .destination').text(conn.stationboard[1].name + " to " + conn.stationboard[1].to);
        $('#third .destination').text(conn.stationboard[2].name + " to " + conn.stationboard[2].to);
        $('#fourth .destination').text(conn.stationboard[3].name + " to " + conn.stationboard[3].to);
        // $('#front').empty();

        // $("#front").append(conn.station.name + " [" +conn.stationboard[0].name+"]"
       	// +conn.stationboard[0].to + "   " + conn.stationboard[0].stop.departure );

        // $("#front").append(conn.station.name + " [" +conn.stationboard[1].name+"]"
       	// +conn.stationboard[1].to + "   " + conn.stationboard[1].stop.departure );


    });

    return response;

}

function getVehicleFromCategory(category){

    var vehicle;

    switch (category) {
        case "IR":
            vehicle = "style/train.png"
        break;
        case "S":
            vehicle = "style/train.png"
        break;
        case "T":
            vehicle = "style/tram.png"
        break;
        case "ICN":
            vehicle = "style/train.png"
        break;
        case "ICN":
            vehicle = "style/train.png"
        break;
        case "NFT":
            vehicle = "style/tram.png"
        break;
        case "NFB":
            vehicle = "style/bus.png"
        break;
    }
    return vehicle
}

// As soon as the dom is loaded, and the dizmo is ready, instantiate the main class
window.document.addEventListener('dizmoready', function() {
    // Your code should be in here so that it is secured that the dizmo is fully loaded
    document.getElementById('doneBtn').onclick = function() {
        departurestation = DizmoElements('#departurestation').val();
        console.log(departurestation)
        if (departurestation == ""){
            dizmo.showBack();
         }
        else {
            dizmo.publicStorage.setProperty("departurestation", departurestation);
            dizmo.showFront();

            clearInterval(intervalid);
            getNextConnections(departurestation);
            intervalid = setInterval(function(){getNextConnections(departurestation)}, 10000)

        }
    };
        dizmo.setWidth(355);
        departurestation = dizmo.publicStorage.getProperty("departurestation");
        console.log(departurestation)
        if (departurestation == ""){
            dizmo.showBack();
        }
        else {
            DizmoElements('#departurestation').val(departurestation);
            getNextConnections(departurestation);
            intervalid = setInterval(function(){getNextConnections(departurestation)}, 10000)


        }

    // intervalid = setInterval(function(){getNextConnections("Winterthur, Schloss")}, 5000);


});
