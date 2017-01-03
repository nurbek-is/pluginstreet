

// Object literal
var tracker = {
  getForm: document.getElementById('search'),
  searchWord: null,

  matchFound: false,
  clearText: document.getElementById('displayArea'),
  matchedAddresses: [],
  // addressString: [],

  getQueryDataNmatch: function (event) {
    event.preventDefault();
    this.searchWord = event.target.searchName.value;
    this.searchWord = this.searchWord.toLowerCase();
    console.log (this.searchWord);
    tracker.matchFound = false;
    for (var i = 0; i < locations.length; i++) {
      if (locations[i].city === this.searchWord) {
        console.log (locations[i].chargeType + "," + locations[i].building + "," + locations[i].fullAddress);
        tracker.matchedAddresses.push(locations[i].fullAddress);
        console.log (tracker.matchedAddresses);
        // addressString = tracker.matchedAddresses.toString()
        // console.log (addressString);
        // tracker.matchedAddresses.push(locations[i].chargeType + "," + locations[i].building + "," + locations[i].fullAddress);
        // console.log (tracker.matchedAddresses)
      };
    };
  },

  displaySearchResults: function () {
    var buildingAddress = '';
    for (var i = 0; i < tracker.WHATEV.length; i++) {
      buildingAddress = tracker.WHATEV[i];
      console.log('iteration :' + [i] + buildingAddress);

    };
    if (tracker.matchFound === false) {
      console.log ('not found');
      var list = document.getElementById('displayArea');
      var head1 = document.createElement('h1');
      head1.innerHTML = 'That City Is Not in Our System Yet';
      list.appendChild(head1);
    };
  },
  addToLocalStorage: function () {
      localStorage.setItem('foundAddresses', JSON.stringify(tracker.matchedAddresses));
      console.log (' local storage addresses are ' + localStorage.foundAddresses);
  },

  runAllMethods: function () {

     tracker.getQueryDataNmatch (event);
    //  tracker.displaySearchResults ();
     tracker.addToLocalStorage ();
    initMap();
    tracker.matchedAddresses = [];

  },
};

 tracker.getForm.addEventListener('submit',tracker.runAllMethods);




/// this function PINS STATIONS ON THE MAP ////

function geocodeSeveralAdresses(geocoder, resultsMap) {
  var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  var labelIndex = 0;
  // var addressString = 0;
 var addressesForCity = JSON.parse(localStorage.getItem('foundAddresses'));
 console.log ('addressesForCity is ' +  addressesForCity);
  for (var i = 0; i < tracker.matchedAddresses.length; i++) {
    geocoder.geocode({'address': tracker.matchedAddresses[i]}, function(results, status) {
      if (status === 'OK') {
        console.log('label index is ' + labelIndex);
        var popUpWindow = new google.maps.InfoWindow({
        content: addressesForCity [labelIndex]
        // content: tracker.matchedAddresses[labelIndex]
        // content: tracker.matchedAddresses[i]
        // content: addressString[labelIndex]

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
