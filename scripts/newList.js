var currentUser;


  function saveNewList() {

        let listTitle = document.getElementById('list-title').value;
        // let listItem = document.getElementById('list-item').value;
        console.log(listTitle);

        firebase.auth().onAuthStateChanged((user) => {
          // Check if a user is signed in:
          if (user) {
            var currentUser = db.collection("users").doc(user.uid).collection("lists")
            var userID = user.uid;

            currentUser.get()
              .then(userDoc => {
                db.collection("users").doc(user.uid).collection("lists").add({
                  title: listTitle,
                  timestamp: firebase.firestore.FieldValue.serverTimestamp()
                }).then(()=> {
                  window.location.href = "main.html";
                })
              })
      }
    })
  }

