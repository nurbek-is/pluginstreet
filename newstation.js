var fireHeading = document.getElementById('heading')

var fireBaseHeadingRef = firebase.database().ref().child("whatev");

fireBaseHeadingRef.on('value', function (datasnapshot){
fireHeading.innerText = datasnapshot.val();
});
