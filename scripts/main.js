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

  function insertCards() {
    let card = document.getElementById("cards");
    let listDiv = document.getElementById("list");

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
        let currentListID = doc.id;
        console.log(doc.data().title)
        // document.getElementsByClassName("listTitle1").innerText = doc.data().title;
        var listTitle = doc.data().title;

        let testCard = card.content.cloneNode(true);
        testCard.querySelector('.card-title').innerHTML = listTitle;
        // loop for adding in tasks items  
        db.collection("users").doc(user.uid).collection("lists").doc(currentListID).collection("tasks")
        .get()
        .then(function (snap2) {
          let taskItem = document.getElementById("taskItem");
          let taskList = document.getElementById("card-body");

          snap2.forEach(function(doc) {
            console.log(doc.data().details)

            var taskDetails = doc.data().details;

            let testTask = taskItem.content.cloneNode(true);
            testTask.querySelector('.taskDetails').innerHTML = taskDetails;
            taskList.appendChild(testTask);
          })
        }
        )
        listDiv.appendChild(testCard);
      })
    })
    }
})
}

insertCards();

//   function insertTitle() {
//     firebase.auth().onAuthStateChanged((user) => {
//       // Check if a user is signed in:
//       if (user) {

//         // Do something for the currently logged-in user here:
//         console.log(user.uid);
//         console.log(user.displayName);
//         user_Name = user.displayName;

//     db.collection("users").doc(user.uid).collection("lists")
//     .get()
//     .then(function (snap) {
//       snap.forEach(function(doc) {
//         console.log(doc.data().title)
//         document.getElementById("listTitle1").innerText = doc.data().title;
//       })
//     })
//     }
// })
// }
// insertTitle();

// function insertTask() {
//   firebase.auth().onAuthStateChanged((user) => {
//     // Check if a user is signed in:
//     if (user) {

//       // Do something for the currently logged-in user here:
//       console.log(user.uid);
//       console.log(user.displayName);
//       user_Name = user.displayName;

//   db.collection("users").doc(user.uid).collection("lists").doc("list1").collection("tasks")
//   .get()
//   .then(function (snap) {
//     snap.forEach(function(doc) {
//       console.log(doc.data().details)
//       document.getElementById("listTask1").innerText = doc.data().details;
//     })
//   })
//   }
// })
// }
// insertTask();
