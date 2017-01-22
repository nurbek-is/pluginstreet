var TheDatabase = firebase.database();
function addStation(){
  var txtName = document.getElementById('txtName').value;
  var email = document.getElementById('email').value;
  var building = document.getElementById('building').value;
  var chargeOptions = document.getElementById("chTypes");
  var chargeTypes = chargeOptions.options[chargeOptions.selectedIndex].text;
  var address = document.getElementById('address').value;
  var city = document.getElementById('city').value;
  var state = document.getElementById('state').value;
  var zip = document.getElementById('zip').value;
  var note = document.getElementById('note').value;
  var newStationEntry = TheDatabase.ref().child('stations').push().key;
    TheDatabase.ref('stations/'+newStationEntry+'/txtName').set(txtName);
    TheDatabase.ref('stations/'+newStationEntry+'/email').set(email);
    TheDatabase.ref('stations/'+newStationEntry+'/building').set(building);
    TheDatabase.ref('stations/'+newStationEntry+'/address').set(address);
    TheDatabase.ref('stations/'+newStationEntry+'/chargeTypes').set(chargeTypes);
    TheDatabase.ref('stations/'+newStationEntry+'/city').set(city);
    TheDatabase.ref('stations/'+newStationEntry+'/state').set(state);
    TheDatabase.ref('stations/'+newStationEntry+'/zip').set(zip);
    TheDatabase.ref('stations/'+newStationEntry+'/note').set(note);
}
// adding station images to FireBase

var storage = firebase.storage().ref();
var uploader = document.getElementById('uploader');
var chooseImg = document.getElementById ('chooseImg4upld');
chooseImg.addEventListener('change', function (e){
  //get file
  var file = e.target.files[0];
// create a storage ref
  var storageRef = firebase.storage().ref('AddedStations/' + file.name);
//Upload file
  var task = storageRef.put(file);
//Update progress bar
  task.on('state_changed',
    function progress (snapshot) {
      var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      uploader.value = percentage;
    },
function error (err) {
  alert("Error: ")
  alert(err);
},
function complete () { } );
});
