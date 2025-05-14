import { useState, useEffect } from "react";
import axios from "axios";
import { Card, Button, Label, TextInput } from "flowbite-react";

axios.defaults.baseURL = "https://api.celexest.com"; // Backend URL
axios.defaults.withCredentials = true; // Send cookies with requests

function UpdateUserBasicData() {
    const [createForm, setCreateForm] = useState({
        currentPassword: "",
        password: "",
        firstName: "",
        lastName: "",
        email: "",
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
                lastName: "",
                email: "",
            });

            window.alert("Datos de usuario actualizados con éxito");
        } catch (err) {
            window.alert("Error al actualizar los datos del usuario");
        }
    };

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await axios.get("/user/getUserBasicData");

                setCreateForm({
                    currentPassword: "",
                    password: "",
                    firstName: res.data.userData.firstName,
                    lastName: res.data.userData.lastName,
                    email: res.data.userData.email,
                });
            } catch (err) {
                window.alert("Error al obtener los datos del usuario");
            }
        }

        fetchData();
    }, []);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
            <Card className="max-w-lg w-full">
                <h2 className="text-xl font-bold text-gray-800 dark:text-white text-center mb-6">
                    Actualizar Usuario
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 text-center">
                    Necesitas tu contraseña actual para realizar cualquier cambio
                </p>
                <form onSubmit={upUser} className="space-y-4">
                    <div>
                        <Label htmlFor="email" value="Email" />
                        <TextInput
                            id="email"
                            name="email"
                            type="email"
                            value={createForm.email}
                            onChange={updateFormField}
                            required
                            disabled
                        />
                    </div>
                    <div>
                        <Label htmlFor="currentPassword" value="Contraseña Actual" />
                        <TextInput
                            id="currentPassword"
                            name="currentPassword"
                            type="password"
                            value={createForm.currentPassword}
                            onChange={updateFormField}
                            placeholder="Ingrese su contraseña actual"
                            required
                        />
                    </div>
                    <div>
                        <Label htmlFor="password" value="Nueva Contraseña" />
                        <TextInput
                            id="password"
                            name="password"
                            type="password"
                            value={createForm.password}
                            onChange={updateFormField}
                            placeholder="Ingrese su nueva contraseña (opcional)"
                        />
                    </div>
                    <div>
                        <Label htmlFor="firstName" value="Nombre(s)" />
                        <TextInput
                            id="firstName"
                            name="firstName"
                            type="text"
                            value={createForm.firstName}
                            onChange={updateFormField}
                            placeholder="Ingrese su nombre"
                        />
                    </div>
                    <div>
                        <Label htmlFor="lastName" value="Apellidos" />
                        <TextInput
                            id="lastName"
                            name="lastName"
                            type="text"
                            value={createForm.lastName}
                            onChange={updateFormField}
                            placeholder="Ingrese sus apellidos"
                        />
                    </div>
                    <Button type="submit" className="w-full">
                        Actualizar
                    </Button>
                </form>
            </Card>
        </div>
    );
}

export default UpdateUserBasicData;
