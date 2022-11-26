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

      db.collection("users")
        .doc(user.uid)
        .collection("lists")
        .orderBy("timestamp")
        .get()
        .then(function (snap) {
          snap.forEach(function (doc) {
            let taskBodyID = doc.id;
            var listTitle = doc.data().title;

            let currentCard = listCard.content.cloneNode(true);
            currentCard
              .querySelector(".tasks-go-here")
              .setAttribute("id", taskBodyID);
            currentCard.querySelector(".card-title").innerHTML = listTitle;
            currentCard
              .querySelector(".closeButton")
              .setAttribute("id", "0" + doc.id);
            // loop for adding in tasks items
            db.collection("users")
              .doc(user.uid)
              .collection("lists")
              .doc(doc.id)
              .collection("tasks")
              .get()
              .then(function (snap2) {

                let taskItem = document.getElementById("taskItemTemplate");
                // let taskList = document.getElementById("tasks-go-here");

                snap2.forEach(function (doc) {
                  // console.log(doc.id);
                  // console.log(doc.id);
                  // console.log(doc.data().details)

                  let taskDetails = doc.data().details;
                  let isChecked = doc.data().state;

                  let tasksDiv = document.getElementById(taskBodyID);
                  let currentTask = taskItem.content.cloneNode(true);
                  currentTask
                    .querySelector(".taskItemContainer")
                    .setAttribute("id", doc.id);
                  let checkbox = currentTask.querySelector(".taskCheckbox");
                  // let checkBoxState;
                  // db.collection("users").doc(user.uid).collection("lists").doc(currentListID).collection("tasks").doc(currentTaskID).get()
                  // .then((doc) => {
                  //   checkBoxState = doc.data().state;
                  //   console.log(checkBoxState);
                  // });
                  if (isChecked == true) {
                    checkbox.checked = true;
                  } else {
                    checkbox.checked = false;
                  }
                  checkbox.setAttribute("id", "c" + doc.id);
                  checkbox.setAttribute("checked", isChecked);
                  // currentTask.querySelector('.taskCheckbox').setAttribute('onclick',changeCheckboxState(currentTask.id));

                  // new code
                  currentTask.querySelector(".taskItem").innerHTML =
                    taskDetails;

                  // end new code

                  tasksDiv.appendChild(currentTask);
                  // currentTask.setAttribute("id" , doc.id)
                });
              });
            listDiv.appendChild(currentCard);
          });
        });
        console.log();
        if (document.querySelectorAll('.card').length == 0) {
          console.log(document.querySelectorAll('.card').length);
          let currentCard = listCard.content.cloneNode(true);
          currentCard.querySelector(".card-title").innerHTML = "Click + to add new List";
          currentCard.querySelector('.card').setAttribute('id', 'welcome');
          listDiv.appendChild(currentCard);
          } else if (querySelectorAll('.card').length > 1) {
            document.getElementById('welcome').remove();
            console.log('hey');
          }
    }
  });
}
insertCards();

function incrementCurrent() {
  current++;
}

function decrementCurrent() {
  current--;
}


// get search bar element
const searchInput = document.getElementById("searchbar");
// store name elements in array-like object
const namesFromDOM = document.getElementsByClassName("card-title");
// listen for user events
searchInput.addEventListener("keyup", (event) => {
  const { value } = event.target;
  // get user search input converted to lowercase
  const searchQuery = value.toLowerCase();
    
  for (const nameElement of namesFromDOM) {
      // store name text and convert to lowercase
      let name = nameElement.textContent.toLowerCase();
      
      // compare current name to search input
      if (name.includes(searchQuery)) {
          // found name matching search, display it
          nameElement.parentElement.parentElement.style.display = "block";
      } else {
          // no match, don't display name
          nameElement.parentElement.parentElement.style.display = "none";
      }
  }
});

var currentCheckboxState;
function changeCheckboxState(checkbox) {
  firebase.auth().onAuthStateChanged((user) => {
    // Check if a user is signed in:
    if (user) {
      let currentTaskID = checkbox.parentElement.getAttribute("id");
      // console.log(currentTaskID);
      let currentListID =
        checkbox.parentElement.parentElement.getAttribute("id");
      let currentCheckboxState = checkbox.checked;

      if (currentCheckboxState == false) {
        db.collection("users")
          .doc(user.uid)
          .collection("lists")
          .doc(currentListID)
          .collection("tasks")
          .doc(currentTaskID)
          .update({
            state: false,
          });
      } else {
        db.collection("users")
          .doc(user.uid)
          .collection("lists")
          .doc(currentListID)
          .collection("tasks")
          .doc(currentTaskID)
          .update({
            state: true,
          });
      }
    }
  });
}

function handleCloseButtonClick(buttonItself) {
  let idToDelete = buttonItself.getAttribute("id");
  idToDelete = idToDelete.substring(1);
  firebase.auth().onAuthStateChanged((user) => {
    let doc = db.collection("users").doc(user.uid);
    doc
      .collection("lists")
      .get()
      .then((item) => {
        for (let i = 0; i < item.docs.length; i++) {
          if (item.docs[i].id === idToDelete) {
            const batch = db.batch();
            batch.delete(item.docs[i].ref);
            batch.commit();
          }
        }
      });
  });

  let pointer = buttonItself;
  while (pointer.className !== "card") {
    pointer = pointer.parentElement;
  }
  pointer.parentElement.removeChild(pointer);
}
// console.log(current);
console.log(document.querySelectorAll('.card').length);


