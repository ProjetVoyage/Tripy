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

          if ($("#uniqueAddCard").attr("class") == undefined) {
            $("#bloc_global").append(card);
            $('.js-datepicker').datepicker({
              format: "dd/mm/yyyy",
              autoclose: true,
              orientation: "bottom"
            });
          }

          $("input[name='itinerary[countryName]']").val(country);
          $("input[name='itinerary[cityName]']").val(city);
        }
      }
    });
  });
};

/***/ })

},[["./assets/js/map.js","runtime"]]]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvY3NzL21hcC5jc3MiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL21hcC5qcyJdLCJuYW1lcyI6WyJyZXF1aXJlIiwid2luZG93Iiwib25sb2FkIiwibWFwIiwiTCIsInNldFZpZXciLCJ0aWxlTGF5ZXIiLCJhZGRUbyIsInNlYXJjaENvbnRyb2wiLCJlc3JpIiwiR2VvY29kaW5nIiwiZ2Vvc2VhcmNoIiwiZ3JvdXBNYXJrZXJTZWFyY2giLCJsYXllckdyb3VwIiwibGdNYXJrZXJzIiwiTGF5ZXJHcm91cCIsIm9uIiwiZGF0YSIsImNsZWFyTGF5ZXJzIiwiaSIsInJlc3VsdHMiLCJsZW5ndGgiLCJjb25zb2xlIiwibG9nIiwibGF0bGduRGF0YSIsImxhdGxuZyIsIiQiLCJhamF4IiwidHlwZSIsInVybCIsImRhdGFUeXBlIiwianNvbnBDYWxsYmFjayIsImZvcm1hdCIsImxpbWl0IiwibGF0IiwibG9uIiwibG5nIiwiYWRyZXNzZGV0YWlscyIsImpzb25fY2FsbGJhY2siLCJlcnJvciIsInhociIsImFqYXhPcHRpb25zIiwidGhyb3duRXJyb3IiLCJzdGF0dXMiLCJhbGVydCIsInN1Y2Nlc3MiLCJhZGRyZXNzIiwidW5kZWZpbmVkIiwiY291bnRyeSIsImNpdHkiLCJhZGRMYXllciIsIm1hcmtlciIsImJpbmRQb3B1cCIsIm9wZW5Qb3B1cCIsInRyaWdnZXIiLCJ2YWwiLCJjYXJkIiwiZSIsImF0dHIiLCJhcHBlbmQiLCJkYXRlcGlja2VyIiwiYXV0b2Nsb3NlIiwib3JpZW50YXRpb24iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLHVDOzs7Ozs7Ozs7OztBQ0FBQSxtQkFBTyxDQUFDLDRDQUFELENBQVA7O0FBRUFDLE1BQU0sQ0FBQ0MsTUFBUCxHQUFnQixZQUFZO0FBRXhCLE1BQUlDLEdBQUcsR0FBR0MsQ0FBQyxDQUFDRCxHQUFGLENBQU0sS0FBTixFQUFhRSxPQUFiLENBQXFCLENBQUMsTUFBRCxFQUFTLEtBQVQs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TyxTQUF6QixFQUFvQ3NDLFNBQXBDLENBQThDLGFBQWFKLE9BQWIsR0FBdUIsZ0JBQXZCLEdBQTBDQyxJQUF4RixFQUE4RkksU0FBOUY7O0FBRUEsY0FBSTNCLENBQUMsQ0FBRSxnQkFBRixDQUFELENBQXNCZ0MsSUFBdEIsQ0FBMkIsT0FBM0IsS0FBdUNYLFNBQTNDLEVBQXNEO0FBQ2xEckIsYUFBQyxDQUFFLGNBQUYsQ0FBRCxDQUFvQmlDLE1BQXBCLENBQTJCSCxJQUEzQjtBQUNBOUIsYUFBQyxDQUFDLGdCQUFELENBQUQsQ0FBb0JrQyxVQUFwQixDQUErQjtBQUMzQjVCLG9CQUFNLEVBQUUsWUFEbUI7QUFFM0I2Qix1QkFBUyxFQUFFLElBRmdCO0FBRzNCQyx5QkFBVyxFQUFFO0FBSGMsYUFBL0I7QUFLSDs7QUFFRHBDLFdBQUMsQ0FBRSxzQ0FBRixDQUFELENBQTRDNkIsR0FBNUMsQ0FBZ0RQLE9BQWhEO0FBQ0F0QixXQUFDLENBQUUsbUNBQUYsQ0FBRCxDQUF5QzZCLEdBQXpDLENBQTZDTixJQUE3QztBQUVIO0FBQ1Y7QUE5Q0UsS0FBUDtBQWdERyxHQW5ERDtBQXFESCxDQTFKRCxDIiwiZmlsZSI6Im1hcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpbiIsInJlcXVpcmUoJy4uL2Nzcy9tYXAuY3NzJyk7XHJcblxyXG53aW5kb3cub25sb2FkID0gZnVuY3Rpb24gKCkge1xyXG4gICAgXHJcbiAgICB2YXIgbWFwID0gTC5tYXAoJ21hcCcpLnNldFZpZXcoWzQ4LjgzMywgMi4zMzNdLCA2KTtcclxuXHJcbiAgICBMLnRpbGVMYXllcignaHR0cHM6Ly97c30udGlsZS5vcGVuc3RyZWV0bWFwLm9yZy97en0ve3h9L3t5fS5wbmcnKS5hZGRUbyhtYXApO1xyXG5cclxuICAgIHZhciBzZWFyY2hDb250cm9sID0gTC5lc3JpLkdlb2NvZGluZy5nZW9zZWFyY2goKS5hZGRUbyhtYXApO1xyXG5cclxuICAgIHZhciBncm91cE1hcmtlclNlYXJjaCA9IEwubGF5ZXJHcm91cCgpLmFkZFRvKG1hcCk7XHJcblxyXG4gICAgLy8gY3LDqWF0aW9uIGV0IGFqb3V0IGR1IExheWVyR3JvdXBcclxuICAgIGxnTWFya2VycyA9IG5ldyBMLkxheWVyR3JvdXAoKTtcclxuXHJcbiAgICBzZWFyY2hDb250cm9sLm9uKCdyZXN1bHRzJywgZnVuY3Rpb24oZGF0YSl7XHJcbiAgICAgICAgXHJcbiAgICAgICAgZ3JvdXBNYXJrZXJTZWFyY2guY2xlYXJMYXllcnMoKTtcclxuICAgICAgICBmb3IgKHZhciBpID0gZGF0YS5yZXN1bHRzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xyXG4gICAgICAgICAgICB2YXIgbGF0bGduRGF0YSA9IGRhdGEucmVzdWx0c1tpXS5sYXRsbmc7XHJcblxyXG4gICAgICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICAgICAgdHlwZTogJ0dFVCcsXHJcbiAgICAgICAgICAgICAgICB1cmw6IFwiaHR0cDovL25vbWluYXRpbS5vcGVuc3RyZWV0bWFwLm9yZy9yZXZlcnNlXCIsXHJcbiAgICAgICAgICAgICAgICBkYXRhVHlwZTogJ2pzb25wJyxcclxuICAgICAgICAgICAgICAgIGpzb25wQ2FsbGJhY2s6ICdkYXRhJyxcclxuICAgICAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICAgICAgICBmb3JtYXQ6IFwianNvblwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGxpbWl0OiAxLFxyXG4gICAgICAgICAgICAgICAgICAgIGxhdDogZGF0YS5yZXN1bHRzW2ldLmxhdGxuZy5sYXQsXHJcbiAgICAgICAgICAgICAgICAgICAgbG9uOiBkYXRhLnJlc3VsdHNbaV0ubGF0bG5nLmxuZyxcclxuICAgICAgICAgICAgICAgICAgICBhZHJlc3NkZXRhaWxzIDogMSxcclxuICAgICAgICAgICAgICAgICAgICBqc29uX2NhbGxiYWNrOiAnZGF0YSdcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBlcnJvcjogZnVuY3Rpb24oeGhyLCBhamF4T3B0aW9ucywgdGhyb3duRXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiggeGhyLnN0YXR1cyAhPT0gMjAwICl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFsZXJ0KCdQcm9ibMOobWUgZGUgcmVxdcOodGUnKTsgXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpe1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKCBkYXRhLmFkZHJlc3MgIT09IHVuZGVmaW5lZCApe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb3VudHJ5ID0gZGF0YS5hZGRyZXNzWydjb3VudHJ5J107XHJcbiAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoIGRhdGEuYWRkcmVzc1snY2l0eSddICE9PSB1bmRlZmluZWQgKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNpdHkgPSBkYXRhLmFkZHJlc3NbJ2NpdHknXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2UgaWYoIGRhdGEuYWRkcmVzc1snc3RhdGUnXSAhPT0gdW5kZWZpbmVkICl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaXR5ID0gZGF0YS5hZGRyZXNzWydzdGF0ZSddO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZ01hcmtlcnMuY2xlYXJMYXllcnMoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWFwLmFkZExheWVyKGxnTWFya2Vycyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBncm91cE1hcmtlclNlYXJjaC5hZGRMYXllcihMLm1hcmtlcihsYXRsZ25EYXRhKS5iaW5kUG9wdXAoXCIgUGF5cyA6IFwiICsgY291bnRyeSArIFwiIDxicj4gVmlsbGUgOiBcIiArIGNpdHkpLm9wZW5Qb3B1cCgpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJCgnLmxlYWZsZXQtbWFya2VyLWljb24nKS50cmlnZ2VyKCdjbGljaycpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKCBcImlucHV0W25hbWU9J2l0aW5lcmFyeVtjb3VudHJ5TmFtZV0nXVwiICkudmFsKGNvdW50cnkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKCBcImlucHV0W25hbWU9J2l0aW5lcmFyeVtjaXR5TmFtZV0nXVwiICkudmFsKGNpdHkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICBcclxuICAgIHZhciBjYXJkID0gJzxkaXYgY2xhc3M9XCJjYXJkIHAtMFwiIGlkPVwidW5pcXVlQWRkQ2FyZFwiIHN0eWxlPVwicGFkZGluZy1ib3R0b206IDIwcHggIWltcG9ydGFudDtcIj4nO1xyXG4gICAgY2FyZCArPSAnIDxkaXYgY2xhc3M9XCJjYXJkLWJvZHkgcGItMFwiPic7XHJcbiAgICBjYXJkICs9ICcgPGZvcm0gbmFtZT1cIml0aW5lcmFyeVwiIG1ldGhvZD1cImdldFwiID4nO1xyXG5cclxuICAgIGNhcmQgKz0gJzxkaXYgaWQ9XCJpdGluZXJhcnlcIj4nO1xyXG5cclxuICAgIGNhcmQgKz0gJyA8ZGl2IHN0eWxlPVwiZGlzcGxheTogZmxleDtcIj4nO1xyXG4gICAgY2FyZCArPSAnICAgPGRpdj4nO1xyXG4gICAgY2FyZCArPSAnICAgICAgIDxsYWJlbCBmb3I9XCJpdGluZXJhcnlfZGVwYXJ0dXJlRGF0ZVwiIGNsYXNzPVwicmVxdWlyZWRcIj5EYXRlIGRlIGTDqXBhcnQ8L2xhYmVsPic7XHJcbiAgICBjYXJkICs9ICcgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgaWQ9XCJpdGluZXJhcnlfZGVwYXJ0dXJlRGF0ZVwiIG5hbWU9XCJpdGluZXJhcnlbZGVwYXJ0dXJlRGF0ZV1cIiBzdHlsZT1cIndpZHRoOjE1MHB4OyBtYXJnaW4tcmlnaHQ6IDUwcHg7XCIgcmVxdWlyZWQ9XCJyZXF1aXJlZFwiIGNsYXNzPVwianMtZGF0ZXBpY2tlciBmb3JtLWNvbnRyb2xcIiBhdXRvY29tcGxldGU9XCJvZmZcIj4nO1xyXG4gICAgY2FyZCArPSAnICAgIDwvZGl2Pic7XHJcblxyXG4gICAgY2FyZCArPSAnICAgIDxkaXY+JztcclxuICAgIGNhcmQgKz0gJyAgICAgICAgPGxhYmVsIGZvcj1cIml0aW5lcmFyeV9hcnJpdmFsRGF0ZVwiIGNsYXNzPVwicmVxdWlyZWRcIj5EYXRlIGRcXCdhcnJpdsOpPC9sYWJlbD4nO1xyXG4gICAgY2FyZCArPSAnICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGlkPVwiaXRpbmVyYXJ5X2Fycml2YWxEYXRlXCIgbmFtZT1cIml0aW5lcmFyeVthcnJpdmFsRGF0ZV1cIiBzdHlsZT1cIndpZHRoOjE1MHB4O1wiIHJlcXVpcmVkPVwicmVxdWlyZWRcIiBjbGFzcz1cImpzLWRhdGVwaWNrZXIgZm9ybS1jb250cm9sXCIgYXV0b2NvbXBsZXRlPVwib2ZmXCI+JztcclxuICAgIGNhcmQgKz0gJyAgICA8L2Rpdj4nO1xyXG4gICAgY2FyZCArPSAnPC9kaXY+JztcclxuXHJcbiAgICBjYXJkICs9ICcgPGRpdiBzdHlsZT1cImRpc3BsYXk6IGZsZXg7XCI+JztcclxuICAgIGNhcmQgKz0gJyAgICA8ZGl2Pic7XHJcbiAgICBjYXJkICs9ICcgICAgICAgPGxhYmVsIGZvcj1cIml0aW5lcmFyeV9jb3VudHJ5TmFtZVwiIGNsYXNzPVwicmVxdWlyZWRcIj5QYXlzIDogPC9sYWJlbD4nO1xyXG4gICAgY2FyZCArPSAnICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBpZD1cIml0aW5lcmFyeV9jb3VudHJ5TmFtZVwiIG5hbWU9XCJpdGluZXJhcnlbY291bnRyeU5hbWVdXCIgc3R5bGU9XCJ3aWR0aDoyNTBweDsgbWFyZ2luLXJpZ2h0OiAyNXB4O1wiIHJlcXVpcmVkPVwicmVxdWlyZWRcIiBjbGFzcz1cImZvcm0tY29udHJvbFwiPic7XHJcbiAgICBjYXJkICs9ICcgICA8L2Rpdj4nO1xyXG5cclxuICAgIGNhcmQgKz0gJyAgIDxkaXY+JztcclxuICAgIGNhcmQgKz0gJyAgICAgICA8bGFiZWwgZm9yPVwiaXRpbmVyYXJ5X2NpdHlOYW1lXCIgY2xhc3M9XCJyZXF1aXJlZFwiPlZpbGxlIDogPC9sYWJlbD4nO1xyXG4gICAgY2FyZCArPSAnICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGlkPVwiaXRpbmVyYXJ5X2NpdHlOYW1lXCIgbmFtZT1cIml0aW5lcmFyeVtjaXR5TmFtZV1cIiBzdHlsZT1cIndpZHRoOjI1MHB4O1wiIHJlcXVpcmVkPVwicmVxdWlyZWRcIiBjbGFzcz1cImZvcm0tY29udHJvbFwiPic7XHJcbiAgICBjYXJkICs9ICcgICA8L2Rpdj4nO1xyXG4gICAgY2FyZCArPSAnPC9kaXY+JztcclxuXHJcbiAgICBjYXJkICs9ICc8aW5wdXQgdHlwZT1cImhpZGRlblwiIGlkPVwiaXRpbmVyYXJ5X190b2tlblwiIG5hbWU9XCJpdGluZXJhcnlbX3Rva2VuXVwiIHZhbHVlPVwiSU1wVjA1V04zWjYzazQ1ckMzcTAyTjJIVmEwaS1QZ2Y4c0JPME1RRnFmQVwiPic7XHJcblxyXG4gICAgY2FyZCArPSAnICAgPC9kaXY+JztcclxuXHJcbiAgICBjYXJkICs9ICcgICA8YnV0dG9uIGNsYXNzPVwiYnRuXCI+U2F1dmVnYXJkZXI8L2J1dHRvbj4nO1xyXG4gICAgY2FyZCArPSAnIDwvZm9ybT4nO1xyXG4gICAgY2FyZCArPSAnPC9kaXY+JztcclxuICAgIGNhcmQgKz0gJzwvZGl2Pic7XHJcbiAgICBcclxuXHJcbiAgICBtYXAub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgIGdyb3VwTWFya2VyU2VhcmNoLmNsZWFyTGF5ZXJzKCk7XHJcbiAgICAgICAgXHJcblx0XHQkLmFqYXgoe1xyXG5cdFx0ICAgIHR5cGU6ICdHRVQnLFxyXG5cdFx0ICAgIHVybDogXCJodHRwOi8vbm9taW5hdGltLm9wZW5zdHJlZXRtYXAub3JnL3JldmVyc2VcIixcclxuXHRcdCAgICBkYXRhVHlwZTogJ2pzb25wJyxcclxuXHRcdCAgICBqc29ucENhbGxiYWNrOiAnZGF0YScsXHJcbiAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICAgIGZvcm1hdDogXCJqc29uXCIsXHJcbiAgICAgICAgICAgICAgICBsaW1pdDogMSxcclxuICAgICAgICAgICAgICAgIGxhdDogZS5sYXRsbmcubGF0LFxyXG4gICAgICAgICAgICAgICAgbG9uOiBlLmxhdGxuZy5sbmcsXHJcbiAgICAgICAgICAgICAgICBhZHJlc3NkZXRhaWxzIDogMSxcclxuICAgICAgICAgICAgICAgIGpzb25fY2FsbGJhY2s6ICdkYXRhJ1xyXG4gICAgICAgICAgICB9LFxyXG5cdFx0ICAgIGVycm9yOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgYWxlcnQoJ1Byb2Jsw6htZSBkZSByZXF1w6h0ZScpOyB9LFxyXG5cdFx0ICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpe1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBpZiggZGF0YS5hZGRyZXNzICE9PSB1bmRlZmluZWQgKXtcclxuICAgICAgICAgICAgICAgICAgICBjb3VudHJ5ID0gZGF0YS5hZGRyZXNzWydjb3VudHJ5J107XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmKCBkYXRhLmFkZHJlc3NbJ2NpdHknXSAhPT0gdW5kZWZpbmVkICl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNpdHkgPSBkYXRhLmFkZHJlc3NbJ2NpdHknXTtcclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZSBpZiggZGF0YS5hZGRyZXNzWydjb3VudHknXSAhPT0gdW5kZWZpbmVkICl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNpdHkgPSBkYXRhLmFkZHJlc3NbJ2NvdW50eSddO1xyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNlIGlmKCBkYXRhLmFkZHJlc3NbJ3N0YXRlJ10gIT09IHVuZGVmaW5lZCApe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjaXR5ID0gZGF0YS5hZGRyZXNzWydzdGF0ZSddO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBsZ01hcmtlcnMuY2xlYXJMYXllcnMoKTtcclxuICAgICAgICAgICAgICAgICAgICBtYXAuYWRkTGF5ZXIobGdNYXJrZXJzKTtcclxuICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIEwubWFya2VyKGUubGF0bG5nKS5hZGRUbyhsZ01hcmtlcnMpLmJpbmRQb3B1cChcIiBQYXlzIDogXCIgKyBjb3VudHJ5ICsgXCIgPGJyPiBWaWxsZSA6IFwiICsgY2l0eSkub3BlblBvcHVwKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgaWYoICQoIFwiI3VuaXF1ZUFkZENhcmRcIiApLmF0dHIoXCJjbGFzc1wiKSA9PSB1bmRlZmluZWQgKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJCggXCIjYmxvY19nbG9iYWxcIiApLmFwcGVuZChjYXJkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJCgnLmpzLWRhdGVwaWNrZXInKS5kYXRlcGlja2VyKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1hdDogXCJkZC9tbS95eXl5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdXRvY2xvc2U6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcmllbnRhdGlvbjogXCJib3R0b21cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICQoIFwiaW5wdXRbbmFtZT0naXRpbmVyYXJ5W2NvdW50cnlOYW1lXSddXCIgKS52YWwoY291bnRyeSk7XHJcbiAgICAgICAgICAgICAgICAgICAgJCggXCJpbnB1dFtuYW1lPSdpdGluZXJhcnlbY2l0eU5hbWVdJ11cIiApLnZhbChjaXR5KTtcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIH1cclxuXHRcdCAgICB9XHJcblx0XHR9KTtcclxuICAgIH0pO1xyXG5cclxufSJdLCJzb3VyY2VSb290IjoiIn0=