
// Object literal
var tracker = {
  getForm: document.getElementById('search'),
  searchWord: null,
  matchedAddresses: [],
  matchedAddessLabels: [],
  buildingNameArray: [],


  getQueryDataNmatch: function (event) {
    tracker.matchedAddresses = [];
    tracker.matchedAddessLabels = [];
    tracker.buildingNameArray = [];
    event.preventDefault();
    this.searchWord = event.target.searchName.value;
    this.searchWord = this.searchWord.toLowerCase();
    console.log (this.searchWord);
    for (var i = 0; i < locations.length; i++) {
      if (locations[i].city === this.searchWord) {
        var buildingNameNoSpace = locations[i].building.replace(/-|[/]|\s+/g, '');
        // alert ('buildingString is ' + buildingNameNoSpace);
        buildingName  = 'stationImages/' + buildingNameNoSpace + '.jpg';
        // alert ('buildingName is ' + buildingName);
        tracker.buildingNameArray.push(buildingName);
        console.log (tracker.buildingNameArray)
        addressString = locations[i].chargeType + ", " + locations[i].building + ", " + "<br>" +
        locations[i].fullAddress + "; " + ' Date Added: ' + locations[i].dateAdded;
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
      // var bounds = new google.maps.LatLngBounds();
      if (status === 'OK') {
        console.log('label index is ' + labelIndex);
        console.log ("Label..."+ tracker.matchedAddessLabels [labelIndex].toString());
        var popUpWindow = new google.maps.InfoWindow({
        content:"'" + '<IMG BORDER="0" ALIGN="Left" SRC=' + tracker.buildingNameArray [labelIndex] +
        '>' + "'" + " " + tracker.matchedAddessLabels [labelIndex]

        })
        console.log (results[0].geometry.location);
        resultsMap.setCenter(results[0].geometry.location);



                // this Function when clicked puts content= chargeType,buildingAddress etc
        var marker = new google.maps.Marker  ({
          label: labels[labelIndex++ % labels.length],
          map: resultsMap,
          position: results[0].geometry.location
        });
        marker.addListener('click', function () {
          popUpWindow.open(map, marker);
        });
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
    zoom: 14,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    center: {lat: 47.608013, lng: -122.335167}
  });
  var geocoder = new google.maps.Geocoder();
  geocodeSeveralAdresses(geocoder, map);
}
