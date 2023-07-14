import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getDatabase,
  ref,
  set,
  onValue,
  onChildAdded,
  update,
  remove,
  push,
  child,
  orderByChild,
  // onChildAdded,
  query,
  startAt,
  

} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

import {
  getAuth, 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";


const firebaseConfig = {
  apiKey: "AIzaSyACQqXh6bfUPCfA2lyTHs6q1lK8nIJqbd8",
  authDomain: "todo-hammad.firebaseapp.com",
  projectId: "todo-hammad",
  storageBucket: "todo-hammad.appspot.com",
  messagingSenderId: "747505809809",
  appId: "1:747505809809:web:a48b54b7546746e9a4c230",
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const database = getDatabase();
export { firebase, database, ref, set, onValue, onChildAdded, update, remove, push, child, orderByChild,  query,  startAt, getAuth, 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut };
