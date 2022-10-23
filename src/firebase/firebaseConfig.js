// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// import { getFirestore, collection, getDocs } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAkqdLX8uT0RLN9jtrn4-Ddl8INFlx4bLg",
  authDomain: "bankjs.firebaseapp.com",
  projectId: "bankjs",
  storageBucket: "bankjs.appspot.com",
  messagingSenderId: "983202763975",
  appId: "1:983202763975:web:dfb5073e09b88d2c65dae2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
