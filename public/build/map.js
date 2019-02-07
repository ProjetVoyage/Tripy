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
/*
var mymap = L.map('map').setView(
    [35.59, -82.56],
    13);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoiYWxiZXJ0MjQiLCJhIjoiY2l6cGRkcmp4MDAwbTJ3czNjdHRpd28wOCJ9.RyAFYmq9Wp9yZFEzkmrj7A'
}).addTo(mymap);

var popup = L.popup();

function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(mymap);
}

mymap.on('click', onMapClick);

*/


window.onload = function () {
  var map = L.map('map').setView([59, 13.18359], 3);
  L.tileLayer('https://api.mapbox.com/styles/v1/albert24/cizpdeq9q00ee2ro16ga4ecqr/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYWxiZXJ0MjQiLCJhIjoiY2l6cGRkcmp4MDAwbTJ3czNjdHRpd28wOCJ9.RyAFYmq9Wp9yZFEzkmrj7A').addTo(map); // var myIcon = L.icon({
  // iconUrl: './vue/styleCSS/carte.gif',
  // iconRetinaUrl: './vue/styleCSS/carte.gif',
  // iconSize: [38, 95],
  // iconAnchor: [22, 94],
  // popupAnchor: [-3, -76],
  // });
  // map.on('click', onClick);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvY3NzL21hcC5jc3M/NDdjNSIsIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvbWFwLmpzIl0sIm5hbWVzIjpbInJlcXVpcmUiLCJ3aW5kb3ciLCJvbmxvYWQiLCJtYXAiLCJMIiwic2V0VmlldyIsInRpbGVMYXllciIsImFkZFRvIiwib24iLCJlIiwiJCIsImFqYXgiLCJ0eXBlIiwidXJsIiwiZGF0YVR5cGUiLCJqc29ucENhbGxiYWNrIiwiZGF0YSIsImZvcm1hdCIsImxpbWl0IiwibGF0IiwibGF0bG5nIiwibG9uIiwibG5nIiwiYWRyZXNzZGV0YWlscyIsImpzb25fY2FsbGJhY2siLCJlcnJvciIsImFsZXJ0Iiwic3VjY2VzcyIsImFkZHJlc3MiLCJ1bmRlZmluZWQiLCJjb3VudHJ5IiwiY2l0eSIsIm1hcmtlciIsImJpbmRQb3B1cCIsIm9wZW5Qb3B1cCIsImNpcmNsZSIsInZhbCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsdUM7Ozs7Ozs7Ozs7O0FDQUFBLG1CQUFPLENBQUMsNENBQUQsQ0FBUDtBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTBCQUMsTUFBTSxDQUFDQyxNQUFQLEdBQWdCLFlBQVk7QUFFeEIsTUFBSUMsR0FBRyxHQUFHQyxDQUFDLENBQUNELEdBQUYsQ0FBTSxLQUFOLEVBQWFFLE9BQWIsQ0FBcUIsQ0FBQyxFQUFELEVBQUksUUFBSixDQUFyQixFQUFtQyxDQUFuQyxDQUFWO0FBRUlELEdBQUMsQ0FBQ0UsU0FBRixDQUFZLG1NQUFaLEVBRUVDLEtBRkYsQ0FFUUosR0FGUixFQUpvQixDQVEzQjtBQUNHO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUVBOztBQUdBQSxLQUFHLENBQUNLLEVBQUosQ0FBTyxPQUFQLEVBQWdCLFVBQVNDLENBQVQsRUFBWTtBQUU5QkMsS0FBQyxDQUFDQyxJQUFGLENBQU87QUFDSEMsVUFBSSxFQUFFLEtBREg7QUFFSEMsU0FBRyxFQUFFLDRDQUZGO0FBR0hDLGNBQVEsRUFBRSxPQUhQO0FBSUhDLG1CQUFhLEVBQUUsTUFKWjtBQUtHQyxVQUFJLEVBQUU7QUFDRkMsY0FBTSxFQUFFLE1BRE47QUFFRkMsYUFBSyxFQUFFLENBRkw7QUFHRkMsV0FBRyxFQUFFVixDQUFDLENBQUNXLE1BQUYsQ0FBU0QsR0FIWjtBQUlGRSxXQUFHLEVBQUVaLENBQUMsQ0FBQ1csTUFBRixDQUFTRSxHQUpaO0FBS0ZDLHFCQUFhLEVBQUcsQ0FMZDtBQU1GQyxxQkFBYSxFQUFFO0FBTmIsT0FMVDtBQWFIQyxXQUFLLEVBQUUsaUJBQVc7QUFDWkMsYUFBSyxDQUFDLHFCQUFELENBQUw7QUFBK0IsT0FkbEM7QUFlSEMsYUFBTyxFQUFFLGlCQUFTWCxJQUFULEVBQWM7QUFFYixZQUFJQSxJQUFJLENBQUNZLE9BQUwsS0FBaUJDLFNBQXJCLEVBQWdDO0FBQzVCQyxpQkFBTyxHQUFHZCxJQUFJLENBQUNZLE9BQUwsQ0FBYSxTQUFiLENBQVY7O0FBRUEsY0FBSVosSUFBSSxDQUFDWSxPQUFMLENBQWEsTUFBYixNQUF5QkMsU0FBN0IsRUFBd0M7QUFDcENFLGdCQUFJLEdBQUdmLElBQUksQ0FBQ1ksT0FBTCxDQUFhLE1BQWIsQ0FBUDtBQUNILFdBRkQsTUFFTSxJQUFJWixJQUFJLENBQUNZLE9BQUwsQ0FBYSxRQUFiLE1BQTJCQyxTQUEvQixFQUEwQztBQUM1Q0UsZ0JBQUksR0FBR2YsSUFBSSxDQUFDWSxPQUFMLENBQWEsUUFBYixDQUFQO0FBQ0gsV0FGSyxNQUVBLElBQUlaLElBQUksQ0FBQ1ksT0FBTCxDQUFhLE9BQWIsTUFBMEJDLFNBQTlCLEVBQXlDO0FBQzNDRSxnQkFBSSxHQUFHZixJQUFJLENBQUNZLE9BQUwsQ0FBYSxPQUFiLENBQVA7QUFDSDs7QUFFRHhCLFdBQUMsQ0FBQzRCLE1BQUYsQ0FBU3ZCLENBQUMsQ0FBQ1csTUFBWCxFQUFtQmIsS0FBbkIsQ0FBeUJKLEdBQXpCLEVBQThCOEIsU0FBOUIsQ0FDSSxhQUFZSCxPQUFaLEdBQ0EsZ0JBREEsR0FDbUJDLElBRnZCLEVBR01HLFNBSE47QUFLQTlCLFdBQUMsQ0FBQytCLE1BQUYsQ0FBUzFCLENBQUMsQ0FBQ1csTUFBWCxFQUFtQixDQUFuQixFQUFzQmIsS0FBdEIsQ0FBNEJKLEdBQTVCO0FBRUFPLFdBQUMsQ0FBRSxzQ0FBRixDQUFELENBQTRDMEIsR0FBNUMsQ0FBZ0ROLE9BQWhEO0FBQ0FwQixXQUFDLENBQUUsbUNBQUYsQ0FBRCxDQUF5QzBCLEdBQXpDLENBQTZDTCxJQUE3QztBQUNIO0FBQ1Y7QUF0Q0UsS0FBUDtBQXdDRyxHQTFDRDtBQTRDSCxDQWhFRCxDIiwiZmlsZSI6Im1hcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpbiIsInJlcXVpcmUoJy4uL2Nzcy9tYXAuY3NzJyk7XHJcblxyXG4vKlxyXG52YXIgbXltYXAgPSBMLm1hcCgnbWFwJykuc2V0VmlldyhcclxuICAgIFszNS41OSwgLTgyLjU2XSxcclxuICAgIDEzKTtcclxuXHJcbkwudGlsZUxheWVyKCdodHRwczovL2FwaS50aWxlcy5tYXBib3guY29tL3Y0L3tpZH0ve3p9L3t4fS97eX0ucG5nP2FjY2Vzc190b2tlbj17YWNjZXNzVG9rZW59Jywge1xyXG4gICAgYXR0cmlidXRpb246ICdNYXAgZGF0YSAmY29weTsgPGEgaHJlZj1cImh0dHBzOi8vd3d3Lm9wZW5zdHJlZXRtYXAub3JnL1wiPk9wZW5TdHJlZXRNYXA8L2E+IGNvbnRyaWJ1dG9ycywgPGEgaHJlZj1cImh0dHBzOi8vY3JlYXRpdmVjb21tb25zLm9yZy9saWNlbnNlcy9ieS1zYS8yLjAvXCI+Q0MtQlktU0E8L2E+LCBJbWFnZXJ5IMKpIDxhIGhyZWY9XCJodHRwczovL3d3dy5tYXBib3guY29tL1wiPk1hcGJveDwvYT4nLFxyXG4gICAgbWF4Wm9vbTogMTgsXHJcbiAgICBpZDogJ21hcGJveC5zdHJlZXRzJyxcclxuICAgIGFjY2Vzc1Rva2VuOiAncGsuZXlKMUlqb2lZV3hpWlhKME1qUWlMQ0poSWpvaVkybDZjR1JrY21wNE1EQXdiVEozY3pOamRIUnBkMjh3T0NKOS5SeUFGWW1xOVdwOXlaRkV6a21yajdBJ1xyXG59KS5hZGRUbyhteW1hcCk7XHJcblxyXG52YXIgcG9wdXAgPSBMLnBvcHVwKCk7XHJcblxyXG5mdW5jdGlvbiBvbk1hcENsaWNrKGUpIHtcclxuICAgIHBvcHVwXHJcbiAgICAgICAgLnNldExhdExuZyhlLmxhdGxuZylcclxuICAgICAgICAuc2V0Q29udGVudChcIllvdSBjbGlja2VkIHRoZSBtYXAgYXQgXCIgKyBlLmxhdGxuZy50b1N0cmluZygpKVxyXG4gICAgICAgIC5vcGVuT24obXltYXApO1xyXG59XHJcblxyXG5teW1hcC5vbignY2xpY2snLCBvbk1hcENsaWNrKTtcclxuXHJcbiovXHJcblxyXG5cclxud2luZG93Lm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcclxuXHRcclxuICAgIHZhciBtYXAgPSBMLm1hcCgnbWFwJykuc2V0VmlldyhbNTksMTMuMTgzNTldLDMpO1xyXG4gICAgXHJcbiAgICAgICAgTC50aWxlTGF5ZXIoJ2h0dHBzOi8vYXBpLm1hcGJveC5jb20vc3R5bGVzL3YxL2FsYmVydDI0L2NpenBkZXE5cTAwZWUycm8xNmdhNGVjcXIvdGlsZXMvMjU2L3t6fS97eH0ve3l9P2FjY2Vzc190b2tlbj1way5leUoxSWpvaVlXeGlaWEowTWpRaUxDSmhJam9pWTJsNmNHUmtjbXA0TURBd2JUSjNjek5qZEhScGQyOHdPQ0o5LlJ5QUZZbXE5V3A5eVpGRXprbXJqN0EnLFxyXG4gICAgICAgICAgICBcclxuICAgICAgICApLmFkZFRvKG1hcCk7XHJcbiAgICAgICAgXHJcblx0Ly8gdmFyIG15SWNvbiA9IEwuaWNvbih7XHJcbiAgICAvLyBpY29uVXJsOiAnLi92dWUvc3R5bGVDU1MvY2FydGUuZ2lmJyxcclxuICAgIC8vIGljb25SZXRpbmFVcmw6ICcuL3Z1ZS9zdHlsZUNTUy9jYXJ0ZS5naWYnLFxyXG4gICAgLy8gaWNvblNpemU6IFszOCwgOTVdLFxyXG4gICAgLy8gaWNvbkFuY2hvcjogWzIyLCA5NF0sXHJcbiAgICAvLyBwb3B1cEFuY2hvcjogWy0zLCAtNzZdLFxyXG5cclxuICAgIC8vIH0pO1xyXG4gICAgXHJcbiAgICAvLyBtYXAub24oJ2NsaWNrJywgb25DbGljayk7XHJcblxyXG5cdFxyXG4gICAgbWFwLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICBcclxuXHRcdCQuYWpheCh7XHJcblx0XHQgICAgdHlwZTogJ0dFVCcsXHJcblx0XHQgICAgdXJsOiBcImh0dHA6Ly9ub21pbmF0aW0ub3BlbnN0cmVldG1hcC5vcmcvcmV2ZXJzZVwiLFxyXG5cdFx0ICAgIGRhdGFUeXBlOiAnanNvbnAnLFxyXG5cdFx0ICAgIGpzb25wQ2FsbGJhY2s6ICdkYXRhJyxcclxuICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgZm9ybWF0OiBcImpzb25cIixcclxuICAgICAgICAgICAgICAgIGxpbWl0OiAxLFxyXG4gICAgICAgICAgICAgICAgbGF0OiBlLmxhdGxuZy5sYXQsXHJcbiAgICAgICAgICAgICAgICBsb246IGUubGF0bG5nLmxuZyxcclxuICAgICAgICAgICAgICAgIGFkcmVzc2RldGFpbHMgOiAxLFxyXG4gICAgICAgICAgICAgICAganNvbl9jYWxsYmFjazogJ2RhdGEnXHJcbiAgICAgICAgICAgIH0sXHJcblx0XHQgICAgZXJyb3I6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBhbGVydCgnUHJvYmzDqG1lIGRlIHJlcXXDqHRlJyk7IH0sXHJcblx0XHQgICAgc3VjY2VzczogZnVuY3Rpb24oZGF0YSl7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGlmKCBkYXRhLmFkZHJlc3MgIT09IHVuZGVmaW5lZCApe1xyXG4gICAgICAgICAgICAgICAgICAgIGNvdW50cnkgPSBkYXRhLmFkZHJlc3NbJ2NvdW50cnknXTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYoIGRhdGEuYWRkcmVzc1snY2l0eSddICE9PSB1bmRlZmluZWQgKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2l0eSA9IGRhdGEuYWRkcmVzc1snY2l0eSddO1xyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNlIGlmKCBkYXRhLmFkZHJlc3NbJ2NvdW50eSddICE9PSB1bmRlZmluZWQgKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2l0eSA9IGRhdGEuYWRkcmVzc1snY291bnR5J107XHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2UgaWYoIGRhdGEuYWRkcmVzc1snc3RhdGUnXSAhPT0gdW5kZWZpbmVkICl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNpdHkgPSBkYXRhLmFkZHJlc3NbJ3N0YXRlJ107XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIEwubWFya2VyKGUubGF0bG5nKS5hZGRUbyhtYXApLmJpbmRQb3B1cChcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCIgUGF5cyA6IFwiKyBjb3VudHJ5K1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcIiA8YnI+IFZpbGxlIDogXCIgKyBjaXR5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICkub3BlblBvcHVwKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIEwuY2lyY2xlKGUubGF0bG5nLCAxKS5hZGRUbyhtYXApO1xyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICQoIFwiaW5wdXRbbmFtZT0naXRpbmVyYXJ5W2NvdW50cnlOYW1lXSddXCIgKS52YWwoY291bnRyeSk7XHJcbiAgICAgICAgICAgICAgICAgICAgJCggXCJpbnB1dFtuYW1lPSdpdGluZXJhcnlbY2l0eU5hbWVdJ11cIiApLnZhbChjaXR5KTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHRcdCAgICB9XHJcblx0XHR9KTtcclxuICAgIH0pO1xyXG5cclxufSJdLCJzb3VyY2VSb290IjoiIn0=