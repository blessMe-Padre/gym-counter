import { Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useAuth } from '../hooks/use-auth';
import { removeUser } from '../store/slices/userSlice';
import { ref, onValue, getDatabase } from "firebase/database";
import { initializeApp } from "firebase/app";
import { useState, useEffect } from 'react';
import { CircleProgress } from 'react-gradient-progress'

import Counter from '../components/Counter';
import { Container } from '../components/styled/Container';
import { AccountButton } from '../components/styled/Buttons';
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

const HomePage = () => {
    const dispatch = useDispatch();
    const { isAuth, email, id } = useAuth();

    // получение ссылки к базе данных
    const database = getDatabase(app);
    const getUserPath = ref(database, 'users/user' + id + '/counter');

    // установка и состояние Spinner
    const [isLoading, setLoading] = useState(false);

    // состояние счетчика
    const [count, setState] = useState();

    useEffect(() => {
        onValue(getUserPath, (snapshot) => {
            setState(snapshot.val());
            setLoading(true);
        });
    });

    // установка состояния и отображение % в circle bar
    const [percentage, setPercentage] = useState(1);
    const number = Number(count);
    useEffect(() => {
        if (percentage === 1) {
            setPercentage(0)
        } else {
            setPercentage(Math.round(number * 100 / 2000));
        }
    }, [number]);


    return isAuth ? (
        <Container>
            <AccountButton
                onClick={() => dispatch(removeUser())}
            >Выйти из аккаунта {email}</AccountButton>
            <div style={{ textAlign: "center", fontSize: "26px" }}>
                <p style={{ marginTop: "50px" }}>Цель 2000 подтягиваний. Завершено на:</p>
                {
                    isLoading ?
                        <CircleProgress percentage={percentage}
                            strokeWidth={12}
                            primaryColor={["#013220", "#66ff00"]}
                            secondaryColor="#f0f0f0"
                        />
                        :
                        <div style={{ height: "200px", paddingTop: "20px", }}>
                            <img style={{ height: "100px" }} src="img/spinner-2.gif" alt="spinner" />
                        </div>
                }

            </div>
            <Wrapper>
                <p style={{ fontSize: "18px" }}>Общее количество подтягиваний: </p>
                {
                    isLoading ? <Count>{count}</Count> :
                        <div style={{ height: "117px" }}>
                            <img style={{ height: "80px" }} src="img/spinner-2.gif" alt="spinner" />
                        </div>
                }

                <div>
                    <Counter count={number} />
                </div>
            </Wrapper>

        </Container >
    ) : (
        <Navigate to="gym-counter/login" />
    )
}

export default HomePage