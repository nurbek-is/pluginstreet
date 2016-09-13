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
var unionSqSea = new station ('seattle', 'Level 2', 'Union Square', "601 Union St, Seattle, WA 98101");
var pacificPlSea = new station ('seattle','Level 2', 'Pacific Place', "705 Olive Way, Seattle, WA 98101");
var SheratonTac = new station ('tacoma', 'DC Fast Charger', 'City Center', "234 Main St, Tacoma, WA 98109");
var BellevueMall = new station ('bellevue', 'Level 2', 'Lincoln Square', '600 100th Pl NE, Bellevue, WA 98004');
var concTechBell = new station ('bellevue', 'DC Fast Charger', 'Concur Technologies', '601 108th Ave NE, Bellevue, WA 98004');
var southParkPor = new station ('portland', 'Level 2', 'South Park Seafood', '914 SW Taylor St. Portland, OR 97204');
var hotelJupiPor = new station ('portland', 'Tesla Supercharger', 'Hotel Jupiter','800 East Burnside, Portland, OR 97214');
//Object literal
var tracker = {
  getForm: document.getElementById('search'),
  searchWord: null,
  searchMatches: [],
  clearButton: document.getElementById('clearlist'),
  matchFound: false,
  clearText: document.getElementById('displayArea'),

  getQueryDataNmatch: function (event) {
    event.preventDefault();
    this.searchWord = event.target.searchName.value;
    this.searchWord = this.searchWord.toLowerCase();
    tracker.matchFound = false;
    console.log (this.searchWord);

    for (var i = 0; i < locations.length; i++) {
      if (locations[i].city === this.searchWord) {
        console.log (locations[i].building + ', ' + locations[i].fullAddress);
        tracker.searchMatches.push(locations[i].building + ', ' + locations[i].fullAddress);
        console.log(tracker.searchMatches.length);
      };
    };
  },

  displaySearchResults: function (event) {
    event.preventDefault();
    var full_list = '';
    for (var i = 0; i < tracker.searchMatches.length; i++) {
      full_list = tracker.searchMatches[i];
      console.log (full_list);
      var table = document.getElementById('displayArea');
      var tableRow = document.createElement('tr');
      var tableData = document.createElement('td');
      tableData.innerHTML = full_list;
      tableRow.appendChild (tableData);
      console.log (tableRow);
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
  clearData: function() {
    var clearText = document.getElementById('displayArea');
    clearText.innerHTML = '';
    tracker.searchMatches = [];
  },


  runAllMethods: function () {
    tracker.clearData (event);
    tracker.getQueryDataNmatch (event);
    tracker.displaySearchResults (event);
  },
};
tracker.getForm.addEventListener('submit',tracker.runAllMethods);
// tracker.clearButton.addEventListener('click',tracker.clearData);
