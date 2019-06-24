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
    
    // alert('Bienvenue ! Cliquez sur la map pour commencer à programmer votre itinéraire !');

    var url = window.location.href.split('/');
    
    var id_travel = url[4];
    
    function pointsArray() {
        var pointsArray = new Array();
        
        $( ".card" ).each(function() {
            pointsArray.push(new L.LatLng($(this).attr('lat'),$(this).attr('lng')));
        });
        
        return pointsArray;
    }

    var trajet = new L.Polyline(pointsArray());
    map.addLayer(trajet);


    // $.ajax({
    //     type: 'POST',
    //     url: "/travels/"+id_travel+"/itineraries_ajax/",
    //     data: {
    //         id_travel: id_travel
    //     },
    //     dataType: 'json',
    //     error: function(xhr, ajaxOptions, thrownError) {
    //         if( xhr.status !== 200 ){
    //             alert('Problème de requète'); 
    //         }
    //     },
    //     success: function(data){
    //         console.log(data);
    //     }
    // });

    
    var card = '<div class="card p-0" id="uniqueAddCard" style="padding-bottom: 20px !important;">';
    card += ' <div class="card-body pb-0">';
    card += ' <form name="itinerary" method="post" action="/travels/'+id_travel+'/itineraries/newByAjax" >';

    card += '<div id="itinerary" style="margin-bottom: 22px;">';

    card += ' <div style="display: flex; margin-bottom: 10px;">';
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

    // card += '<input type="hidden" id="itinerary__token" name="itinerary[_token]">';
    card += '<input type="hidden" name="itinerary[id_travel]" value="'+id_travel+'">';
    card += '<input type="hidden" name="itinerary[latitude]" >';
    card += '<input type="hidden" name="itinerary[longitude]" >';

    card += '   </div>';

    // card += '   <button class="btn">Sauvegarder</button>';
    card += '   <input type="submit" value="Sauvegarder">';
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
                    

                    console.log($( "#uniqueAddCard" ).attr("class"));
                    if( $( "#uniqueAddCard" ).attr("class") === undefined ){
                        $( "#bloc_global" ).append(card);
                        // $( "#uniqueAddCard" ).css("display", "block");
                        $('.js-datepicker').datepicker({
                            format: "dd/mm/yyyy",
                            autoclose: true,
                            orientation: "bottom",
                        });
                    }
                    
                    $( "input[name='itinerary[countryName]']" ).val(country);
                    $( "input[name='itinerary[cityName]']" ).val(city);
                    $( "input[name='itinerary[latitude]']" ).val(e.latlng.lat);
                    $( "input[name='itinerary[longitude]']" ).val(e.latlng.lng);
                    
                }
		    }
		});
    });

    // $(".edit").click(function(e){
    //     e.preventDefault();
    //     var id_card = $(this).attr('id');

    //     $('#card'+id_card).css('display', 'none');
    //     $('#cardhidden'+id_card).css('display', 'block');
    // });

}