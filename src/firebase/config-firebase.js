import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import 'firebase/compat/auth'
import React from 'react';

const firebaseConfig = {
    apiKey: "AIzaSyC90PLYk5WIiQtIK76Yi5xJ_uF9b9pCtM0",
    authDomain: "vademecum-caravana.firebaseapp.com",
    projectId: "vademecum-caravana",
    storageBucket: "vademecum-caravana.appspot.com",
    messagingSenderId: "390432576811",
    appId: "1:390432576811:web:0ae71d1a48bbc11437616e",
    measurementId: "G-VFH379QMS7"
  };

  // Initialize Firebase
firebase.initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

const db = firebase.firestore()

const googleAuthProvider = new firebase.auth.GoogleAuthProvider()


export {firebase, db, googleAuthProvider}