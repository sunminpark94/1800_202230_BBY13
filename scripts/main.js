function insertName() {
    firebase.auth().onAuthStateChanged((user) => {
      // Check if a user is signed in:
      if (user) {
        // Do something for the currently logged-in user here:
        console.log(user.uid);
        console.log(user.displayName);
        user_Name = user.displayName;
  
        //method #1:  insert with html only
<<<<<<< HEAD
        //document.getElementById("name-goes-here").innerText = fullName;    //using javascript
=======
        document.getElementById("name-goes-here").innerText = user_Name;    //using javascript
>>>>>>> f9868cf419503d15120c146231c661a6abf54439
        //method #2:  insert using jquery
        $("#name-goes-here").text(user_Name); //using jquery
      } else {
        // No user is signed in.
      }
    });
  }
  insertName(); //run the function