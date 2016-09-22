function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 8,
    center: {lat: -34.397, lng: 150.644}
  });
  var geocoder = new google.maps.Geocoder();

        // document.getElementById('submit').addEventListener('click', function() {
        //   geocodeAddress(geocoder, map);
        // });
  geocodeAddress(geocoder, map);
}

function geocodeAddress(geocoder, resultsMap) {
  var getAddress = JSON.parse(localStorage.getItem('foundOneAdrs'));
  geocoder.geocode({'address': getAddress}, function(results, status) {
    if (status === 'OK') {
      resultsMap.setCenter(results[0].geometry.location);
      var marker = new google.maps.Marker({
        map: resultsMap,
        position: results[0].geometry.location
      });
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}
