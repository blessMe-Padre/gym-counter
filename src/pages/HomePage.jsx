import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/use-auth';

import { ref, onValue, getDatabase } from "firebase/database";
import { app } from '../firebaseConfig';

import { CircleProgress } from 'react-gradient-progress';
import { convertToArray, month } from '../utils';

import Counter from '../components/Counter';
import CounterSquat from '../components/CounterSquat';
import { Container } from '../components/styled/Container';
import { NavButton, TabButton, TabButtonSquat } from '../components/styled/Buttons';
import { Count } from '../components/styled/Count';
import { Tab, TabButtonsInner, TabText, TabTitle, TabWrapper } from '../components/styled/Tab';
import Menu from '../components/Menu/Menu';
import Report from '../components/Report/Report';


const HomePage = () => {
    const { isAuth, email, id } = useAuth();

    // получает текущий месяц в виде цифры
    const currentMonth = new Date().getMonth() + 1;

    // получение ссылки к базе данных
    const database = getDatabase(app);

    const getUserPath = ref(database, 'users/user' + id + '/general/counter');
    const getUserPathMonth = ref(database, 'users/user' + id + '/' + currentMonth + '/counter');

    const getUserPathSquat = ref(database, 'users/user' + id + '/general/squat');
    const getUserPathSquatMonth = ref(database, 'users/user' + id + '/' + currentMonth + '/squat');


    const getUserList = ref(database, 'users/user' + id + '/');

    // получение всех повторений за Месяц
    const [list, setList] = useState([]);
    useEffect(() => {
        onValue(getUserList, (snapshot) => {
            const listsArray = convertToArray(snapshot.val(), month);
            setList(listsArray);
        });
    }, []);

    console.log(list);

    // установка и состояние меню
    const [menuActive, setMenuActive] = useState(false);

    // установка и состояние Spinner
    const [isLoading, setLoading] = useState(false);

    // установка активного Tab
    const [activeTab, setActiveTab] = useState(1);
    const toggleTab = (index) => {
        setActiveTab(index)
    }

    // состояние счетчика подтягиваний
    const [count, setCount] = useState();
    useEffect(() => {
        onValue(getUserPath, (snapshot) => {
            setCount(snapshot.val());
            setLoading(true);
        });
    });

    // состояние счетчика подтягиваний на Месяц
    const [countMonth, setCountMonth] = useState();
    useEffect(() => {
        onValue(getUserPathMonth, (snapshot) => {
            setCountMonth(snapshot.val());
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

    // состояние счетчика приседаний на Месяц
    const [squatMonth, setSquatMonth] = useState();
    useEffect(() => {
        onValue(getUserPathSquatMonth, (snapshot) => {
            setSquatMonth(snapshot.val());
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
                                <CircleProgress percentage={percentage2}
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
                    <TabText>Общее количество приседаний:</TabText>

                    {
                        isLoading ? <Count>{squat}</Count> :
                            <div style={{ height: "117px" }}>
                                <img style={{ height: "80px", width: "80px" }} src="img/spinner-2.gif" alt="spinner" />
                            </div>
                    }

                    <CounterSquat squat={squat} count={count} squatMonth={squatMonth} countMonth={countMonth} currentMonth={currentMonth} />

                </TabWrapper>
            </Tab>


            <Tab active={activeTab === 2}>
                <TabWrapper>
                    <div>
                        <TabTitle>Цель 2000 подтягиваний. Завершено на:</TabTitle>
                        {
                            isLoading ?
                                <CircleProgress
                                    percentage={percentage}
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

                    <TabText>Общее количество подтягиваний:</TabText>
                    {
                        isLoading ? <Count>{count}</Count> :
                            <div style={{ height: "117px" }}>
                                <img style={{ height: "80px" }} src="img/spinner-2.gif" alt="spinner" />
                            </div>
                    }

                    <Counter
                        count={count}
                        squat={squat}
                        countMonth={countMonth}
                        currentMonth={currentMonth}
                        squatMonth={squatMonth} />

                </TabWrapper>
            </Tab>

            <TabButtonsInner>
                <TabButton onClick={() => toggleTab(1)} />
                <TabButtonSquat onClick={() => toggleTab(2)} />
            </TabButtonsInner>


            <Report list={list} />

            <Menu active={menuActive} setActive={setMenuActive} email={email} />

        </Container >
    ) : (
        <Navigate to="gym-counter/login" />
    )
}

export default HomePage