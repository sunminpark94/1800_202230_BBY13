var currentUser;

function insertName() {
  firebase.auth().onAuthStateChanged((user) => {
    // Check if a user is signed in:
    if (user) {
      
      // Do something for the currently logged-in user here:
      // console.log(user.uid);
      // console.log(user.displayName);
      user_Name = user.displayName;

      //method #1:  insert with html only
      // document.getElementById("name-goes-here").innerText = fullName;    //using javascript
      document.getElementById("name-goes-here").innerText = user_Name;    //using javascript
      //method #2:  insert using jquery
      // $("#name-goes-here").text(user_Name); //using jquery
    } else {
      // No user is signed in.
    }
  });
}
insertName(); //run the function


// var currentListID = "";
  function saveNewList() {

        let listTitle = document.getElementById('list-title').value;

        // let listItem = document.getElementById('list-item').value;
        console.log(listTitle);

        firebase.auth().onAuthStateChanged((user) => {
          // Check if a user is signed in:
          if (user) {
            var currentList = db.collection("users").doc(user.uid).collection("lists")
            var userID = user.uid;

            currentList.get()
              .then(userDoc => {
                db.collection("users").doc(user.uid).collection("lists").add({
                  title: listTitle,
                  timestamp: firebase.firestore.FieldValue.serverTimestamp()
                }).then((doc)=>{
                  for (var i = 0; i < noOfTasks; i++) {
                    saveTasks(doc.id, "t" + i);
                  }
                })

                // let currentListID = userDoc.id; // trying to get id for the newly created list (in firebase)
                // that just has a list title for now 

              })
      }
    })
  }

  function saveTasks(listid, currentTask){

    firebase.auth().onAuthStateChanged((user) => {
      // Check if a user is signed in:
      if (user) {
    let currentTaskDiv = document.getElementById(currentTask);
    let taskDetail = currentTaskDiv.querySelector(".list-item").value;
    console.log(taskDetail);
    // console.log(currentListID);
      db.collection("users").doc(user.uid).collection("lists").doc(listid).collection("tasks").add({
        details: taskDetail,
        state: false
      })
    .then(()=> {
      window.location.href = "main.html";
    })
      
  }}
)}
// console.log("newly created list id" + currentListID);
// const listItems = document.querySelectorAll('.list-item');
// x = 0;
// listItems.forEach(listitem => {
//   listitem.addEventListener('click', function handleClick(event) {
//     console.log('listitem clicked', event);
//     x += 1;u
//     addNewTask();
//   });
// });
document.querySelector('.list-item').addEventListener('keypress' , function handlePress(event) {
  if (event.key === 'Enter') {
    addNewTask();
  }

})

let noOfTasks = 1;
function addNewTask() {

      // Create a clone of element with id t0:
let clone = document.getElementById('newTaskTemplate').content.cloneNode( true );

// Change the id attribute of the newly created element:
clone.querySelector('.tasks').setAttribute( 'id', "t" + noOfTasks);
noOfTasks++;
console.log(noOfTasks);
clone.querySelector('.list-item').addEventListener('keypress' , function handlePress(event) {
  if (event.key === 'Enter') {
    addNewTask();
  }
})
// Append the newly created element on element taskItems 
document.querySelector('#taskItems').appendChild( clone );
}

function confirmClose() {
  if (confirm("Are you sure you want to discard your new list?") == true) {
    window.location.href = "main.html";
  }
}