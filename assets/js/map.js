require('../css/map.css');

window.onload = function () {

    var map = L.map('map').setView([48.833, 2.333], 6);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

    var searchControl = L.esri.Geocoding.geosearch().addTo(map);

    var groupMarkerSearch = L.layerGroup().addTo(map);

    // création et ajout du LayerGroup
    lgMarkers = new L.LayerGroup();
    PolyMarkers = new L.LayerGroup();

    searchControl.on('results', function (data) {

        groupMarkerSearch.clearLayers();
        for (var i = data.results.length - 1; i >= 0; i--) {
            var latlgnData = data.results[i].latlng;
            var latPoint = data.results[i].latlng.lat;
            var lngPoint = data.results[i].latlng.lng;
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
                    adressdetails: 1,
                    json_callback: 'data'
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    if (xhr.status !== 200) {
                        alert('Problème de requète');
                    }
                },
                success: function (data) {
                    if (data.address !== undefined) {
                        country = data.address['country'];

                        if (data.address['city'] !== undefined) {
                            city = data.address['city'];
                        } else if (data.address['state'] !== undefined) {
                            city = data.address['state'];
                        }

                        lgMarkers.clearLayers();
                        map.addLayer(lgMarkers);

                        if (checkValidationTrip() > 0) {
                            if ($("#uniqueAddCard").attr("class") === undefined) {
                                $("#bloc_global").append(card);
                                checkForm();
                                // $( "#uniqueAddCard" ).css("display", "block");
                                $('.js-datepicker').datepicker({
                                    format: "dd/mm/yyyy",
                                    autoclose: true,
                                    orientation: "bottom",
                                });
                            }
                        }

                        L.marker(latlgnData).addTo(lgMarkers).bindPopup(" Pays : " + country + " <br> Ville : " + city).openPopup();

                        $("input[name='itinerary[countryName]']").val(country);
                        $("input[name='itinerary[cityName]']").val(city);
                        $("input[name='itinerary[latitude]']").val(latPoint);
                        $("input[name='itinerary[longitude]']").val(lngPoint);
                    }
                }
            });
        }
    });

    var url = window.location.href.split('/');

    var id_travel = url[4];

    function pointsArray() {
        var pointsArray = new Array();

        PolyMarkers.clearLayers();
        map.addLayer(PolyMarkers);

        $(".card").each(function () {
            pointsArray.push(new L.LatLng($(this).attr('lat'), $(this).attr('lng')));
            L.marker(new L.LatLng($(this).attr('lat'), $(this).attr('lng'))).addTo(PolyMarkers);
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
    card += ' <form name="itinerary" method="post" action="/travels/' + id_travel + '/itineraries/newByAjax" >';

    card += '<div id="itinerary" style="margin-bottom: 22px;">';

    card += ' <div style="display: flex; margin-bottom: 10px;">';
    card += '   <div>';
    card += '       <label for="itinerary_departureDate" class="required">Date de départ :  </label>';
    card += '       <input type="text" id="itinerary_departureDate" name="itinerary[departureDate]" style="width:150px; margin-right: 50px;" required="required" class="js-datepicker form-control" autocomplete="off">';
    card += '    </div>';

    card += '    <div>';
    card += '        <label for="itinerary_arrivalDate" class="required">Date de fin :</label>';
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
    card += '<input type="hidden" name="itinerary[id_travel]" value="' + id_travel + '">';
    card += '<input type="hidden" name="itinerary[latitude]" >';
    card += '<input type="hidden" name="itinerary[longitude]" >';

    card += '   </div>';

    // card += '   <button class="btn">Sauvegarder</button>';
    card += '   <input type="submit" name="submit" value="Sauvegarder">';
    card += ' </form>';
    card += '</div>';
    card += '</div>';

    map.on('click', function (e) {
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
                adressdetails: 1,
                json_callback: 'data'
            },
            error: function () {
                alert('Problème de requète');
            },
            success: function (data) {

                if (data.address !== undefined) {
                    country = data.address['country'];

                    if (data.address['city'] !== undefined) {
                        city = data.address['city'];
                    } else if (data.address['county'] !== undefined) {
                        city = data.address['county'];
                    } else if (data.address['state'] !== undefined) {
                        city = data.address['state'];
                    }

                    lgMarkers.clearLayers();
                    map.addLayer(lgMarkers);

                    L.marker(e.latlng).addTo(lgMarkers).bindPopup(" Pays : " + country + " <br> Ville : " + city).openPopup();

                    if (checkValidationTrip() > 0) {
                        if ($("#uniqueAddCard").attr("class") === undefined) {
                            $("#bloc_global").append(card);
                            checkForm();
                            // $( "#uniqueAddCard" ).css("display", "block");
                            $('.js-datepicker').datepicker({
                                format: "dd/mm/yyyy",
                                autoclose: true,
                                orientation: "bottom",
                            });
                        }
                    }
                    
                    $("input[name='itinerary[countryName]']").val(country);
                    $("input[name='itinerary[cityName]']").val(city);
                    $("input[name='itinerary[latitude]']").val(e.latlng.lat);
                    $("input[name='itinerary[longitude]']").val(e.latlng.lng);

                }
            }
        });
    });

    function checkForm() {

        $("input[name='submit']").click(function (e) {

            var start = $("#itinerary_departureDate").datepicker("getDate");
            var end = $("#itinerary_arrivalDate").datepicker("getDate");

            var start_travel = $(".startDateTravel").attr('id');
            var end_travel = $(".endDateTravel").attr('id');

            var from_start = start_travel.split("/")
            var start_travel_final = new Date(from_start[2], from_start[1] - 1, from_start[0])
            e.preventDefault();
            var from_end = end_travel.split("/")
            var end_travel_final = new Date(from_end[2], from_end[1] - 1, from_end[0])

            today = new Date();

            var test_departtravel_departiti = myfunc(start_travel_final, start);
            var test_departtravel_enditi = myfunc(start_travel_final, end);
            var test_fintravel_departiti = myfunc(start, end_travel_final);
            var test_fintravel_enditi = myfunc(end, end_travel_final);
            var test_jour_depart = myfunc(today, start);
            var test_jour_depart = myfunc(today, start);
            var test_jour_retour = myfunc(today, end);
            var test_depart_retour = myfunc(start, end);

            if (test_departtravel_departiti < 0) {
                e.preventDefault();
                alert('Attention ! La date de départ de l\'itinéraire ne peut être antérieur à celle du départ du voyage !');
            } else if (test_departtravel_enditi < 0) {
                e.preventDefault();
                alert('Attention ! La date de fin de l\'itinéraire ne peut être supérieur à celle de la fin du voyage !');
            } else if (test_fintravel_departiti < 0) {
                e.preventDefault();
                alert('Attention ! La date de départ de l\'itinéraire ne peut être supérieur à celle de la fin du voyage !');
            } else if (test_fintravel_enditi < 0) {
                e.preventDefault();
                alert('Attention ! La date de fin de l\'itinéraire ne peut être supérieur à celle de la fin du voyage !');
            } else if (test_jour_depart <= 0) {
                e.preventDefault();
                alert('Attention ! La date du jour ne peut être antérieur à celle du départ !');
            } else if (test_jour_retour <= 0) {
                e.preventDefault();
                alert('Attention ! La date du retour ne peut être antérieur à celle du jour !');
            } else if (test_depart_retour <= 0) {
                e.preventDefault();
                alert('Attention ! La date du retour ne peut être antérieur à celle du départ !');
            }
        });
    }

    function checkValidationTrip() {
        var end_travel = $(".endDateTravel").attr('id');
        var from_end = end_travel.split("/");
        var end_travel_final = new Date(from_end[2], from_end[1] - 1, from_end[0]);
        return myfunc(new Date(), end_travel_final);
    }

    function myfunc(start, end) {
        days = (end - start) / (1000 * 60 * 60 * 24);
        return Math.round(days);
    }

}