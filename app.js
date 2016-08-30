var locations = [];
function station (city, fullAddress) {
  this.city = city;
  this.fullAddress = fullAddress;
  locations.push(this);
}

  var unionSqSea = new station ('seattle', "601 Union St, Seattle, WA 98101");
  var SheratonTac = new station ('tacoma', "234 Main St, Tacoma, WA 98109");
    console.log (unionSqSea);

var tracker = {
  getForm: document.getElementById('search'),
  searchWord: null,


  getQueryData: function (event) {
    event.preventDefault();
    this.searchWord = event.target.searchName.value;
    var queryWord = this.searchWord.toLowerCase();
    console.log (queryWord);

       for (var i = 0; i < locations.length; i++) {
         if (locations[i] === queryWord) {
           console.log('match');
         }
       }

    // this below is NOT working, for some reason. Need help on this.

    // if (locations.indexOf(queryWord)) > - 1 {
    //   console.log('matched');
    //     }

      // if it matches, append the address to the page Here.
  },
}
tracker.getForm.addEventListener('submit',tracker.getQueryData);
