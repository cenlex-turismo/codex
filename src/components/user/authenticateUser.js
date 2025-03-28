import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:3000"; // Backend URL
axios.defaults.withCredentials = true; // Send cookies with requests

function AuthenticateUser() {

    const navigate = useNavigate();

    const [searchForm, setSearchForm] = useState({
        email: "",
        password: ""
    });

    const updateFormField = (e) => {
        const { name, value } = e.target;

        setSearchForm({
            ...searchForm,
            [name]: value,
        });
    };

    const authenticateUser = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post("/user/authenticateUser/", searchForm);

            window.alert("Bienvenid@ " + res.data.user.firstName + " " + res.data.user.lastName)

            navigate("/dashboard");
        }
        catch (err) {
            window.alert("Contraseña o correo invalidos");
        }
    };

    return (
        <div className="AuthenticateUser">
            <div>
                <h2>Iniciar Sesion</h2>
                <form onSubmit={authenticateUser}>
                    <div style={{ marginBottom: '10px' }}>
                        <label>Email:
                            <span style={{ marginRight: '10px' }} />
                            <input value={searchForm.email} onChange={updateFormField} name="email" type="email" />
                        </label>
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <label>Contraseña:
                            <span style={{ marginRight: '10px' }} />
                            <input value={searchForm.password} onChange={updateFormField} name="password" type="password" />
                        </label>
                    </div>
                    <input value="Buscar" type="submit" />
                </form>
            </div>
        </div>
    );
}

export default AuthenticateUser;
