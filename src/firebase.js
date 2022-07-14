import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { ref, set, onValue } from "firebase/database";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    databaseURL: "https://gym-counter-d161a-default-rtdb.europe-west1.firebasedatabase.app/",
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
// console.log(database);

// получает значение ключа name
const db = getDatabase();
const starCountRef = ref(db, 'users/' + 'name');
onValue(starCountRef, (snapshot) => {
    const data = snapshot.val();
    // console.log(data);
});


// получает запись в бд

function writeUserData(name, counter) {
    const db = getDatabase();
    set(ref(db, 'users/'), {
        counter: counter,
        name: name,
    });
}

// writeUserData("sergey", 1)