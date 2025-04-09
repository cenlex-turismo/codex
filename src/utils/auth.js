import axios from "axios";

export const checkAuthentication = async () => {
    try {
        const response = await axios.get("/user/validateUserSession", { withCredentials: true });
        return { isAuthenticated: true, user: response.data.user };
    } catch (error) {
        return { isAuthenticated: false, user: null };
    }
};
