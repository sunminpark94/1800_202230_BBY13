//----------------------------------------
//  Your web app's Firebase configuration
//----------------------------------------
var firebaseConfig = {
  apiKey: "AIzaSyC-4eys9jkjbysNFG7JQJKe-mGaCi593As",
  authDomain: "bbyteam13-1800-202230.firebaseapp.com",
  projectId: "bbyteam13-1800-202230",
  storageBucket: "bbyteam13-1800-202230.appspot.com",
  messagingSenderId: "617290591033",
  appId: "1:617290591033:web:cafcb8c9a170b6100056e8",
};

//--------------------------------------------
// initialize the Firebase app
// initialize Firestore database if using it
//--------------------------------------------
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
