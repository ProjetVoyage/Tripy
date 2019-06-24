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
  searchControl.on('results', function (data) {
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
            groupMarkerSearch.addLayer(L.marker(latlgnData).bindPopup(" Pays : " + country + " <br> Ville : " + city).openPopup());
            $('.leaflet-marker-icon').trigger('click');
            $("input[name='itinerary[countryName]']").val(country);
            $("input[name='itinerary[cityName]']").val(city);
          }
        }
      });
    }
  }); // alert('Bienvenue ! Cliquez sur la map pour commencer à programmer votre itinéraire !');

  var url = window.location.href.split('/');
  var id_travel = url[4];

  function pointsArray() {
    var pointsArray = new Array();
    $(".card").each(function () {
      pointsArray.push(new L.LatLng($(this).attr('lat'), $(this).attr('lng')));
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
          console.log($("#uniqueAddCard").attr("class"));

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
  }); // $(".edit").click(function(e){
  //     e.preventDefault();
  //     var id_card = $(this).attr('id');
  //     $('#card'+id_card).css('display', 'none');
  //     $('#cardhidden'+id_card).css('display', 'block');
  // });
};

/***/ })

},[["./assets/js/map.js","runtime"]]]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvY3NzL21hcC5jc3M/ZGQ0NSIsIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvbWFwLmpzIl0sIm5hbWVzIjpbInJlcXVpcmUiLCJ3aW5kb3ciLCJvbmxvYWQiLCJtYXAiLCJMIiwic2V0VmlldyIsInRpbGVMYXllciIsImFkZFRvIiwic2VhcmNoQ29udHJvbCIsImVzcmkiLCJHZW9jb2RpbmciLCJnZW9zZWFyY2giLCJncm91cE1hcmtlclNlYXJjaCIsImxheWVyR3JvdXAiLCJsZ01hcmtlcnMiLCJMYXllckdyb3VwIiwib24iLCJkYXRhIiwiY2xlYXJMYXllcnMiLCJpIiwicmVzdWx0cyIsImxlbmd0aCIsImNvbnNvbGUiLCJsb2ciLCJsYXRsZ25EYXRhIiwibGF0bG5nIiwiJCIsImFqYXgiLCJ0eXBlIiwidXJsIiwiZGF0YVR5cGUiLCJqc29ucENhbGxiYWNrIiwiZm9ybWF0IiwibGltaXQiLCJsYXQiLCJsb24iLCJsbmciLCJhZHJlc3NkZXRhaWxzIiwianNvbl9jYWxsYmFjayIsImVycm9yIiwieGhyIiwiYWpheE9wdGlvbnMiLCJ0aHJvd25FcnJvciIsInN0YXR1cyIsImFsZXJ0Iiwic3VjY2VzcyIsImFkZHJlc3MiLCJ1bmRlZmluZWQiLCJjb3VudHJ5IiwiY2l0eSIsImFkZExheWVyIiwibWFya2VyIiwiYmluZFBvcHVwIiwib3BlblBvcHVwIiwidHJpZ2dlciIsInZhbCIsImxvY2F0aW9uIiwiaHJlZiIsInNwbGl0IiwiaWRfdHJhdmVsIiwicG9pbnRzQXJyYXkiLCJBcnJheSIsImVhY2giLCJwdXNoIiwiTGF0TG5nIiwiYXR0ciIsInRyYWpldCIsIlBvbHlsaW5lIiwiY2FyZCIsImUiLCJhcHBlbmQiLCJkYXRlcGlja2VyIiwiYXV0b2Nsb3NlIiwib3JpZW50YXRpb24iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLHVDOzs7Ozs7Ozs7OztBQ0FBQSxtQkFBTyxDQUFDLDRDQUFELENBQVA7O0FBRUFDLE1BQU0s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LGFBQWFKLE9BQWIsR0FBdUIsZ0JBQXZCLEdBQTBDQyxJQUF4RixFQUE4RkksU0FBOUY7QUFHQS9CLGlCQUFPLENBQUNDLEdBQVIsQ0FBWUcsQ0FBQyxDQUFFLGdCQUFGLENBQUQsQ0FBc0J1QyxJQUF0QixDQUEyQixPQUEzQixDQUFaOztBQUNBLGNBQUl2QyxDQUFDLENBQUUsZ0JBQUYsQ0FBRCxDQUFzQnVDLElBQXRCLENBQTJCLE9BQTNCLE1BQXdDbEIsU0FBNUMsRUFBdUQ7QUFDbkRyQixhQUFDLENBQUUsY0FBRixDQUFELENBQW9CNEMsTUFBcEIsQ0FBMkJGLElBQTNCLEVBRG1ELENBRW5EOztBQUNBMUMsYUFBQyxDQUFDLGdCQUFELENBQUQsQ0FBb0I2QyxVQUFwQixDQUErQjtBQUMzQnZDLG9CQUFNLEVBQUUsWUFEbUI7QUFFM0J3Qyx1QkFBUyxFQUFFLElBRmdCO0FBRzNCQyx5QkFBVyxFQUFFO0FBSGMsYUFBL0I7QUFLSDs7QUFFRC9DLFdBQUMsQ0FBRSxzQ0FBRixDQUFELENBQTRDNkIsR0FBNUMsQ0FBZ0RQLE9BQWhEO0FBQ0F0QixXQUFDLENBQUUsbUNBQUYsQ0FBRCxDQUF5QzZCLEdBQXpDLENBQTZDTixJQUE3QztBQUNBdkIsV0FBQyxDQUFFLG1DQUFGLENBQUQsQ0FBeUM2QixHQUF6QyxDQUE2Q2MsQ0FBQyxDQUFDNUMsTUFBRixDQUFTUyxHQUF0RDtBQUNBUixXQUFDLENBQUUsb0NBQUYsQ0FBRCxDQUEwQzZCLEdBQTFDLENBQThDYyxDQUFDLENBQUM1QyxNQUFGLENBQVNXLEdBQXZEO0FBRUg7QUFDVjtBQW5ERSxLQUFQO0FBcURHLEdBeERELEVBL0l3QixDQXlNeEI7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUgsQ0FqTkQsQyIsImZpbGUiOiJtYXAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW4iLCJyZXF1aXJlKCcuLi9jc3MvbWFwLmNzcycpO1xyXG5cclxud2luZG93Lm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICB2YXIgbWFwID0gTC5tYXAoJ21hcCcpLnNldFZpZXcoWzQ4LjgzMywgMi4zMzNdLCA2KTtcclxuXHJcbiAgICBMLnRpbGVMYXllcignaHR0cHM6Ly97c30udGlsZS5vcGVuc3RyZWV0bWFwLm9yZy97en0ve3h9L3t5fS5wbmcnKS5hZGRUbyhtYXApO1xyXG5cclxuICAgIHZhciBzZWFyY2hDb250cm9sID0gTC5lc3JpLkdlb2NvZGluZy5nZW9zZWFyY2goKS5hZGRUbyhtYXApO1xyXG5cclxuICAgIHZhciBncm91cE1hcmtlclNlYXJjaCA9IEwubGF5ZXJHcm91cCgpLmFkZFRvKG1hcCk7XHJcblxyXG4gICAgLy8gY3LDqWF0aW9uIGV0IGFqb3V0IGR1IExheWVyR3JvdXBcclxuICAgIGxnTWFya2VycyA9IG5ldyBMLkxheWVyR3JvdXAoKTtcclxuXHJcbiAgICBzZWFyY2hDb250cm9sLm9uKCdyZXN1bHRzJywgZnVuY3Rpb24oZGF0YSl7XHJcbiAgICAgICAgXHJcbiAgICAgICAgZ3JvdXBNYXJrZXJTZWFyY2guY2xlYXJMYXllcnMoKTtcclxuICAgICAgICBmb3IgKHZhciBpID0gZGF0YS5yZXN1bHRzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xyXG4gICAgICAgICAgICB2YXIgbGF0bGduRGF0YSA9IGRhdGEucmVzdWx0c1tpXS5sYXRsbmc7XHJcblxyXG4gICAgICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICAgICAgdHlwZTogJ0dFVCcsXHJcbiAgICAgICAgICAgICAgICB1cmw6IFwiaHR0cDovL25vbWluYXRpbS5vcGVuc3RyZWV0bWFwLm9yZy9yZXZlcnNlXCIsXHJcbiAgICAgICAgICAgICAgICBkYXRhVHlwZTogJ2pzb25wJyxcclxuICAgICAgICAgICAgICAgIGpzb25wQ2FsbGJhY2s6ICdkYXRhJyxcclxuICAgICAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICAgICAgICBmb3JtYXQ6IFwianNvblwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGxpbWl0OiAxLFxyXG4gICAgICAgICAgICAgICAgICAgIGxhdDogZGF0YS5yZXN1bHRzW2ldLmxhdGxuZy5sYXQsXHJcbiAgICAgICAgICAgICAgICAgICAgbG9uOiBkYXRhLnJlc3VsdHNbaV0ubGF0bG5nLmxuZyxcclxuICAgICAgICAgICAgICAgICAgICBhZHJlc3NkZXRhaWxzIDogMSxcclxuICAgICAgICAgICAgICAgICAgICBqc29uX2NhbGxiYWNrOiAnZGF0YSdcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBlcnJvcjogZnVuY3Rpb24oeGhyLCBhamF4T3B0aW9ucywgdGhyb3duRXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiggeGhyLnN0YXR1cyAhPT0gMjAwICl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFsZXJ0KCdQcm9ibMOobWUgZGUgcmVxdcOodGUnKTsgXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpe1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKCBkYXRhLmFkZHJlc3MgIT09IHVuZGVmaW5lZCApe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb3VudHJ5ID0gZGF0YS5hZGRyZXNzWydjb3VudHJ5J107XHJcbiAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoIGRhdGEuYWRkcmVzc1snY2l0eSddICE9PSB1bmRlZmluZWQgKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNpdHkgPSBkYXRhLmFkZHJlc3NbJ2NpdHknXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2UgaWYoIGRhdGEuYWRkcmVzc1snc3RhdGUnXSAhPT0gdW5kZWZpbmVkICl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaXR5ID0gZGF0YS5hZGRyZXNzWydzdGF0ZSddO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZ01hcmtlcnMuY2xlYXJMYXllcnMoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWFwLmFkZExheWVyKGxnTWFya2Vycyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBncm91cE1hcmtlclNlYXJjaC5hZGRMYXllcihMLm1hcmtlcihsYXRsZ25EYXRhKS5iaW5kUG9wdXAoXCIgUGF5cyA6IFwiICsgY291bnRyeSArIFwiIDxicj4gVmlsbGUgOiBcIiArIGNpdHkpLm9wZW5Qb3B1cCgpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJCgnLmxlYWZsZXQtbWFya2VyLWljb24nKS50cmlnZ2VyKCdjbGljaycpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKCBcImlucHV0W25hbWU9J2l0aW5lcmFyeVtjb3VudHJ5TmFtZV0nXVwiICkudmFsKGNvdW50cnkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKCBcImlucHV0W25hbWU9J2l0aW5lcmFyeVtjaXR5TmFtZV0nXVwiICkudmFsKGNpdHkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICBcclxuICAgIC8vIGFsZXJ0KCdCaWVudmVudWUgISBDbGlxdWV6IHN1ciBsYSBtYXAgcG91ciBjb21tZW5jZXIgw6AgcHJvZ3JhbW1lciB2b3RyZSBpdGluw6lyYWlyZSAhJyk7XHJcblxyXG4gICAgdmFyIHVybCA9IHdpbmRvdy5sb2NhdGlvbi5ocmVmLnNwbGl0KCcvJyk7XHJcbiAgICBcclxuICAgIHZhciBpZF90cmF2ZWwgPSB1cmxbNF07XHJcbiAgICBcclxuICAgIGZ1bmN0aW9uIHBvaW50c0FycmF5KCkge1xyXG4gICAgICAgIHZhciBwb2ludHNBcnJheSA9IG5ldyBBcnJheSgpO1xyXG4gICAgICAgIFxyXG4gICAgICAgICQoIFwiLmNhcmRcIiApLmVhY2goZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHBvaW50c0FycmF5LnB1c2gobmV3IEwuTGF0TG5nKCQodGhpcykuYXR0cignbGF0JyksJCh0aGlzKS5hdHRyKCdsbmcnKSkpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHJldHVybiBwb2ludHNBcnJheTtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgdHJhamV0ID0gbmV3IEwuUG9seWxpbmUocG9pbnRzQXJyYXkoKSk7XHJcbiAgICBtYXAuYWRkTGF5ZXIodHJhamV0KTtcclxuXHJcblxyXG4gICAgLy8gJC5hamF4KHtcclxuICAgIC8vICAgICB0eXBlOiAnUE9TVCcsXHJcbiAgICAvLyAgICAgdXJsOiBcIi90cmF2ZWxzL1wiK2lkX3RyYXZlbCtcIi9pdGluZXJhcmllc19hamF4L1wiLFxyXG4gICAgLy8gICAgIGRhdGE6IHtcclxuICAgIC8vICAgICAgICAgaWRfdHJhdmVsOiBpZF90cmF2ZWxcclxuICAgIC8vICAgICB9LFxyXG4gICAgLy8gICAgIGRhdGFUeXBlOiAnanNvbicsXHJcbiAgICAvLyAgICAgZXJyb3I6IGZ1bmN0aW9uKHhociwgYWpheE9wdGlvbnMsIHRocm93bkVycm9yKSB7XHJcbiAgICAvLyAgICAgICAgIGlmKCB4aHIuc3RhdHVzICE9PSAyMDAgKXtcclxuICAgIC8vICAgICAgICAgICAgIGFsZXJ0KCdQcm9ibMOobWUgZGUgcmVxdcOodGUnKTsgXHJcbiAgICAvLyAgICAgICAgIH1cclxuICAgIC8vICAgICB9LFxyXG4gICAgLy8gICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpe1xyXG4gICAgLy8gICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcclxuICAgIC8vICAgICB9XHJcbiAgICAvLyB9KTtcclxuXHJcbiAgICBcclxuICAgIHZhciBjYXJkID0gJzxkaXYgY2xhc3M9XCJjYXJkIHAtMFwiIGlkPVwidW5pcXVlQWRkQ2FyZFwiIHN0eWxlPVwicGFkZGluZy1ib3R0b206IDIwcHggIWltcG9ydGFudDtcIj4nO1xyXG4gICAgY2FyZCArPSAnIDxkaXYgY2xhc3M9XCJjYXJkLWJvZHkgcGItMFwiPic7XHJcbiAgICBjYXJkICs9ICcgPGZvcm0gbmFtZT1cIml0aW5lcmFyeVwiIG1ldGhvZD1cInBvc3RcIiBhY3Rpb249XCIvdHJhdmVscy8nK2lkX3RyYXZlbCsnL2l0aW5lcmFyaWVzL25ld0J5QWpheFwiID4nO1xyXG5cclxuICAgIGNhcmQgKz0gJzxkaXYgaWQ9XCJpdGluZXJhcnlcIiBzdHlsZT1cIm1hcmdpbi1ib3R0b206IDIycHg7XCI+JztcclxuXHJcbiAgICBjYXJkICs9ICcgPGRpdiBzdHlsZT1cImRpc3BsYXk6IGZsZXg7IG1hcmdpbi1ib3R0b206IDEwcHg7XCI+JztcclxuICAgIGNhcmQgKz0gJyAgIDxkaXY+JztcclxuICAgIGNhcmQgKz0gJyAgICAgICA8bGFiZWwgZm9yPVwiaXRpbmVyYXJ5X2RlcGFydHVyZURhdGVcIiBjbGFzcz1cInJlcXVpcmVkXCI+RGF0ZSBkZSBkw6lwYXJ0PC9sYWJlbD4nO1xyXG4gICAgY2FyZCArPSAnICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGlkPVwiaXRpbmVyYXJ5X2RlcGFydHVyZURhdGVcIiBuYW1lPVwiaXRpbmVyYXJ5W2RlcGFydHVyZURhdGVdXCIgc3R5bGU9XCJ3aWR0aDoxNTBweDsgbWFyZ2luLXJpZ2h0OiA1MHB4O1wiIHJlcXVpcmVkPVwicmVxdWlyZWRcIiBjbGFzcz1cImpzLWRhdGVwaWNrZXIgZm9ybS1jb250cm9sXCIgYXV0b2NvbXBsZXRlPVwib2ZmXCI+JztcclxuICAgIGNhcmQgKz0gJyAgICA8L2Rpdj4nO1xyXG5cclxuICAgIGNhcmQgKz0gJyAgICA8ZGl2Pic7XHJcbiAgICBjYXJkICs9ICcgICAgICAgIDxsYWJlbCBmb3I9XCJpdGluZXJhcnlfYXJyaXZhbERhdGVcIiBjbGFzcz1cInJlcXVpcmVkXCI+RGF0ZSBkXFwnYXJyaXbDqTwvbGFiZWw+JztcclxuICAgIGNhcmQgKz0gJyAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBpZD1cIml0aW5lcmFyeV9hcnJpdmFsRGF0ZVwiIG5hbWU9XCJpdGluZXJhcnlbYXJyaXZhbERhdGVdXCIgc3R5bGU9XCJ3aWR0aDoxNTBweDtcIiByZXF1aXJlZD1cInJlcXVpcmVkXCIgY2xhc3M9XCJqcy1kYXRlcGlja2VyIGZvcm0tY29udHJvbFwiIGF1dG9jb21wbGV0ZT1cIm9mZlwiPic7XHJcbiAgICBjYXJkICs9ICcgICAgPC9kaXY+JztcclxuICAgIGNhcmQgKz0gJzwvZGl2Pic7XHJcblxyXG4gICAgY2FyZCArPSAnIDxkaXYgc3R5bGU9XCJkaXNwbGF5OiBmbGV4O1wiPic7XHJcbiAgICBjYXJkICs9ICcgICAgPGRpdj4nO1xyXG4gICAgY2FyZCArPSAnICAgICAgIDxsYWJlbCBmb3I9XCJpdGluZXJhcnlfY291bnRyeU5hbWVcIiBjbGFzcz1cInJlcXVpcmVkXCI+UGF5cyA6IDwvbGFiZWw+JztcclxuICAgIGNhcmQgKz0gJyAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgaWQ9XCJpdGluZXJhcnlfY291bnRyeU5hbWVcIiBuYW1lPVwiaXRpbmVyYXJ5W2NvdW50cnlOYW1lXVwiIHN0eWxlPVwid2lkdGg6MjUwcHg7IG1hcmdpbi1yaWdodDogMjVweDtcIiByZXF1aXJlZD1cInJlcXVpcmVkXCIgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIj4nO1xyXG4gICAgY2FyZCArPSAnICAgPC9kaXY+JztcclxuXHJcbiAgICBjYXJkICs9ICcgICA8ZGl2Pic7XHJcbiAgICBjYXJkICs9ICcgICAgICAgPGxhYmVsIGZvcj1cIml0aW5lcmFyeV9jaXR5TmFtZVwiIGNsYXNzPVwicmVxdWlyZWRcIj5WaWxsZSA6IDwvbGFiZWw+JztcclxuICAgIGNhcmQgKz0gJyAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBpZD1cIml0aW5lcmFyeV9jaXR5TmFtZVwiIG5hbWU9XCJpdGluZXJhcnlbY2l0eU5hbWVdXCIgc3R5bGU9XCJ3aWR0aDoyNTBweDtcIiByZXF1aXJlZD1cInJlcXVpcmVkXCIgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIj4nO1xyXG4gICAgY2FyZCArPSAnICAgPC9kaXY+JztcclxuICAgIGNhcmQgKz0gJzwvZGl2Pic7XHJcblxyXG4gICAgLy8gY2FyZCArPSAnPGlucHV0IHR5cGU9XCJoaWRkZW5cIiBpZD1cIml0aW5lcmFyeV9fdG9rZW5cIiBuYW1lPVwiaXRpbmVyYXJ5W190b2tlbl1cIj4nO1xyXG4gICAgY2FyZCArPSAnPGlucHV0IHR5cGU9XCJoaWRkZW5cIiBuYW1lPVwiaXRpbmVyYXJ5W2lkX3RyYXZlbF1cIiB2YWx1ZT1cIicraWRfdHJhdmVsKydcIj4nO1xyXG4gICAgY2FyZCArPSAnPGlucHV0IHR5cGU9XCJoaWRkZW5cIiBuYW1lPVwiaXRpbmVyYXJ5W2xhdGl0dWRlXVwiID4nO1xyXG4gICAgY2FyZCArPSAnPGlucHV0IHR5cGU9XCJoaWRkZW5cIiBuYW1lPVwiaXRpbmVyYXJ5W2xvbmdpdHVkZV1cIiA+JztcclxuXHJcbiAgICBjYXJkICs9ICcgICA8L2Rpdj4nO1xyXG5cclxuICAgIC8vIGNhcmQgKz0gJyAgIDxidXR0b24gY2xhc3M9XCJidG5cIj5TYXV2ZWdhcmRlcjwvYnV0dG9uPic7XHJcbiAgICBjYXJkICs9ICcgICA8aW5wdXQgdHlwZT1cInN1Ym1pdFwiIHZhbHVlPVwiU2F1dmVnYXJkZXJcIj4nO1xyXG4gICAgY2FyZCArPSAnIDwvZm9ybT4nO1xyXG4gICAgY2FyZCArPSAnPC9kaXY+JztcclxuICAgIGNhcmQgKz0gJzwvZGl2Pic7XHJcbiAgICBcclxuXHJcbiAgICBtYXAub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgIGdyb3VwTWFya2VyU2VhcmNoLmNsZWFyTGF5ZXJzKCk7XHJcbiAgICAgICAgXHJcblx0XHQkLmFqYXgoe1xyXG5cdFx0ICAgIHR5cGU6ICdHRVQnLFxyXG5cdFx0ICAgIHVybDogXCJodHRwOi8vbm9taW5hdGltLm9wZW5zdHJlZXRtYXAub3JnL3JldmVyc2VcIixcclxuXHRcdCAgICBkYXRhVHlwZTogJ2pzb25wJyxcclxuXHRcdCAgICBqc29ucENhbGxiYWNrOiAnZGF0YScsXHJcbiAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICAgIGZvcm1hdDogXCJqc29uXCIsXHJcbiAgICAgICAgICAgICAgICBsaW1pdDogMSxcclxuICAgICAgICAgICAgICAgIGxhdDogZS5sYXRsbmcubGF0LFxyXG4gICAgICAgICAgICAgICAgbG9uOiBlLmxhdGxuZy5sbmcsXHJcbiAgICAgICAgICAgICAgICBhZHJlc3NkZXRhaWxzIDogMSxcclxuICAgICAgICAgICAgICAgIGpzb25fY2FsbGJhY2s6ICdkYXRhJ1xyXG4gICAgICAgICAgICB9LFxyXG5cdFx0ICAgIGVycm9yOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgYWxlcnQoJ1Byb2Jsw6htZSBkZSByZXF1w6h0ZScpOyB9LFxyXG5cdFx0ICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpe1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBpZiggZGF0YS5hZGRyZXNzICE9PSB1bmRlZmluZWQgKXtcclxuICAgICAgICAgICAgICAgICAgICBjb3VudHJ5ID0gZGF0YS5hZGRyZXNzWydjb3VudHJ5J107XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmKCBkYXRhLmFkZHJlc3NbJ2NpdHknXSAhPT0gdW5kZWZpbmVkICl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNpdHkgPSBkYXRhLmFkZHJlc3NbJ2NpdHknXTtcclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZSBpZiggZGF0YS5hZGRyZXNzWydjb3VudHknXSAhPT0gdW5kZWZpbmVkICl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNpdHkgPSBkYXRhLmFkZHJlc3NbJ2NvdW50eSddO1xyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNlIGlmKCBkYXRhLmFkZHJlc3NbJ3N0YXRlJ10gIT09IHVuZGVmaW5lZCApe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjaXR5ID0gZGF0YS5hZGRyZXNzWydzdGF0ZSddO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBsZ01hcmtlcnMuY2xlYXJMYXllcnMoKTtcclxuICAgICAgICAgICAgICAgICAgICBtYXAuYWRkTGF5ZXIobGdNYXJrZXJzKTtcclxuICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIEwubWFya2VyKGUubGF0bG5nKS5hZGRUbyhsZ01hcmtlcnMpLmJpbmRQb3B1cChcIiBQYXlzIDogXCIgKyBjb3VudHJ5ICsgXCIgPGJyPiBWaWxsZSA6IFwiICsgY2l0eSkub3BlblBvcHVwKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCQoIFwiI3VuaXF1ZUFkZENhcmRcIiApLmF0dHIoXCJjbGFzc1wiKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoICQoIFwiI3VuaXF1ZUFkZENhcmRcIiApLmF0dHIoXCJjbGFzc1wiKSA9PT0gdW5kZWZpbmVkICl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoIFwiI2Jsb2NfZ2xvYmFsXCIgKS5hcHBlbmQoY2FyZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICQoIFwiI3VuaXF1ZUFkZENhcmRcIiApLmNzcyhcImRpc3BsYXlcIiwgXCJibG9ja1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJCgnLmpzLWRhdGVwaWNrZXInKS5kYXRlcGlja2VyKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1hdDogXCJkZC9tbS95eXl5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdXRvY2xvc2U6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcmllbnRhdGlvbjogXCJib3R0b21cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICQoIFwiaW5wdXRbbmFtZT0naXRpbmVyYXJ5W2NvdW50cnlOYW1lXSddXCIgKS52YWwoY291bnRyeSk7XHJcbiAgICAgICAgICAgICAgICAgICAgJCggXCJpbnB1dFtuYW1lPSdpdGluZXJhcnlbY2l0eU5hbWVdJ11cIiApLnZhbChjaXR5KTtcclxuICAgICAgICAgICAgICAgICAgICAkKCBcImlucHV0W25hbWU9J2l0aW5lcmFyeVtsYXRpdHVkZV0nXVwiICkudmFsKGUubGF0bG5nLmxhdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgJCggXCJpbnB1dFtuYW1lPSdpdGluZXJhcnlbbG9uZ2l0dWRlXSddXCIgKS52YWwoZS5sYXRsbmcubG5nKTtcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIH1cclxuXHRcdCAgICB9XHJcblx0XHR9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vICQoXCIuZWRpdFwiKS5jbGljayhmdW5jdGlvbihlKXtcclxuICAgIC8vICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAvLyAgICAgdmFyIGlkX2NhcmQgPSAkKHRoaXMpLmF0dHIoJ2lkJyk7XHJcblxyXG4gICAgLy8gICAgICQoJyNjYXJkJytpZF9jYXJkKS5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xyXG4gICAgLy8gICAgICQoJyNjYXJkaGlkZGVuJytpZF9jYXJkKS5jc3MoJ2Rpc3BsYXknLCAnYmxvY2snKTtcclxuICAgIC8vIH0pO1xyXG5cclxufSJdLCJzb3VyY2VSb290IjoiIn0=