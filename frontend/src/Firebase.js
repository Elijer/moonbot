// Firebase
import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'

firebase.initializeApp(firebaseConfig)
const db = firebase.firestore()
handleEmulators(db);

const firebaseConfig = {
    apiKey: "AIzaSyBclpT9uGJ4UCmKBLJ_vhaqJoQ7AEO1rdE",
    authDomain: "ktperiodtracker.firebaseapp.com",
    projectId: "ktperiodtracker",
    storageBucket: "ktperiodtracker.appspot.com",
    messagingSenderId: "230595623133",
    appId: "1:230595623133:web:eb49f4847655c3364cc334",
    measurementId: "G-L5N97SMBTE"
};

function handleEmulators(_db){
    if (window.location.hostname === "localhost") {
        console.log("localhost detected! Using functions and firestore emulators instead of live instances");
        _db.settings({ 
          host: "localhost:8090",
          ssl: false
        });
    }
}