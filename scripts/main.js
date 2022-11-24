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

          var taskDetails = doc.data().details;

          let tasksDiv = document.getElementById(taskBodyID);
          let currentTask = taskItem.content.cloneNode(true);
          currentTask.querySelector('.taskItem').setAttribute('id', doc.id);
          currentTask.querySelector('.taskDetails').innerHTML = taskDetails;
          currentTask.querySelector('.taskCheckbox').setAttribute('id', "c" + doc.id);
          // currentTask.querySelector('.taskCheckbox').setAttribute('onclick',changeCheckboxState(currentTask.id));
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
  currentTaskID.addEventListener
  db.collection("users").doc(user.uid).collection("lists").doc(currentListID).collection("tasks").doc(currentTaskID)
  .update({
    "state": true
  });
  }}
)}


function handleCloseButtonClick(buttonItself) {
  let idToDelete = buttonItself.getAttribute('id');
  idToDelete = idToDelete.substring(1, idToDelete.length());
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
  let container = buttonItself.parentElement.parentElement;
  container.parentElement.removeChild(container);

  attachEvent('', ()=>{

  });
}

insertCards();

// function insertCards() {
//   let card = document.getElementById("cards");
//   let listDiv = document.getElementById("list");

//   firebase.auth().onAuthStateChanged((user) => {
//     // Check if a user is signed in:
//     if (user) {

//       // Do something for the currently logged-in user here:
//       console.log(user.uid);
//       console.log(user.displayName);
//       user_Name = user.displayName;

//   db.collection("users").doc(user.uid).collection("lists")
//   .get()
//   .then(function (snap) {
//     snap.forEach(function(doc) {
//       // let currentListID = doc.id;
//       console.log(doc.data().title)
//       // document.getElementsByClassName("listTitle1").innerText = doc.data().title;
//       var listTitle = doc.data().title;

//       let testCard = card.content.cloneNode(true);
//       testCard.querySelector('.card-title').innerHTML = listTitle;
//       // loop for adding in tasks items
//       db.collection("users").doc(user.uid).collection("lists").doc(doc.id).collection("tasks")
//       .get()
//       .then(function (snap2) {
//         let taskItem = document.getElementById("taskItem");
//         let taskList = document.getElementById("card-body");

//         snap2.forEach(function(doc) {
//           console.log(doc.data().details)

//           var taskDetails = doc.data().details;

//           let testTask = taskItem.content.cloneNode(true);
//           testTask.querySelector('.taskDetails').innerHTML = taskDetails;
//           taskList.appendChild(testTask);
//         })
//       }
//       )
//       listDiv.appendChild(testCard);
//     })
//   })
//   }
// })
// }

// insertCards();

// function insertCards() {
//   let listCardTemplate = document.getElementById("listCardTemplate");
//   let listDiv = document.getElementById("lists-go-here");  //

//   firebase.auth().onAuthStateChanged((user) => {
//     // Check if a user is signed in:
//     if (user) {
//       // Do something for the currently logged-in user here:
//       console.log(user.uid);
//       console.log(user.displayName);
//       user_Name = user.displayName;

//       db.collection("users")
//         .doc(user.uid)
//         .collection("lists")
//         .orderBy("timestamp")
//         .get()
//         .then(function (snap) {
//           snap.forEach(function (doc) {
//             let currentListID = doc.id;
//             console.log(doc.data().title);
//             // document.getElementsByClassName("listTitle1").innerText = doc.data().title;
//             var listTitle = doc.data().title;

//             let taskCard = taskCardTemplate.content.cloneNode(true);
//             taskCard.querySelector(".card-title").innerHTML = listTitle;

//             // loop for adding in tasks items
//             db.collection("users")
//               .doc(user.uid)
//               .collection("lists")
//               .doc(doc.id)
//               .collection("tasks")
//               .get()
//               .then(function (snap2) {
//                 let taskCardTemplate = document.getElementById("taskCardTemplate");

//                 testCard.querySelector('.card-body').setAttribute("id", currentListID)
//                 //

//                 snap2.forEach(function (doc) {
//                   console.log(doc.data().details);

//                   var taskDetails = doc.data().details;

//                   let testTask = taskItem.content.cloneNode(true);
//                   testTask.querySelector(".taskDetails").innerHTML =
//                     taskDetails;
//                     let divToAppendTo = document.getElementById(currentListID);
//                     taskItem.appendChild(testTask);
//                 });
//               });
//             listDiv.appendChild(testCard);
//           });
//         });
//     }
//   });
// }

// insertCards();

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

// // function insertTask() {
// //   firebase.auth().onAuthStateChanged((user) => {
// //     // Check if a user is signed in:
// //     if (user) {

// //       // Do something for the currently logged-in user here:
// //       console.log(user.uid);
// //       console.log(user.displayName);
// //       user_Name = user.displayName;

// //   db.collection("users").doc(user.uid).collection("lists").doc("list1").collection("tasks")
// //   .get()
// //   .then(function (snap) {
// //     snap.forEach(function(doc) {
// //       console.log(doc.data().details)
// //       document.getElementById("listTask1").innerText = doc.data().details;
// //     })
// //   })
// //   }
// // })
// // }
// // insertTask();