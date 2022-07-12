import React from 'react'
import { Link } from 'react-router-dom'
import { Login } from '../components/Login'

const LoginPage = () => {
    return (
        <>
            <h1>LoginPage</h1>
            <Login />
            <p>
                Или <Link to="/register">Зарегистрируйтесь</Link>
            </p>
        </>

    )
}

export default LoginPage