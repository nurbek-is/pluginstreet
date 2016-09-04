var locations = [];
// constructor function
function station (city, building, fullAddress) {
  this.city = city;
  this.building = building;
  this.fullAddress = fullAddress;
  locations.push(this);
}
// Instantiating new objects
var unionSqSea = new station ('seattle', 'Union Square', "601 Union St, Seattle, WA 98101");
var pacificPlSea = new station ('seattle', 'Pacific Place', "705 Olive Way, Seattle, WA 98101");
var SheratonTac = new station ('tacoma', 'City Center', "234 Main St, Tacoma, WA 98109");
var BellevueMall = new station ('bellevue', 'Lincoln Square', '600 100th Pl NE, Bellevue, WA 98004');
var concTechBell = new station ('bellevue', 'Concur Technologies', '601 108th Ave NE, Bellevue, WA 98004');
var southParkPor = new station ('portland', 'South Park Seafood', '914 SW Taylor St. Portland, OR 97204');
var hotelJupiPor = new station ('portland', 'Hotel Jupiter','800 East Burnside, Portland, OR 97214');
//Object literal
var tracker = {
  getForm: document.getElementById('search'),
  searchWord: null,
  searchMatches: [],

  getQueryDataNmatch: function (event) {
    event.preventDefault();
    this.searchWord = event.target.searchName.value;
    this.searchWord = this.searchWord.toLowerCase();
    console.log (this.searchWord);

    for (var i = 0; i < locations.length; i++) {
      if (locations[i].city === this.searchWord) {
        console.log (locations[i].building + ", " + locations[i].fullAddress);
        tracker.searchMatches.push(locations[i].building + ", " + locations[i].fullAddress);
        console.log(tracker.searchMatches.length);

      };
    };
  },

  displaySearchResults: function (event) {
    event.preventDefault();
    var full_list = "";
    for (var i = 0; i < tracker.searchMatches.length; i++) {
      full_list = full_list + tracker.searchMatches[i] + '<br>';
      console.log (full_list);
      var list = document.getElementById('image');
      var head1 = document.createElement('h1');
      head1.innerHTML = full_list;
      list.appendChild(head1);
    };
    // if (tracker.searchMatches.indexOf(tracker.searchWord) > -1) {
    // console.log ('work');
    // var list = document.getElementById('image');
    // var head1 = document.createElement('h1');
    // head1.innerHTML = "That city is not in our system yet";
    // list.appendChild(head1);
    // };

  },
  runAllMethods: function () {
    tracker.getQueryDataNmatch (event);
    tracker.displaySearchResults (event);
  },
}
tracker.getForm.addEventListener('submit',tracker.runAllMethods);
