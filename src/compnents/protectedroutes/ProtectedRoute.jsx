import React, {useEffect} from 'react';
import {Navigate} from "react-router";
import useAuthStore from "../../store/useAuthStore.js";

const ProtectedRoute = ({ children, allowedRoles }) => {
    const {token, user, role} = useAuthStore();

    console.log(role)


    // Login না থাকলে login page এ redirect
    if (!token) return <Navigate to="/login" replace />;

    // allowedRoles define করা আছে কি check
    if (allowedRoles && !allowedRoles.includes(role)) {
        return <Navigate to="/unauthorized" replace />;
    }

    // Token আছে, allowedRoles না থাকলে সকল logged-in user access করতে পারবে
    return children;


};

export default ProtectedRoute;