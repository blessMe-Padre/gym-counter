import { useDispatch } from 'react-redux';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { Form } from './Form';
import { setUser } from '../store/slices/userSlice';
import { Navigate } from 'react-router-dom';

const SignUp = () => {
    const dispatch = useDispatch();

    const handleRegister = (email, password) => {
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
            .then(({ user }) => {
                dispatch(setUser({
                    email: user.email,
                    id: user.uid,
                    token: user.accessToken,
                }));
                <Navigate to="/" />
            })
            .catch(console.error)
    }

    return (
        <Form
            title="register"
            handleClick={handleRegister}
        />
    )
}
// 00@gmail.com 123456
export { SignUp }