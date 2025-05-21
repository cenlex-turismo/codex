import { useState, useEffect } from "react";
import axios from "axios";
import { Card, Button, Label, TextInput, Modal, ModalHeader, ModalBody, ModalFooter } from "flowbite-react";
import { HiOutlineExclamationCircle, HiCheckCircle, HiOutlineX } from "react-icons/hi";

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

    const [confirmModal, setConfirmModal] = useState(false); // Confirmation modal state
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

    const upUser = async () => {
        try {
            await axios.put("/user/updateUser", createForm);

            setCreateForm({
                currentPassword: "",
                password: "",
                firstName: "",
                lastName: "",
                email: "",
            });

            setResultModal({
                show: true,
                success: true,
                message: "Datos de usuario actualizados con éxito",
            });
        } catch (err) {
            setResultModal({
                show: true,
                success: false,
                message: "Error al actualizar los datos del usuario",
            });
        } finally {
            setConfirmModal(false); // Close confirmation modal
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
                setResultModal({
                    show: true,
                    success: false,
                    message: "Error al obtener los datos del usuario",
                });
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
                    Necesitas tu contraseña actual para realizar cualquier cambio.
                    Deja el campo de contraseña nueva en blanco si no deseas cambiarla.
                </p>
                <form onSubmit={showConfirmModal} className="space-y-4">
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
                            ¿Seguro de actualizar los datos del usuario?
                        </h3>
                        <div className="flex justify-center gap-4">
                            <Button onClick={upUser}>
                                Sí, actualizar
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
                show={resultModal.show}
                size="md"
                popup
                dismissible
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

export default UpdateUserBasicData;
