import {
    firebase,
    database,
    ref,
    set,
    update,
    remove,
    onValue,
    push,
    child,
    orderByChild,
    onChildAdded,
    query,
    startAt,
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut
  } from "./firebase.js";
  



document.getElementById('signup').addEventListener('click', () => { 
    const userEmail = document.getElementById('signupEmail').value;
  const userPassword = document.getElementById('signupPword').value;
  const name = document.getElementById('fullName').value;
  
  
  const auth = getAuth();
  console.log(auth)
  createUserWithEmailAndPassword(auth, userEmail, userPassword)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      alert('User created successfully')
      window.location.href = 'login.html'
      // ...
      console.log('success')
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log('unsuccess')
      // ..
    });
  });