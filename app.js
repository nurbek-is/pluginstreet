

// Object literal
var tracker = {
  getForm: document.getElementById('search'),
  searchWord: null,
  matchFound: false,
  matchedAddresses: [],
  matchedAddessLabels: [],


  getQueryDataNmatch: function (event) {
    tracker.matchedAddresses = [];
    tracker.matchedAddessLabels = [];
    initMap();
    event.preventDefault();
    this.searchWord = event.target.searchName.value;
    this.searchWord = this.searchWord.toLowerCase();
    console.log (this.searchWord);
    tracker.matchFound = false;
    for (var i = 0; i < locations.length; i++) {
      if (locations[i].city === this.searchWord) {
        addressString = locations[i].chargeType + ", " + locations[i].building + ", " + locations[i].fullAddress;
        tracker.matchedAddessLabels.push(addressString);
        tracker.matchedAddresses.push(locations[i].fullAddress);
      };
    };
    initMap();
  },


  runAllMethods: function () {

    tracker.getQueryDataNmatch (event);
    tracker.matchedAddresses = [];
  },
};

 tracker.getForm.addEventListener('submit',tracker.runAllMethods);


/// this function PINS STATIONS ON THE MAP ////

function geocodeSeveralAdresses(geocoder, resultsMap) {
  var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  var labelIndex = 0;

 for (var i = 0; i < tracker.matchedAddresses.length; i++) {
    geocoder.geocode({'address': tracker.matchedAddresses[i]}, function(results, status) {
      if (status === 'OK') {
        console.log('label index is ' + labelIndex);
        console.log ("Label..."+tracker.matchedAddessLabels [labelIndex].toString());
        var popUpWindow = new google.maps.InfoWindow({
        content: tracker.matchedAddessLabels [labelIndex]

        })
        resultsMap.setCenter(results[0].geometry.location);
        var marker = new google.maps.Marker  ({
          label: labels[labelIndex++ % labels.length],
          map: resultsMap,
          position: results[0].geometry.location
        });
        marker.addListener('click', function () {
          popUpWindow.open(map, marker);
        });
        tracker.matchFound = true;
      }
      else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  }
}

function initMap() {
  // alert("Initing map...");
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 15,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    center: {lat: 47.608013, lng: -122.335167}
  });
  var geocoder = new google.maps.Geocoder();
  geocodeSeveralAdresses(geocoder, map);

  // document.getElementById('submit').addEventListener('click', function() {
  //   geocodeSearchButton(geocoder, map);
  // });
}
