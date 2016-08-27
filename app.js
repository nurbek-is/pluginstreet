
// Deifne function to create user model class
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

function getUserName () {
  if (localStorage.userProfile) {
    console.log (localStorage.userProfile)
    var getUserNameData = JSON.parse(localStorage.getItem('userProfile'));
    console.log (getUserNameData);
    console.log (getUserNameData.name);
    document.getElementById('username').innerHTML = getUserNameData.name
//     if (getUserNameData.tesla === true) {
//       document.getElementById('icons').innerHTML = '<a href="https://www.netflix.com/" target = "_blank"><img src="tesla.png"/></a>'
//     }
//     if (getUserNameData.leaf === true) {
//       document.getElementById('icons2').innerHTML = '<a href="http://www.hulu.com/welcome" target = "_blank"><img src="images/nissan.jpg"/></a>'
//     }
//     if (getUserNameData.bmw === true) {
//       document.getElementById('icons3').innerHTML = '<a href="https://order.hbonow.com/" target = "_blank"><img src="images/bmw.jpg"/></a>'
//     }
  }
};
getUserName ();
