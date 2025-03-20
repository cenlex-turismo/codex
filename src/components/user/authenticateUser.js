import { useState } from "react";
import axios from "axios";

function AuthenticateUser() {
    const [searchForm, setSearchForm] = useState({
        email: "",
        password: ""
    });

    const [result, setResult] = useState({
        firstName: "",
        lastName: "",
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
            const res = await axios.get("http://localhost:3000/authenticateUser/", {
                params: searchForm
            });

            setResult({
                firstName: res.data.user.firstName,
                lastName: res.data.user.lastName,
            });

            window.alert("Alumno encontrado");
        }
        catch (err) {
            setResult({
                firstName: "",
                lastName: "",
                courseGrades: []
            });
            window.alert("Alumno no encontrado");
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
            <div>
                <p>Nombre(s): {result.firstName}</p>
                <p>Apellidos: {result.lastName}</p>
            </div>
        </div>
    );
}

export default AuthenticateUser;
