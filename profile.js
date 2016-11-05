var text = document.getElementById('stationsText')
var button = document.getElementById('submitBtn')


function submitClick() {
 var fireBaseRef = firebase.database().ref();
 var messageText = text.value;
 fireBaseRef.push().set(messageText);
}

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
