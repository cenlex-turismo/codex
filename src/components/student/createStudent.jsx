import { useState } from "react";
import axios from "axios";
import { Button, Modal, ModalBody, ModalHeader, ModalFooter, Label, TextInput, Select, Card } from "flowbite-react";
import { HiOutlineExclamationCircle, HiCheckCircle, HiOutlineX } from "react-icons/hi";
import { API_URL } from "../../utils/constant";
import DefaultNavigationBar from "../navbars/defaultNavigationBar";

axios.defaults.baseURL = API_URL; // Backend URL
axios.defaults.withCredentials = true; // Send cookies with requests

function CreateStudent() {
    const [createForm, setCreateForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        idNumber: 0,
        studentType: 0,
    });

    const [openModal, setOpenModal] = useState(false);
    const [openModalResult, setOpenModalResult] = useState({
        show: false,
        message: "",
    });

    const updateFormField = (e) => {
        const { name, value } = e.target;

        if (name === "studentType") {
            document.getElementById("idNumber").disabled = value === "2";
        }

        setCreateForm({
            ...createForm,
            [name]: value,
        });
    };

    const registerStudent = async () => {
        try {
            const res = await axios.post("/createStudent", createForm);

            setCreateForm({
                firstName: "",
                lastName: "",
                email: "",
                password: "",
                idNumber: 0,
                studentType: 0,
            });

            setOpenModalResult({
                show: true,
                message: "Alumno registrado con éxito con boleta " + res.data.idNumber,
            });
        } catch (err) {
            console.log(err);
            setOpenModalResult({
                show: true,
                message: "Error al registrar al alumno",
            });
        }
    };

    const showModal = async (e) => {
        e.preventDefault();
        setOpenModal(true);
    };

    const numberInputOnWheelPreventChange = (e) => {
        // Prevent the input value change
        e.target.blur()
    }

    return (
        <div>
            <DefaultNavigationBar />
            <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
                <Card className="w-full max-w-lg p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
                    <h2 className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-white">Registrar Alumno</h2>
                    <form onSubmit={showModal} className="flex flex-col gap-4">
                        <div>
                            <Label htmlFor="firstName">Nombre(s):</Label>
                            <TextInput
                                value={createForm.firstName}
                                id="firstName"
                                name="firstName"
                                type="text"
                                onChange={updateFormField}
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="lastName">Apellidos:</Label>
                            <TextInput
                                value={createForm.lastName}
                                id="lastName"
                                name="lastName"
                                type="text"
                                onChange={updateFormField}
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="email">Email:</Label>
                            <TextInput
                                value={createForm.email}
                                id="email"
                                name="email"
                                type="email"
                                onChange={updateFormField}
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="password">Contraseña:</Label>
                            <TextInput
                                value={createForm.password}
                                id="password"
                                name="password"
                                type="password"
                                onChange={updateFormField}
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="studentType">Tipo de alumno:</Label>
                            <Select
                                value={createForm.studentType}
                                id="studentType"
                                name="studentType"
                                onChange={updateFormField}
                                required
                            >
                                <option value={0} disabled>
                                    Selecciona un tipo de alumno
                                </option>
                                <option value={1}>Comunidad IPN</option>
                                <option value={2}>Externo</option>
                            </Select>
                        </div>
                        <div>
                            <Label htmlFor="idNumber">Boleta:</Label>
                            <TextInput
                                value={createForm.idNumber}
                                id="idNumber"
                                name="idNumber"
                                type="number"
                                onChange={updateFormField}
                                onWheel={numberInputOnWheelPreventChange}
                                required
                            />
                        </div>
                        <Button type="submit" className="w-full">
                            Registrar
                        </Button>
                    </form>
                </Card>

                {/* Confirmation Modal */}
                <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
                    <ModalHeader />
                    <ModalBody>
                        <div className="text-center">
                            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                                ¿Seguro de registrar al alumno?
                            </h3>
                            <div className="flex justify-center gap-4">
                                <Button
                                    color="failure"
                                    onClick={() => {
                                        setOpenModal(false);
                                        registerStudent();
                                    }}
                                >
                                    Sí, registrar
                                </Button>
                                <Button color="gray" onClick={() => setOpenModal(false)}>
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
                    show={openModalResult.show}
                    onClose={() => setOpenModalResult({ ...openModalResult, show: false })}
                >
                    <ModalHeader />
                    <ModalBody>
                        <div className="text-center space-y-6">
                            {openModalResult.message !== "Error al registrar al alumno" ? (
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
                            onClick={() => setOpenModalResult({ ...openModalResult, show: false })}
                            className="w-full"
                        >
                            Aceptar
                        </Button>
                    </ModalFooter>
                </Modal>
            </div>
        </div>
    );
}

export default CreateStudent;
