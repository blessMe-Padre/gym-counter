import { useDispatch } from 'react-redux';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
import { Form } from './form/Form';
import { setUser } from '../store/slices/userSlice';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // получает текущий месяц в виде цифры
    const currentMonth = new Date().getMonth() + 1;

    const handleRegister = (email, password) => {
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
            .then(({ user }) => {
                dispatch(setUser({
                    email: user.email,
                    id: user.uid,
                    token: user.accessToken,
                }));

                const writeUserData = (counter, squat, email, target) => {
                    const db = getDatabase();
                    set(ref(db, 'users/user' + user.uid + '/general'), {
                        counter: counter,
                        email: email,
                        squat: squat,
                    });

                    set(ref(db, 'users/user' + user.uid + '/' + currentMonth), {
                        counter: counter,
                        squat: counter,
                    });

                    set(ref(db, 'users/user' + user.uid + '/target'), {
                        target: target,
                    });
                }

                writeUserData(0, 0, email, 2000)
                alert('Регистрация прошла успешно, теперь войдите в аккаунт')
                navigate("gym-counter/");
            })
            .catch(() => alert('Ошибка! Проверьте корректность введенных данных, либо такой пользователь уже зарегистрирован'))
    }

    return (
        <Form
            title="регистрация"
            handleClick={handleRegister}
        />
    )
}
export { SignUp }