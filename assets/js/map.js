require('../css/map.css');

window.onload = function () {
    
    var map = L.map('map').setView([48.833, 2.333], 6);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

    var searchControl = L.esri.Geocoding.geosearch().addTo(map);

    var groupMarkerSearch = L.layerGroup().addTo(map);

    // création et ajout du LayerGroup
    lgMarkers = new L.LayerGroup();

    searchControl.on('results', function(data){
        
        groupMarkerSearch.clearLayers();
        for (var i = data.results.length - 1; i >= 0; i--) {
            console.log(data);
            var latlgnData = data.results[i].latlng;

            $.ajax({
                type: 'GET',
                url: "http://nominatim.openstreetmap.org/reverse",
                dataType: 'jsonp',
                jsonpCallback: 'data',
                data: {
                    format: "json",
                    limit: 1,
                    lat: data.results[i].latlng.lat,
                    lon: data.results[i].latlng.lng,
                    adressdetails : 1,
                    json_callback: 'data'
                },
                error: function(xhr, ajaxOptions, thrownError) {
                    if( xhr.status !== 200 ){
                        alert('Problème de requète'); 
                    }
                },
                success: function(data){
                    if( data.address !== undefined ){
                        country = data.address['country'];
    
                        if( data.address['city'] !== undefined ){
                            city = data.address['city'];
                        }else if( data.address['state'] !== undefined ){
                            city = data.address['state'];
                        }
                        
                        lgMarkers.clearLayers();
                        map.addLayer(lgMarkers);
                        
                        groupMarkerSearch.addLayer(L.marker(latlgnData).bindPopup(" Pays : " + country + " <br> Ville : " + city).openPopup());
                        $('.leaflet-marker-icon').trigger('click');
                        $( "input[name='itinerary[countryName]']" ).val(country);
                        $( "input[name='itinerary[cityName]']" ).val(city);
                    }
                }
            });
        }
    });
    
    map.on('click', function(e) {
        groupMarkerSearch.clearLayers();
        
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