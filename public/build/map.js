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

  card += '   <input type="submit" name="submit" class="btn btn-primary" value="Sauvegarder">';
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
      } else if (test_jour_depart < 0) {
        e.preventDefault();
        alert('Attention ! La date du jour ne peut être antérieur à celle du départ !');
      } else if (test_jour_retour < 0) {
        e.preventDefault();
        alert('Attention ! La date du retour ne peut être antérieur à celle du jour !');
      } else if (test_depart_retour < 0) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvY3NzL21hcC5jc3MiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL21hcC5qcyJdLCJuYW1lcyI6WyJyZXF1aXJlIiwid2luZG93Iiwib25sb2FkIiwibWFwIiwiTCIsInNldFZpZXciLCJ0aWxlTGF5ZXIiLCJhZGRUbyIsInNlYXJjaENvbnRyb2wiLCJlc3JpIiwiR2VvY29kaW5nIiwiZ2Vvc2VhcmNoIiwiZ3JvdXBNYXJrZXJTZWFyY2giLCJsYXllckdyb3VwIiwibGdNYXJrZXJzIiwiTGF5ZXJHcm91cCIsIlBvbHlNYXJrZXJzIiwib24iLCJkYXRhIiwiY2xlYXJMYXllcnMiLCJpIiwicmVzdWx0cyIsImxlbmd0aCIsImxhdGxnbkRhdGEiLCJsYXRsbmciLCJsYXRQb2ludCIsImxhdCIsImxuZ1BvaW50IiwibG5nIiwiJCIsImFqYXgiLCJ0eXBlIiwidXJsIiwiZGF0YVR5cGUiLCJqc29ucENhbGxiYWNrIiwiZm9ybWF0IiwibGltaXQiLCJsb24iLCJhZHJlc3NkZXRhaWxzIiwianNvbl9jYWxsYmFjayIsImVycm9yIiwieGhyIiwiYWpheE9wdGlvbnMiLCJ0aHJvd25FcnJvciIsInN0YXR1cyIsImFsZXJ0Iiwic3VjY2VzcyIsImFkZHJlc3MiLCJ1bmRlZmluZWQiLCJjb3VudHJ5IiwiY2l0eSIsImFkZExheWVyIiwiY2hlY2tWYWxpZGF0aW9uVHJpcCIsImF0dHIiLCJhcHBlbmQiLCJjYXJkIiwiY2hlY2tGb3JtIiwiZGF0ZXBpY2tlciIsImF1dG9jbG9zZSIsIm9yaWVudGF0aW9uIiwibWFya2VyIiwiYmluZFBvcHVwIiwib3BlblBvcHVwIiwidmFsIiwibG9jYXRpb24iLCJocmVmIiwic3BsaXQiLCJpZF90cmF2ZWwiLCJwb2ludHNBcnJheSIsIkFycmF5IiwiZWFjaCIsInB1c2giLCJMYXRMbmciLCJ0cmFqZXQiLCJQb2x5bGluZSIsImUiLCJjbGljayIsInN0YXJ0IiwiZW5kIiwic3RhcnRfdHJhdmVsIiwiZW5kX3RyYXZlbCIsImZyb21fc3RhcnQiLCJzdGFydF90cmF2ZWxfZmluYWwiLCJEYXRlIiwiZnJvbV9lbmQiLCJlbmRfdHJhdmVsX2ZpbmFsIiwidG9kYXkiLCJ0ZXN0X2RlcGFydHRyYXZlbF9kZXBhcnRpdGkiLCJteWZ1bmMiLCJ0ZXN0X2RlcGFydHRyYXZlbF9lbmRpdGkiLCJ0ZXN0X2ZpbnRyYXZlbF9kZXBhcnRpdGkiLCJ0ZXN0X2ZpbnRyYXZlbF9lbmRpdGkiLCJ0ZXN0X2pvdXJfZGVwYXJ0IiwidGVzdF9qb3VyX3JldG91ciIsInRlc3RfZGVwYXJ0X3JldG91ciIsInByZXZlbnREZWZhdWx0IiwiZGF5cyIsIk1hdGgiLCJyb3VuZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsdUM7Ozs7Ozs7Ozs7O0FDQUFBLG1CQUFPLENBQUMsNENBQUQsQ0FBUDs7QUFFQUMsTUFBTSxDQUFDQyxNQUFQLEdBQWdCLFlBQVk7QUFFeEIsTUFBSUMsR0FBRyxHQUFHQyxDQUFDLENBQUNELEdBQUYsQ0FBTSxLQUFOLEVBQWFFLE9BQWIsQ0FBcUIsQ0FBQyxNQUFELEVBQVMsS0FBVCxDQUFyQixFQUFzQyxDQUF0QyxDQUFWO0FBRUFELEdBQUMsQ0FBQ0UsU0FBRixDQUFZLG9EQUFaLEVBQWtFQyxLQUFsRSxDQUF3RUosR0FBeEU7QUFFQSxNQUFJSyxhQUFhLEdBQUdKLENBQUMsQ0FBQ0ssSUFBRixDQUFPQyxTQUFQLENBQWlCQyxTQUFqQixHQUE2QkosS0FBN0IsQ0FBbUNKLEdBQW5DLENBQXBCO0FBRUEsTUFBSVMsaUJBQWlCLEdBQUdSLENBQUMsQ0FBQ1MsVUFBRixHQUFlTixLQUFmLENBQXFCSixHQUFyQixDQUF4QixDQVJ3QixDQVV4Qjs7QUFDQVcsV0FBUyxHQUFHLElBQUlWLENBQUMsQ0FBQ1csVUFBTixFQUFaO0FBQ0FDLGFBQVcsR0FBRyxJQUFJWixDQUFDLENBQUNXLFVBQU4sRUFBZDtBQUVBUCxlQUFhLENBQUNTLEVBQWQsQ0FBaUIsU0FBakIsRUFBNEIsVUFBVUMsSUFBVixFQUFnQjtBQUV4Q04s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YUFBSyxDQUFDLHdFQUFELENBQUw7QUFDSCxPQUhNLE1BR0EsSUFBSWdELGdCQUFnQixHQUFHLENBQXZCLEVBQTBCO0FBQzdCbEIsU0FBQyxDQUFDb0IsY0FBRjtBQUNBbEQsYUFBSyxDQUFDLHdFQUFELENBQUw7QUFDSCxPQUhNLE1BR0EsSUFBSWlELGtCQUFrQixHQUFHLENBQXpCLEVBQTRCO0FBQy9CbkIsU0FBQyxDQUFDb0IsY0FBRjtBQUNBbEQsYUFBSyxDQUFDLDBFQUFELENBQUw7QUFDSDtBQUNKLEtBL0NEO0FBZ0RIOztBQUVELFdBQVNPLG1CQUFULEdBQStCO0FBQzNCLFFBQUk0QixVQUFVLEdBQUduRCxDQUFDLENBQUMsZ0JBQUQsQ0FBRCxDQUFvQndCLElBQXBCLENBQXlCLElBQXpCLENBQWpCO0FBQ0EsUUFBSStCLFFBQVEsR0FBR0osVUFBVSxDQUFDZCxLQUFYLENBQWlCLEdBQWpCLENBQWY7QUFDQSxRQUFJbUIsZ0JBQWdCLEdBQUcsSUFBSUYsSUFBSixDQUFTQyxRQUFRLENBQUMsQ0FBRCxDQUFqQixFQUFzQkEsUUFBUSxDQUFDLENBQUQsQ0FBUixHQUFjLENBQXBDLEVBQXVDQSxRQUFRLENBQUMsQ0FBRCxDQUEvQyxDQUF2QjtBQUNBLFdBQU9JLE1BQU0sQ0FBQyxJQUFJTCxJQUFKLEVBQUQsRUFBYUUsZ0JBQWIsQ0FBYjtBQUNIOztBQUVELFdBQVNHLE1BQVQsQ0FBZ0JYLEtBQWhCLEVBQXVCQyxHQUF2QixFQUE0QjtBQUN4QmtCLFFBQUksR0FBRyxDQUFDbEIsR0FBRyxHQUFHRCxLQUFQLEtBQWlCLE9BQU8sRUFBUCxHQUFZLEVBQVosR0FBaUIsRUFBbEMsQ0FBUDtBQUNBLFdBQU9vQixJQUFJLENBQUNDLEtBQUwsQ0FBV0YsSUFBWCxDQUFQO0FBQ0g7QUFFSixDQTNSRCxDIiwiZmlsZSI6Im1hcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpbiIsInJlcXVpcmUoJy4uL2Nzcy9tYXAuY3NzJyk7XHJcblxyXG53aW5kb3cub25sb2FkID0gZnVuY3Rpb24gKCkge1xyXG5cclxuICAgIHZhciBtYXAgPSBMLm1hcCgnbWFwJykuc2V0VmlldyhbNDguODMzLCAyLjMzM10sIDYpO1xyXG5cclxuICAgIEwudGlsZUxheWVyKCdodHRwczovL3tzfS50aWxlLm9wZW5zdHJlZXRtYXAub3JnL3t6fS97eH0ve3l9LnBuZycpLmFkZFRvKG1hcCk7XHJcblxyXG4gICAgdmFyIHNlYXJjaENvbnRyb2wgPSBMLmVzcmkuR2VvY29kaW5nLmdlb3NlYXJjaCgpLmFkZFRvKG1hcCk7XHJcblxyXG4gICAgdmFyIGdyb3VwTWFya2VyU2VhcmNoID0gTC5sYXllckdyb3VwKCkuYWRkVG8obWFwKTtcclxuXHJcbiAgICAvLyBjcsOpYXRpb24gZXQgYWpvdXQgZHUgTGF5ZXJHcm91cFxyXG4gICAgbGdNYXJrZXJzID0gbmV3IEwuTGF5ZXJHcm91cCgpO1xyXG4gICAgUG9seU1hcmtlcnMgPSBuZXcgTC5MYXllckdyb3VwKCk7XHJcblxyXG4gICAgc2VhcmNoQ29udHJvbC5vbigncmVzdWx0cycsIGZ1bmN0aW9uIChkYXRhKSB7XHJcblxyXG4gICAgICAgIGdyb3VwTWFya2VyU2VhcmNoLmNsZWFyTGF5ZXJzKCk7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IGRhdGEucmVzdWx0cy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xyXG4gICAgICAgICAgICB2YXIgbGF0bGduRGF0YSA9IGRhdGEucmVzdWx0c1tpXS5sYXRsbmc7XHJcbiAgICAgICAgICAgIHZhciBsYXRQb2ludCA9IGRhdGEucmVzdWx0c1tpXS5sYXRsbmcubGF0O1xyXG4gICAgICAgICAgICB2YXIgbG5nUG9pbnQgPSBkYXRhLnJlc3VsdHNbaV0ubGF0bG5nLmxuZztcclxuICAgICAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgICAgIHR5cGU6ICdHRVQnLFxyXG4gICAgICAgICAgICAgICAgdXJsOiBcImh0dHA6Ly9ub21pbmF0aW0ub3BlbnN0cmVldG1hcC5vcmcvcmV2ZXJzZVwiLFxyXG4gICAgICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29ucCcsXHJcbiAgICAgICAgICAgICAgICBqc29ucENhbGxiYWNrOiAnZGF0YScsXHJcbiAgICAgICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9ybWF0OiBcImpzb25cIixcclxuICAgICAgICAgICAgICAgICAgICBsaW1pdDogMSxcclxuICAgICAgICAgICAgICAgICAgICBsYXQ6IGRhdGEucmVzdWx0c1tpXS5sYXRsbmcubGF0LFxyXG4gICAgICAgICAgICAgICAgICAgIGxvbjogZGF0YS5yZXN1bHRzW2ldLmxhdGxuZy5sbmcsXHJcbiAgICAgICAgICAgICAgICAgICAgYWRyZXNzZGV0YWlsczogMSxcclxuICAgICAgICAgICAgICAgICAgICBqc29uX2NhbGxiYWNrOiAnZGF0YSdcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBlcnJvcjogZnVuY3Rpb24gKHhociwgYWpheE9wdGlvbnMsIHRocm93bkVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHhoci5zdGF0dXMgIT09IDIwMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhbGVydCgnUHJvYmzDqG1lIGRlIHJlcXXDqHRlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuYWRkcmVzcyAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvdW50cnkgPSBkYXRhLmFkZHJlc3NbJ2NvdW50cnknXTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmFkZHJlc3NbJ2NpdHknXSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaXR5ID0gZGF0YS5hZGRyZXNzWydjaXR5J107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZGF0YS5hZGRyZXNzWydzdGF0ZSddICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNpdHkgPSBkYXRhLmFkZHJlc3NbJ3N0YXRlJ107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxnTWFya2Vycy5jbGVhckxheWVycygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXAuYWRkTGF5ZXIobGdNYXJrZXJzKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjaGVja1ZhbGlkYXRpb25UcmlwKCkgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoJChcIiN1bmlxdWVBZGRDYXJkXCIpLmF0dHIoXCJjbGFzc1wiKSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJChcIiNibG9jX2dsb2JhbFwiKS5hcHBlbmQoY2FyZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2tGb3JtKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gJCggXCIjdW5pcXVlQWRkQ2FyZFwiICkuY3NzKFwiZGlzcGxheVwiLCBcImJsb2NrXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJy5qcy1kYXRlcGlja2VyJykuZGF0ZXBpY2tlcih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1hdDogXCJkZC9tbS95eXl5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF1dG9jbG9zZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3JpZW50YXRpb246IFwiYm90dG9tXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEwubWFya2VyKGxhdGxnbkRhdGEpLmFkZFRvKGxnTWFya2VycykuYmluZFBvcHVwKFwiIFBheXMgOiBcIiArIGNvdW50cnkgKyBcIiA8YnI+IFZpbGxlIDogXCIgKyBjaXR5KS5vcGVuUG9wdXAoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoXCJpbnB1dFtuYW1lPSdpdGluZXJhcnlbY291bnRyeU5hbWVdJ11cIikudmFsKGNvdW50cnkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKFwiaW5wdXRbbmFtZT0naXRpbmVyYXJ5W2NpdHlOYW1lXSddXCIpLnZhbChjaXR5KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJChcImlucHV0W25hbWU9J2l0aW5lcmFyeVtsYXRpdHVkZV0nXVwiKS52YWwobGF0UG9pbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKFwiaW5wdXRbbmFtZT0naXRpbmVyYXJ5W2xvbmdpdHVkZV0nXVwiKS52YWwobG5nUG9pbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgdmFyIHVybCA9IHdpbmRvdy5sb2NhdGlvbi5ocmVmLnNwbGl0KCcvJyk7XHJcblxyXG4gICAgdmFyIGlkX3RyYXZlbCA9IHVybFs0XTtcclxuXHJcbiAgICBmdW5jdGlvbiBwb2ludHNBcnJheSgpIHtcclxuICAgICAgICB2YXIgcG9pbnRzQXJyYXkgPSBuZXcgQXJyYXkoKTtcclxuXHJcbiAgICAgICAgUG9seU1hcmtlcnMuY2xlYXJMYXllcnMoKTtcclxuICAgICAgICBtYXAuYWRkTGF5ZXIoUG9seU1hcmtlcnMpO1xyXG5cclxuICAgICAgICAkKFwiLmNhcmRcIikuZWFjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHBvaW50c0FycmF5LnB1c2gobmV3IEwuTGF0TG5nKCQodGhpcykuYXR0cignbGF0JyksICQodGhpcykuYXR0cignbG5nJykpKTtcclxuICAgICAgICAgICAgTC5tYXJrZXIobmV3IEwuTGF0TG5nKCQodGhpcykuYXR0cignbGF0JyksICQodGhpcykuYXR0cignbG5nJykpKS5hZGRUbyhQb2x5TWFya2Vycyk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiBwb2ludHNBcnJheTtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgdHJhamV0ID0gbmV3IEwuUG9seWxpbmUocG9pbnRzQXJyYXkoKSk7XHJcbiAgICBtYXAuYWRkTGF5ZXIodHJhamV0KTtcclxuXHJcblxyXG4gICAgLy8gJC5hamF4KHtcclxuICAgIC8vICAgICB0eXBlOiAnUE9TVCcsXHJcbiAgICAvLyAgICAgdXJsOiBcIi90cmF2ZWxzL1wiK2lkX3RyYXZlbCtcIi9pdGluZXJhcmllc19hamF4L1wiLFxyXG4gICAgLy8gICAgIGRhdGE6IHtcclxuICAgIC8vICAgICAgICAgaWRfdHJhdmVsOiBpZF90cmF2ZWxcclxuICAgIC8vICAgICB9LFxyXG4gICAgLy8gICAgIGRhdGFUeXBlOiAnanNvbicsXHJcbiAgICAvLyAgICAgZXJyb3I6IGZ1bmN0aW9uKHhociwgYWpheE9wdGlvbnMsIHRocm93bkVycm9yKSB7XHJcbiAgICAvLyAgICAgICAgIGlmKCB4aHIuc3RhdHVzICE9PSAyMDAgKXtcclxuICAgIC8vICAgICAgICAgICAgIGFsZXJ0KCdQcm9ibMOobWUgZGUgcmVxdcOodGUnKTsgXHJcbiAgICAvLyAgICAgICAgIH1cclxuICAgIC8vICAgICB9LFxyXG4gICAgLy8gICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpe1xyXG4gICAgLy8gICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcclxuICAgIC8vICAgICB9XHJcbiAgICAvLyB9KTtcclxuXHJcblxyXG4gICAgdmFyIGNhcmQgPSAnPGRpdiBjbGFzcz1cImNhcmQgcC0wXCIgaWQ9XCJ1bmlxdWVBZGRDYXJkXCIgc3R5bGU9XCJwYWRkaW5nLWJvdHRvbTogMjBweCAhaW1wb3J0YW50O1wiPic7XHJcbiAgICBjYXJkICs9ICcgPGRpdiBjbGFzcz1cImNhcmQtYm9keSBwYi0wXCI+JztcclxuICAgIGNhcmQgKz0gJyA8Zm9ybSBuYW1lPVwiaXRpbmVyYXJ5XCIgbWV0aG9kPVwicG9zdFwiIGFjdGlvbj1cIi90cmF2ZWxzLycgKyBpZF90cmF2ZWwgKyAnL2l0aW5lcmFyaWVzL25ld0J5QWpheFwiID4nO1xyXG5cclxuICAgIGNhcmQgKz0gJzxkaXYgaWQ9XCJpdGluZXJhcnlcIiBzdHlsZT1cIm1hcmdpbi1ib3R0b206IDIycHg7XCI+JztcclxuXHJcbiAgICBjYXJkICs9ICcgPGRpdiBzdHlsZT1cImRpc3BsYXk6IGZsZXg7IG1hcmdpbi1ib3R0b206IDEwcHg7XCI+JztcclxuICAgIGNhcmQgKz0gJyAgIDxkaXY+JztcclxuICAgIGNhcmQgKz0gJyAgICAgICA8bGFiZWwgZm9yPVwiaXRpbmVyYXJ5X2RlcGFydHVyZURhdGVcIiBjbGFzcz1cInJlcXVpcmVkXCI+RGF0ZSBkZSBkw6lwYXJ0IDogIDwvbGFiZWw+JztcclxuICAgIGNhcmQgKz0gJyAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBpZD1cIml0aW5lcmFyeV9kZXBhcnR1cmVEYXRlXCIgbmFtZT1cIml0aW5lcmFyeVtkZXBhcnR1cmVEYXRlXVwiIHN0eWxlPVwid2lkdGg6MTUwcHg7IG1hcmdpbi1yaWdodDogNTBweDtcIiByZXF1aXJlZD1cInJlcXVpcmVkXCIgY2xhc3M9XCJqcy1kYXRlcGlja2VyIGZvcm0tY29udHJvbFwiIGF1dG9jb21wbGV0ZT1cIm9mZlwiPic7XHJcbiAgICBjYXJkICs9ICcgICAgPC9kaXY+JztcclxuXHJcbiAgICBjYXJkICs9ICcgICAgPGRpdj4nO1xyXG4gICAgY2FyZCArPSAnICAgICAgICA8bGFiZWwgZm9yPVwiaXRpbmVyYXJ5X2Fycml2YWxEYXRlXCIgY2xhc3M9XCJyZXF1aXJlZFwiPkRhdGUgZGUgZmluIDo8L2xhYmVsPic7XHJcbiAgICBjYXJkICs9ICcgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgaWQ9XCJpdGluZXJhcnlfYXJyaXZhbERhdGVcIiBuYW1lPVwiaXRpbmVyYXJ5W2Fycml2YWxEYXRlXVwiIHN0eWxlPVwid2lkdGg6MTUwcHg7XCIgcmVxdWlyZWQ9XCJyZXF1aXJlZFwiIGNsYXNzPVwianMtZGF0ZXBpY2tlciBmb3JtLWNvbnRyb2xcIiBhdXRvY29tcGxldGU9XCJvZmZcIj4nO1xyXG4gICAgY2FyZCArPSAnICAgIDwvZGl2Pic7XHJcbiAgICBjYXJkICs9ICc8L2Rpdj4nO1xyXG5cclxuICAgIGNhcmQgKz0gJyA8ZGl2IHN0eWxlPVwiZGlzcGxheTogZmxleDtcIj4nO1xyXG4gICAgY2FyZCArPSAnICAgIDxkaXY+JztcclxuICAgIGNhcmQgKz0gJyAgICAgICA8bGFiZWwgZm9yPVwiaXRpbmVyYXJ5X2NvdW50cnlOYW1lXCIgY2xhc3M9XCJyZXF1aXJlZFwiPlBheXMgOiA8L2xhYmVsPic7XHJcbiAgICBjYXJkICs9ICcgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGlkPVwiaXRpbmVyYXJ5X2NvdW50cnlOYW1lXCIgbmFtZT1cIml0aW5lcmFyeVtjb3VudHJ5TmFtZV1cIiBzdHlsZT1cIndpZHRoOjI1MHB4OyBtYXJnaW4tcmlnaHQ6IDI1cHg7XCIgcmVxdWlyZWQ9XCJyZXF1aXJlZFwiIGNsYXNzPVwiZm9ybS1jb250cm9sXCI+JztcclxuICAgIGNhcmQgKz0gJyAgIDwvZGl2Pic7XHJcblxyXG4gICAgY2FyZCArPSAnICAgPGRpdj4nO1xyXG4gICAgY2FyZCArPSAnICAgICAgIDxsYWJlbCBmb3I9XCJpdGluZXJhcnlfY2l0eU5hbWVcIiBjbGFzcz1cInJlcXVpcmVkXCI+VmlsbGUgOiA8L2xhYmVsPic7XHJcbiAgICBjYXJkICs9ICcgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgaWQ9XCJpdGluZXJhcnlfY2l0eU5hbWVcIiBuYW1lPVwiaXRpbmVyYXJ5W2NpdHlOYW1lXVwiIHN0eWxlPVwid2lkdGg6MjUwcHg7XCIgcmVxdWlyZWQ9XCJyZXF1aXJlZFwiIGNsYXNzPVwiZm9ybS1jb250cm9sXCI+JztcclxuICAgIGNhcmQgKz0gJyAgIDwvZGl2Pic7XHJcbiAgICBjYXJkICs9ICc8L2Rpdj4nO1xyXG5cclxuICAgIC8vIGNhcmQgKz0gJzxpbnB1dCB0eXBlPVwiaGlkZGVuXCIgaWQ9XCJpdGluZXJhcnlfX3Rva2VuXCIgbmFtZT1cIml0aW5lcmFyeVtfdG9rZW5dXCI+JztcclxuICAgIGNhcmQgKz0gJzxpbnB1dCB0eXBlPVwiaGlkZGVuXCIgbmFtZT1cIml0aW5lcmFyeVtpZF90cmF2ZWxdXCIgdmFsdWU9XCInICsgaWRfdHJhdmVsICsgJ1wiPic7XHJcbiAgICBjYXJkICs9ICc8aW5wdXQgdHlwZT1cImhpZGRlblwiIG5hbWU9XCJpdGluZXJhcnlbbGF0aXR1ZGVdXCIgPic7XHJcbiAgICBjYXJkICs9ICc8aW5wdXQgdHlwZT1cImhpZGRlblwiIG5hbWU9XCJpdGluZXJhcnlbbG9uZ2l0dWRlXVwiID4nO1xyXG5cclxuICAgIGNhcmQgKz0gJyAgIDwvZGl2Pic7XHJcblxyXG4gICAgLy8gY2FyZCArPSAnICAgPGJ1dHRvbiBjbGFzcz1cImJ0blwiPlNhdXZlZ2FyZGVyPC9idXR0b24+JztcclxuICAgIGNhcmQgKz0gJyAgIDxpbnB1dCB0eXBlPVwic3VibWl0XCIgbmFtZT1cInN1Ym1pdFwiIGNsYXNzPVwiYnRuIGJ0bi1wcmltYXJ5XCIgdmFsdWU9XCJTYXV2ZWdhcmRlclwiPic7XHJcbiAgICBjYXJkICs9ICcgPC9mb3JtPic7XHJcbiAgICBjYXJkICs9ICc8L2Rpdj4nO1xyXG4gICAgY2FyZCArPSAnPC9kaXY+JztcclxuXHJcbiAgICBtYXAub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICBncm91cE1hcmtlclNlYXJjaC5jbGVhckxheWVycygpO1xyXG4gICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgIHR5cGU6ICdHRVQnLFxyXG4gICAgICAgICAgICB1cmw6IFwiaHR0cDovL25vbWluYXRpbS5vcGVuc3RyZWV0bWFwLm9yZy9yZXZlcnNlXCIsXHJcbiAgICAgICAgICAgIGRhdGFUeXBlOiAnanNvbnAnLFxyXG4gICAgICAgICAgICBqc29ucENhbGxiYWNrOiAnZGF0YScsXHJcbiAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICAgIGZvcm1hdDogXCJqc29uXCIsXHJcbiAgICAgICAgICAgICAgICBsaW1pdDogMSxcclxuICAgICAgICAgICAgICAgIGxhdDogZS5sYXRsbmcubGF0LFxyXG4gICAgICAgICAgICAgICAgbG9uOiBlLmxhdGxuZy5sbmcsXHJcbiAgICAgICAgICAgICAgICBhZHJlc3NkZXRhaWxzOiAxLFxyXG4gICAgICAgICAgICAgICAganNvbl9jYWxsYmFjazogJ2RhdGEnXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGVycm9yOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBhbGVydCgnUHJvYmzDqG1lIGRlIHJlcXXDqHRlJyk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEuYWRkcmVzcyAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY291bnRyeSA9IGRhdGEuYWRkcmVzc1snY291bnRyeSddO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5hZGRyZXNzWydjaXR5J10gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjaXR5ID0gZGF0YS5hZGRyZXNzWydjaXR5J107XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChkYXRhLmFkZHJlc3NbJ2NvdW50eSddICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2l0eSA9IGRhdGEuYWRkcmVzc1snY291bnR5J107XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChkYXRhLmFkZHJlc3NbJ3N0YXRlJ10gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjaXR5ID0gZGF0YS5hZGRyZXNzWydzdGF0ZSddO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbGdNYXJrZXJzLmNsZWFyTGF5ZXJzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgbWFwLmFkZExheWVyKGxnTWFya2Vycyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIEwubWFya2VyKGUubGF0bG5nKS5hZGRUbyhsZ01hcmtlcnMpLmJpbmRQb3B1cChcIiBQYXlzIDogXCIgKyBjb3VudHJ5ICsgXCIgPGJyPiBWaWxsZSA6IFwiICsgY2l0eSkub3BlblBvcHVwKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjaGVja1ZhbGlkYXRpb25UcmlwKCkgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgkKFwiI3VuaXF1ZUFkZENhcmRcIikuYXR0cihcImNsYXNzXCIpID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoXCIjYmxvY19nbG9iYWxcIikuYXBwZW5kKGNhcmQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2tGb3JtKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAkKCBcIiN1bmlxdWVBZGRDYXJkXCIgKS5jc3MoXCJkaXNwbGF5XCIsIFwiYmxvY2tcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcuanMtZGF0ZXBpY2tlcicpLmRhdGVwaWNrZXIoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1hdDogXCJkZC9tbS95eXl5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXV0b2Nsb3NlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9yaWVudGF0aW9uOiBcImJvdHRvbVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICQoXCJpbnB1dFtuYW1lPSdpdGluZXJhcnlbY291bnRyeU5hbWVdJ11cIikudmFsKGNvdW50cnkpO1xyXG4gICAgICAgICAgICAgICAgICAgICQoXCJpbnB1dFtuYW1lPSdpdGluZXJhcnlbY2l0eU5hbWVdJ11cIikudmFsKGNpdHkpO1xyXG4gICAgICAgICAgICAgICAgICAgICQoXCJpbnB1dFtuYW1lPSdpdGluZXJhcnlbbGF0aXR1ZGVdJ11cIikudmFsKGUubGF0bG5nLmxhdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgJChcImlucHV0W25hbWU9J2l0aW5lcmFyeVtsb25naXR1ZGVdJ11cIikudmFsKGUubGF0bG5nLmxuZyk7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBmdW5jdGlvbiBjaGVja0Zvcm0oKSB7XHJcblxyXG4gICAgICAgICQoXCJpbnB1dFtuYW1lPSdzdWJtaXQnXVwiKS5jbGljayhmdW5jdGlvbiAoZSkge1xyXG5cclxuICAgICAgICAgICAgdmFyIHN0YXJ0ID0gJChcIiNpdGluZXJhcnlfZGVwYXJ0dXJlRGF0ZVwiKS5kYXRlcGlja2VyKFwiZ2V0RGF0ZVwiKTtcclxuICAgICAgICAgICAgdmFyIGVuZCA9ICQoXCIjaXRpbmVyYXJ5X2Fycml2YWxEYXRlXCIpLmRhdGVwaWNrZXIoXCJnZXREYXRlXCIpO1xyXG5cclxuICAgICAgICAgICAgdmFyIHN0YXJ0X3RyYXZlbCA9ICQoXCIuc3RhcnREYXRlVHJhdmVsXCIpLmF0dHIoJ2lkJyk7XHJcbiAgICAgICAgICAgIHZhciBlbmRfdHJhdmVsID0gJChcIi5lbmREYXRlVHJhdmVsXCIpLmF0dHIoJ2lkJyk7XHJcblxyXG4gICAgICAgICAgICB2YXIgZnJvbV9zdGFydCA9IHN0YXJ0X3RyYXZlbC5zcGxpdChcIi9cIilcclxuICAgICAgICAgICAgdmFyIHN0YXJ0X3RyYXZlbF9maW5hbCA9IG5ldyBEYXRlKGZyb21fc3RhcnRbMl0sIGZyb21fc3RhcnRbMV0gLSAxLCBmcm9tX3N0YXJ0WzBdKVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdmFyIGZyb21fZW5kID0gZW5kX3RyYXZlbC5zcGxpdChcIi9cIilcclxuICAgICAgICAgICAgdmFyIGVuZF90cmF2ZWxfZmluYWwgPSBuZXcgRGF0ZShmcm9tX2VuZFsyXSwgZnJvbV9lbmRbMV0gLSAxLCBmcm9tX2VuZFswXSlcclxuXHJcbiAgICAgICAgICAgIHRvZGF5ID0gbmV3IERhdGUoKTtcclxuXHJcbiAgICAgICAgICAgIHZhciB0ZXN0X2RlcGFydHRyYXZlbF9kZXBhcnRpdGkgPSBteWZ1bmMoc3RhcnRfdHJhdmVsX2ZpbmFsLCBzdGFydCk7XHJcbiAgICAgICAgICAgIHZhciB0ZXN0X2RlcGFydHRyYXZlbF9lbmRpdGkgPSBteWZ1bmMoc3RhcnRfdHJhdmVsX2ZpbmFsLCBlbmQpO1xyXG4gICAgICAgICAgICB2YXIgdGVzdF9maW50cmF2ZWxfZGVwYXJ0aXRpID0gbXlmdW5jKHN0YXJ0LCBlbmRfdHJhdmVsX2ZpbmFsKTtcclxuICAgICAgICAgICAgdmFyIHRlc3RfZmludHJhdmVsX2VuZGl0aSA9IG15ZnVuYyhlbmQsIGVuZF90cmF2ZWxfZmluYWwpO1xyXG4gICAgICAgICAgICB2YXIgdGVzdF9qb3VyX2RlcGFydCA9IG15ZnVuYyh0b2RheSwgc3RhcnQpO1xyXG4gICAgICAgICAgICB2YXIgdGVzdF9qb3VyX2RlcGFydCA9IG15ZnVuYyh0b2RheSwgc3RhcnQpO1xyXG4gICAgICAgICAgICB2YXIgdGVzdF9qb3VyX3JldG91ciA9IG15ZnVuYyh0b2RheSwgZW5kKTtcclxuICAgICAgICAgICAgdmFyIHRlc3RfZGVwYXJ0X3JldG91ciA9IG15ZnVuYyhzdGFydCwgZW5kKTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0ZXN0X2RlcGFydHRyYXZlbF9kZXBhcnRpdGkgPCAwKSB7XHJcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICBhbGVydCgnQXR0ZW50aW9uICEgTGEgZGF0ZSBkZSBkw6lwYXJ0IGRlIGxcXCdpdGluw6lyYWlyZSBuZSBwZXV0IMOqdHJlIGFudMOpcmlldXIgw6AgY2VsbGUgZHUgZMOpcGFydCBkdSB2b3lhZ2UgIScpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRlc3RfZGVwYXJ0dHJhdmVsX2VuZGl0aSA8IDApIHtcclxuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgIGFsZXJ0KCdBdHRlbnRpb24gISBMYSBkYXRlIGRlIGZpbiBkZSBsXFwnaXRpbsOpcmFpcmUgbmUgcGV1dCDDqnRyZSBzdXDDqXJpZXVyIMOgIGNlbGxlIGRlIGxhIGZpbiBkdSB2b3lhZ2UgIScpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRlc3RfZmludHJhdmVsX2RlcGFydGl0aSA8IDApIHtcclxuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgIGFsZXJ0KCdBdHRlbnRpb24gISBMYSBkYXRlIGRlIGTDqXBhcnQgZGUgbFxcJ2l0aW7DqXJhaXJlIG5lIHBldXQgw6p0cmUgc3Vww6lyaWV1ciDDoCBjZWxsZSBkZSBsYSBmaW4gZHUgdm95YWdlICEnKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICh0ZXN0X2ZpbnRyYXZlbF9lbmRpdGkgPCAwKSB7XHJcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICBhbGVydCgnQXR0ZW50aW9uICEgTGEgZGF0ZSBkZSBmaW4gZGUgbFxcJ2l0aW7DqXJhaXJlIG5lIHBldXQgw6p0cmUgc3Vww6lyaWV1ciDDoCBjZWxsZSBkZSBsYSBmaW4gZHUgdm95YWdlICEnKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICh0ZXN0X2pvdXJfZGVwYXJ0IDwgMCkge1xyXG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgYWxlcnQoJ0F0dGVudGlvbiAhIExhIGRhdGUgZHUgam91ciBuZSBwZXV0IMOqdHJlIGFudMOpcmlldXIgw6AgY2VsbGUgZHUgZMOpcGFydCAhJyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGVzdF9qb3VyX3JldG91ciA8IDApIHtcclxuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgIGFsZXJ0KCdBdHRlbnRpb24gISBMYSBkYXRlIGR1IHJldG91ciBuZSBwZXV0IMOqdHJlIGFudMOpcmlldXIgw6AgY2VsbGUgZHUgam91ciAhJyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGVzdF9kZXBhcnRfcmV0b3VyIDwgMCkge1xyXG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgYWxlcnQoJ0F0dGVudGlvbiAhIExhIGRhdGUgZHUgcmV0b3VyIG5lIHBldXQgw6p0cmUgYW50w6lyaWV1ciDDoCBjZWxsZSBkdSBkw6lwYXJ0ICEnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGNoZWNrVmFsaWRhdGlvblRyaXAoKSB7XHJcbiAgICAgICAgdmFyIGVuZF90cmF2ZWwgPSAkKFwiLmVuZERhdGVUcmF2ZWxcIikuYXR0cignaWQnKTtcclxuICAgICAgICB2YXIgZnJvbV9lbmQgPSBlbmRfdHJhdmVsLnNwbGl0KFwiL1wiKTtcclxuICAgICAgICB2YXIgZW5kX3RyYXZlbF9maW5hbCA9IG5ldyBEYXRlKGZyb21fZW5kWzJdLCBmcm9tX2VuZFsxXSAtIDEsIGZyb21fZW5kWzBdKTtcclxuICAgICAgICByZXR1cm4gbXlmdW5jKG5ldyBEYXRlKCksIGVuZF90cmF2ZWxfZmluYWwpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIG15ZnVuYyhzdGFydCwgZW5kKSB7XHJcbiAgICAgICAgZGF5cyA9IChlbmQgLSBzdGFydCkgLyAoMTAwMCAqIDYwICogNjAgKiAyNCk7XHJcbiAgICAgICAgcmV0dXJuIE1hdGgucm91bmQoZGF5cyk7XHJcbiAgICB9XHJcblxyXG59Il0sInNvdXJjZVJvb3QiOiIifQ==