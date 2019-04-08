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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvY3NzL21hcC5jc3M/ZGQ0NSIsIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvbWFwLmpzIl0sIm5hbWVzIjpbInJlcXVpcmUiLCJ3aW5kb3ciLCJvbmxvYWQiLCJtYXAiLCJMIiwic2V0VmlldyIsInRpbGVMYXllciIsIm1heFpvb20iLCJpZCIsImFjY2Vzc1Rva2VuIiwiYWRkVG8iLCJvbiIsImUiLCIkIiwiYWpheCIsInR5cGUiLCJ1cmwiLCJkYXRhVHlwZSIsImpzb25wQ2FsbGJhY2siLCJkYXRhIiwiZm9ybWF0IiwibGltaXQiLCJsYXQiLCJsYXRsbmciLCJsb24iLCJsbmciLCJhZHJlc3NkZXRhaWxzIiwianNvbl9jYWxsYmFjayIsImVycm9yIiwiYWxlcnQiLCJzdWNjZXNzIiwiYWRkcmVzcyIsInVuZGVmaW5lZCIsImNvdW50cnkiLCJjaXR5IiwibWFya2VyIiwiYmluZFBvcHVwIiwib3BlblBvcHVwIiwiY2lyY2xlIiwidmFsIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSx1Qzs7Ozs7Ozs7Ozs7QUNBQUEsbUJBQU8sQ0FBQyw0Q0FBRCxDQUFQOztBQUVBQyxNQUFNLENBQUNDLE1BQVAsR0FBZ0IsWUFBWTtBQUV4QixNQUFJQyxHQUFHLEdBQUdDLENBQUMsQ0FBQ0QsR0FBRixDQUFNLEtBQU4sRUFBYUUsT0FBYixDQUFxQixDQUFDLEVBQUQsRUFBSSxRQUFKLENBQXJCLEVBQW1DLENBQW5DLENBQVY7QUFFSUQsR0FBQyxDQUFDRSxTQUFGLENBQVksaUZBQVosRUFBK0Y7QUFDM0ZDLFdBQU8sRUFBRSxFQURrRjtBQUUzRkMsTUFBRSxFQUFFLGdCQUZ1RjtBQUczRkMsZUFBVyxFQUFFO0FBSDhFLEdBQS9GLEVBSUdDLEtBSkgsQ0FJU1AsR0FKVDtBQU1KQSxLQUFHLENBQUNRLEVBQUosQ0FBTyxPQUFQLEVBQWdCLFVBQVNDLENBQVQsRUFBWTtBQUU5QkMsS0FBQyxDQUFDQyxJQUFGLENBQU87QUFDSEMsVUFBSSxFQUFFLEtBREg7QUFFSEMsU0FBRyxFQUFFLDRDQUZGO0FBR0hDLGNBQVEsRUFBRSxPQUhQO0FBSUhDLG1CQUFhLEVBQUUsTUFKWjtBQUtHQyxVQUFJLEVBQUU7QUFDRkMsY0FBTSxFQUFFLE1BRE47QUFFRkMsYUFBSyxFQUFFLENBRkw7QUFHRkMsV0FBRyxFQUFFVixDQUFDLENBQUNXLE1BQUYsQ0FBU0QsR0FIWjtBQUlGRSxXQUFHLEVBQUVaLENBQUMsQ0FBQ1csTUFBRixDQUFTRSxHQUpaO0FBS0ZDLHFCQUFhLEVBQUcsQ0FMZDtBQU1GQyxxQkFBYSxFQUFFO0FBTmIsT0FMVDtBQWFIQyxXQUFLLEVBQUUsaUJBQVc7QUFDWkMsYUFBSyxDQUFDLHFCQUFELENBQUw7QUFBK0IsT0FkbEM7QUFlSEMsYUFBTyxFQUFFLGlCQUFTWCxJQUFULEVBQWM7QUFFYixZQUFJQSxJQUFJLENBQUNZLE9BQUwsS0FBaUJDLFNBQXJCLEVBQWdDO0FBQzVCQyxpQkFBTyxHQUFHZCxJQUFJLENBQUNZLE9BQUwsQ0FBYSxTQUFiLENBQVY7O0FBRUEsY0FBSVosSUFBSSxDQUFDWSxPQUFMLENBQWEsTUFBYixNQUF5QkMsU0FBN0IsRUFBd0M7QUFDcENFLGdCQUFJLEdBQUdmLElBQUksQ0FBQ1ksT0FBTCxDQUFhLE1BQWIsQ0FBUDtBQUNILFdBRkQsTUFFTSxJQUFJWixJQUFJLENBQUNZLE9BQUwsQ0FBYSxRQUFiLE1BQTJCQyxTQUEvQixFQUEwQztBQUM1Q0UsZ0JBQUksR0FBR2YsSUFBSSxDQUFDWSxPQUFMLENBQWEsUUFBYixDQUFQO0FBQ0gsV0FGSyxNQUVBLElBQUlaLElBQUksQ0FBQ1ksT0FBTCxDQUFhLE9BQWIsTUFBMEJDLFNBQTlCLEVBQXlDO0FBQzNDRSxnQkFBSSxHQUFHZixJQUFJLENBQUNZLE9BQUwsQ0FBYSxPQUFiLENBQVA7QUFDSDs7QUFFRDNCLFdBQUMsQ0FBQytCLE1BQUYsQ0FBU3ZCLENBQUMsQ0FBQ1csTUFBWCxFQUFtQmIsS0FBbkIsQ0FBeUJQLEdBQXpCLEVBQThCaUMsU0FBOUIsQ0FDSSxhQUFZSCxPQUFaLEdBQ0EsZ0JBREEsR0FDbUJDLElBRnZCLEVBR01HLFNBSE47QUFLQWpDLFdBQUMsQ0FBQ2tDLE1BQUYsQ0FBUzFCLENBQUMsQ0FBQ1csTUFBWCxFQUFtQixDQUFuQixFQUFzQmIsS0FBdEIsQ0FBNEJQLEdBQTVCO0FBRUFVLFdBQUMsQ0FBRSxzQ0FBRixDQUFELENBQTRDMEIsR0FBNUMsQ0FBZ0ROLE9BQWhEO0FBQ0FwQixXQUFDLENBQUUsbUNBQUYsQ0FBRCxDQUF5QzBCLEdBQXpDLENBQTZDTCxJQUE3QztBQUNIO0FBQ1Y7QUF0Q0UsS0FBUDtBQXdDRyxHQTFDRDtBQTRDSCxDQXRERCxDIiwiZmlsZSI6Im1hcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpbiIsInJlcXVpcmUoJy4uL2Nzcy9tYXAuY3NzJyk7XHJcblxyXG53aW5kb3cub25sb2FkID0gZnVuY3Rpb24gKCkge1xyXG5cdFxyXG4gICAgdmFyIG1hcCA9IEwubWFwKCdtYXAnKS5zZXRWaWV3KFs1OSwxMy4xODM1OV0sMyk7XHJcbiAgICBcclxuICAgICAgICBMLnRpbGVMYXllcignaHR0cHM6Ly9hcGkudGlsZXMubWFwYm94LmNvbS92NC97aWR9L3t6fS97eH0ve3l9LnBuZz9hY2Nlc3NfdG9rZW49e2FjY2Vzc1Rva2VufScsIHtcclxuICAgICAgICAgICAgbWF4Wm9vbTogMTgsXHJcbiAgICAgICAgICAgIGlkOiAnbWFwYm94LnN0cmVldHMnLFxyXG4gICAgICAgICAgICBhY2Nlc3NUb2tlbjogJ3BrLmV5SjFJam9pWVd4aVpYSjBNalFpTENKaElqb2lZMmw2Y0dSa2NtcDRNREF3YlRKM2N6TmpkSFJwZDI4d09DSjkuUnlBRlltcTlXcDl5WkZFemttcmo3QSdcclxuICAgICAgICB9KS5hZGRUbyhtYXApO1xyXG4gICAgICAgIFxyXG4gICAgbWFwLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICBcclxuXHRcdCQuYWpheCh7XHJcblx0XHQgICAgdHlwZTogJ0dFVCcsXHJcblx0XHQgICAgdXJsOiBcImh0dHA6Ly9ub21pbmF0aW0ub3BlbnN0cmVldG1hcC5vcmcvcmV2ZXJzZVwiLFxyXG5cdFx0ICAgIGRhdGFUeXBlOiAnanNvbnAnLFxyXG5cdFx0ICAgIGpzb25wQ2FsbGJhY2s6ICdkYXRhJyxcclxuICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgZm9ybWF0OiBcImpzb25cIixcclxuICAgICAgICAgICAgICAgIGxpbWl0OiAxLFxyXG4gICAgICAgICAgICAgICAgbGF0OiBlLmxhdGxuZy5sYXQsXHJcbiAgICAgICAgICAgICAgICBsb246IGUubGF0bG5nLmxuZyxcclxuICAgICAgICAgICAgICAgIGFkcmVzc2RldGFpbHMgOiAxLFxyXG4gICAgICAgICAgICAgICAganNvbl9jYWxsYmFjazogJ2RhdGEnXHJcbiAgICAgICAgICAgIH0sXHJcblx0XHQgICAgZXJyb3I6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBhbGVydCgnUHJvYmzDqG1lIGRlIHJlcXXDqHRlJyk7IH0sXHJcblx0XHQgICAgc3VjY2VzczogZnVuY3Rpb24oZGF0YSl7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGlmKCBkYXRhLmFkZHJlc3MgIT09IHVuZGVmaW5lZCApe1xyXG4gICAgICAgICAgICAgICAgICAgIGNvdW50cnkgPSBkYXRhLmFkZHJlc3NbJ2NvdW50cnknXTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYoIGRhdGEuYWRkcmVzc1snY2l0eSddICE9PSB1bmRlZmluZWQgKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2l0eSA9IGRhdGEuYWRkcmVzc1snY2l0eSddO1xyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNlIGlmKCBkYXRhLmFkZHJlc3NbJ2NvdW50eSddICE9PSB1bmRlZmluZWQgKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2l0eSA9IGRhdGEuYWRkcmVzc1snY291bnR5J107XHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2UgaWYoIGRhdGEuYWRkcmVzc1snc3RhdGUnXSAhPT0gdW5kZWZpbmVkICl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNpdHkgPSBkYXRhLmFkZHJlc3NbJ3N0YXRlJ107XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIEwubWFya2VyKGUubGF0bG5nKS5hZGRUbyhtYXApLmJpbmRQb3B1cChcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCIgUGF5cyA6IFwiKyBjb3VudHJ5K1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcIiA8YnI+IFZpbGxlIDogXCIgKyBjaXR5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICkub3BlblBvcHVwKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIEwuY2lyY2xlKGUubGF0bG5nLCAxKS5hZGRUbyhtYXApO1xyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICQoIFwiaW5wdXRbbmFtZT0naXRpbmVyYXJ5W2NvdW50cnlOYW1lXSddXCIgKS52YWwoY291bnRyeSk7XHJcbiAgICAgICAgICAgICAgICAgICAgJCggXCJpbnB1dFtuYW1lPSdpdGluZXJhcnlbY2l0eU5hbWVdJ11cIiApLnZhbChjaXR5KTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHRcdCAgICB9XHJcblx0XHR9KTtcclxuICAgIH0pO1xyXG5cclxufSJdLCJzb3VyY2VSb290IjoiIn0=