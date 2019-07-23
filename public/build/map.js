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

            if ($("#uniqueAddCard").attr("class") === undefined) {
              $("#bloc_global").append(card); // $( "#uniqueAddCard" ).css("display", "block");

              $('.js-datepicker').datepicker({
                format: "dd/mm/yyyy",
                autoclose: true,
                orientation: "bottom"
              });
            }

            L.marker(latlgnData).addTo(lgMarkers).bindPopup(" Pays : " + country + " <br> Ville : " + city).openPopup(); // groupMarkerSearch.addLayer(L.marker(latlgnData).bindPopup(" Pays : " + country + " <br> Ville : " + city).openPopup());
            // $('.leaflet-marker-icon').trigger('click');

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
  card += '</div>'; // card += '<input type="hidden" id="itinerary__token" name="itinerary[_token]">';

  card += '<input type="hidden" name="itinerary[id_travel]" value="' + id_travel + '">';
  card += '<input type="hidden" name="itinerary[latitude]" >';
  card += '<input type="hidden" name="itinerary[longitude]" >';
  card += '   </div>'; // card += '   <button class="btn">Sauvegarder</button>';

  card += '   <input type="submit" value="Sauvegarder">';
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

          if ($("#uniqueAddCard").attr("class") === undefined) {
            $("#bloc_global").append(card); // $( "#uniqueAddCard" ).css("display", "block");

            $('.js-datepicker').datepicker({
              format: "dd/mm/yyyy",
              autoclose: true,
              orientation: "bottom"
            });
          }

          $("input[name='itinerary[countryName]']").val(country);
          $("input[name='itinerary[cityName]']").val(city);
          $("input[name='itinerary[latitude]']").val(e.latlng.lat);
          $("input[name='itinerary[longitude]']").val(e.latlng.lng);
        }
      }
    });
  });
};

