// var fireHeading = document.getElementById('heading')
//
// var fireBaseHeadingRef = firebase.database().ref().child("whatev");
//
// fireBaseHeadingRef.on('value', function (datasnapshot){
// fireHeading.innerText = datasnapshot.val();
// });

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

var stationRef = TheDatabase.ref('stations');
stationRef.on ('child_added', function (snapshot){
  snapshot.forEach(function(childSnapshot){
    var childData = childSnapshot.val();
    var idElement = document.getElementById('addedAddress');
    var liEL = document.createElement('li');
    liEL.textContent = childData;
    idElement.appendChild(liEL);
  });
});
