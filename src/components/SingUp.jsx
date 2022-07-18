import { useDispatch } from 'react-redux';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
import { Form } from './form/Form';
import { setUser } from '../store/slices/userSlice';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleRegister = (email, password) => {
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
            .then(({ user }) => {
                dispatch(setUser({
                    email: user.email,
                    id: user.uid,
                    token: user.accessToken,
                }));

                const writeUserData = (counter, email) => {
                    const db = getDatabase();
                    set(ref(db, 'users/user' + user.uid), {
                        counter: counter,
                        email: email,
                    });
                }

                writeUserData(0, email)
                alert('Регистрация прошла успешно, теперь войдите в аккаунт')
                navigate("gym-counter/");
            })
            .catch(() => alert('Пользователь с такой почтой уже зарегистрирован'))
    }

    return (
        <Form
            title="регистрация"
            handleClick={handleRegister}
        />
    )
}
export { SignUp }