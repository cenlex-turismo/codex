import { useState } from "react";
import axios from "axios";

axios.defaults.baseURL = "https://api.celexest.com"; // Backend URL
axios.defaults.withCredentials = true; // Send cookies with requests

function UpdateUserBasicData() {
    const [createForm, setCreateForm] = useState({
        currentPassword: "",
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

    const upUser = async (e) => {
        e.preventDefault();
        if (!window.confirm("Actualizar datos de usuario?")) {
            return;
        }

        try {
            await axios.put("/user/updateUser", createForm);

            setCreateForm({
                currentPassword: "",
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
        <div className="UpdateUserBasicData">
            <div>
                <h2>Actualizar usuario</h2>
                <form onSubmit={upUser}>
                    <div style={{ marginBottom: '10px' }}>
                        <label>Email:
                            <span style={{ marginRight: '10px' }} />
                            <input value={createForm.email} onChange={updateFormField} name="email" type="email" required disabled/>
                        </label>
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <label>Contraseña Actual:
                            <span style={{ marginRight: '10px' }} />
                            <input value={createForm.email} onChange={updateFormField} name="currentPassword" type="password" required />
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

export default UpdateUserBasicData;