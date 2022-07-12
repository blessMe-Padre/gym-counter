import { useDispatch } from 'react-redux';

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Form } from './Form';
import { setUser } from '../store/slices/userSlice';
import { Navigate } from 'react-router-dom'

const Login = () => {
    const dispatch = useDispatch();

    const handleLogin = (email, password) => {
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
            .then(({ user }) => {
                dispatch(setUser({
                    email: user.email,
                    id: user.uid,
                    token: user.accessToken,
                }));
                <Navigate to="/" />
            })
            .catch(() => alert('Invalid user!'))
    }

    return (
        <Form
            title="sign in"
            handleClick={handleLogin}
        />
    )
}

export { Login }