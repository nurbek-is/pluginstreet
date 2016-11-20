
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
        tracker.searchMatches.push(locations[i].building + ', ' + locations[i].chargeType + ',' + locations[i].fullAddress);
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
    // localStorage.setItem('foundAddresses', JSON.stringify(tracker.matchedAddresses));
    localStorage.setItem('foundAddresses', JSON.stringify(tracker.searchMatches));
    // alert ('addresses are ' + localStorage.foundAddresses);
      // alert (foundAddresses);
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
