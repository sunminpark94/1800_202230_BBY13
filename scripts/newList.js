var currentUser;

function insertName() {
  firebase.auth().onAuthStateChanged((user) => {
    // Check if a user is signed in:
    if (user) {
      user_Name = user.displayName;
      document.getElementById("name-goes-here").innerText = user_Name; //using javascript
    } else {
      // No user is signed in.
      console.log("no user signed in");
    }
  });
}
insertName(); //run the function

// function that gets invoked when the user presses the save list button
function saveNewList() {
  // fetch list title entered by the user.
  let listTitle = document.getElementById("list-title").value;

  firebase.auth().onAuthStateChanged((user) => {
    // Check if a user is signed in:
    if (user) {
      var currentList = db
        .collection("users")
        .doc(user.uid)
        .collection("lists");
      var userID = user.uid;

      // updating the list title in the database.
      currentList.get().then((userDoc) => {
        db.collection("users")
          .doc(user.uid)
          .collection("lists")
          .add({
            title: listTitle,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          })
          .then((doc) => {
            for (var i = 0; i < noOfTasks; i++) {
              saveTasks(doc.id, "t" + i); // calling in the save tasks function.
            }
          });
      });
    }
  });
}

// function to save tasks to the database
// the listid, parameter is the list id within database the tasks will be saved to, and the currentTask is the id of the div the function is currently reading a task from.
function saveTasks(listid, currentTask) {
  firebase.auth().onAuthStateChanged((user) => {
    // Check if a user is signed in:
    if (user) {
      let currentTaskDiv = document.getElementById(currentTask);
      let taskDetail = currentTaskDiv.querySelector(".list-item").value;
      console.log(taskDetail);
      // console.log(currentListID);
      db.collection("users")
        .doc(user.uid)
        .collection("lists")
        .doc(listid)
        .collection("tasks")
        .add({
          details: taskDetail,
          state: false,
        })
        .then(() => {
          window.location.href = "main.html";
        });
    }
  });
}
// event listener for list item in the list.
document
  .querySelector(".list-item")
  .addEventListener("keypress", function handlePress(event) {
    if (event.key === "Enter") {
      addNewTask();
    }
  });

let noOfTasks = 1;
function addNewTask() {
  // Create a clone of element with id t0:
  let clone = document
    .getElementById("newTaskTemplate")
    .content.cloneNode(true);

  // Change the id attribute of the newly created element:
  clone.querySelector(".tasks").setAttribute("id", "t" + noOfTasks);
  noOfTasks++;
  console.log(noOfTasks);
  clone
    .querySelector(".list-item")
    .addEventListener("keypress", function handlePress(event) {
      if (event.key === "Enter") {
        addNewTask();
      }
    });
  // Append the newly created element on element taskItems
  document.querySelector("#taskItems").appendChild(clone);
}

// confirmation dialog to make sure the user actually wants to go back to the homescreen without saving a list.
// this prevents the error where user misclicked and would have lost time and effort for creating a list but not saving it.
function confirmClose() {
  if (confirm("Are you sure you want to discard your new list?") == true) {
    window.location.href = "main.html";
  }
}
