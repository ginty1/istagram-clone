import firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyDVxOoLb7sJFol55LlWNQhfYUtCOzWJtO0",
  authDomain: "linkedin-4abea.firebaseapp.com",
  projectId: "linkedin-4abea",
  storageBucket: "linkedin-4abea.appspot.com",
  messagingSenderId: "24882892001",
  appId: "1:24882892001:web:6dfa348c4b5dffc1d1bba0",
};

// Initialize Firebase
!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();
const db = firebase.firestore();

export { firebase, db };
