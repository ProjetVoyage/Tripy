require('../css/map.css');

window.onload = function () {
    
    var map = L.map('map').setView([40.91, -96.63], 4);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

    var searchControl = L.esri.Geocoding.geosearch().addTo(map);

    var results = L.layerGroup().addTo(map);

    searchControl.on('results', function(data){
        results.clearLayers();
        for (var i = data.results.length - 1; i >= 0; i--) {
            results.addLayer(L.marker(data.results[i].latlng).bindPopup(" Pays : ").openPopup());
        }
    });
    
    // création et ajout du LayerGroup
    lgMarkers = new L.LayerGroup();

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
                    
                    lgMarkers.clearLayers();
                    map.addLayer(lgMarkers);
          
                    L.marker(e.latlng).addTo(lgMarkers).bindPopup(" Pays : " + country + " <br> Ville : " + city).openPopup();

                    $( "input[name='itinerary[countryName]']" ).val(country);
                    $( "input[name='itinerary[cityName]']" ).val(city);
                }
		    }
		});
    });

}