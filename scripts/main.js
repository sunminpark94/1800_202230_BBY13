function insertName() {
    firebase.auth().onAuthStateChanged((user) => {
      // Check if a user is signed in:
      if (user) {
        
        // Do something for the currently logged-in user here:
        console.log(user.uid);
        console.log(user.displayName);
        user_Name = user.displayName;
  
        //method #1:  insert with html only
        //document.getElementById("name-goes-here").innerText = fullName;    //using javascript
        // document.getElementById("name-goes-here").innerText = user_Name;    //using javascript
        //method #2:  insert using jquery
        $("#name-goes-here").text(user_Name); //using jquery
      } else {
        // No user is signed in.
      }
    });
  }
  insertName(); //run the function

  var currentUser;

  function insertTitle() {
    firebase.auth().onAuthStateChanged((user) => {
      // Check if a user is signed in:
      if (user) {

        // Do something for the currently logged-in user here:
        console.log(user.uid);
        console.log(user.displayName);
        user_Name = user.displayName;

    db.collection("users").doc(user.uid).collection("lists")
    .get()
    .then(function (snap) {
      snap.forEach(function(doc) {
        console.log(doc.data().title)
        document.getElementById("listTitle1").innerText = doc.data().title;
      })
    })
    }
})
}
insertTitle();
