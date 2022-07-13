import { useDispatch } from 'react-redux';

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Form } from './Form';
import { setUser } from '../store/slices/userSlice';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = (email, password) => {
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
            .then(({ user }) => {
                dispatch(setUser({
                    email: user.email,
                    id: user.uid,
                    token: user.accessToken,
                }));
                navigate("/");
            })
            .catch(() => alert('Такого пользователя не существует'))
    }

    return (
        <Form
            title="войти"
            handleClick={handleLogin}
        />
    )
}

export { Login }