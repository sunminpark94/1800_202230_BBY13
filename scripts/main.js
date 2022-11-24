function insertName() {
  firebase.auth().onAuthStateChanged((user) => {
    // Check if a user is signed in:
    if (user) {
      // Do something for the currently logged-in user here:
      // console.log(user.uid);
      // console.log(user.displayName);
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
  let listCard = document.getElementById("listCardTemplate");
  let listDiv = document.getElementById("lists-go-here");

  firebase.auth().onAuthStateChanged((user) => {
    // Check if a user is signed in:
    if (user) {

      // Do something for the currently logged-in user here:
      // console.log(user.uid);
      // console.log(user.displayName);
      user_Name = user.displayName;

  db.collection("users").doc(user.uid).collection("lists")
  .get()
  .then(function (snap) {
    snap.forEach(function(doc) {
      let taskBodyID = doc.id;
      var listTitle = doc.data().title;

      let currentCard = listCard.content.cloneNode(true);
      currentCard.querySelector('.tasks-go-here').setAttribute("id", taskBodyID);
      currentCard.querySelector('.card-title').innerHTML = listTitle;
      currentCard.querySelector('.closeButton').setAttribute('id', "0" + doc.id);
      // loop for adding in tasks items
      db.collection("users").doc(user.uid).collection("lists").doc(doc.id).collection("tasks")
      .get()
      .then(function (snap2) {
        let taskItem = document.getElementById("taskItemTemplate");
        // let taskList = document.getElementById("tasks-go-here");

        snap2.forEach(function(doc) {
          console.log(doc.id);
          // console.log(doc.id);
          // console.log(doc.data().details)

          let taskDetails = doc.data().details;
          let isChecked = doc.data().state;

          let tasksDiv = document.getElementById(taskBodyID);
          let currentTask = taskItem.content.cloneNode(true);
          currentTask.querySelector('.taskItemContainer').setAttribute('id', doc.id);
          let checkbox = currentTask.querySelector('.taskCheckbox')
          checkbox.setAttribute('id', "c" + doc.id);
          checkbox.setAttribute('checked', isChecked);
          // currentTask.querySelector('.taskCheckbox').setAttribute('onclick',changeCheckboxState(currentTask.id));

// new code
          currentTask.querySelector('.taskItem').innerHTML = taskDetails;

// end new code

          tasksDiv.appendChild(currentTask);
          // currentTask.setAttribute("id" , doc.id)
        })
      }
      )
      listDiv.appendChild(currentCard);
    })
  })
  }
})
}
function changeCheckboxState(checkbox) {
  firebase.auth().onAuthStateChanged((user) => {
    // Check if a user is signed in:
    if (user) {
  let currentTaskID = checkbox.parentElement.getAttribute('id');
  console.log(currentTaskID);
  let currentListID = checkbox.parentElement.parentElement.getAttribute('id');
  console.log(currentListID);
  // currentTaskID.addEventListener
  db.collection("users").doc(user.uid).collection("lists").doc(currentListID).collection("tasks").doc(currentTaskID)
  .update({
    "state": true
  });
  }
}
)
}

// function changeCheckboxState(checkbox) {
//   firebase.auth().onAuthStateChanged((user) => {
//     // Check if a user is signed in:
//     if (user) {
//       let currentTaskID = checkbox.nextElementSibling.getAttribute('id');
//       let currentListID = checkbox.parentElement.parentElement.getAttribute('id');

//       db.collection("users").doc(user.uid).collection("lists").doc(currentListID).collection("tasks").get()
//       .then((snap2) => {
//         snap2.forEach((doc) => {
//           if (doc.id === currentTaskID) {
//             const data = doc.data();
//             // const batch = db.batch();
//             doc.ref.update(doc.ref, { 
//               'state': !data.state || false,
//               'details': data.details
//             });
//             // batch.commit();
//           }
//         });
//       });
//     }
//   })

function handleCloseButtonClick(buttonItself) {
  let idToDelete = buttonItself.getAttribute('id');
  idToDelete = idToDelete.substring(1);
  firebase.auth().onAuthStateChanged((user) => {
    let doc = db.collection("users").doc(user.uid);
    doc.collection("lists").get()
      .then((item) => {
        for(let i = 0; i < item.docs.length; i++) {
          if (item.docs[i].id === (idToDelete)) {
              const batch = db.batch();
              batch.delete(item.docs[i].ref);
              batch.commit();
          }
      }
      })
  });

  let pointer = buttonItself;
  while (pointer.className !== 'card') {
    pointer = pointer.parentElement;
  }
  pointer.parentElement.removeChild(pointer);
}

insertCards();