/***/ })

},[["./assets/js/map.js","runtime"]]]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvY3NzL21hcC5jc3M/ZGQ0NSIsIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvbWFwLmpzIl0sIm5hbWVzIjpbInJlcXVpcmUiLCJ3aW5kb3ciLCJvbmxvYWQiLCJtYXAiLCJMIiwic2V0VmlldyIsInRpbGVMYXllciIsImFkZFRvIiwic2VhcmNoQ29udHJvbCIsImVzcmkiLCJHZW9jb2RpbmciLCJnZW9zZWFyY2giLCJncm91cE1hcmtlclNlYXJjaCIsImxheWVyR3JvdXAiLCJsZ01hcmtlcnMiLCJMYXllckdyb3VwIiwiUG9seU1hcmtlcnMiLCJvbiIsImRhdGEiLCJjbGVhckxheWVycyIsImkiLCJyZXN1bHRzIiwibGVuZ3RoIiwibGF0bGduRGF0YSIsImxhdGxuZyIsImxhdFBvaW50IiwibGF0IiwibG5nUG9pbnQiLCJsbmciLCIkIiwiYWpheCIsInR5cGUiLCJ1cmwiLCJkYXRhVHlwZSIsImpzb25wQ2FsbGJhY2siLCJmb3JtYXQiLCJsaW1pdCIsImxvbiIsImFkcmVzc2RldGFpbHMiLCJqc29uX2NhbGxiYWNrIiwiZXJyb3IiLCJ4aHIiLCJhamF4T3B0aW9ucyIsInRocm93bkVycm9yIiwic3RhdHVzIiwiYWxlcnQiLCJzdWNjZXNzIiwiYWRkcmVzcyIsInVuZGVmaW5lZCIsImNvdW50cnkiLCJjaXR5IiwiYWRkTGF5ZXIiLCJhdHRyIiwiYXBwZW5kIiwiY2FyZCIsImRhdGVwaWNrZXIiLCJhdXRvY2xvc2UiLCJvcmllbnRhdGlvbiIsIm1hcmtlciIsImJpbmRQb3B1cCIsIm9wZW5Qb3B1cCIsInZhbCIsImxvY2F0aW9uIiwiaHJlZiIsInNwbGl0IiwiaWRfdHJhdmVsIiwicG9pbnRzQXJyYXkiLCJBcnJheSIsImVhY2giLCJwdXNoIiwiTGF0TG5nIiwidHJhamV0IiwiUG9seWxpbmUiLCJlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSx1Qzs7Ozs7Ozs7Ozs7QUNBQUEsbUJBQU8sQ0FBQyw0Q0FBRCxDQUFQOztB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RG5CLGFBQUMsQ0FBQyxjQUFELENBQUQsQ0FBa0J3QixNQUFsQixDQUF5QkMsSUFBekIsRUFEaUQsQ0FFakQ7O0FBQ0F6QixhQUFDLENBQUMsZ0JBQUQsQ0FBRCxDQUFvQjBCLFVBQXBCLENBQStCO0FBQzNCcEIsb0JBQU0sRUFBRSxZQURtQjtBQUUzQnFCLHVCQUFTLEVBQUUsSUFGZ0I7QUFHM0JDLHlCQUFXLEVBQUU7QUFIYyxhQUEvQjtBQUtIOztBQUVENUIsV0FBQyxDQUFDLHNDQUFELENBQUQsQ0FBMENnQyxHQUExQyxDQUE4Q1osT0FBOUM7QUFDQXBCLFdBQUMsQ0FBQyxtQ0FBRCxDQUFELENBQXVDZ0MsR0FBdkMsQ0FBMkNYLElBQTNDO0FBQ0FyQixXQUFDLENBQUMsbUNBQUQsQ0FBRCxDQUF1Q2dDLEdBQXZDLENBQTJDWSxDQUFDLENBQUNqRCxNQUFGLENBQVNFLEdBQXBEO0FBQ0FHLFdBQUMsQ0FBQyxvQ0FBRCxDQUFELENBQXdDZ0MsR0FBeEMsQ0FBNENZLENBQUMsQ0FBQ2pELE1BQUYsQ0FBU0ksR0FBckQ7QUFFSDtBQUNKO0FBbERFLEtBQVA7QUFvREgsR0F0REQ7QUF1REgsQ0FwTkQsQyIsImZpbGUiOiJtYXAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW4iLCJyZXF1aXJlKCcuLi9jc3MvbWFwLmNzcycpO1xyXG5cclxud2luZG93Lm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgIHZhciBtYXAgPSBMLm1hcCgnbWFwJykuc2V0VmlldyhbNDguODMzLCAyLjMzM10sIDYpO1xyXG5cclxuICAgIEwudGlsZUxheWVyKCdodHRwczovL3tzfS50aWxlLm9wZW5zdHJlZXRtYXAub3JnL3t6fS97eH0ve3l9LnBuZycpLmFkZFRvKG1hcCk7XHJcblxyXG4gICAgdmFyIHNlYXJjaENvbnRyb2wgPSBMLmVzcmkuR2VvY29kaW5nLmdlb3NlYXJjaCgpLmFkZFRvKG1hcCk7XHJcblxyXG4gICAgdmFyIGdyb3VwTWFya2VyU2VhcmNoID0gTC5sYXllckdyb3VwKCkuYWRkVG8obWFwKTtcclxuXHJcbiAgICAvLyBjcsOpYXRpb24gZXQgYWpvdXQgZHUgTGF5ZXJHcm91cFxyXG4gICAgbGdNYXJrZXJzID0gbmV3IEwuTGF5ZXJHcm91cCgpO1xyXG4gICAgUG9seU1hcmtlcnMgPSBuZXcgTC5MYXllckdyb3VwKCk7XHJcblxyXG4gICAgc2VhcmNoQ29udHJvbC5vbigncmVzdWx0cycsIGZ1bmN0aW9uKGRhdGEpIHtcclxuXHJcbiAgICAgICAgZ3JvdXBNYXJrZXJTZWFyY2guY2xlYXJMYXllcnMoKTtcclxuICAgICAgICBmb3IgKHZhciBpID0gZGF0YS5yZXN1bHRzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XHJcbiAgICAgICAgICAgIHZhciBsYXRsZ25EYXRhID0gZGF0YS5yZXN1bHRzW2ldLmxhdGxuZztcclxuICAgICAgICAgICAgdmFyIGxhdFBvaW50ID0gZGF0YS5yZXN1bHRzW2ldLmxhdGxuZy5sYXQ7XHJcbiAgICAgICAgICAgIHZhciBsbmdQb2ludCA9IGRhdGEucmVzdWx0c1tpXS5sYXRsbmcubG5nO1xyXG4gICAgICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICAgICAgdHlwZTogJ0dFVCcsXHJcbiAgICAgICAgICAgICAgICB1cmw6IFwiaHR0cDovL25vbWluYXRpbS5vcGVuc3RyZWV0bWFwLm9yZy9yZXZlcnNlXCIsXHJcbiAgICAgICAgICAgICAgICBkYXRhVHlwZTogJ2pzb25wJyxcclxuICAgICAgICAgICAgICAgIGpzb25wQ2FsbGJhY2s6ICdkYXRhJyxcclxuICAgICAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICAgICAgICBmb3JtYXQ6IFwianNvblwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGxpbWl0OiAxLFxyXG4gICAgICAgICAgICAgICAgICAgIGxhdDogZGF0YS5yZXN1bHRzW2ldLmxhdGxuZy5sYXQsXHJcbiAgICAgICAgICAgICAgICAgICAgbG9uOiBkYXRhLnJlc3VsdHNbaV0ubGF0bG5nLmxuZyxcclxuICAgICAgICAgICAgICAgICAgICBhZHJlc3NkZXRhaWxzOiAxLFxyXG4gICAgICAgICAgICAgICAgICAgIGpzb25fY2FsbGJhY2s6ICdkYXRhJ1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGVycm9yOiBmdW5jdGlvbih4aHIsIGFqYXhPcHRpb25zLCB0aHJvd25FcnJvcikge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh4aHIuc3RhdHVzICE9PSAyMDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWxlcnQoJ1Byb2Jsw6htZSBkZSByZXF1w6h0ZScpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuYWRkcmVzcyAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvdW50cnkgPSBkYXRhLmFkZHJlc3NbJ2NvdW50cnknXTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmFkZHJlc3NbJ2NpdHknXSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaXR5ID0gZGF0YS5hZGRyZXNzWydjaXR5J107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZGF0YS5hZGRyZXNzWydzdGF0ZSddICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNpdHkgPSBkYXRhLmFkZHJlc3NbJ3N0YXRlJ107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxnTWFya2Vycy5jbGVhckxheWVycygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXAuYWRkTGF5ZXIobGdNYXJrZXJzKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgkKFwiI3VuaXF1ZUFkZENhcmRcIikuYXR0cihcImNsYXNzXCIpID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoXCIjYmxvY19nbG9iYWxcIikuYXBwZW5kKGNhcmQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gJCggXCIjdW5pcXVlQWRkQ2FyZFwiICkuY3NzKFwiZGlzcGxheVwiLCBcImJsb2NrXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnLmpzLWRhdGVwaWNrZXInKS5kYXRlcGlja2VyKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JtYXQ6IFwiZGQvbW0veXl5eVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF1dG9jbG9zZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcmllbnRhdGlvbjogXCJib3R0b21cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEwubWFya2VyKGxhdGxnbkRhdGEpLmFkZFRvKGxnTWFya2VycykuYmluZFBvcHVwKFwiIFBheXMgOiBcIiArIGNvdW50cnkgKyBcIiA8YnI+IFZpbGxlIDogXCIgKyBjaXR5KS5vcGVuUG9wdXAoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gZ3JvdXBNYXJrZXJTZWFyY2guYWRkTGF5ZXIoTC5tYXJrZXIobGF0bGduRGF0YSkuYmluZFBvcHVwKFwiIFBheXMgOiBcIiArIGNvdW50cnkgKyBcIiA8YnI+IFZpbGxlIDogXCIgKyBjaXR5KS5vcGVuUG9wdXAoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICQoJy5sZWFmbGV0LW1hcmtlci1pY29uJykudHJpZ2dlcignY2xpY2snKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJChcImlucHV0W25hbWU9J2l0aW5lcmFyeVtjb3VudHJ5TmFtZV0nXVwiKS52YWwoY291bnRyeSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoXCJpbnB1dFtuYW1lPSdpdGluZXJhcnlbY2l0eU5hbWVdJ11cIikudmFsKGNpdHkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKFwiaW5wdXRbbmFtZT0naXRpbmVyYXJ5W2xhdGl0dWRlXSddXCIpLnZhbChsYXRQb2ludCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoXCJpbnB1dFtuYW1lPSdpdGluZXJhcnlbbG9uZ2l0dWRlXSddXCIpLnZhbChsbmdQb2ludCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICB2YXIgdXJsID0gd2luZG93LmxvY2F0aW9uLmhyZWYuc3BsaXQoJy8nKTtcclxuXHJcbiAgICB2YXIgaWRfdHJhdmVsID0gdXJsWzRdO1xyXG5cclxuICAgIGZ1bmN0aW9uIHBvaW50c0FycmF5KCkge1xyXG4gICAgICAgIHZhciBwb2ludHNBcnJheSA9IG5ldyBBcnJheSgpO1xyXG5cclxuICAgICAgICBQb2x5TWFya2Vycy5jbGVhckxheWVycygpO1xyXG4gICAgICAgIG1hcC5hZGRMYXllcihQb2x5TWFya2Vycyk7XHJcblxyXG4gICAgICAgICQoXCIuY2FyZFwiKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBwb2ludHNBcnJheS5wdXNoKG5ldyBMLkxhdExuZygkKHRoaXMpLmF0dHIoJ2xhdCcpLCAkKHRoaXMpLmF0dHIoJ2xuZycpKSk7XHJcbiAgICAgICAgICAgIEwubWFya2VyKG5ldyBMLkxhdExuZygkKHRoaXMpLmF0dHIoJ2xhdCcpLCAkKHRoaXMpLmF0dHIoJ2xuZycpKSkuYWRkVG8oUG9seU1hcmtlcnMpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gcG9pbnRzQXJyYXk7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIHRyYWpldCA9IG5ldyBMLlBvbHlsaW5lKHBvaW50c0FycmF5KCkpO1xyXG4gICAgbWFwLmFkZExheWVyKHRyYWpldCk7XHJcblxyXG5cclxuICAgIC8vICQuYWpheCh7XHJcbiAgICAvLyAgICAgdHlwZTogJ1BPU1QnLFxyXG4gICAgLy8gICAgIHVybDogXCIvdHJhdmVscy9cIitpZF90cmF2ZWwrXCIvaXRpbmVyYXJpZXNfYWpheC9cIixcclxuICAgIC8vICAgICBkYXRhOiB7XHJcbiAgICAvLyAgICAgICAgIGlkX3RyYXZlbDogaWRfdHJhdmVsXHJcbiAgICAvLyAgICAgfSxcclxuICAgIC8vICAgICBkYXRhVHlwZTogJ2pzb24nLFxyXG4gICAgLy8gICAgIGVycm9yOiBmdW5jdGlvbih4aHIsIGFqYXhPcHRpb25zLCB0aHJvd25FcnJvcikge1xyXG4gICAgLy8gICAgICAgICBpZiggeGhyLnN0YXR1cyAhPT0gMjAwICl7XHJcbiAgICAvLyAgICAgICAgICAgICBhbGVydCgnUHJvYmzDqG1lIGRlIHJlcXXDqHRlJyk7IFxyXG4gICAgLy8gICAgICAgICB9XHJcbiAgICAvLyAgICAgfSxcclxuICAgIC8vICAgICBzdWNjZXNzOiBmdW5jdGlvbihkYXRhKXtcclxuICAgIC8vICAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XHJcbiAgICAvLyAgICAgfVxyXG4gICAgLy8gfSk7XHJcblxyXG5cclxuICAgIHZhciBjYXJkID0gJzxkaXYgY2xhc3M9XCJjYXJkIHAtMFwiIGlkPVwidW5pcXVlQWRkQ2FyZFwiIHN0eWxlPVwicGFkZGluZy1ib3R0b206IDIwcHggIWltcG9ydGFudDtcIj4nO1xyXG4gICAgY2FyZCArPSAnIDxkaXYgY2xhc3M9XCJjYXJkLWJvZHkgcGItMFwiPic7XHJcbiAgICBjYXJkICs9ICcgPGZvcm0gbmFtZT1cIml0aW5lcmFyeVwiIG1ldGhvZD1cInBvc3RcIiBhY3Rpb249XCIvdHJhdmVscy8nICsgaWRfdHJhdmVsICsgJy9pdGluZXJhcmllcy9uZXdCeUFqYXhcIiA+JztcclxuXHJcbiAgICBjYXJkICs9ICc8ZGl2IGlkPVwiaXRpbmVyYXJ5XCIgc3R5bGU9XCJtYXJnaW4tYm90dG9tOiAyMnB4O1wiPic7XHJcblxyXG4gICAgY2FyZCArPSAnIDxkaXYgc3R5bGU9XCJkaXNwbGF5OiBmbGV4OyBtYXJnaW4tYm90dG9tOiAxMHB4O1wiPic7XHJcbiAgICBjYXJkICs9ICcgICA8ZGl2Pic7XHJcbiAgICBjYXJkICs9ICcgICAgICAgPGxhYmVsIGZvcj1cIml0aW5lcmFyeV9kZXBhcnR1cmVEYXRlXCIgY2xhc3M9XCJyZXF1aXJlZFwiPkRhdGUgZGUgZMOpcGFydDwvbGFiZWw+JztcclxuICAgIGNhcmQgKz0gJyAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBpZD1cIml0aW5lcmFyeV9kZXBhcnR1cmVEYXRlXCIgbmFtZT1cIml0aW5lcmFyeVtkZXBhcnR1cmVEYXRlXVwiIHN0eWxlPVwid2lkdGg6MTUwcHg7IG1hcmdpbi1yaWdodDogNTBweDtcIiByZXF1aXJlZD1cInJlcXVpcmVkXCIgY2xhc3M9XCJqcy1kYXRlcGlja2VyIGZvcm0tY29udHJvbFwiIGF1dG9jb21wbGV0ZT1cIm9mZlwiPic7XHJcbiAgICBjYXJkICs9ICcgICAgPC9kaXY+JztcclxuXHJcbiAgICBjYXJkICs9ICcgICAgPGRpdj4nO1xyXG4gICAgY2FyZCArPSAnICAgICAgICA8bGFiZWwgZm9yPVwiaXRpbmVyYXJ5X2Fycml2YWxEYXRlXCIgY2xhc3M9XCJyZXF1aXJlZFwiPkRhdGUgZFxcJ2Fycml2w6k8L2xhYmVsPic7XHJcbiAgICBjYXJkICs9ICcgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgaWQ9XCJpdGluZXJhcnlfYXJyaXZhbERhdGVcIiBuYW1lPVwiaXRpbmVyYXJ5W2Fycml2YWxEYXRlXVwiIHN0eWxlPVwid2lkdGg6MTUwcHg7XCIgcmVxdWlyZWQ9XCJyZXF1aXJlZFwiIGNsYXNzPVwianMtZGF0ZXBpY2tlciBmb3JtLWNvbnRyb2xcIiBhdXRvY29tcGxldGU9XCJvZmZcIj4nO1xyXG4gICAgY2FyZCArPSAnICAgIDwvZGl2Pic7XHJcbiAgICBjYXJkICs9ICc8L2Rpdj4nO1xyXG5cclxuICAgIGNhcmQgKz0gJyA8ZGl2IHN0eWxlPVwiZGlzcGxheTogZmxleDtcIj4nO1xyXG4gICAgY2FyZCArPSAnICAgIDxkaXY+JztcclxuICAgIGNhcmQgKz0gJyAgICAgICA8bGFiZWwgZm9yPVwiaXRpbmVyYXJ5X2NvdW50cnlOYW1lXCIgY2xhc3M9XCJyZXF1aXJlZFwiPlBheXMgOiA8L2xhYmVsPic7XHJcbiAgICBjYXJkICs9ICcgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGlkPVwiaXRpbmVyYXJ5X2NvdW50cnlOYW1lXCIgbmFtZT1cIml0aW5lcmFyeVtjb3VudHJ5TmFtZV1cIiBzdHlsZT1cIndpZHRoOjI1MHB4OyBtYXJnaW4tcmlnaHQ6IDI1cHg7XCIgcmVxdWlyZWQ9XCJyZXF1aXJlZFwiIGNsYXNzPVwiZm9ybS1jb250cm9sXCI+JztcclxuICAgIGNhcmQgKz0gJyAgIDwvZGl2Pic7XHJcblxyXG4gICAgY2FyZCArPSAnICAgPGRpdj4nO1xyXG4gICAgY2FyZCArPSAnICAgICAgIDxsYWJlbCBmb3I9XCJpdGluZXJhcnlfY2l0eU5hbWVcIiBjbGFzcz1cInJlcXVpcmVkXCI+VmlsbGUgOiA8L2xhYmVsPic7XHJcbiAgICBjYXJkICs9ICcgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgaWQ9XCJpdGluZXJhcnlfY2l0eU5hbWVcIiBuYW1lPVwiaXRpbmVyYXJ5W2NpdHlOYW1lXVwiIHN0eWxlPVwid2lkdGg6MjUwcHg7XCIgcmVxdWlyZWQ9XCJyZXF1aXJlZFwiIGNsYXNzPVwiZm9ybS1jb250cm9sXCI+JztcclxuICAgIGNhcmQgKz0gJyAgIDwvZGl2Pic7XHJcbiAgICBjYXJkICs9ICc8L2Rpdj4nO1xyXG5cclxuICAgIC8vIGNhcmQgKz0gJzxpbnB1dCB0eXBlPVwiaGlkZGVuXCIgaWQ9XCJpdGluZXJhcnlfX3Rva2VuXCIgbmFtZT1cIml0aW5lcmFyeVtfdG9rZW5dXCI+JztcclxuICAgIGNhcmQgKz0gJzxpbnB1dCB0eXBlPVwiaGlkZGVuXCIgbmFtZT1cIml0aW5lcmFyeVtpZF90cmF2ZWxdXCIgdmFsdWU9XCInICsgaWRfdHJhdmVsICsgJ1wiPic7XHJcbiAgICBjYXJkICs9ICc8aW5wdXQgdHlwZT1cImhpZGRlblwiIG5hbWU9XCJpdGluZXJhcnlbbGF0aXR1ZGVdXCIgPic7XHJcbiAgICBjYXJkICs9ICc8aW5wdXQgdHlwZT1cImhpZGRlblwiIG5hbWU9XCJpdGluZXJhcnlbbG9uZ2l0dWRlXVwiID4nO1xyXG5cclxuICAgIGNhcmQgKz0gJyAgIDwvZGl2Pic7XHJcblxyXG4gICAgLy8gY2FyZCArPSAnICAgPGJ1dHRvbiBjbGFzcz1cImJ0blwiPlNhdXZlZ2FyZGVyPC9idXR0b24+JztcclxuICAgIGNhcmQgKz0gJyAgIDxpbnB1dCB0eXBlPVwic3VibWl0XCIgdmFsdWU9XCJTYXV2ZWdhcmRlclwiPic7XHJcbiAgICBjYXJkICs9ICcgPC9mb3JtPic7XHJcbiAgICBjYXJkICs9ICc8L2Rpdj4nO1xyXG4gICAgY2FyZCArPSAnPC9kaXY+JztcclxuXHJcbiAgICBtYXAub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgIGdyb3VwTWFya2VyU2VhcmNoLmNsZWFyTGF5ZXJzKCk7XHJcbiAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgdHlwZTogJ0dFVCcsXHJcbiAgICAgICAgICAgIHVybDogXCJodHRwOi8vbm9taW5hdGltLm9wZW5zdHJlZXRtYXAub3JnL3JldmVyc2VcIixcclxuICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29ucCcsXHJcbiAgICAgICAgICAgIGpzb25wQ2FsbGJhY2s6ICdkYXRhJyxcclxuICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgZm9ybWF0OiBcImpzb25cIixcclxuICAgICAgICAgICAgICAgIGxpbWl0OiAxLFxyXG4gICAgICAgICAgICAgICAgbGF0OiBlLmxhdGxuZy5sYXQsXHJcbiAgICAgICAgICAgICAgICBsb246IGUubGF0bG5nLmxuZyxcclxuICAgICAgICAgICAgICAgIGFkcmVzc2RldGFpbHM6IDEsXHJcbiAgICAgICAgICAgICAgICBqc29uX2NhbGxiYWNrOiAnZGF0YSdcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZXJyb3I6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgYWxlcnQoJ1Byb2Jsw6htZSBkZSByZXF1w6h0ZScpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihkYXRhKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEuYWRkcmVzcyAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY291bnRyeSA9IGRhdGEuYWRkcmVzc1snY291bnRyeSddO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5hZGRyZXNzWydjaXR5J10gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjaXR5ID0gZGF0YS5hZGRyZXNzWydjaXR5J107XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChkYXRhLmFkZHJlc3NbJ2NvdW50eSddICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2l0eSA9IGRhdGEuYWRkcmVzc1snY291bnR5J107XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChkYXRhLmFkZHJlc3NbJ3N0YXRlJ10gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjaXR5ID0gZGF0YS5hZGRyZXNzWydzdGF0ZSddO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbGdNYXJrZXJzLmNsZWFyTGF5ZXJzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgbWFwLmFkZExheWVyKGxnTWFya2Vycyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIEwubWFya2VyKGUubGF0bG5nKS5hZGRUbyhsZ01hcmtlcnMpLmJpbmRQb3B1cChcIiBQYXlzIDogXCIgKyBjb3VudHJ5ICsgXCIgPGJyPiBWaWxsZSA6IFwiICsgY2l0eSkub3BlblBvcHVwKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICgkKFwiI3VuaXF1ZUFkZENhcmRcIikuYXR0cihcImNsYXNzXCIpID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJChcIiNibG9jX2dsb2JhbFwiKS5hcHBlbmQoY2FyZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICQoIFwiI3VuaXF1ZUFkZENhcmRcIiApLmNzcyhcImRpc3BsYXlcIiwgXCJibG9ja1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJCgnLmpzLWRhdGVwaWNrZXInKS5kYXRlcGlja2VyKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1hdDogXCJkZC9tbS95eXl5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdXRvY2xvc2U6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcmllbnRhdGlvbjogXCJib3R0b21cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAkKFwiaW5wdXRbbmFtZT0naXRpbmVyYXJ5W2NvdW50cnlOYW1lXSddXCIpLnZhbChjb3VudHJ5KTtcclxuICAgICAgICAgICAgICAgICAgICAkKFwiaW5wdXRbbmFtZT0naXRpbmVyYXJ5W2NpdHlOYW1lXSddXCIpLnZhbChjaXR5KTtcclxuICAgICAgICAgICAgICAgICAgICAkKFwiaW5wdXRbbmFtZT0naXRpbmVyYXJ5W2xhdGl0dWRlXSddXCIpLnZhbChlLmxhdGxuZy5sYXQpO1xyXG4gICAgICAgICAgICAgICAgICAgICQoXCJpbnB1dFtuYW1lPSdpdGluZXJhcnlbbG9uZ2l0dWRlXSddXCIpLnZhbChlLmxhdGxuZy5sbmcpO1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbn0iXSwic291cmNlUm9vdCI6IiJ9