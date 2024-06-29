// Import the functions you need from the SDKs you need
import firebase from 'firebase/app';
import 'firebase/firestore';    
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBTPdYSzgj405K-ROE4FY2Dx1367CYgz08",
  authDomain: "todo-a6ffa.firebaseapp.com",
  databaseURL: "https://todo-a6ffa-default-rtdb.firebaseio.com",
  projectId: "todo-a6ffa",
  storageBucket: "todo-a6ffa.appspot.com",
  messagingSenderId: "1047813906503",
  appId: "1:1047813906503:web:3448d978623c13af00d162",
  measurementId: "G-9DW2R6NPWG"
};

// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  
  const firestore = firebase.firestore();
  
  export { firestore };