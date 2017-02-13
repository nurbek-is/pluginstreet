
// Object literal
var tracker = {
  getForm: document.getElementById('search'),
  searchWord: null,
  matchedAddresses: [],
  matchedAddessLabels: [],
  buildingNameArray: [],
  foundMatch: false,

  IPlocation: function () {
//     $.get("http://ipinfo.io", function(response) {
//   console.log(response.ip, response.country);
// }, "jsonp")
    $.getJSON('http://ipinfo.io', function(data){
      console.log(data)
    })
  },

  getQueryDataNmatch: function (event) {
    tracker.matchedAddresses = [];
    tracker.matchedAddessLabels = [];
    tracker.buildingNameArray = [];
    event.preventDefault();
    this.searchWord = event.target.searchName.value;
    this.searchWord = this.searchWord.toLowerCase();
    console.log (this.searchWord);
    tracker.foundMatch = false;
    for (var i = 0; i < locations.length; i++) {
      if (locations[i].city === this.searchWord) {
        tracker.foundMatch = true;
        var buildingNameNoSpace = locations[i].building.replace(/-|[/]|\s+/g, '');
        // alert ('buildingString is ' + buildingNameNoSpace);
        buildingName  = 'stationImages/' + buildingNameNoSpace + '.jpg';
        // alert ('buildingName is ' + buildingName);
        tracker.buildingNameArray.push(buildingName);
        console.log (tracker.buildingNameArray)
        addressString = locations[i].chargeType + ", " + locations[i].building + ", " + "<br>" +
        locations[i].fullAddress + "; " + ' Date Added: ' + locations[i].dateAdded;
        tracker.matchedAddessLabels.push(addressString);
        console.log ('tracker.matchedAddessLabels is ' + tracker.matchedAddessLabels)
        tracker.matchedAddresses.push(locations[i].fullAddress);
        console.log ('tracker.matchedAddresses is ' + tracker.matchedAddresses)
        }
      }
      if (tracker.foundMatch === false) {
        alert('SORRY,That city is NOT in our system yet');
      }
    initMap();
  },

  /// this function PINS STATIONS ON THE MAP ////
  geocodeSeveralAdresses: function (geocoder, resultsMap) {
    var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var labelIndex = 0;

   for (var i = 0; i < tracker.matchedAddresses.length; i++) {
      geocoder.geocode({'address': tracker.matchedAddresses[i]}, function(results, status) {

        if (status === 'OK') {
          addressOnly = tracker.matchedAddessLabels [labelIndex].split('<br>').pop().split(';').shift()
          var popUpWindow = new google.maps.InfoWindow({
          content:"'" + '<IMG BORDER="0" ALIGN="Left" SRC=' + tracker.buildingNameArray [labelIndex] +
          '>' + "'" + " " + tracker.matchedAddessLabels [labelIndex] + '<br>' + "<a href='http://maps.google.com/maps?saddr=" + " "+ "&daddr=" + addressOnly +
          " + 'target='+'_blank'>Navigation</a>"

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
  },

  runAllMethods: function () {

    tracker.getQueryDataNmatch (event);
    tracker.matchedAddresses = [];
    tracker.IPlocation ();
  },
};

 tracker.getForm.addEventListener('submit',tracker.runAllMethods);

function initMap() {
  // alert("Initing map...");
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 14,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    center: {lat: 47.608013, lng: -122.335167}
  });
  var geocoder = new google.maps.Geocoder();
  tracker.geocodeSeveralAdresses(geocoder, map);
}
