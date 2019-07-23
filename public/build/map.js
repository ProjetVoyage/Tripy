(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["map"],{

/***/ "./assets/css/map.css":
/*!****************************!*\
  !*** ./assets/css/map.css ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./assets/js/map.js":
/*!**************************!*\
  !*** ./assets/js/map.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ../css/map.css */ "./assets/css/map.css");

window.onload = function () {
  var map = L.map('map').setView([48.833, 2.333], 6);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
  var searchControl = L.esri.Geocoding.geosearch().addTo(map);
  var groupMarkerSearch = L.layerGroup().addTo(map); // création et ajout du LayerGroup

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
        error: function error(xhr, ajaxOptions, thrownError) {
          if (xhr.status !== 200) {
            alert('Problème de requète');
          }
        },
        success: function success(data) {
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
                checkForm(); // $( "#uniqueAddCard" ).css("display", "block");

                $('.js-datepicker').datepicker({
                  format: "dd/mm/yyyy",
                  autoclose: true,
                  orientation: "bottom"
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
  map.addLayer(trajet); // $.ajax({
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
  card += '</div>'; // card += '<input type="hidden" id="itinerary__token" name="itinerary[_token]">';

  card += '<input type="hidden" name="itinerary[id_travel]" value="' + id_travel + '">';
  card += '<input type="hidden" name="itinerary[latitude]" >';
  card += '<input type="hidden" name="itinerary[longitude]" >';
  card += '   </div>'; // card += '   <button class="btn">Sauvegarder</button>';

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
      error: function error() {
        alert('Problème de requète');
      },
      success: function success(data) {
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
              checkForm(); // $( "#uniqueAddCard" ).css("display", "block");

              $('.js-datepicker').datepicker({
                format: "dd/mm/yyyy",
                autoclose: true,
                orientation: "bottom"
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
      var from_start = start_travel.split("/");
      var start_travel_final = new Date(from_start[2], from_start[1] - 1, from_start[0]);
      e.preventDefault();
      var from_end = end_travel.split("/");
      var end_travel_final = new Date(from_end[2], from_end[1] - 1, from_end[0]);
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
};

/***/ })

},[["./assets/js/map.js","runtime"]]]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvY3NzL21hcC5jc3MiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL21hcC5qcyJdLCJuYW1lcyI6WyJyZXF1aXJlIiwid2luZG93Iiwib25sb2FkIiwibWFwIiwiTCIsInNldFZpZXciLCJ0aWxlTGF5ZXIiLCJhZGRUbyIsInNlYXJjaENvbnRyb2wiLCJlc3JpIiwiR2VvY29kaW5nIiwiZ2Vvc2VhcmNoIiwiZ3JvdXBNYXJrZXJTZWFyY2giLCJsYXllckdyb3VwIiwibGdNYXJrZXJzIiwiTGF5ZXJHcm91cCIsIlBvbHlNYXJrZXJzIiwib24iLCJkYXRhIiwiY2xlYXJMYXllcnMiLCJpIiwicmVzdWx0cyIsImxlbmd0aCIsImxhdGxnbkRhdGEiLCJsYXRsbmciLCJsYXRQb2ludCIsImxhdCIsImxuZ1BvaW50IiwibG5nIiwiJCIsImFqYXgiLCJ0eXBlIiwidXJsIiwiZGF0YVR5cGUiLCJqc29ucENhbGxiYWNrIiwiZm9ybWF0IiwibGltaXQiLCJsb24iLCJhZHJlc3NkZXRhaWxzIiwianNvbl9jYWxsYmFjayIsImVycm9yIiwieGhyIiwiYWpheE9wdGlvbnMiLCJ0aHJvd25FcnJvciIsInN0YXR1cyIsImFsZXJ0Iiwic3VjY2VzcyIsImFkZHJlc3MiLCJ1bmRlZmluZWQiLCJjb3VudHJ5IiwiY2l0eSIsImFkZExheWVyIiwiY2hlY2tWYWxpZGF0aW9uVHJpcCIsImF0dHIiLCJhcHBlbmQiLCJjYXJkIiwiY2hlY2tGb3JtIiwiZGF0ZXBpY2tlciIsImF1dG9jbG9zZSIsIm9yaWVudGF0aW9uIiwibWFya2VyIiwiYmluZFBvcHVwIiwib3BlblBvcHVwIiwidmFsIiwibG9jYXRpb24iLCJocmVmIiwic3BsaXQiLCJpZF90cmF2ZWwiLCJwb2ludHNBcnJheSIsIkFycmF5IiwiZWFjaCIsInB1c2giLCJMYXRMbmciLCJ0cmFqZXQiLCJQb2x5bGluZSIsImUiLCJjbGljayIsInN0YXJ0IiwiZW5kIiwic3RhcnRfdHJhdmVsIiwiZW5kX3RyYXZlbCIsImZyb21fc3RhcnQiLCJzdGFydF90cmF2ZWxfZmluYWwiLCJEYXRlIiwicHJldmVudERlZmF1bHQiLCJmcm9tX2VuZCIsImVuZF90cmF2ZWxfZmluYWwiLCJ0b2RheSIsInRlc3RfZGVwYXJ0dHJhdmVsX2RlcGFydGl0aSIsIm15ZnVuYyIsInRlc3RfZGVwYXJ0dHJhdmVsX2VuZGl0aSIsInRlc3RfZmludHJhdmVsX2RlcGFydGl0aSIsInRlc3RfZmludHJhdmVsX2VuZGl0aSIsInRlc3Rfam91cl9kZXBhcnQiLCJ0ZXN0X2pvdXJfcmV0b3VyIiwidGVzdF9kZXBhcnRfcmV0b3VyIiwiZGF5cyIsIk1hdGgiLCJyb3VuZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsdUM7Ozs7Ozs7Ozs7O0FDQUFBLG1CQUFPLENBQUMsNENBQUQsQ0FBUDs7QUFFQUMsTUFBTSxDQUFDQyxNQUFQLEdBQWdCLFlBQVk7QUFFeEIsTUFBSUMsR0FBRyxHQUFHQyxDQUFDLENBQUNELEdBQUYsQ0FBTSxLQUFOLEVBQWFFLE9BQWIsQ0FBcUIsQ0FBQyxNQUFELEVBQVMsS0FBVCxDQUFyQixFQUFzQyxDQUF0QyxDQUFWO0FBRUFELEdBQUMsQ0FBQ0UsU0FBRixDQUFZLG9EQUFaLEVBQWtFQyxLQUFsRSxDQUF3RUosR0FBeEU7QUFFQSxNQUFJSyxhQUFhLEdBQUdKLENBQUMsQ0FBQ0ssSUFBRixDQUFPQyxTQUFQLENBQWlCQyxTQUFqQixHQUE2QkosS0FBN0IsQ0FBbUNKLEdBQW5DLENBQXBCO0FBRUEsTUFBSVMsaUJBQWlCLEdBQUdSLENBQUMsQ0FBQ1MsVUFBRixHQUFlTixLQUFmLENBQXFCSixHQUFyQixDQUF4QixDQVJ3QixDQVV4Qjs7QUFDQVcsV0FBUyxHQUFHLElBQUlWLENBQUMsQ0FBQ1csVUFBTixFQUFaO0FBQ0FDLGFBQVcsR0FBRyxJQUFJWixDQUFDLENBQUNXLFVBQU4sRUFBZDtBQUVBUCxlQUFhLENBQUNTLEVBQWQsQ0FBaUIsU0FBakIsRUFBNEIsVUFBVUMsSUFBVixFQUFnQjtBQUV4Q04s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LENBQUNTLGNBQUY7QUFDQXZDLGFBQUssQ0FBQyx3RUFBRCxDQUFMO0FBQ0gsT0FITSxNQUdBLElBQUlpRCxnQkFBZ0IsSUFBSSxDQUF4QixFQUEyQjtBQUM5Qm5CLFNBQUMsQ0FBQ1MsY0FBRjtBQUNBdkMsYUFBSyxDQUFDLHdFQUFELENBQUw7QUFDSCxPQUhNLE1BR0EsSUFBSWtELGtCQUFrQixJQUFJLENBQTFCLEVBQTZCO0FBQ2hDcEIsU0FBQyxDQUFDUyxjQUFGO0FBQ0F2QyxhQUFLLENBQUMsMEVBQUQsQ0FBTDtBQUNIO0FBQ0osS0EvQ0Q7QUFnREg7O0FBRUQsV0FBU08sbUJBQVQsR0FBK0I7QUFDM0IsUUFBSTRCLFVBQVUsR0FBR25ELENBQUMsQ0FBQyxnQkFBRCxDQUFELENBQW9Cd0IsSUFBcEIsQ0FBeUIsSUFBekIsQ0FBakI7QUFDQSxRQUFJZ0MsUUFBUSxHQUFHTCxVQUFVLENBQUNkLEtBQVgsQ0FBaUIsR0FBakIsQ0FBZjtBQUNBLFFBQUlvQixnQkFBZ0IsR0FBRyxJQUFJSCxJQUFKLENBQVNFLFFBQVEsQ0FBQyxDQUFELENBQWpCLEVBQXNCQSxRQUFRLENBQUMsQ0FBRCxDQUFSLEdBQWMsQ0FBcEMsRUFBdUNBLFFBQVEsQ0FBQyxDQUFELENBQS9DLENBQXZCO0FBQ0EsV0FBT0ksTUFBTSxDQUFDLElBQUlOLElBQUosRUFBRCxFQUFhRyxnQkFBYixDQUFiO0FBQ0g7O0FBRUQsV0FBU0csTUFBVCxDQUFnQlosS0FBaEIsRUFBdUJDLEdBQXZCLEVBQTRCO0FBQ3hCa0IsUUFBSSxHQUFHLENBQUNsQixHQUFHLEdBQUdELEtBQVAsS0FBaUIsT0FBTyxFQUFQLEdBQVksRUFBWixHQUFpQixFQUFsQyxDQUFQO0FBQ0EsV0FBT29CLElBQUksQ0FBQ0MsS0FBTCxDQUFXRixJQUFYLENBQVA7QUFDSDtBQUVKLENBMVJELEMiLCJmaWxlIjoibWFwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luIiwicmVxdWlyZSgnLi4vY3NzL21hcC5jc3MnKTtcclxuXHJcbndpbmRvdy5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgdmFyIG1hcCA9IEwubWFwKCdtYXAnKS5zZXRWaWV3KFs0OC44MzMsIDIuMzMzXSwgNik7XHJcblxyXG4gICAgTC50aWxlTGF5ZXIoJ2h0dHBzOi8ve3N9LnRpbGUub3BlbnN0cmVldG1hcC5vcmcve3p9L3t4fS97eX0ucG5nJykuYWRkVG8obWFwKTtcclxuXHJcbiAgICB2YXIgc2VhcmNoQ29udHJvbCA9IEwuZXNyaS5HZW9jb2RpbmcuZ2Vvc2VhcmNoKCkuYWRkVG8obWFwKTtcclxuXHJcbiAgICB2YXIgZ3JvdXBNYXJrZXJTZWFyY2ggPSBMLmxheWVyR3JvdXAoKS5hZGRUbyhtYXApO1xyXG5cclxuICAgIC8vIGNyw6lhdGlvbiBldCBham91dCBkdSBMYXllckdyb3VwXHJcbiAgICBsZ01hcmtlcnMgPSBuZXcgTC5MYXllckdyb3VwKCk7XHJcbiAgICBQb2x5TWFya2VycyA9IG5ldyBMLkxheWVyR3JvdXAoKTtcclxuXHJcbiAgICBzZWFyY2hDb250cm9sLm9uKCdyZXN1bHRzJywgZnVuY3Rpb24gKGRhdGEpIHtcclxuXHJcbiAgICAgICAgZ3JvdXBNYXJrZXJTZWFyY2guY2xlYXJMYXllcnMoKTtcclxuICAgICAgICBmb3IgKHZhciBpID0gZGF0YS5yZXN1bHRzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XHJcbiAgICAgICAgICAgIHZhciBsYXRsZ25EYXRhID0gZGF0YS5yZXN1bHRzW2ldLmxhdGxuZztcclxuICAgICAgICAgICAgdmFyIGxhdFBvaW50ID0gZGF0YS5yZXN1bHRzW2ldLmxhdGxuZy5sYXQ7XHJcbiAgICAgICAgICAgIHZhciBsbmdQb2ludCA9IGRhdGEucmVzdWx0c1tpXS5sYXRsbmcubG5nO1xyXG4gICAgICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICAgICAgdHlwZTogJ0dFVCcsXHJcbiAgICAgICAgICAgICAgICB1cmw6IFwiaHR0cDovL25vbWluYXRpbS5vcGVuc3RyZWV0bWFwLm9yZy9yZXZlcnNlXCIsXHJcbiAgICAgICAgICAgICAgICBkYXRhVHlwZTogJ2pzb25wJyxcclxuICAgICAgICAgICAgICAgIGpzb25wQ2FsbGJhY2s6ICdkYXRhJyxcclxuICAgICAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICAgICAgICBmb3JtYXQ6IFwianNvblwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGxpbWl0OiAxLFxyXG4gICAgICAgICAgICAgICAgICAgIGxhdDogZGF0YS5yZXN1bHRzW2ldLmxhdGxuZy5sYXQsXHJcbiAgICAgICAgICAgICAgICAgICAgbG9uOiBkYXRhLnJlc3VsdHNbaV0ubGF0bG5nLmxuZyxcclxuICAgICAgICAgICAgICAgICAgICBhZHJlc3NkZXRhaWxzOiAxLFxyXG4gICAgICAgICAgICAgICAgICAgIGpzb25fY2FsbGJhY2s6ICdkYXRhJ1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGVycm9yOiBmdW5jdGlvbiAoeGhyLCBhamF4T3B0aW9ucywgdGhyb3duRXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoeGhyLnN0YXR1cyAhPT0gMjAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFsZXJ0KCdQcm9ibMOobWUgZGUgcmVxdcOodGUnKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5hZGRyZXNzICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY291bnRyeSA9IGRhdGEuYWRkcmVzc1snY291bnRyeSddO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuYWRkcmVzc1snY2l0eSddICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNpdHkgPSBkYXRhLmFkZHJlc3NbJ2NpdHknXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChkYXRhLmFkZHJlc3NbJ3N0YXRlJ10gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2l0eSA9IGRhdGEuYWRkcmVzc1snc3RhdGUnXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgbGdNYXJrZXJzLmNsZWFyTGF5ZXJzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hcC5hZGRMYXllcihsZ01hcmtlcnMpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNoZWNrVmFsaWRhdGlvblRyaXAoKSA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgkKFwiI3VuaXF1ZUFkZENhcmRcIikuYXR0cihcImNsYXNzXCIpID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKFwiI2Jsb2NfZ2xvYmFsXCIpLmFwcGVuZChjYXJkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGVja0Zvcm0oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAkKCBcIiN1bmlxdWVBZGRDYXJkXCIgKS5jc3MoXCJkaXNwbGF5XCIsIFwiYmxvY2tcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnLmpzLWRhdGVwaWNrZXInKS5kYXRlcGlja2VyKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9ybWF0OiBcImRkL21tL3l5eXlcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXV0b2Nsb3NlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcmllbnRhdGlvbjogXCJib3R0b21cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgTC5tYXJrZXIobGF0bGduRGF0YSkuYWRkVG8obGdNYXJrZXJzKS5iaW5kUG9wdXAoXCIgUGF5cyA6IFwiICsgY291bnRyeSArIFwiIDxicj4gVmlsbGUgOiBcIiArIGNpdHkpLm9wZW5Qb3B1cCgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJChcImlucHV0W25hbWU9J2l0aW5lcmFyeVtjb3VudHJ5TmFtZV0nXVwiKS52YWwoY291bnRyeSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoXCJpbnB1dFtuYW1lPSdpdGluZXJhcnlbY2l0eU5hbWVdJ11cIikudmFsKGNpdHkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKFwiaW5wdXRbbmFtZT0naXRpbmVyYXJ5W2xhdGl0dWRlXSddXCIpLnZhbChsYXRQb2ludCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoXCJpbnB1dFtuYW1lPSdpdGluZXJhcnlbbG9uZ2l0dWRlXSddXCIpLnZhbChsbmdQb2ludCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICB2YXIgdXJsID0gd2luZG93LmxvY2F0aW9uLmhyZWYuc3BsaXQoJy8nKTtcclxuXHJcbiAgICB2YXIgaWRfdHJhdmVsID0gdXJsWzRdO1xyXG5cclxuICAgIGZ1bmN0aW9uIHBvaW50c0FycmF5KCkge1xyXG4gICAgICAgIHZhciBwb2ludHNBcnJheSA9IG5ldyBBcnJheSgpO1xyXG5cclxuICAgICAgICBQb2x5TWFya2Vycy5jbGVhckxheWVycygpO1xyXG4gICAgICAgIG1hcC5hZGRMYXllcihQb2x5TWFya2Vycyk7XHJcblxyXG4gICAgICAgICQoXCIuY2FyZFwiKS5lYWNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcG9pbnRzQXJyYXkucHVzaChuZXcgTC5MYXRMbmcoJCh0aGlzKS5hdHRyKCdsYXQnKSwgJCh0aGlzKS5hdHRyKCdsbmcnKSkpO1xyXG4gICAgICAgICAgICBMLm1hcmtlcihuZXcgTC5MYXRMbmcoJCh0aGlzKS5hdHRyKCdsYXQnKSwgJCh0aGlzKS5hdHRyKCdsbmcnKSkpLmFkZFRvKFBvbHlNYXJrZXJzKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHBvaW50c0FycmF5O1xyXG4gICAgfVxyXG5cclxuICAgIHZhciB0cmFqZXQgPSBuZXcgTC5Qb2x5bGluZShwb2ludHNBcnJheSgpKTtcclxuICAgIG1hcC5hZGRMYXllcih0cmFqZXQpO1xyXG5cclxuXHJcbiAgICAvLyAkLmFqYXgoe1xyXG4gICAgLy8gICAgIHR5cGU6ICdQT1NUJyxcclxuICAgIC8vICAgICB1cmw6IFwiL3RyYXZlbHMvXCIraWRfdHJhdmVsK1wiL2l0aW5lcmFyaWVzX2FqYXgvXCIsXHJcbiAgICAvLyAgICAgZGF0YToge1xyXG4gICAgLy8gICAgICAgICBpZF90cmF2ZWw6IGlkX3RyYXZlbFxyXG4gICAgLy8gICAgIH0sXHJcbiAgICAvLyAgICAgZGF0YVR5cGU6ICdqc29uJyxcclxuICAgIC8vICAgICBlcnJvcjogZnVuY3Rpb24oeGhyLCBhamF4T3B0aW9ucywgdGhyb3duRXJyb3IpIHtcclxuICAgIC8vICAgICAgICAgaWYoIHhoci5zdGF0dXMgIT09IDIwMCApe1xyXG4gICAgLy8gICAgICAgICAgICAgYWxlcnQoJ1Byb2Jsw6htZSBkZSByZXF1w6h0ZScpOyBcclxuICAgIC8vICAgICAgICAgfVxyXG4gICAgLy8gICAgIH0sXHJcbiAgICAvLyAgICAgc3VjY2VzczogZnVuY3Rpb24oZGF0YSl7XHJcbiAgICAvLyAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xyXG4gICAgLy8gICAgIH1cclxuICAgIC8vIH0pO1xyXG5cclxuXHJcbiAgICB2YXIgY2FyZCA9ICc8ZGl2IGNsYXNzPVwiY2FyZCBwLTBcIiBpZD1cInVuaXF1ZUFkZENhcmRcIiBzdHlsZT1cInBhZGRpbmctYm90dG9tOiAyMHB4ICFpbXBvcnRhbnQ7XCI+JztcclxuICAgIGNhcmQgKz0gJyA8ZGl2IGNsYXNzPVwiY2FyZC1ib2R5IHBiLTBcIj4nO1xyXG4gICAgY2FyZCArPSAnIDxmb3JtIG5hbWU9XCJpdGluZXJhcnlcIiBtZXRob2Q9XCJwb3N0XCIgYWN0aW9uPVwiL3RyYXZlbHMvJyArIGlkX3RyYXZlbCArICcvaXRpbmVyYXJpZXMvbmV3QnlBamF4XCIgPic7XHJcblxyXG4gICAgY2FyZCArPSAnPGRpdiBpZD1cIml0aW5lcmFyeVwiIHN0eWxlPVwibWFyZ2luLWJvdHRvbTogMjJweDtcIj4nO1xyXG5cclxuICAgIGNhcmQgKz0gJyA8ZGl2IHN0eWxlPVwiZGlzcGxheTogZmxleDsgbWFyZ2luLWJvdHRvbTogMTBweDtcIj4nO1xyXG4gICAgY2FyZCArPSAnICAgPGRpdj4nO1xyXG4gICAgY2FyZCArPSAnICAgICAgIDxsYWJlbCBmb3I9XCJpdGluZXJhcnlfZGVwYXJ0dXJlRGF0ZVwiIGNsYXNzPVwicmVxdWlyZWRcIj5EYXRlIGRlIGTDqXBhcnQgOiAgPC9sYWJlbD4nO1xyXG4gICAgY2FyZCArPSAnICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGlkPVwiaXRpbmVyYXJ5X2RlcGFydHVyZURhdGVcIiBuYW1lPVwiaXRpbmVyYXJ5W2RlcGFydHVyZURhdGVdXCIgc3R5bGU9XCJ3aWR0aDoxNTBweDsgbWFyZ2luLXJpZ2h0OiA1MHB4O1wiIHJlcXVpcmVkPVwicmVxdWlyZWRcIiBjbGFzcz1cImpzLWRhdGVwaWNrZXIgZm9ybS1jb250cm9sXCIgYXV0b2NvbXBsZXRlPVwib2ZmXCI+JztcclxuICAgIGNhcmQgKz0gJyAgICA8L2Rpdj4nO1xyXG5cclxuICAgIGNhcmQgKz0gJyAgICA8ZGl2Pic7XHJcbiAgICBjYXJkICs9ICcgICAgICAgIDxsYWJlbCBmb3I9XCJpdGluZXJhcnlfYXJyaXZhbERhdGVcIiBjbGFzcz1cInJlcXVpcmVkXCI+RGF0ZSBkZSBmaW4gOjwvbGFiZWw+JztcclxuICAgIGNhcmQgKz0gJyAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBpZD1cIml0aW5lcmFyeV9hcnJpdmFsRGF0ZVwiIG5hbWU9XCJpdGluZXJhcnlbYXJyaXZhbERhdGVdXCIgc3R5bGU9XCJ3aWR0aDoxNTBweDtcIiByZXF1aXJlZD1cInJlcXVpcmVkXCIgY2xhc3M9XCJqcy1kYXRlcGlja2VyIGZvcm0tY29udHJvbFwiIGF1dG9jb21wbGV0ZT1cIm9mZlwiPic7XHJcbiAgICBjYXJkICs9ICcgICAgPC9kaXY+JztcclxuICAgIGNhcmQgKz0gJzwvZGl2Pic7XHJcblxyXG4gICAgY2FyZCArPSAnIDxkaXYgc3R5bGU9XCJkaXNwbGF5OiBmbGV4O1wiPic7XHJcbiAgICBjYXJkICs9ICcgICAgPGRpdj4nO1xyXG4gICAgY2FyZCArPSAnICAgICAgIDxsYWJlbCBmb3I9XCJpdGluZXJhcnlfY291bnRyeU5hbWVcIiBjbGFzcz1cInJlcXVpcmVkXCI+UGF5cyA6IDwvbGFiZWw+JztcclxuICAgIGNhcmQgKz0gJyAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgaWQ9XCJpdGluZXJhcnlfY291bnRyeU5hbWVcIiBuYW1lPVwiaXRpbmVyYXJ5W2NvdW50cnlOYW1lXVwiIHN0eWxlPVwid2lkdGg6MjUwcHg7IG1hcmdpbi1yaWdodDogMjVweDtcIiByZXF1aXJlZD1cInJlcXVpcmVkXCIgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIj4nO1xyXG4gICAgY2FyZCArPSAnICAgPC9kaXY+JztcclxuXHJcbiAgICBjYXJkICs9ICcgICA8ZGl2Pic7XHJcbiAgICBjYXJkICs9ICcgICAgICAgPGxhYmVsIGZvcj1cIml0aW5lcmFyeV9jaXR5TmFtZVwiIGNsYXNzPVwicmVxdWlyZWRcIj5WaWxsZSA6IDwvbGFiZWw+JztcclxuICAgIGNhcmQgKz0gJyAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBpZD1cIml0aW5lcmFyeV9jaXR5TmFtZVwiIG5hbWU9XCJpdGluZXJhcnlbY2l0eU5hbWVdXCIgc3R5bGU9XCJ3aWR0aDoyNTBweDtcIiByZXF1aXJlZD1cInJlcXVpcmVkXCIgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIj4nO1xyXG4gICAgY2FyZCArPSAnICAgPC9kaXY+JztcclxuICAgIGNhcmQgKz0gJzwvZGl2Pic7XHJcblxyXG4gICAgLy8gY2FyZCArPSAnPGlucHV0IHR5cGU9XCJoaWRkZW5cIiBpZD1cIml0aW5lcmFyeV9fdG9rZW5cIiBuYW1lPVwiaXRpbmVyYXJ5W190b2tlbl1cIj4nO1xyXG4gICAgY2FyZCArPSAnPGlucHV0IHR5cGU9XCJoaWRkZW5cIiBuYW1lPVwiaXRpbmVyYXJ5W2lkX3RyYXZlbF1cIiB2YWx1ZT1cIicgKyBpZF90cmF2ZWwgKyAnXCI+JztcclxuICAgIGNhcmQgKz0gJzxpbnB1dCB0eXBlPVwiaGlkZGVuXCIgbmFtZT1cIml0aW5lcmFyeVtsYXRpdHVkZV1cIiA+JztcclxuICAgIGNhcmQgKz0gJzxpbnB1dCB0eXBlPVwiaGlkZGVuXCIgbmFtZT1cIml0aW5lcmFyeVtsb25naXR1ZGVdXCIgPic7XHJcblxyXG4gICAgY2FyZCArPSAnICAgPC9kaXY+JztcclxuXHJcbiAgICAvLyBjYXJkICs9ICcgICA8YnV0dG9uIGNsYXNzPVwiYnRuXCI+U2F1dmVnYXJkZXI8L2J1dHRvbj4nO1xyXG4gICAgY2FyZCArPSAnICAgPGlucHV0IHR5cGU9XCJzdWJtaXRcIiBuYW1lPVwic3VibWl0XCIgdmFsdWU9XCJTYXV2ZWdhcmRlclwiPic7XHJcbiAgICBjYXJkICs9ICcgPC9mb3JtPic7XHJcbiAgICBjYXJkICs9ICc8L2Rpdj4nO1xyXG4gICAgY2FyZCArPSAnPC9kaXY+JztcclxuXHJcbiAgICBtYXAub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICBncm91cE1hcmtlclNlYXJjaC5jbGVhckxheWVycygpO1xyXG4gICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgIHR5cGU6ICdHRVQnLFxyXG4gICAgICAgICAgICB1cmw6IFwiaHR0cDovL25vbWluYXRpbS5vcGVuc3RyZWV0bWFwLm9yZy9yZXZlcnNlXCIsXHJcbiAgICAgICAgICAgIGRhdGFUeXBlOiAnanNvbnAnLFxyXG4gICAgICAgICAgICBqc29ucENhbGxiYWNrOiAnZGF0YScsXHJcbiAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICAgIGZvcm1hdDogXCJqc29uXCIsXHJcbiAgICAgICAgICAgICAgICBsaW1pdDogMSxcclxuICAgICAgICAgICAgICAgIGxhdDogZS5sYXRsbmcubGF0LFxyXG4gICAgICAgICAgICAgICAgbG9uOiBlLmxhdGxuZy5sbmcsXHJcbiAgICAgICAgICAgICAgICBhZHJlc3NkZXRhaWxzOiAxLFxyXG4gICAgICAgICAgICAgICAganNvbl9jYWxsYmFjazogJ2RhdGEnXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGVycm9yOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBhbGVydCgnUHJvYmzDqG1lIGRlIHJlcXXDqHRlJyk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEuYWRkcmVzcyAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY291bnRyeSA9IGRhdGEuYWRkcmVzc1snY291bnRyeSddO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5hZGRyZXNzWydjaXR5J10gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjaXR5ID0gZGF0YS5hZGRyZXNzWydjaXR5J107XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChkYXRhLmFkZHJlc3NbJ2NvdW50eSddICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2l0eSA9IGRhdGEuYWRkcmVzc1snY291bnR5J107XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChkYXRhLmFkZHJlc3NbJ3N0YXRlJ10gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjaXR5ID0gZGF0YS5hZGRyZXNzWydzdGF0ZSddO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbGdNYXJrZXJzLmNsZWFyTGF5ZXJzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgbWFwLmFkZExheWVyKGxnTWFya2Vycyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIEwubWFya2VyKGUubGF0bG5nKS5hZGRUbyhsZ01hcmtlcnMpLmJpbmRQb3B1cChcIiBQYXlzIDogXCIgKyBjb3VudHJ5ICsgXCIgPGJyPiBWaWxsZSA6IFwiICsgY2l0eSkub3BlblBvcHVwKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjaGVja1ZhbGlkYXRpb25UcmlwKCkgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgkKFwiI3VuaXF1ZUFkZENhcmRcIikuYXR0cihcImNsYXNzXCIpID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoXCIjYmxvY19nbG9iYWxcIikuYXBwZW5kKGNhcmQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2tGb3JtKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAkKCBcIiN1bmlxdWVBZGRDYXJkXCIgKS5jc3MoXCJkaXNwbGF5XCIsIFwiYmxvY2tcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcuanMtZGF0ZXBpY2tlcicpLmRhdGVwaWNrZXIoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1hdDogXCJkZC9tbS95eXl5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXV0b2Nsb3NlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9yaWVudGF0aW9uOiBcImJvdHRvbVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgJChcImlucHV0W25hbWU9J2l0aW5lcmFyeVtjb3VudHJ5TmFtZV0nXVwiKS52YWwoY291bnRyeSk7XHJcbiAgICAgICAgICAgICAgICAgICAgJChcImlucHV0W25hbWU9J2l0aW5lcmFyeVtjaXR5TmFtZV0nXVwiKS52YWwoY2l0eSk7XHJcbiAgICAgICAgICAgICAgICAgICAgJChcImlucHV0W25hbWU9J2l0aW5lcmFyeVtsYXRpdHVkZV0nXVwiKS52YWwoZS5sYXRsbmcubGF0KTtcclxuICAgICAgICAgICAgICAgICAgICAkKFwiaW5wdXRbbmFtZT0naXRpbmVyYXJ5W2xvbmdpdHVkZV0nXVwiKS52YWwoZS5sYXRsbmcubG5nKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGZ1bmN0aW9uIGNoZWNrRm9ybSgpIHtcclxuXHJcbiAgICAgICAgJChcImlucHV0W25hbWU9J3N1Ym1pdCddXCIpLmNsaWNrKGZ1bmN0aW9uIChlKSB7XHJcblxyXG4gICAgICAgICAgICB2YXIgc3RhcnQgPSAkKFwiI2l0aW5lcmFyeV9kZXBhcnR1cmVEYXRlXCIpLmRhdGVwaWNrZXIoXCJnZXREYXRlXCIpO1xyXG4gICAgICAgICAgICB2YXIgZW5kID0gJChcIiNpdGluZXJhcnlfYXJyaXZhbERhdGVcIikuZGF0ZXBpY2tlcihcImdldERhdGVcIik7XHJcblxyXG4gICAgICAgICAgICB2YXIgc3RhcnRfdHJhdmVsID0gJChcIi5zdGFydERhdGVUcmF2ZWxcIikuYXR0cignaWQnKTtcclxuICAgICAgICAgICAgdmFyIGVuZF90cmF2ZWwgPSAkKFwiLmVuZERhdGVUcmF2ZWxcIikuYXR0cignaWQnKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBmcm9tX3N0YXJ0ID0gc3RhcnRfdHJhdmVsLnNwbGl0KFwiL1wiKVxyXG4gICAgICAgICAgICB2YXIgc3RhcnRfdHJhdmVsX2ZpbmFsID0gbmV3IERhdGUoZnJvbV9zdGFydFsyXSwgZnJvbV9zdGFydFsxXSAtIDEsIGZyb21fc3RhcnRbMF0pXHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgdmFyIGZyb21fZW5kID0gZW5kX3RyYXZlbC5zcGxpdChcIi9cIilcclxuICAgICAgICAgICAgdmFyIGVuZF90cmF2ZWxfZmluYWwgPSBuZXcgRGF0ZShmcm9tX2VuZFsyXSwgZnJvbV9lbmRbMV0gLSAxLCBmcm9tX2VuZFswXSlcclxuXHJcbiAgICAgICAgICAgIHRvZGF5ID0gbmV3IERhdGUoKTtcclxuXHJcbiAgICAgICAgICAgIHZhciB0ZXN0X2RlcGFydHRyYXZlbF9kZXBhcnRpdGkgPSBteWZ1bmMoc3RhcnRfdHJhdmVsX2ZpbmFsLCBzdGFydCk7XHJcbiAgICAgICAgICAgIHZhciB0ZXN0X2RlcGFydHRyYXZlbF9lbmRpdGkgPSBteWZ1bmMoc3RhcnRfdHJhdmVsX2ZpbmFsLCBlbmQpO1xyXG4gICAgICAgICAgICB2YXIgdGVzdF9maW50cmF2ZWxfZGVwYXJ0aXRpID0gbXlmdW5jKHN0YXJ0LCBlbmRfdHJhdmVsX2ZpbmFsKTtcclxuICAgICAgICAgICAgdmFyIHRlc3RfZmludHJhdmVsX2VuZGl0aSA9IG15ZnVuYyhlbmQsIGVuZF90cmF2ZWxfZmluYWwpO1xyXG4gICAgICAgICAgICB2YXIgdGVzdF9qb3VyX2RlcGFydCA9IG15ZnVuYyh0b2RheSwgc3RhcnQpO1xyXG4gICAgICAgICAgICB2YXIgdGVzdF9qb3VyX2RlcGFydCA9IG15ZnVuYyh0b2RheSwgc3RhcnQpO1xyXG4gICAgICAgICAgICB2YXIgdGVzdF9qb3VyX3JldG91ciA9IG15ZnVuYyh0b2RheSwgZW5kKTtcclxuICAgICAgICAgICAgdmFyIHRlc3RfZGVwYXJ0X3JldG91ciA9IG15ZnVuYyhzdGFydCwgZW5kKTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0ZXN0X2RlcGFydHRyYXZlbF9kZXBhcnRpdGkgPCAwKSB7XHJcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICBhbGVydCgnQXR0ZW50aW9uICEgTGEgZGF0ZSBkZSBkw6lwYXJ0IGRlIGxcXCdpdGluw6lyYWlyZSBuZSBwZXV0IMOqdHJlIGFudMOpcmlldXIgw6AgY2VsbGUgZHUgZMOpcGFydCBkdSB2b3lhZ2UgIScpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRlc3RfZGVwYXJ0dHJhdmVsX2VuZGl0aSA8IDApIHtcclxuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgIGFsZXJ0KCdBdHRlbnRpb24gISBMYSBkYXRlIGRlIGZpbiBkZSBsXFwnaXRpbsOpcmFpcmUgbmUgcGV1dCDDqnRyZSBzdXDDqXJpZXVyIMOgIGNlbGxlIGRlIGxhIGZpbiBkdSB2b3lhZ2UgIScpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRlc3RfZmludHJhdmVsX2RlcGFydGl0aSA8IDApIHtcclxuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgIGFsZXJ0KCdBdHRlbnRpb24gISBMYSBkYXRlIGRlIGTDqXBhcnQgZGUgbFxcJ2l0aW7DqXJhaXJlIG5lIHBldXQgw6p0cmUgc3Vww6lyaWV1ciDDoCBjZWxsZSBkZSBsYSBmaW4gZHUgdm95YWdlICEnKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICh0ZXN0X2ZpbnRyYXZlbF9lbmRpdGkgPCAwKSB7XHJcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICBhbGVydCgnQXR0ZW50aW9uICEgTGEgZGF0ZSBkZSBmaW4gZGUgbFxcJ2l0aW7DqXJhaXJlIG5lIHBldXQgw6p0cmUgc3Vww6lyaWV1ciDDoCBjZWxsZSBkZSBsYSBmaW4gZHUgdm95YWdlICEnKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICh0ZXN0X2pvdXJfZGVwYXJ0IDw9IDApIHtcclxuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgIGFsZXJ0KCdBdHRlbnRpb24gISBMYSBkYXRlIGR1IGpvdXIgbmUgcGV1dCDDqnRyZSBhbnTDqXJpZXVyIMOgIGNlbGxlIGR1IGTDqXBhcnQgIScpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRlc3Rfam91cl9yZXRvdXIgPD0gMCkge1xyXG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgYWxlcnQoJ0F0dGVudGlvbiAhIExhIGRhdGUgZHUgcmV0b3VyIG5lIHBldXQgw6p0cmUgYW50w6lyaWV1ciDDoCBjZWxsZSBkdSBqb3VyICEnKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICh0ZXN0X2RlcGFydF9yZXRvdXIgPD0gMCkge1xyXG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgYWxlcnQoJ0F0dGVudGlvbiAhIExhIGRhdGUgZHUgcmV0b3VyIG5lIHBldXQgw6p0cmUgYW50w6lyaWV1ciDDoCBjZWxsZSBkdSBkw6lwYXJ0ICEnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGNoZWNrVmFsaWRhdGlvblRyaXAoKSB7XHJcbiAgICAgICAgdmFyIGVuZF90cmF2ZWwgPSAkKFwiLmVuZERhdGVUcmF2ZWxcIikuYXR0cignaWQnKTtcclxuICAgICAgICB2YXIgZnJvbV9lbmQgPSBlbmRfdHJhdmVsLnNwbGl0KFwiL1wiKTtcclxuICAgICAgICB2YXIgZW5kX3RyYXZlbF9maW5hbCA9IG5ldyBEYXRlKGZyb21fZW5kWzJdLCBmcm9tX2VuZFsxXSAtIDEsIGZyb21fZW5kWzBdKTtcclxuICAgICAgICByZXR1cm4gbXlmdW5jKG5ldyBEYXRlKCksIGVuZF90cmF2ZWxfZmluYWwpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIG15ZnVuYyhzdGFydCwgZW5kKSB7XHJcbiAgICAgICAgZGF5cyA9IChlbmQgLSBzdGFydCkgLyAoMTAwMCAqIDYwICogNjAgKiAyNCk7XHJcbiAgICAgICAgcmV0dXJuIE1hdGgucm91bmQoZGF5cyk7XHJcbiAgICB9XHJcblxyXG59Il0sInNvdXJjZVJvb3QiOiIifQ==