import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBavD7EwS86oEgvf3FI-TkW9WLOyUlBfwA",
  authDomain: "house-b8a8c.firebaseapp.com",
  databaseURL: "https://house-b8a8c-default-rtdb.firebaseio.com",
  projectId: "house-b8a8c",
  storageBucket: "house-b8a8c.appspot.com",
  messagingSenderId: "48650561951",
  appId: "1:48650561951:web:1597d5b5e2dcb87783f5aa",
  measurementId: "G-3D5QGMXBVM"
};
// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore()