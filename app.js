var locations = [];
// constructor function
function station (city, chargeType, building, fullAddress) {
  this.city = city;
  this.chargeType = chargeType;
  this.building = building;
  this.fullAddress = fullAddress;
  locations.push(this);
}
// Instantiating new objects
var fourthMadis = new station ('seattle', 'Level 2 Charger', 'Fourth and Madison Building', "925 4th Avenue, Seattle, WA 98101");
var thirdMadis = new station ('seattle','DC Fast Charger', 'Wells Fargo Center', "999 3rd Ave, Seattle, WA, 98104");
var pikeHarvard = new station ('seattle','DC Fast Charger', 'Harvard Market', "1406 Harvard Ave, Seattle, WA 98122");
var lakeUnion = new station ('seattle','Level 2 Charger', 'Amazon - Obidos/Rufus', "550 Terry Ave N, Seattle, WA, 98109");
var tacoPubUti = new station ('tacoma', 'Level 2 Charger', 'Tacoma Public Utilities', "3628 S 35th St, Tacoma, Washington 98409");
var BellevueMall = new station ('bellevue', 'Level 2 Charger', 'Lincoln Square', '600 100th Pl NE, Bellevue, WA 98004');
var concTechBell = new station ('bellevue', 'DC Fast Charger', 'Concur Technologies', '601 108th Ave NE, Bellevue, WA 98004');
var southParkPor = new station ('portland', 'Level 2 Charger', 'South Park Seafood', '914 SW Taylor St. Portland, OR 97204');
var hotelJupiPor = new station ('portland', 'Tesla Supercharger', 'Hotel Jupiter','800 East Burnside, Portland, OR 97214');
//Object literal
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
        console.log (locations[i].chargeType + ',' + locations[i].building + ', ' + locations[i].fullAddress);
        tracker.searchMatches.push(locations[i].building + ', ' + locations[i].fullAddress);
        tracker.matchedOneAdrs = locations[i].fullAddress;
        tracker.matchedAddresses.push(locations[i].fullAddress);
      };
    };
  },

  displaySearchResults: function () {
    var buildingAddress = '';
    for (var i = 0; i < tracker.searchMatches.length; i++) {
      buildingAddress = tracker.searchMatches[i];
      var table = document.getElementById('displayArea');
      var tableRow = document.createElement('tr');
      var aTag = document.createElement('a');
      var tableData = document.createElement('td');
      aTag.href = 'gmap.html';
      aTag.innerHTML = buildingAddress;
      tableData.appendChild(aTag);
      tableRow.appendChild (tableData);
      // tableData.addEventListener ('click', tracker.addToLocalStorage);
      var aTag4Charger = document.createElement('a');
      var tD = document.createElement('td');
      aTag4Charger.href = 'type.html';
      aTag4Charger.innerHTML = locations[i].chargeType;
      tD.appendChild(aTag4Charger);
      tableRow.appendChild (tD);
      table.appendChild(tableRow);
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
    localStorage.setItem('foundAddresses', JSON.stringify(tracker.matchedAddresses));
      // alert ('addresses are ' + localStorage.foundAddresses);
  },
  clearData: function() {
    var clearText = document.getElementById('displayArea');
    clearText.innerHTML = '';
    tracker.searchMatches = [];
  },
  runAllMethods: function () {
    tracker.clearData ();
    tracker.getQueryDataNmatch (event);
    tracker.displaySearchResults ();
    tracker.addToLocalStorage ();
  },
};
tracker.getForm.addEventListener('submit',tracker.runAllMethods);
