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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvY3NzL21hcC5jc3MiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL21hcC5qcyJdLCJuYW1lcyI6WyJyZXF1aXJlIiwid2luZG93Iiwib25sb2FkIiwibWFwIiwiTCIsInNldFZpZXciLCJ0aWxlTGF5ZXIiLCJhZGRUbyIsIm9uIiwiZSIsIiQiLCJhamF4IiwidHlwZSIsInVybCIsImRhdGFUeXBlIiwianNvbnBDYWxsYmFjayIsImRhdGEiLCJmb3JtYXQiLCJsaW1pdCIsImxhdCIsImxhdGxuZyIsImxvbiIsImxuZyIsImFkcmVzc2RldGFpbHMiLCJqc29uX2NhbGxiYWNrIiwiZXJyb3IiLCJhbGVydCIsInN1Y2Nlc3MiLCJhZGRyZXNzIiwidW5kZWZpbmVkIiwiY291bnRyeSIsImNpdHkiLCJtYXJrZXIiLCJiaW5kUG9wdXAiLCJvcGVuUG9wdXAiLCJjaXJjbGUiLCJ2YWwiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLHVDOzs7Ozs7Ozs7OztBQ0FBQSxtQkFBTyxDQUFDLDRDQUFELENBQVA7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUEwQkFDLE1BQU0sQ0FBQ0MsTUFBUCxHQUFnQixZQUFZO0FBRXhCLE1BQUlDLEdBQUcsR0FBR0MsQ0FBQyxDQUFDRCxHQUFGLENBQU0sS0FBTixFQUFhRSxPQUFiLENBQXFCLENBQUMsRUFBRCxFQUFJLFFBQUosQ0FBckIsRUFBbUMsQ0FBbkMsQ0FBVjtBQUVJRCxHQUFDLENBQUNFLFNBQUYsQ0FBWSxtTUFBWixFQUVFQyxLQUZGLENBRVFKLEdBRlIsRUFKb0IsQ0FRM0I7QUFDRztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFFQTs7QUFHQUEsS0FBRyxDQUFDSyxFQUFKLENBQU8sT0FBUCxFQUFnQixVQUFTQyxDQUFULEVBQVk7QUFFOUJDLEtBQUMsQ0FBQ0MsSUFBRixDQUFPO0FBQ0hDLFVBQUksRUFBRSxLQURIO0FBRUhDLFNBQUcsRUFBRSw0Q0FGRjtBQUdIQyxjQUFRLEVBQUUsT0FIUDtBQUlIQyxtQkFBYSxFQUFFLE1BSlo7QUFLR0MsVUFBSSxFQUFFO0FBQ0ZDLGNBQU0sRUFBRSxNQUROO0FBRUZDLGFBQUssRUFBRSxDQUZMO0FBR0ZDLFdBQUcsRUFBRVYsQ0FBQyxDQUFDVyxNQUFGLENBQVNELEdBSFo7QUFJRkUsV0FBRyxFQUFFWixDQUFDLENBQUNXLE1BQUYsQ0FBU0UsR0FKWjtBQUtGQyxxQkFBYSxFQUFHLENBTGQ7QUFNRkMscUJBQWEsRUFBRTtBQU5iLE9BTFQ7QUFhSEMsV0FBSyxFQUFFLGlCQUFXO0FBQ1pDLGFBQUssQ0FBQyxxQkFBRCxDQUFMO0FBQStCLE9BZGxDO0FBZUhDLGFBQU8sRUFBRSxpQkFBU1gsSUFBVCxFQUFjO0FBRWIsWUFBSUEsSUFBSSxDQUFDWSxPQUFMLEtBQWlCQyxTQUFyQixFQUFnQztBQUM1QkMsaUJBQU8sR0FBR2QsSUFBSSxDQUFDWSxPQUFMLENBQWEsU0FBYixDQUFWOztBQUVBLGNBQUlaLElBQUksQ0FBQ1ksT0FBTCxDQUFhLE1BQWIsTUFBeUJDLFNBQTdCLEVBQXdDO0FBQ3BDRSxnQkFBSSxHQUFHZixJQUFJLENBQUNZLE9BQUwsQ0FBYSxNQUFiLENBQVA7QUFDSCxXQUZELE1BRU0sSUFBSVosSUFBSSxDQUFDWSxPQUFMLENBQWEsUUFBYixNQUEyQkMsU0FBL0IsRUFBMEM7QUFDNUNFLGdCQUFJLEdBQUdmLElBQUksQ0FBQ1ksT0FBTCxDQUFhLFFBQWIsQ0FBUDtBQUNILFdBRkssTUFFQSxJQUFJWixJQUFJLENBQUNZLE9BQUwsQ0FBYSxPQUFiLE1BQTBCQyxTQUE5QixFQUF5QztBQUMzQ0UsZ0JBQUksR0FBR2YsSUFBSSxDQUFDWSxPQUFMLENBQWEsT0FBYixDQUFQO0FBQ0g7O0FBRUR4QixXQUFDLENBQUM0QixNQUFGLENBQVN2QixDQUFDLENBQUNXLE1BQVgsRUFBbUJiLEtBQW5CLENBQXlCSixHQUF6QixFQUE4QjhCLFNBQTlCLENBQ0ksYUFBWUgsT0FBWixHQUNBLGdCQURBLEdBQ21CQyxJQUZ2QixFQUdNRyxTQUhOO0FBS0E5QixXQUFDLENBQUMrQixNQUFGLENBQVMxQixDQUFDLENBQUNXLE1BQVgsRUFBbUIsQ0FBbkIsRUFBc0JiLEtBQXRCLENBQTRCSixHQUE1QjtBQUVBTyxXQUFDLENBQUUsc0NBQUYsQ0FBRCxDQUE0QzBCLEdBQTVDLENBQWdETixPQUFoRDtBQUNBcEIsV0FBQyxDQUFFLG1DQUFGLENBQUQsQ0FBeUMwQixHQUF6QyxDQUE2Q0wsSUFBN0M7QUFDSDtBQUNWO0FBdENFLEtBQVA7QUF3Q0csR0ExQ0Q7QUE0Q0gsQ0FoRUQsQyIsImZpbGUiOiJtYXAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW4iLCJyZXF1aXJlKCcuLi9jc3MvbWFwLmNzcycpO1xyXG5cclxuLypcclxudmFyIG15bWFwID0gTC5tYXAoJ21hcCcpLnNldFZpZXcoXHJcbiAgICBbMzUuNTksIC04Mi41Nl0sXHJcbiAgICAxMyk7XHJcblxyXG5MLnRpbGVMYXllcignaHR0cHM6Ly9hcGkudGlsZXMubWFwYm94LmNvbS92NC97aWR9L3t6fS97eH0ve3l9LnBuZz9hY2Nlc3NfdG9rZW49e2FjY2Vzc1Rva2VufScsIHtcclxuICAgIGF0dHJpYnV0aW9uOiAnTWFwIGRhdGEgJmNvcHk7IDxhIGhyZWY9XCJodHRwczovL3d3dy5vcGVuc3RyZWV0bWFwLm9yZy9cIj5PcGVuU3RyZWV0TWFwPC9hPiBjb250cmlidXRvcnMsIDxhIGhyZWY9XCJodHRwczovL2NyZWF0aXZlY29tbW9ucy5vcmcvbGljZW5zZXMvYnktc2EvMi4wL1wiPkNDLUJZLVNBPC9hPiwgSW1hZ2VyeSDCqSA8YSBocmVmPVwiaHR0cHM6Ly93d3cubWFwYm94LmNvbS9cIj5NYXBib3g8L2E+JyxcclxuICAgIG1heFpvb206IDE4LFxyXG4gICAgaWQ6ICdtYXBib3guc3RyZWV0cycsXHJcbiAgICBhY2Nlc3NUb2tlbjogJ3BrLmV5SjFJam9pWVd4aVpYSjBNalFpTENKaElqb2lZMmw2Y0dSa2NtcDRNREF3YlRKM2N6TmpkSFJwZDI4d09DSjkuUnlBRlltcTlXcDl5WkZFemttcmo3QSdcclxufSkuYWRkVG8obXltYXApO1xyXG5cclxudmFyIHBvcHVwID0gTC5wb3B1cCgpO1xyXG5cclxuZnVuY3Rpb24gb25NYXBDbGljayhlKSB7XHJcbiAgICBwb3B1cFxyXG4gICAgICAgIC5zZXRMYXRMbmcoZS5sYXRsbmcpXHJcbiAgICAgICAgLnNldENvbnRlbnQoXCJZb3UgY2xpY2tlZCB0aGUgbWFwIGF0IFwiICsgZS5sYXRsbmcudG9TdHJpbmcoKSlcclxuICAgICAgICAub3Blbk9uKG15bWFwKTtcclxufVxyXG5cclxubXltYXAub24oJ2NsaWNrJywgb25NYXBDbGljayk7XHJcblxyXG4qL1xyXG5cclxuXHJcbndpbmRvdy5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHJcbiAgICB2YXIgbWFwID0gTC5tYXAoJ21hcCcpLnNldFZpZXcoWzU5LDEzLjE4MzU5XSwzKTtcclxuICAgIFxyXG4gICAgICAgIEwudGlsZUxheWVyKCdodHRwczovL2FwaS5tYXBib3guY29tL3N0eWxlcy92MS9hbGJlcnQyNC9jaXpwZGVxOXEwMGVlMnJvMTZnYTRlY3FyL3RpbGVzLzI1Ni97en0ve3h9L3t5fT9hY2Nlc3NfdG9rZW49cGsuZXlKMUlqb2lZV3hpWlhKME1qUWlMQ0poSWpvaVkybDZjR1JrY21wNE1EQXdiVEozY3pOamRIUnBkMjh3T0NKOS5SeUFGWW1xOVdwOXlaRkV6a21yajdBJyxcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgKS5hZGRUbyhtYXApO1xyXG4gICAgICAgIFxyXG5cdC8vIHZhciBteUljb24gPSBMLmljb24oe1xyXG4gICAgLy8gaWNvblVybDogJy4vdnVlL3N0eWxlQ1NTL2NhcnRlLmdpZicsXHJcbiAgICAvLyBpY29uUmV0aW5hVXJsOiAnLi92dWUvc3R5bGVDU1MvY2FydGUuZ2lmJyxcclxuICAgIC8vIGljb25TaXplOiBbMzgsIDk1XSxcclxuICAgIC8vIGljb25BbmNob3I6IFsyMiwgOTRdLFxyXG4gICAgLy8gcG9wdXBBbmNob3I6IFstMywgLTc2XSxcclxuXHJcbiAgICAvLyB9KTtcclxuICAgIFxyXG4gICAgLy8gbWFwLm9uKCdjbGljaycsIG9uQ2xpY2spO1xyXG5cclxuXHRcclxuICAgIG1hcC5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgXHJcblx0XHQkLmFqYXgoe1xyXG5cdFx0ICAgIHR5cGU6ICdHRVQnLFxyXG5cdFx0ICAgIHVybDogXCJodHRwOi8vbm9taW5hdGltLm9wZW5zdHJlZXRtYXAub3JnL3JldmVyc2VcIixcclxuXHRcdCAgICBkYXRhVHlwZTogJ2pzb25wJyxcclxuXHRcdCAgICBqc29ucENhbGxiYWNrOiAnZGF0YScsXHJcbiAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICAgIGZvcm1hdDogXCJqc29uXCIsXHJcbiAgICAgICAgICAgICAgICBsaW1pdDogMSxcclxuICAgICAgICAgICAgICAgIGxhdDogZS5sYXRsbmcubGF0LFxyXG4gICAgICAgICAgICAgICAgbG9uOiBlLmxhdGxuZy5sbmcsXHJcbiAgICAgICAgICAgICAgICBhZHJlc3NkZXRhaWxzIDogMSxcclxuICAgICAgICAgICAgICAgIGpzb25fY2FsbGJhY2s6ICdkYXRhJ1xyXG4gICAgICAgICAgICB9LFxyXG5cdFx0ICAgIGVycm9yOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgYWxlcnQoJ1Byb2Jsw6htZSBkZSByZXF1w6h0ZScpOyB9LFxyXG5cdFx0ICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpe1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBpZiggZGF0YS5hZGRyZXNzICE9PSB1bmRlZmluZWQgKXtcclxuICAgICAgICAgICAgICAgICAgICBjb3VudHJ5ID0gZGF0YS5hZGRyZXNzWydjb3VudHJ5J107XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmKCBkYXRhLmFkZHJlc3NbJ2NpdHknXSAhPT0gdW5kZWZpbmVkICl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNpdHkgPSBkYXRhLmFkZHJlc3NbJ2NpdHknXTtcclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZSBpZiggZGF0YS5hZGRyZXNzWydjb3VudHknXSAhPT0gdW5kZWZpbmVkICl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNpdHkgPSBkYXRhLmFkZHJlc3NbJ2NvdW50eSddO1xyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNlIGlmKCBkYXRhLmFkZHJlc3NbJ3N0YXRlJ10gIT09IHVuZGVmaW5lZCApe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjaXR5ID0gZGF0YS5hZGRyZXNzWydzdGF0ZSddO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBMLm1hcmtlcihlLmxhdGxuZykuYWRkVG8obWFwKS5iaW5kUG9wdXAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiIFBheXMgOiBcIisgY291bnRyeStcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCIgPGJyPiBWaWxsZSA6IFwiICsgY2l0eVxyXG4gICAgICAgICAgICAgICAgICAgICAgICApLm9wZW5Qb3B1cCgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBMLmNpcmNsZShlLmxhdGxuZywgMSkuYWRkVG8obWFwKTtcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAkKCBcImlucHV0W25hbWU9J2l0aW5lcmFyeVtjb3VudHJ5TmFtZV0nXVwiICkudmFsKGNvdW50cnkpO1xyXG4gICAgICAgICAgICAgICAgICAgICQoIFwiaW5wdXRbbmFtZT0naXRpbmVyYXJ5W2NpdHlOYW1lXSddXCIgKS52YWwoY2l0eSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblx0XHQgICAgfVxyXG5cdFx0fSk7XHJcbiAgICB9KTtcclxuXHJcbn0iXSwic291cmNlUm9vdCI6IiJ9