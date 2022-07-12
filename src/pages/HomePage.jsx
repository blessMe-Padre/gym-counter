import React from 'react'
import { Navigate } from 'react-router-dom'

const HomePage = () => {
    return (
        <>
            <div>HomePage</div>
            <Navigate to="/login" />
        </>
    )
}

export default HomePage