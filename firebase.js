// Import the functions you need from the SDKs you need
import * as firebase from "firebase/app";
import {getAuth} from "firebase/auth"
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDdKcLtTF4Bo0RGPL7IkGHhfV9IjIyjuX4",
  authDomain: "allingolf-e40c1.firebaseapp.com",
  projectId: "allingolf-e40c1",
  storageBucket: "allingolf-e40c1.appspot.com",
  messagingSenderId: "703039179244",
  appId: "1:703039179244:web:25e728d4a5c4f10d3cd8c9"
};

// Initialize Firebase
let app;
if(firebase.getApps().length === 0){
    app = firebase.initializeApp(firebaseConfig)
} else{
    app = firebase.getApp()
}

const auth = getAuth()
const db = getFirestore(app)

export {auth, db}