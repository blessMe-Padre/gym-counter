import React from 'react';
import { Link } from 'react-router-dom';
import { SignUp } from '../components/SingUp';

const Register = () => {
    return (
        <>
            <h1>Регистрация</h1>
            <SignUp />
            <p>
                Если у вас уже есть аккаунт <Link to="/login">Вход в аккаунт</Link>
            </p>
        </>
    )
}

export default Register