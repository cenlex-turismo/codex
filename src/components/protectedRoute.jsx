import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { checkAuthentication } from "../utils/auth";

const ProtectedRoute = ({ children }) => {
    const [auth, setAuth] = useState({ isAuthenticated: false, user: null });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAuth = async () => {
            const result = await checkAuthentication();
            setAuth(result);
            setLoading(false);
        };
        fetchAuth();
    }, []);

    if (loading) {
        return <div>Loading...</div>; // Show a spinner or placeholder while checking
    }

    if (!auth.isAuthenticated) {
        return <Navigate to="/login" />;
    }

    return React.cloneElement(children, { user: auth.user }); // Pass user as a prop
};

export default ProtectedRoute;
