 var TheDatabase = firebase.database();
// function addStation(){
//   var txtName = document.getElementById('txtName').value;
//   var email = document.getElementById('email').value;
//   var building = document.getElementById('building').value;
//   var chargeOptions = document.getElementById("chTypes");
//   var chargeTypes = chargeOptions.options[chargeOptions.selectedIndex].text;
//   var address = document.getElementById('address').value;
//   var city = document.getElementById('city').value;
//   var state = document.getElementById('state').value;
//   var zip = document.getElementById('zip').value;
//   var note = document.getElementById('note').value;
//   var newStationEntry = TheDatabase.ref().child('stations').push().key;
//     TheDatabase.ref('stations/'+newStationEntry+'/txtName').set(txtName);
//     TheDatabase.ref('stations/'+newStationEntry+'/email').set(email);
//     TheDatabase.ref('stations/'+newStationEntry+'/building').set(building);
//     TheDatabase.ref('stations/'+newStationEntry+'/address').set(address);
//     TheDatabase.ref('stations/'+newStationEntry+'/chargeTypes').set(chargeTypes);
//     TheDatabase.ref('stations/'+newStationEntry+'/city').set(city);
//     TheDatabase.ref('stations/'+newStationEntry+'/state').set(state);
//     TheDatabase.ref('stations/'+newStationEntry+'/zip').set(zip);
//     TheDatabase.ref('stations/'+newStationEntry+'/note').set(note);
// }
// // adding station images to FireBase
//
// var storage = firebase.storage().ref();
// var uploader = document.getElementById('uploader');
// var chooseImg = document.getElementById ('chooseImg4upld');


// chooseImg.addEventListener('change', function (e){
//   //get file
//   var file = e.target.files[0];
// // create a storage ref
//   var storageRef = firebase.storage().ref('AddedStations/' + file.name);
// //Upload file
//   var task = storageRef.put(file);
// //Update progress bar
//   task.on('state_changed',
//     function progress (snapshot) {
//       var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//       uploader.value = percentage;
//     },
// function error (err) {
//   alert("Error: ")
//   alert(err);
// },
// function complete () { } );
// });

////////***  Signing up New Users Section ***//////////////

// get Elements
const txtEmail = document.getElementById('txtEmail');
const txtPassword = document.getElementById('txtPassword');
const btnLogin = document.getElementById('logIn');
const btnSignUp = document.getElementById('signUp');
const btnLogOut = document.getElementById('logOut');

btnLogin.addEventListener ('click', e =>{
  // Get Email and pass
  const email = txtEmail.value;
  const pass = txtPassword.value;
  const auth = firebase.auth();

  // Sign in
  const promise = auth.signInWithEmailAndPassword(email, pass);
  promise.catch (e => console.log (e.message));
  });
// Add sign up event
btnSignUp.addEventListener('click', e => {
  // Get Email and pass
  // TODO: Check 4 Real Emails
  const email = txtEmail.value;
  const pass = txtPassword.value;
  const auth = firebase.auth();
  // Sign in
  const promise = auth.createUserWithEmailAndPassword(email, pass);
  promise
        .catch (e => console.log (e.message));
        handleSelectCars();
});

//this sign out current authenticated user
btnLogOut.addEventListener('click', e => {
  firebase.auth().signOut();
});

// Add a realtime listener
firebase.auth().onAuthStateChanged(firebaseUser => {
  if (firebaseUser) {
    console.log (firebaseUser);
    $("#logOut").show();
  } else {
    console.log ('not logged in');
    $("#logOut").hide();
  }
});

function handleSelectCars() {
  var userEmail = personinfo.txtEmail.value;
 var carName = personinfo.carNameTypesSelect.value;
 var userInfo = TheDatabase.ref().child('NewUsers').push().key;
 TheDatabase.ref('NewUsers/'+userInfo+'/carName').set(carName);
 TheDatabase.ref('NewUsers/'+userInfo+'/userEmail').set(userEmail);
}

// handleSelect();
// function User(name, email) {
//   this.name = name;
//   this.email = email;
//   this.tesla = tesla.checked;
//   this.leaf = leaf.checked;
//   this.bmw = bmw.checked;
// };

// function getUserData(event) {
//   // Avoid page reloading on form submission
//   event.preventDefault();
//   // Get values from the form
//   var fullName = event.target.fullName.value;
//   var email = event.target.fullName.email;
//   // Create new instance of user model
//   var newUser = new User(fullName, email);
//   // Set data to local storage
//   localStorage.setItem('userProfile', JSON.stringify(newUser));
// }
// var personInfo = document.getElementById('personinfo')
// personInfo.addEventListener('submit', getUserData);


// This function will store your name and your selection of car types in localStorage and display on right top corner
// function getUserName () {
//   if (localStorage.userProfile) {
//     console.log (localStorage.userProfile)
//     var getUserNameData = JSON.parse(localStorage.getItem('userProfile'));
//     console.log (getUserNameData);
//     console.log (getUserNameData.name);
//     var firstLetterName = getUserNameData.name.charAt(0).toUpperCase ();
//     var restLetterName = getUserNameData.name.slice(1);
//     document.getElementById('username').innerHTML = 'Hi ' + firstLetterName + restLetterName + "!";
//     if (getUserNameData.tesla === true) {
//       document.getElementById('icons').innerHTML = '<a href="https://www.tesla.com/" target = "_blank"><img src="images/tesla.png"/></a>'
//     }
//     if (getUserNameData.leaf === true) {
//       document.getElementById('icons2').innerHTML = '<a href="http://www.nissanusa.com/leaf" target = "_blank"><img src="images/nissan.jpg"/></a>'
//     }
//     if (getUserNameData.bmw === true) {
//       document.getElementById('icons3').innerHTML = '<a href="https://www.bmwusa.com/i3‎" target = "_blank"><img src="images/bmw.jpg"/></a>'
//     }
//   }
// };
// getUserName ();
