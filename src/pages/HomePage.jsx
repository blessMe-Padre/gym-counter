import { Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useAuth } from '../hooks/use-auth';
import { removeUser } from '../store/slices/userSlice';
import { ref, onValue, getDatabase } from "firebase/database";
import { initializeApp } from "firebase/app";
import { useState, useEffect } from 'react';

import Counter from '../components/Counter';
import { Container } from '../components/styled/Container';
import { AccountButton } from '../components/styled/Buttons';
import { Title } from '../components/styled/Title';
import { Wrapper } from '../components/styled/PageWrapper';
import { Count } from '../components/styled/Count';



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
        <Container>
            <AccountButton
                onClick={() => dispatch(removeUser())}
            >Выйти из аккаунта {email}</AccountButton>
            <Wrapper>
                <Title>Добро пожаловать</Title>
                <p style={{ maxWidth: "500px" }}>Здесь отображается общее количество подтягиваний.
                    С помощью кнопок увеличивайте значение счетчика. Фиксируйте значение в базу кнопкой "отправить"</p>

                <p>Общее количество подтягиваний: </p>
                <Count>{count}</Count>
                <div>
                    <Counter count={number} />
                </div>
            </Wrapper>

        </Container >
    ) : (
        <Navigate to="/login" />
    )
}

export default HomePage