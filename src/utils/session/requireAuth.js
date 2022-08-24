import React, { useContext } from "react";
import { AuthUserContext } from './index';
import { Navigate, useLocation } from "react-router-dom";

const RequireAuth = ({ children }) => {
    const { authUser } = useContext(AuthUserContext);
    const location = useLocation();
    return authUser !== null ? children : <Navigate to='/signin' replace state={{ state: location.pathname }} />;
}

export default RequireAuth;