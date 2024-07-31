import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// const firebaseConfig = {
//  apiKey: "YOUR_API_KEY",
//  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
//  projectId: "YOUR_PROJECT_ID",
//  storageBucket: "YOUR_PROJECT_ID.appspot.com",
//  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
//  appId: "YOUR_APP_ID"
//  };
const firebaseConfig = {
  apiKey: "AIzaSyDn8cRRzqMmuqysXJ1p-M-UpW9DScipaQU",
  authDomain: "pantry-tracker-c5785.firebaseapp.com",
  projectId: "pantry-tracker-c5785",
  storageBucket: "pantry-tracker-c5785.appspot.com",
  messagingSenderId: "1008147104402",
  appId: "1:1008147104402:web:fd10ae4db237d8f588dc4b",
  measurementId: "G-4VLJSHSQLB",
};
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
export { app, firestore };
