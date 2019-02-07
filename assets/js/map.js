require('../css/map.css');

/*
var mymap = L.map('map').setView(
    [35.59, -82.56],
    13);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoiYWxiZXJ0MjQiLCJhIjoiY2l6cGRkcmp4MDAwbTJ3czNjdHRpd28wOCJ9.RyAFYmq9Wp9yZFEzkmrj7A'
}).addTo(mymap);

var popup = L.popup();

function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(mymap);
}

mymap.on('click', onMapClick);

*/


window.onload = function () {
	
    var map = L.map('map').setView([59,13.18359],3);
    
        L.tileLayer('https://api.mapbox.com/styles/v1/albert24/cizpdeq9q00ee2ro16ga4ecqr/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYWxiZXJ0MjQiLCJhIjoiY2l6cGRkcmp4MDAwbTJ3czNjdHRpd28wOCJ9.RyAFYmq9Wp9yZFEzkmrj7A',
            {
                attribution: 'HERSERANT Tanguy\'s & KRASNIQI Albert\'s work.'
            }
        ).addTo(map);
        
	// var myIcon = L.icon({
    // iconUrl: './vue/styleCSS/carte.gif',
    // iconRetinaUrl: './vue/styleCSS/carte.gif',
    // iconSize: [38, 95],
    // iconAnchor: [22, 94],
    // popupAnchor: [-3, -76],

    // });
    
    // map.on('click', onClick);

	
    map.on('click', function(e) {
        
		$.ajax({
		    type: 'GET',
		    url: "http://nominatim.openstreetmap.org/reverse",
		    dataType: 'jsonp',
		    jsonpCallback: 'data',
            data: {
                format: "json",
                limit: 1,
                lat: e.latlng.lat,
                lon: e.latlng.lng,
                adressdetails : 1,
                json_callback: 'data'
            },
		    error: function() {
            alert('Problème de requète'); },
		    success: function(data){
                
                if( data.address !== undefined ){
                    country = data.address['country'];

                    if( data.address['city'] !== undefined ){
                        city = data.address['city'];
                    }else if( data.address['county'] !== undefined ){
                        city = data.address['county'];
                    }else if( data.address['state'] !== undefined ){
                        city = data.address['state'];
                    }
                    
                    L.marker(e.latlng).addTo(map).bindPopup(
                        " Pays : "+ country+
                        " <br> Ville : " + city
                        ).openPopup();

                    L.circle(e.latlng, 1).addTo(map);
                    
                    $( "input[name='itinerary[countryName]']" ).val(country);
                    $( "input[name='itinerary[cityName]']" ).val(city);
                }
		    }
		});
    });

}