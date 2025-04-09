import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { checkAuthentication } from "../utils/auth";
import AuthenticateUser from "./user/authenticateUser";

const RedirectBasedOnAuth = () => {
    const [auth, setAuth] = useState({ isAuthenticated: false });
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
        return <div>Loading...</div>;
    }

    return auth.isAuthenticated ? <Navigate to="/dashboard" /> : <AuthenticateUser />;
};

export default RedirectBasedOnAuth;
