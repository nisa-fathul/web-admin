// Import the functions you need from the SDKs you need
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { signInWithEmailAndPassword, getAuth } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';
import { getDatabase, ref, set } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';

// Your web app's Firebase configuration
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);
const firestore = getFirestore(app);


const buttonLogin = document.getElementById("button_login");

buttonLogin.addEventListener('click', (e) =>  {

let Email = document.getElementById("Email").value;
let Password = document.getElementById("Password").value;

e.preventDefault();
var obj = {
    email: Email,
    password: Password,
};

signInWithEmailAndPassword(auth, obj.email, obj.password)
.then(function(success){
    try {
        // Coba lakukan operasi pada session storage
        sessionStorage.setItem("user-creds", "test")
        
        // Jika berhasil, lanjutkan dengan operasi berikutnya
        console.log("Operation on session storage successful");
        window.location.replace('dashboard.php')
        alert("signin successfully")
    } catch (error) {
        // Tangkap kesalahan jika terjadi
        console.error("Error in session storage operation:", error);
    }
    // console.log(success.user.uid)
})
.catch(function(err){
    alert("Error in " + err)
});
console.log()
console.log(obj);
});