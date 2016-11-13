
function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 15,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    center: {lat: 47.608013, lng: -122.335167}
  });
  var geocoder = new google.maps.Geocoder();
  geocodeSeveralAdresses(geocoder, map);

  document.getElementById('submit').addEventListener('click', function() {
    geocodeSearchButton(geocoder, map);
  });
}

//// THis is General Search Function in Map, IT DOESN'T FIND ANY STATIONS//////
function geocodeSearchButton(geocoder, resultsMap) {
  var address = document.getElementById('address').value;
  geocoder.geocode({'address': address}, function(results, status) {
    if (status === 'OK') {
      resultsMap.setCenter(results[0].geometry.location);
        var marker = new google.maps.Marker  ({
          map: resultsMap,
          title: "Click  for more details";
          position: results[0].geometry.location
        });
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}

/// this function PINS STATIONS ON THE MAP ////

function geocodeSeveralAdresses(geocoder, resultsMap) {
  var addressesForCity = JSON.parse(localStorage.getItem('foundAddresses'));

  for (var i = 0; i < addressesForCity.length; i++) {
    geocoder.geocode({'address': addressesForCity[i]}, function(results, status) {
      if (status === 'OK') {
        resultsMap.setCenter(results[0].geometry.location);
        var marker = new google.maps.Marker  ({
          map: resultsMap,
          position: results[0].geometry.location
        });
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  }
  addressesForCity = [];
}
