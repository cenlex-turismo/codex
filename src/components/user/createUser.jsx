import { useState } from "react";
import axios from "axios";
import {
    Button,
    TextInput,
    Label,
    Card,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from "flowbite-react";
import { HiOutlineExclamationCircle, HiCheckCircle, HiOutlineX } from "react-icons/hi";
import { API_URL } from "../../utils/constant";

axios.defaults.baseURL = API_URL; // Backend URL
axios.defaults.withCredentials = true; // Send cookies with requests

function CreateUser() {
    const [createForm, setCreateForm] = useState({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
    });

    const [confirmModal, setConfirmModal] = useState(false); // For confirmation modal
    const [resultModal, setResultModal] = useState({
        show: false,
        success: null, // null = not attempted, true = success, false = failure
        message: "",
    });

    const updateFormField = (e) => {
        const { name, value } = e.target;
        setCreateForm({
            ...createForm,
            [name]: value,
        });
    };

    const showConfirmModal = (e) => {
        e.preventDefault();
        setConfirmModal(true);
    };

    const registerUser = async () => {
        try {
            await axios.post("/user/createUser", createForm);
            setCreateForm({
                email: "",
                password: "",
                firstName: "",
                lastName: "",
            });
            setResultModal({
                show: true,
                success: true,
                message: "Usuario registrado con éxito",
            });
        } catch (err) {
            console.error(err);
            setResultModal({
                show: true,
                success: false,
                message: "Error al registrar al usuario",
            });
        } finally {
            setConfirmModal(false); // Close confirmation modal
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
            <Card className="max-w-lg w-full shadow-lg">
                <h2 className="text-xl font-bold text-gray-800 dark:text-white text-center">Registrar Nuevo Administrador</h2>
                <form onSubmit={showConfirmModal} className="space-y-4">
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

            {/* Confirmation Modal */}
            <Modal
                show={confirmModal}
                size="md"
                onClose={() => setConfirmModal(false)}
                popup
            >
                <ModalHeader />
                <ModalBody>
                    <div className="text-center">
                        <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                            ¿Seguro de registrar al usuario?
                        </h3>
                        <div className="flex justify-center gap-4">
                            <Button onClick={registerUser}>
                                Sí, registrar
                            </Button>
                            <Button color="gray" onClick={() => setConfirmModal(false)}>
                                No, cancelar
                            </Button>
                        </div>
                    </div>
                </ModalBody>
            </Modal>

            {/* Result Modal */}
            <Modal
                size="md"
                popup
                dismissible
                show={resultModal.show}
                onClose={() => setResultModal({ ...resultModal, show: false })}
            >
                <ModalHeader />
                <ModalBody>
                    <div className="text-center space-y-6">
                        {resultModal.success ? (
                            <HiCheckCircle className="mx-auto mb-4 h-14 w-14 text-green-500" />
                        ) : (
                            <HiOutlineX className="mx-auto mb-4 h-14 w-14 text-red-500" />
                        )}
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            {resultModal.message}
                        </p>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button
                        onClick={() => setResultModal({ ...resultModal, show: false })}
                    >
                        Aceptar
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default CreateUser;
