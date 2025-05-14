import { useState } from "react";
import axios from "axios";
import { Button, TextInput, Label, Card } from "flowbite-react";

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
        const confirmRegistration = window.confirm("¿Registrar usuario?");
        if (!confirmRegistration) return;

        try {
            await axios.post("/user/createUser", createForm);
            setCreateForm({
                email: "",
                password: "",
                firstName: "",
                lastName: "",
            });
            window.alert("Usuario registrado con éxito");
        } catch (err) {
            console.error(err);
            window.alert("Error al registrar al usuario");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
            <Card className="max-w-lg w-full shadow-lg">
                <h2 className="text-xl font-bold text-gray-800 dark:text-white text-center">Registrar Nuevo Administrador</h2>
                <form onSubmit={registerUser} className="space-y-4">
                    <div>
                        <Label htmlFor="email" value="Email" />
                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={createForm.email}
                            onChange={updateFormField}
                            placeholder="Ingresa tu email"
                            required
                        />
                    </div>
                    <div>
                        <Label htmlFor="password" value="Contraseña" />
                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            value={createForm.password}
                            onChange={updateFormField}
                            placeholder="Crea una contraseña"
                            required
                        />
                    </div>
                    <div>
                        <Label htmlFor="firstName" value="Nombre(s)" />
                        <TextInput
                            id="firstName"
                            type="text"
                            name="firstName"
                            value={createForm.firstName}
                            onChange={updateFormField}
                            placeholder="Ingresa tu nombre"
                            required
                        />
                    </div>
                    <div>
                        <Label htmlFor="lastName" value="Apellidos" />
                        <TextInput
                            id="lastName"
                            type="text"
                            name="lastName"
                            value={createForm.lastName}
                            onChange={updateFormField}
                            placeholder="Ingresa tus apellidos"
                            required
                        />
                    </div>
                    <Button type="submit" className="w-full">
                        Registrar
                    </Button>
                </form>
            </Card>
        </div>
    );
}

export default CreateUser;
