import { useState } from "react";
import axios from "axios";

axios.defaults.baseURL = "https://api.celexest.com"; // Backend URL
axios.defaults.withCredentials = true; // Send cookies with requests

function CreateUser() {
    const [createForm, setCreateForm] = useState({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
    });

    const updateFormField = (e) => {
        const { name, value } = e.target;

        setCreateForm({
            ...createForm,
            [name]: value,
        });
    };

    const registerUser = async (e) => {
        e.preventDefault();
        if (!window.confirm("Registrar usuario?")) {
            return;
        }

        try {
            await axios.post("/user/createUser", createForm);

            setCreateForm({
                email: "",
                password: "",
                firstName: "",
                lastName: ""
            });

            window.alert("Usuario registrado con exito");
        }
        catch (err) {
            window.alert("Error al registrar al maestro");
        }
    };

    return (
        <div className="CreateUser">
            <div>
                <h2>Registrar usuario</h2>
                <form onSubmit={registerUser}>
                    <div style={{ marginBottom: '10px' }}>
                        <label>Email:
                            <span style={{ marginRight: '10px' }} />
                            <input value={createForm.email} onChange={updateFormField} name="email" type="email" />
                        </label>
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <label>Contraseña:
                            <span style={{ marginRight: '10px' }} />
                            <input value={createForm.password} onChange={updateFormField} name="password" type="password" />
                        </label>
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <label>Nombre(s):
                            <span style={{ marginRight: '10px' }} />
                            <input value={createForm.firstName} onChange={updateFormField} name="firstName" type="text" />
                        </label>
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <label>Apellidos:
                            <span style={{ marginRight: '10px' }} />
                            <input value={createForm.lastName} onChange={updateFormField} name="lastName" type="text" />
                        </label>
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <input value="Registrar" type="submit" />
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CreateUser;