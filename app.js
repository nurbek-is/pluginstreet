
var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
var labelIndex = 0;
var addressesForCity = [];
// Object literal
var tracker = {
  getForm: document.getElementById('search'),
  searchWord: null,
  searchMatches: [],
  matchFound: false,
  clearText: document.getElementById('displayArea'),
  matchedAddresses: [],

  getQueryDataNmatch: function (event) {
    event.preventDefault();
    this.searchWord = event.target.searchName.value;
    this.searchWord = this.searchWord.toLowerCase();
    console.log (this.searchWord);
    tracker.matchFound = false;
    for (var i = 0; i < locations.length; i++) {
      if (locations[i].city === this.searchWord) {
        console.log ('line 19' + locations[i].chargeType + "," + locations[i].building + "," + locations[i].fullAddress);
        tracker.searchMatches.push(locations[i].building + ', ' + locations[i].fullAddress);
        console.log (tracker.searchMatches);
        tracker.matchedOneAdrs = locations[i].fullAddress;
        tracker.matchedAddresses.push(locations[i].fullAddress);
      };
    };
  },

  displaySearchResults: function () {
    var buildingAddress = '';
    for (var i = 0; i < tracker.searchMatches.length; i++) {
      buildingAddress = tracker.searchMatches[i];
      console.log('iteration :' + [i] + buildingAddress);
      // var table = document.getElementById('displayArea');
      // var tableRow = document.createElement('tr');
      // var aTag = document.createElement('a');
      // var tableData = document.createElement('td');
      // aTag.href = 'index.html';
      // aTag.innerHTML = buildingAddress;
      // tableData.appendChild(aTag);
      // tableRow.appendChild (tableData);
      //
      // var aTag4Charger = document.createElement('a');
      // var tD = document.createElement('td');
      // aTag4Charger.href = 'type.html';
      // aTag4Charger.innerHTML = locations[i].chargeType;
      // tD.appendChild(aTag4Charger);
      // tableRow.appendChild (tD);
      // table.appendChild(tableRow);
      tracker.matchFound = true;
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
    //  localStorage.setItem('foundAddresses', JSON.stringify(tracker.matchedAddresses));
     localStorage.setItem('foundAddresses', JSON.stringify(tracker.searchMatches));
    alert ('addresses are ' + localStorage.foundAddresses);
  },
  // clearData: function() {
  //   var clearText = document.getElementById('displayArea');
  //   clearText.innerHTML = '';
  //   tracker.searchMatches = [];
  // },
  runAllMethods: function () {
    //  tracker.clearData ();

    tracker.getQueryDataNmatch (event);
    // tracker.displaySearchResults ();
    tracker.addToLocalStorage ();
    initMap();
    tracker.searchMatches = [];

  },
};

 tracker.getForm.addEventListener('submit',tracker.runAllMethods);







/// this function PINS STATIONS ON THE MAP ////

function geocodeSeveralAdresses(geocoder, resultsMap) {
 var addressesForCity = JSON.parse(localStorage.getItem('foundAddresses'));
alert ('addressesForCity is ' +  addressesForCity);
  for (var i = 0; i < addressesForCity.length; i++) {
    geocoder.geocode({'address': addressesForCity[i]}, function(results, status) {
      if (status === 'OK') {
        console.log('label index is ' + labelIndex);
        var popUpWindow = new google.maps.InfoWindow({
          content: addressesForCity[labelIndex]
        })
        resultsMap.setCenter(results[0].geometry.location);
        var marker = new google.maps.Marker  ({
          label: labels[labelIndex++ % labels.length],
          map: resultsMap,
          // title: tracker.searchMatches[i];
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
