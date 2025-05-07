import { useState, useEffect } from "react";
import axios from "axios";

axios.defaults.baseURL = "https://api.celexest.com"; // Backend URL
axios.defaults.withCredentials = true; // Send cookies with requests

function UpdateUserBasicData() {
    const [createForm, setCreateForm] = useState({
        currentPassword: "",
        password: "",
        firstName: "",
        lastName: "",
        email: ""
    });

    const updateFormField = (e) => {
        const { name, value } = e.target;

        setCreateForm({
            ...createForm,
            [name]: value,
        });
    };

    const upUser = async (e) => {
        if (!window.confirm("Actualizar datos de usuario?")) {
            return;
        }

        try {
            await axios.put("/user/updateUser", createForm);

            setCreateForm({
                currentPassword: "",
                password: "",
                firstName: "",
                lastName: "",
                email: ""
            });

            window.alert("Usuario registrado con exito");
        }
        catch (err) {
            window.alert("Error al registrar al maestro");
        }
    };

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await axios.get("/user/getUserBasicData", createForm);

                setCreateForm({
                    currentPassword: "",
                    password: "",
                    firstName: res.data.userData.firstName,
                    lastName: res.data.userData.lastName,
                    email: res.data.userData.email
                });
            }
            catch (err) {
                window.alert("Error al registrar al maestro");
            }
        }

        fetchData();
    }, []);

    return (
        <div className="UpdateUserBasicData">
            <div>
                <h2>Actualizar usuario</h2>
                <h3>Necesitas tu contraseña actual para realizar cualquier cambio</h3>
                <form onSubmit={upUser}>
                    <div style={{ marginBottom: '10px' }}>
                        <label>Email:
                            <span style={{ marginRight: '10px' }} />
                            <input value={createForm.email} onChange={updateFormField} name="email" type="email" required disabled />
                        </label>
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <label>Contraseña Actual:
                            <span style={{ marginRight: '10px' }} />
                            <input value={createForm.currentPassword} onChange={updateFormField} name="currentPassword" type="password" required />
                        </label>
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <label>Nueva Contraseña:
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
                        <input value="Actualizar" type="submit" />
                    </div>
                </form>
            </div>
        </div>
    );
}

export default UpdateUserBasicData;