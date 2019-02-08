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
  var map = L.map('map').setView([59, 13.18359], 3);
  L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoiYWxiZXJ0MjQiLCJhIjoiY2l6cGRkcmp4MDAwbTJ3czNjdHRpd28wOCJ9.RyAFYmq9Wp9yZFEzkmrj7A'
  }).addTo(map);
  map.on('click', function (e) {
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

          L.marker(e.latlng).addTo(map).bindPopup(" Pays : " + country + " <br> Ville : " + city).openPopup();
          L.circle(e.latlng, 1).addTo(map);
          $("input[name='itinerary[countryName]']").val(country);
          $("input[name='itinerary[cityName]']").val(city);
        }
      }
    });
  });
};

/***/ })

},[["./assets/js/map.js","runtime"]]]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvY3NzL21hcC5jc3M/ZGQ0NSIsIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvbWFwLmpzIl0sIm5hbWVzIjpbInJlcXVpcmUiLCJ3aW5kb3ciLCJvbmxvYWQiLCJtYXAiLCJMIiwic2V0VmlldyIsInRpbGVMYXllciIsIm1heFpvb20iLCJpZCIsImFjY2Vzc1Rva2VuIiwiYWRkVG8iLCJvbiIsImUiLCIkIiwiYWpheCIsInR5cGUiLCJ1cmwiLCJkYXRhVHlwZSIsImpzb25wQ2FsbGJhY2siLCJkYXRhIiwiZm9ybWF0IiwibGltaXQiLCJsYXQiLCJsYXRsbmciLCJsb24iLCJsbmciLCJhZHJlc3NkZXRhaWxzIiwianNvbl9jYWxsYmFjayIsImVycm9yIiwiYWxlcnQiLCJzdWNjZXNzIiwiYWRkcmVzcyIsInVuZGVmaW5lZCIsImNvdW50cnkiLCJjaXR5IiwibWFya2VyIiwiYmluZFBvcHVwIiwib3BlblBvcHVwIiwiY2lyY2xlIiwidmFsIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSx1Qzs7Ozs7Ozs7Ozs7QUNBQUEsbUJBQU8sQ0FBQyw0Q0FBRCxDQUFQOztBQUVBQyxNQUFNLENBQUNDLE1BQVAsR0FBZ0IsWUFBWTtBQUV4QixNQUFJQyxHQUFHLEdBQUdDLENBQUMsQ0FBQ0QsR0FBRixDQUFNLEtBQU4sRUFBYUUsT0FBYixDQUFxQixDQUFDLEVBQUQsRUFBSSxRQUFKLENBQXJCLEVBQW1DLENBQW5DLENBQVY7QUFFSUQsR0FBQyxDQUFDRSxTQUFGLENBQVksaUZBQVosRUFBK0Y7QUFDM0ZDLFdBQU8sRUFBRSxFQURrRjtBQUUzRkMsTUFBRSxFQUFFLGdCQUZ1RjtBQUczRkMsZUFBVyxFQUFFO0FBSDhFLEdBQS9GLEVBSUdDLEtBSkgsQ0FJU1AsR0FKVDtBQU1KQSxLQUFHLENBQUNRLEVBQUosQ0FBTyxPQUFQLEVBQWdCLFVBQVNDLENBQVQsRUFBWTtBQUU5QkMsS0FBQyxDQUFDQyxJQUFGLENBQU87QUFDSEMsVUFBSSxFQUFFLEtBREg7QUFFSEMsU0FBRyxFQUFFLDRDQUZGO0FBR0hDLGNBQVEsRUFBRSxPQUhQO0FBSUhDLG1CQUFhLEVBQUUsTUFKWjtBQUtHQyxVQUFJLEVBQUU7QUFDRkMsY0FBTSxFQUFFLE1BRE47QUFFRkMsYUFBSyxFQUFFLENBRkw7QUFHRkMsV0FBRyxFQUFFVixDQUFDLENBQUNXLE1BQUYsQ0FBU0QsR0FIWjtBQUlGRSxXQUFHLEVBQUVaLENBQUMsQ0FBQ1csTUFBRixDQUFTRSxHQUpaO0FBS0ZDLHFCQUFhLEVBQUcsQ0FMZDtBQU1GQyxxQkFBYSxFQUFFO0FBTmIsT0FMVDtBQWFIQyxXQUFLLEVBQUUsaUJBQVc7QUFDWkMsYUFBSyxDQUFDLHFCQUFELENBQUw7QUFBK0IsT0FkbEM7QUFlSEMsYUFBTyxFQUFFLGlCQUFTWCxJQUFULEVBQWM7QUFFYixZQUFJQSxJQUFJLENBQUNZLE9BQUwsS0FBaUJDLFNBQXJCLEVBQWdDO0FBQzVCQyxpQkFBTyxHQUFHZCxJQUFJLENBQUNZLE9BQUwsQ0FBYSxTQUFiLENBQVY7O0FBRUEsY0FBSVosSUFBSSxDQUFDWSxPQUFMLENBQWEsTUFBYixNQUF5QkMsU0FBN0IsRUFBd0M7QUFDcENFLGdCQUFJLEdBQUdmLElBQUksQ0FBQ1ksT0FBTCxDQUFhLE1BQWIsQ0FBUDtBQUNILFdBRkQsTUFFTSxJQUFJWixJQUFJLENBQUNZLE9BQUwsQ0FBYSxRQUFiLE1BQTJCQyxTQUEvQixFQUEwQztBQUM1Q0UsZ0JBQUksR0FBR2YsSUFBSSxDQUFDWSxPQUFMLENBQWEsUUFBYixDQUFQO0FBQ0gsV0FGSyxNQUVBLElBQUlaLElBQUksQ0FBQ1ksT0FBTCxDQUFhLE9BQWIsTUFBMEJDLFNBQTlCLEVBQXlDO0FBQzNDRSxnQkFBSSxHQUFHZixJQUFJLENBQUNZLE9BQUwsQ0FBYSxPQUFiLENBQVA7QUFDSDs7QUFFRDNCLFdBQUMsQ0FBQytCLE1BQUYsQ0FBU3ZCLENBQUMsQ0FBQ1csTUFBWCxFQUFtQmIsS0FBbkIsQ0FBeUJQLEdBQXpCLEVBQThCaUMsU0FBOUIsQ0FDSSxhQUFZSCxPQUFaLEdBQ0EsZ0JBREEsR0FDbUJDLElBRnZCLEVBR01HLFNBSE47QUFLQWpDLFdBQUMsQ0FBQ2tDLE1BQUYsQ0FBUzFCLENBQUMsQ0FBQ1csTUFBWCxFQUFtQixDQUFuQixFQUFzQmIsS0FBdEIsQ0FBNEJQLEdBQTVCO0FBRUFVLFdBQUMsQ0FBRSxzQ0FBRixDQUFELENBQTRDMEIsR0FBNUMsQ0FBZ0ROLE9BQWhEO0FBQ0FwQixXQUFDLENBQUUsbUNBQUYsQ0FBRCxDQUF5QzBCLEdBQXpDLENBQTZDTCxJQUE3QztBQUNIO0FBQ1Y7QUF0Q0UsS0FBUDtBQXdDRyxHQTFDRDtBQTRDSCxDQXRERCxDIiwiZmlsZSI6Im1hcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpbiIsInJlcXVpcmUoJy4uL2Nzcy9tYXAuY3NzJyk7XG5cbndpbmRvdy5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XG5cdFxuICAgIHZhciBtYXAgPSBMLm1hcCgnbWFwJykuc2V0VmlldyhbNTksMTMuMTgzNTldLDMpO1xuICAgIFxuICAgICAgICBMLnRpbGVMYXllcignaHR0cHM6Ly9hcGkudGlsZXMubWFwYm94LmNvbS92NC97aWR9L3t6fS97eH0ve3l9LnBuZz9hY2Nlc3NfdG9rZW49e2FjY2Vzc1Rva2VufScsIHtcbiAgICAgICAgICAgIG1heFpvb206IDE4LFxuICAgICAgICAgICAgaWQ6ICdtYXBib3guc3RyZWV0cycsXG4gICAgICAgICAgICBhY2Nlc3NUb2tlbjogJ3BrLmV5SjFJam9pWVd4aVpYSjBNalFpTENKaElqb2lZMmw2Y0dSa2NtcDRNREF3YlRKM2N6TmpkSFJwZDI4d09DSjkuUnlBRlltcTlXcDl5WkZFemttcmo3QSdcbiAgICAgICAgfSkuYWRkVG8obWFwKTtcbiAgICAgICAgXG4gICAgbWFwLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgXG5cdFx0JC5hamF4KHtcblx0XHQgICAgdHlwZTogJ0dFVCcsXG5cdFx0ICAgIHVybDogXCJodHRwOi8vbm9taW5hdGltLm9wZW5zdHJlZXRtYXAub3JnL3JldmVyc2VcIixcblx0XHQgICAgZGF0YVR5cGU6ICdqc29ucCcsXG5cdFx0ICAgIGpzb25wQ2FsbGJhY2s6ICdkYXRhJyxcbiAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICBmb3JtYXQ6IFwianNvblwiLFxuICAgICAgICAgICAgICAgIGxpbWl0OiAxLFxuICAgICAgICAgICAgICAgIGxhdDogZS5sYXRsbmcubGF0LFxuICAgICAgICAgICAgICAgIGxvbjogZS5sYXRsbmcubG5nLFxuICAgICAgICAgICAgICAgIGFkcmVzc2RldGFpbHMgOiAxLFxuICAgICAgICAgICAgICAgIGpzb25fY2FsbGJhY2s6ICdkYXRhJ1xuICAgICAgICAgICAgfSxcblx0XHQgICAgZXJyb3I6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgYWxlcnQoJ1Byb2Jsw6htZSBkZSByZXF1w6h0ZScpOyB9LFxuXHRcdCAgICBzdWNjZXNzOiBmdW5jdGlvbihkYXRhKXtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBpZiggZGF0YS5hZGRyZXNzICE9PSB1bmRlZmluZWQgKXtcbiAgICAgICAgICAgICAgICAgICAgY291bnRyeSA9IGRhdGEuYWRkcmVzc1snY291bnRyeSddO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmKCBkYXRhLmFkZHJlc3NbJ2NpdHknXSAhPT0gdW5kZWZpbmVkICl7XG4gICAgICAgICAgICAgICAgICAgICAgICBjaXR5ID0gZGF0YS5hZGRyZXNzWydjaXR5J107XG4gICAgICAgICAgICAgICAgICAgIH1lbHNlIGlmKCBkYXRhLmFkZHJlc3NbJ2NvdW50eSddICE9PSB1bmRlZmluZWQgKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNpdHkgPSBkYXRhLmFkZHJlc3NbJ2NvdW50eSddO1xuICAgICAgICAgICAgICAgICAgICB9ZWxzZSBpZiggZGF0YS5hZGRyZXNzWydzdGF0ZSddICE9PSB1bmRlZmluZWQgKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNpdHkgPSBkYXRhLmFkZHJlc3NbJ3N0YXRlJ107XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIEwubWFya2VyKGUubGF0bG5nKS5hZGRUbyhtYXApLmJpbmRQb3B1cChcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiIFBheXMgOiBcIisgY291bnRyeStcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiIDxicj4gVmlsbGUgOiBcIiArIGNpdHlcbiAgICAgICAgICAgICAgICAgICAgICAgICkub3BlblBvcHVwKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgTC5jaXJjbGUoZS5sYXRsbmcsIDEpLmFkZFRvKG1hcCk7XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAkKCBcImlucHV0W25hbWU9J2l0aW5lcmFyeVtjb3VudHJ5TmFtZV0nXVwiICkudmFsKGNvdW50cnkpO1xuICAgICAgICAgICAgICAgICAgICAkKCBcImlucHV0W25hbWU9J2l0aW5lcmFyeVtjaXR5TmFtZV0nXVwiICkudmFsKGNpdHkpO1xuICAgICAgICAgICAgICAgIH1cblx0XHQgICAgfVxuXHRcdH0pO1xuICAgIH0pO1xuXG59Il0sInNvdXJjZVJvb3QiOiIifQ==