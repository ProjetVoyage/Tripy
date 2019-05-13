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
    
    var card = '<div class="card p-0" id="uniqueAddCard" style="padding-bottom: 20px !important;">';
    card += ' <div class="card-body pb-0">';
    card += ' <form name="itinerary" method="get" >';

    card += '<div id="itinerary">';

    card += ' <div style="display: flex;">';
    card += '   <div>';
    card += '       <label for="itinerary_departureDate" class="required">Date de départ</label>';
    card += '       <input type="text" id="itinerary_departureDate" name="itinerary[departureDate]" style="width:150px; margin-right: 50px;" required="required" class="js-datepicker form-control" autocomplete="off">';
    card += '    </div>';

    card += '    <div>';
    card += '        <label for="itinerary_arrivalDate" class="required">Date d\'arrivé</label>';
    card += '       <input type="text" id="itinerary_arrivalDate" name="itinerary[arrivalDate]" style="width:150px;" required="required" class="js-datepicker form-control" autocomplete="off">';
    card += '    </div>';
    card += '</div>';

    card += ' <div style="display: flex;">';
    card += '    <div>';
    card += '       <label for="itinerary_countryName" class="required">Pays : </label>';
    card += '        <input type="text" id="itinerary_countryName" name="itinerary[countryName]" style="width:250px; margin-right: 25px;" required="required" class="form-control">';
    card += '   </div>';

    card += '   <div>';
    card += '       <label for="itinerary_cityName" class="required">Ville : </label>';
    card += '       <input type="text" id="itinerary_cityName" name="itinerary[cityName]" style="width:250px;" required="required" class="form-control">';
    card += '   </div>';
    card += '</div>';

    card += '<input type="hidden" id="itinerary__token" name="itinerary[_token]" value="IMpV05WN3Z63k45rC3q02N2HVa0i-Pgf8sBO0MQFqfA">';

    card += '   </div>';

    card += '   <button class="btn">Sauvegarder</button>';
    card += ' </form>';
    card += '</div>';
    card += '</div>';
    

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
                    
                    if( $( "#uniqueAddCard" ).attr("class") == undefined ){
                        $( "#bloc_global" ).append(card);
                        $('.js-datepicker').datepicker({
                            format: "dd/mm/yyyy",
                            autoclose: true,
                            orientation: "bottom",
                        });
                    }
                    
                    $( "input[name='itinerary[countryName]']" ).val(country);
                    $( "input[name='itinerary[cityName]']" ).val(city);
                    
                }
		    }
		});
    });

}