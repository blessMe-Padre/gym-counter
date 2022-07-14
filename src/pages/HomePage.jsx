import { Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useAuth } from '../hooks/use-auth';
import { removeUser } from '../store/slices/userSlice';
import { ref, onValue, getDatabase } from "firebase/database";
import { initializeApp } from "firebase/app";
import { useState, useEffect } from 'react';

import Counter from '../components/Counter'


const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    databaseURL: "https://gym-counter-d161a-default-rtdb.europe-west1.firebasedatabase.app/",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);


const HomePage = () => {
    const dispatch = useDispatch();
    const { isAuth, email, id } = useAuth();

    const db = getDatabase();
    const getUserPath = ref(db, 'users/user' + id + '/counter');
    const [count, setState] = useState();

    useEffect(() => {
        onValue(getUserPath, (snapshot) => {
            setState(snapshot.val());
        });
    });

    const number = count;

    return isAuth ? (
        <div>
            <h1>Welcome</h1>

            <button
                onClick={() => dispatch(removeUser())}
            >Выйти из аккаунта {email}</button>


            <div style={{ backgroundColor: "#44014C", width: "320px", minHeight: "100px" }}>Общее количество подтягиваний {count}</div>
            <div>
                <Counter count={number} />
            </div>
        </div >
    ) : (
        <Navigate to="/login" />
    )
}

export default HomePage