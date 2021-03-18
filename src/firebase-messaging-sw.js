importScripts('https://www.gstatic.com/firebasejs/7.6.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.6.0/firebase-messaging.js');
firebase.initializeApp(  {
    apiKey: "AIzaSyDe40LKqSMK0jNz6zlUztAhkg3ld9wB8-g",
    authDomain: "zatchup-bf69e.firebaseapp.com",
    databaseURL: "https://zatchup-bf69e-default-rtdb.firebaseio.com",
    projectId: "zatchup-bf69e",
    storageBucket: "zatchup-bf69e.appspot.com",
    messagingSenderId: "227089326047",
    appId: "1:227089326047:web:de5d85c6d70c478fb12e6a",
    measurementId: "G-5P2LJ0F8Z5"
  });
const messaging = firebase.messaging();