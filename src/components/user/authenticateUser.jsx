import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { Button, Modal, ModalBody, ModalHeader, ModalFooter, Label, TextInput, Card } from "flowbite-react";
import { HiCheckCircle, HiOutlineX } from "react-icons/hi";

axios.defaults.baseURL = "https://api.celexest.com";
axios.defaults.withCredentials = true;

function AuthenticateUser() {
    const navigate = useNavigate();

    const [searchForm, setSearchForm] = useState({ email: "", password: "" });
    const [openModalResult, setOpenModalResult] = useState({ show: false, message: "" });

    const updateFormField = (e) => {
        const { name, value } = e.target;
        setSearchForm({ ...searchForm, [name]: value });
    };

    const authenticateUser = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("/user/authenticateUser/", searchForm);
            setOpenModalResult({
                show: true,
                message: "Bienvenid@ " + res.data.user.firstName + " " + res.data.user.lastName,
            });
        } catch (err) {
            setOpenModalResult({
                show: true,
                message: "Contraseña o correo invalidos",
            });
        }
    };

    return (
        <div
            className="flex items-center justify-center h-screen bg-cover bg-center"
        >
            <Card className="w-full max-w-md p-8 bg-white bg-opacity-90 rounded-2xl shadow-lg">
                <h2 className="text-3xl font-bold text-center mb-6 text-gray-800 dark:text-gray-200">Iniciar Sesión</h2>
                <form onSubmit={authenticateUser} className="flex flex-col gap-6">
                    <div>
                        <Label htmlFor="email">Correo</Label>
                        <TextInput
                            value={searchForm.email}
                            id="email"
                            name="email"
                            type="email"
                            onChange={updateFormField}
                            placeholder="correo@ejemplo.com"
                            required
                        />
                    </div>
                    <div>
                        <Label htmlFor="password">Contraseña</Label>
                        <TextInput
                            value={searchForm.password}
                            id="password"
                            name="password"
                            type="password"
                            onChange={updateFormField}
                            required
                        />
                    </div>
                    <Button type="submit" className="w-full">Ingresar</Button>
                </form>
                <div className="mt-4">
                    <Link to="/signup" className="text-blue-600 dark:text-blue-400 underline">
                        Registrarse
                    </Link>
                </div>
            </Card>

            <Modal size="md" popup dismissible show={openModalResult.show} onClose={() => setOpenModalResult({ ...openModalResult, show: false })}>
                <ModalHeader />
                <ModalBody>
                    <div className="text-center space-y-6">
                        {openModalResult.message !== "Contraseña o correo invalidos" ? (
                            <HiCheckCircle className="mx-auto mb-4 h-14 w-14 text-green-500" />
                        ) : (
                            <HiOutlineX className="mx-auto mb-4 h-14 w-14 text-red-500" />
                        )}
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            {openModalResult.message}
                        </p>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button
                        onClick={() => {
                            setOpenModalResult({ ...openModalResult, show: false });
                            if (openModalResult.message !== "Contraseña o correo invalidos") {
                                navigate("/dashboard");
                            }
                        }}
                        className="w-full"
                    >
                        Aceptar
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default AuthenticateUser;
