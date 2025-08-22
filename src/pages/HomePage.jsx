import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/use-auth';

import { ref, set, onValue, getDatabase } from "firebase/database";
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
import { Total } from '../components/styled/Total';


const HomePage = () => {
    const { isAuth, email, id } = useAuth();
    const [menuActive, setMenuActive] = useState(false); // установка и состояние меню
    const [isLoading, setLoading] = useState(true); // установка и состояние Spinner
    const [value, setValue] = useState(0); // значение которое накликано в счетчике
    // получение и установка Цель
    const [target, setTarget] = useState(0);
    // получение и установка всех записей (для отрисовки таблицы статистики)
    const [tableList, setTableList] = useState([]);
    // получение и установка состояния из записи general
    const [generalCount, setGeneralCount] = useState(0);
    // состояние счетчика подтягиваний на текущий месяц
    const [countMonth, setCountMonth] = useState();

    // получает текущий месяц и год в виде цифры
    const currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();
    const currentMonthYear = `${currentMonth}_${currentYear}`;
    // const currentMonthYear = `5_2025`;
    
    // получение ссылок к базе данных
    const database = getDatabase(app);
    const getUserPath = ref(database, 'users/user' + id + '/general/counter');
    const getUserPathTarget = ref(database, 'users/user' + id + '/target/target');
    const getUserPathMonth = ref(database, 'users/user' + id + '/' + currentMonthYear + '/counter');
    const getUserPathList = ref(database, 'users/user' + id + '/');
    
    useEffect(() => {
        onValue(getUserPath, (snapshot) => {
            setGeneralCount(snapshot.val());
            setLoading(false);
        });
        onValue(getUserPathMonth, (snapshot) => {
            setCountMonth(snapshot.val());
        });
        onValue(getUserPathList, (snapshot) => {
            const listsArray = convertToArray(snapshot.val(), month);
            setTableList(listsArray);
        });
        onValue(getUserPathTarget, (snapshot) => {
            setTarget(+snapshot.val());
        });
    }, []);

    // установка состояния и отображение % в circle bar
    const [percentage, setPercentage] = useState(1);
    const numberCount = Number(countMonth);
    useEffect(() => {
        if (percentage === 1) {
            setPercentage(0)
        } else if (target === 0) {
            setPercentage(0)
        } else {
            const calculatedPercentage = Math.round(numberCount * 100 / target);
            const validPercentage = isNaN(calculatedPercentage) ? 0 : calculatedPercentage;
            const clampedPercentage = Math.max(0, Math.min(100, validPercentage));
            setPercentage(clampedPercentage);
        }
    }, [target, numberCount]);

    // Функция записи данных в базу
    const writeUserDataPullUp = async (count, countMonth, email, value) => {
        try {
            const db = getDatabase();
            await set(ref(db, 'users/user' + id + '/general'), {
                counter: count + value,
                email: email,
            });

            await set(ref(db, 'users/user' + id + '/' + currentMonthYear), {
                counter: countMonth + value,
            });
        } catch (error) {
            console.error('Ошибка при записи данных:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await writeUserDataPullUp(generalCount, countMonth, email, value);
            setValue(0);
        } catch (error) {
            console.error('Ошибка при отправке формы:', error);
        }
    }

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

            <TabWrapper>
                <TabTitle>
                    <p>Цель на месяц: </p>
                {
                    isLoading ? <div><img style={{ height: "20px" }} src="img/spinner-2.gif" alt="spinner" /></div>:<div>{target}</div>
                }
                </TabTitle>
                <div>
                    {
                            isLoading ?
                                <div style={{ height: "200px", paddingTop: "20px", }}>
                                    <img style={{ height: "100px", width: "80px" }} src="img/spinner-2.gif" alt="spinner" />
                                </div>
                                :
                                <CircleProgress
                                    percentage={percentage}
                                    strokeWidth={12}
                                    primaryColor={["#013220", "#66ff00"]}
                                    secondaryColor="#f0f0f0"
                                />
                    }
                </div>

                <TabText>Количество подтягиваний за месяц</TabText>
                {
                        isLoading ?
                            <div style={{ height: "117px" }}>
                                <img style={{ height: "80px" }} src="img/spinner-2.gif" alt="spinner" />
                            </div>
                            :
                            <Count>{countMonth}</Count>
                    }

                <Counter
                    value={value}
                    setValue={setValue}
                    handleSubmit={handleSubmit}
                />

            </TabWrapper>

            <Total>
                <p>Всего подтягиваний </p>
                {
                isLoading ?
                    <div><img style={{ height: "20px" }} src="img/spinner-2.gif" alt="spinner" /></div>
                :
                <p>{generalCount}</p>
                }
            </Total>

            <Report list={tableList} />
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