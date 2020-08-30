import firebase from "firebase";

const firebaseConfig = firebase.initializeApp({
    apiKey: "AIzaSyCCK9qbVMDkckiLeUpmC-CS6akR3-GF_C4",
    authDomain: "instagram-clone-react-29b8d.firebaseapp.com",
    databaseURL: "https://instagram-clone-react-29b8d.firebaseio.com",
    projectId: "instagram-clone-react-29b8d",
    storageBucket: "instagram-clone-react-29b8d.appspot.com",
    messagingSenderId: "302275417024",
    appId: "1:302275417024:web:182a9a2271ada3f447ee25",
    measurementId: "G-131HRJJGM2"
});


  const db = firebaseConfig.firestore();
  const auth = firebase.auth();
  const storage = firebase.storage();

  export {db,auth,storage};
//   export default db;