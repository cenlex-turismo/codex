import axios from "axios";
import { useNavigate } from "react-router-dom";

axios.defaults.baseURL = "http://localhost:3000"; // Backend URL
axios.defaults.withCredentials = true; // Send cookies with requests

function LogoutUser() {

    const navigate = useNavigate();

    const logout = async () => {
        try {
            const res = await axios.post("/user/logoutUser/");
            console.log(res.data.message);
            window.alert("Sesion cerrada");
            navigate("/login");
        }
        catch (err) {
            window.alert("Error al cerrar sesion");
        }
    };

    return (
        <div className="LogoutUser">
            <div>
                <button onClick={logout}>Cerrar Sesion</button>
            </div>
        </div>
    );
}

export default LogoutUser;
