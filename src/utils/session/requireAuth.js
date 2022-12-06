import React, { useContext } from "react"
import { AuthUserContext } from './index'
import { Navigate, useLocation } from "react-router-dom"
import useLocalStorage from '../../hooks/useLocalStorage'

const RequireAuth = ({ children }) => {
    const { authUser } = useContext(AuthUserContext)
    const [localUser] = useLocalStorage('local_user')
    const location = useLocation()

    return authUser === null && (typeof localUser !== 'object')
        ? <Navigate to='/signin' replace state={{ state: location.pathname }} />
        : children
}

export default RequireAuth