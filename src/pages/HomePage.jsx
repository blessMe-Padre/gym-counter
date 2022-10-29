import { Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useAuth } from '../hooks/use-auth';
import { ref, onValue, getDatabase } from "firebase/database";
import { initializeApp } from "firebase/app";
import { useState, useEffect } from 'react';
import { CircleProgress } from 'react-gradient-progress'

import Counter from '../components/Counter';
import CounterSquat from '../components/CounterSquat';
import { Container } from '../components/styled/Container';
import { NavButton, TabButton, TabButtonSquat } from '../components/styled/Buttons';
import { Count } from '../components/styled/Count';
import { Tab, TabButtonsInner, TabTitle, TabWrapper } from '../components/styled/Tab';
import Menu from '../components/Menu/Menu';


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
    const getUserPathSquat = ref(database, 'users/user' + id + '/squat');

    // установка и состояние меню
    const [menuActive, setMenuActive] = useState(false);

    // установка и состояние Spinner
    const [isLoading, setLoading] = useState(false);

    // установка активного Tab
    const [activeTab, setActiveTab] = useState(1);
    const toggleTab = (index) => {
        setActiveTab(index)
    }

    // состояние счетчика
    const [count, setCount] = useState();
    useEffect(() => {
        onValue(getUserPath, (snapshot) => {
            setCount(snapshot.val());
            setLoading(true);
        });
    });

    // состояние счетчика приседаний
    const [squat, setSquat] = useState();
    useEffect(() => {
        onValue(getUserPathSquat, (snapshot) => {
            setSquat(snapshot.val());
            setLoading(true);
        });
    });

    // установка состояния и отображение % в circle bar первого таба
    const [percentage, setPercentage] = useState(1);
    const numberCount = Number(count);
    useEffect(() => {
        if (percentage === 1) {
            setPercentage(0)
        } else {
            setPercentage(Math.round(numberCount * 100 / 2000));
        }
    }, [numberCount]);

    // установка состояния и отображение % в circle bar второго таба
    const [percentage2, setPercentage2] = useState(1);
    const numberSquat = Number(squat);
    useEffect(() => {
        if (percentage2 === 1) {
            setPercentage2(0)
        } else {
            setPercentage2(Math.round(numberSquat * 100 / 2000));
        }
    }, [numberSquat]);

    return isAuth ? (
        <Container>
            <nav>
                <NavButton onClick={() => setMenuActive(!menuActive)}>
                    {menuActive ?
                        <img src="img/gear-black.svg" alt="spinner" />
                        :
                        <img src="img/gear-white.svg" alt="spinner" />
                    }

                </NavButton>
            </nav>

            <Tab active={activeTab === 1}>
                <TabWrapper>
                    <div>
                        <TabTitle>Цель 2000 приседаний. Завершено на:</TabTitle>
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
                    <p style={{ fontSize: "18px" }}>Общее количество приседаний: </p>
                    {
                        isLoading ? <Count>{count}</Count> :
                            <div style={{ height: "117px" }}>
                                <img style={{ height: "80px", width: "80px" }} src="img/spinner-2.gif" alt="spinner" />
                            </div>
                    }

                    <Counter count={count} squat={squat} />

                </TabWrapper>
            </Tab>


            <Tab active={activeTab === 2}>
                <TabWrapper>
                    <div>
                        <TabTitle>Цель 2000 подтягиваний. Завершено на:</TabTitle>
                        {
                            isLoading ?
                                <CircleProgress
                                    percentage={percentage2}
                                    strokeWidth={12}
                                    primaryColor={["#013220", "#66ff00"]}
                                    secondaryColor="#f0f0f0"
                                />
                                :
                                <div style={{ height: "200px", paddingTop: "20px", }}>
                                    <img style={{ height: "100px", width: "80px" }} src="img/spinner-2.gif" alt="spinner" />
                                </div>
                        }
                    </div>

                    <p style={{ fontSize: "18px" }}>Общее количество подтягиваний: </p>
                    {
                        isLoading ? <Count>{squat}</Count> :
                            <div style={{ height: "117px" }}>
                                <img style={{ height: "80px" }} src="img/spinner-2.gif" alt="spinner" />
                            </div>
                    }


                    <CounterSquat squat={squat} count={count} />
                </TabWrapper>
            </Tab>

            <TabButtonsInner>
                <TabButton onClick={() => toggleTab(1)} />
                <TabButtonSquat onClick={() => toggleTab(2)} />
            </TabButtonsInner>

            <Menu active={menuActive} setActive={setMenuActive} email={email} />
        </Container >
    ) : (
        <Navigate to="gym-counter/login" />
    )
}

export default HomePage