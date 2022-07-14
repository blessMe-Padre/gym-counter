import { Navigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useAuth } from '../hooks/use-auth'
import { removeUser } from '../store/slices/userSlice'
import Counter from '../components/Counter'
import { ref, set, onValue, getDatabase } from "firebase/database";
import { initializeApp } from "firebase/app";


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


const HomePage = ({ data }) => {
    const dispatch = useDispatch();
    const { isAuth, email } = useAuth();

    const db = getDatabase();
    const getUserPath = ref(db, 'users/userBtZYmBHh2oT20bOu55NjXmV77O63' + '/counter');

    onValue(getUserPath, (snapshot) => {
        const data = snapshot.val();
        console.log(data);
    });


    return isAuth ? (
        <div>
            <h1>Welcome</h1>

            <button
                onClick={() => dispatch(removeUser())}
            >Выйти из аккаунта {email}</button>


            <div style={{ backgroundColor: "#44014C", width: "100px", minHeight: "100px" }}>3434343</div>
            <div>
                <Counter />
            </div>
        </div >
    ) : (
        <Navigate to="/login" />
    )
}

export default HomePage