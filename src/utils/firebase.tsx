// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD27d8E-WS8F2OGFl87ni0-rvGWgllqYHU",
  authDomain: "playzone-40364.firebaseapp.com",
  projectId: "playzone-40364",
  storageBucket: "playzone-40364.appspot.com",
  messagingSenderId: "1098568803765",
  appId: "1:1098568803765:web:74ab256863170e56f8e5fc",
  measurementId: "G-TBKRZG63BS",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
