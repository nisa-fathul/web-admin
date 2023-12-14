import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { createUserWithEmailAndPassword, getAuth } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';
import { getDatabase, ref, set } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBAtMxRw4dZ2JdvuUZc_PjJSkwD2ksTfag",
    authDomain: "mobile-advertising-f28e7.firebaseapp.com",
    databaseURL: "https://mobile-advertising-f28e7-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "mobile-advertising-f28e7",
    storageBucket: "mobile-advertising-f28e7.appspot.com",
    messagingSenderId: "19864941021",
    appId: "1:19864941021:web:44daeaf01e7288a2fe0634",
    measurementId: "G-N6EZZXQCVE"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);
const firestore = getFirestore(app);

const buttonRegister = document.getElementById("button_register");
const buttonLogin = document.getElementById("button_login");

buttonRegister.addEventListener('click', (e) => {
    let name = document.getElementById("yourName").value;
    let email = document.getElementById("yourEmail").value;
    let password = document.getElementById("yourPassword").value;

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed up
            const user = userCredential.user;
            set(ref(database, "users/" + user.uid), {
                name: yourName,
                email: yourEmail,
                password: yourPassword
            });
        })
        .then(() => {
            alert("User telah ditambahkan");
        })
        .catch((error) => {
            alert("error");
        })

    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
    });
});

buttonLogin.addEventListener('click', (e) => {
    let emailLogin = document.getElementById("email_login").value;
    let passwordLogin = document.getElementById("password_login").value;

    LoginWithEmailAndPassword(auth, emailLogin, passwordLogin)
        .then((userCredential) => {
            // Signed up
            const user = userCredential.user;
            window.location.href = "http://localhost/NiceAdmin/index.html";
        })
        .then(() => {
            alert("User telah ditambahkan");
        })
        .catch((error) => {
            alert("error");
        })

    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
    });
});