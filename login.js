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


const auth = getAuth();

document.getElementById('login').addEventListener('click', () => {
    let password = document.getElementById('password')?.value;
    let email = document.getElementById('email')?.value;
    // const session = null;
    // console.log(email, password);
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {

            const user = userCredential.user;
            // console.log("success", user)
            // localStorage.setItem('isLoggedIn', 'true');
            window.location.href = 'index.html'
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert('Invalid email or password!', errorCode, errorMessage)
        });
    // console.log("success")
})
