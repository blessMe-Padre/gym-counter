import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/use-auth';

import { ref, onValue, getDatabase } from "firebase/database";
import { app } from '../firebaseConfig';

import { CircleProgress } from 'react-gradient-progress';
import { convertToArray, month } from '../utils';

import Counter from '../components/Counter';
import { Container } from '../components/styled/Container';
import { NavButton} from '../components/styled/Buttons';
import { Count } from '../components/styled/Count';
import { TabText, TabTitle, TabWrapper } from '../components/styled/Tab';
import Menu from '../components/Menu/Menu';
import Report from '../components/Report/Report';


const HomePage = () => {
    const { isAuth, email, id } = useAuth();

    // получает текущий месяц в виде цифры
    const currentMonth = new Date().getMonth() + 1;

    // получение ссылки к базе данных
    const database = getDatabase(app);

    // получение ссылок к базе данных
    const getUserPath = ref(database, 'users/user' + id + '/general/counter');
    const getUserPathTarget = ref(database, 'users/user' + id + '/target/target');
    const getUserPathMonth = ref(database, 'users/user' + id + '/' + currentMonth + '/counter');
    const getUserList = ref(database, 'users/user' + id + '/');

    // получение и установка Цель
    const [target, setTarget] = useState(0);

    // получение и установка Цель
    useEffect(() => {
        onValue(getUserPathTarget, (snapshot) => {
            setTarget(+snapshot.val());
        });
    }, [getUserPathTarget]);

    // получение и установка всех повторений за Месяц
    const [list, setList] = useState([]);
    useEffect(() => {
        onValue(getUserList, (snapshot) => {
            const listsArray = convertToArray(snapshot.val(), month);
            setList(listsArray);
        });
    }, []);

    // установка и состояние меню
    const [menuActive, setMenuActive] = useState(false);

    // установка и состояние Spinner
    const [isLoading, setLoading] = useState(false);

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
        });
    });

    // установка состояния и отображение % в circle bar первого таба
    const [percentage, setPercentage] = useState(1);
    const numberCount = Number(count);
    useEffect(() => {
        if (percentage === 1) {
            setPercentage(0)
        } else {
            setPercentage(Math.round(numberCount * 100 / target));
        }
    }, []);

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

            <div>
                <TabWrapper>
                    <div>
                        <TabTitle>Цель {target} подтягиваний. Завершено на:</TabTitle>
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
                        countMonth={countMonth}
                        currentMonth={currentMonth}
                    />

                </TabWrapper>
            </div>

            <Report list={list} />

            <Menu
                id={id}
                active={menuActive}
                setActive={setMenuActive}
                email={email}
                target={target}
                setTarget={setTarget}
            />

        </Container >
    ) : (
        <Navigate to="gym-counter/login" />
    )
}

export default HomePage