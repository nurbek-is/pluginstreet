var TheDatabase = firebase.database();
function addStation(){
  var building = document.getElementById('building').value;
  var address = document.getElementById('address').value;
  var city = document.getElementById('city').value;
  var state = document.getElementById('state').value;
  var zip = document.getElementById('zip').value;

  var newStationEntry = TheDatabase.ref().child('stations').push().key;
    TheDatabase.ref('stations/'+newStationEntry+'/building').set(building);
    TheDatabase.ref('stations/'+newStationEntry+'/address').set(address);
    TheDatabase.ref('stations/'+newStationEntry+'/city').set(city);
    TheDatabase.ref('stations/'+newStationEntry+'/state').set(state);
    TheDatabase.ref('stations/'+newStationEntry+'/zip').set(zip);
}

var storage = firebase.storage().ref();
var uploader = document.getElementById('uploader');
var fileButton = document.getElementById ('fileButton');

fileButton.addEventListener('change', function (e){
  //get file
  var file = e.target.files[0];
// create a storage ref
var storageRef = firebase.storage().ref('sweet_gifs/' + file.name);

//Upload file
var task = storageRef.put(file);

// Update progress bar
task.on('state_changed',


    function progress (snapshot) {
    var percentage = snapshot.bytesTransferred /
    snapshot.totalBytes) * 100;
    uploader.value = percentage;

},
function error (err) {

},
function complete () {

},

),
});

// Define function to create user model class
function User(name, email) {
  this.name = name;
  this.email = email;
  this.tesla = tesla.checked;
  this.leaf = leaf.checked;
  this.bmw = bmw.checked;
};

function getUserData(event) {
  // Avoid page reloading on form submission
  event.preventDefault();
  // Get values from the form
  var fullName = event.target.fullName.value;
  var email = event.target.fullName.email;
  // Create new instance of user model
  var newUser = new User(fullName, email);
  // Set data to local storage
  localStorage.setItem('userProfile', JSON.stringify(newUser));
}
var personInfo = document.getElementById('personinfo')
personInfo.addEventListener('submit', getUserData);

// This function will store your name and your selection of car types in localStorage and display on right top corner
function getUserName () {
  if (localStorage.userProfile) {
    console.log (localStorage.userProfile)
    var getUserNameData = JSON.parse(localStorage.getItem('userProfile'));
    console.log (getUserNameData);
    console.log (getUserNameData.name);
    var firstLetterName = getUserNameData.name.charAt(0).toUpperCase ();
    var restLetterName = getUserNameData.name.slice(1);
    document.getElementById('username').innerHTML = 'Hi ' + firstLetterName + restLetterName + "!";
    if (getUserNameData.tesla === true) {
      document.getElementById('icons').innerHTML = '<a href="https://www.tesla.com/" target = "_blank"><img src="images/tesla.png"/></a>'
    }
    if (getUserNameData.leaf === true) {
      document.getElementById('icons2').innerHTML = '<a href="http://www.nissanusa.com/leaf" target = "_blank"><img src="images/nissan.jpg"/></a>'
    }
    if (getUserNameData.bmw === true) {
      document.getElementById('icons3').innerHTML = '<a href="https://www.bmwusa.com/i3‎" target = "_blank"><img src="images/bmw.jpg"/></a>'
    }
  }
};
getUserName ();
