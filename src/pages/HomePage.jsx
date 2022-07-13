import { Navigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useAuth } from '../hooks/use-auth'
import { removeUser } from '../store/slices/userSlice'

const HomePage = () => {
    const dispatch = useDispatch();

    const { isAuth, email } = useAuth();

    return isAuth ? (
        <div>
            <h1>Welcome</h1>

            <button
                onClick={() => dispatch(removeUser())}
            >Выйти из аккаунта {email}</button>
        </div>
    ) : (
        <Navigate to="/login" />
    )
}

export default HomePage