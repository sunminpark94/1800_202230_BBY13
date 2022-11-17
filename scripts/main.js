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
  let listCard = document.getElementById("listCardTemplate");
  let listDiv = document.getElementById("lists-go-here");

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
      let taskBodyID = doc.id;
      // let currentListID = doc.id;
      // console.log(doc.id);
      // document.getElementsByClassName("listTitle1").innerText = doc.data().title;
      var listTitle = doc.data().title;

      let currentCard = listCard.content.cloneNode(true);
      currentCard.querySelector('.tasks-go-here').setAttribute("id", "0" + taskBodyID);
      currentCard.querySelector('.card-title').innerHTML = listTitle;
      // loop for adding in tasks items
      db.collection("users").doc(user.uid).collection("lists").doc(doc.id).collection("tasks")
      .get()
      .then(function (snap2) {
        let taskItem = document.getElementById("taskItemTemplate");
        // let taskList = document.getElementById("tasks-go-here");

        snap2.forEach(function(doc) {

          console.log(doc.id);
          console.log(doc.data().details)

          var taskDetails = doc.data().details;

          let tasksDiv = document.getElementById("0" + taskBodyID);
          let currentTask = taskItem.content.cloneNode(true);
          currentTask.querySelector('.taskDetails').innerHTML = taskDetails;
          tasksDiv.appendChild(currentTask);
        })
      }
      )
      listDiv.appendChild(currentCard);
    })
  })
  }
})
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
