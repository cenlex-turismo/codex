import { useState } from "react";
import axios from "axios";
import { Button, Modal, ModalBody, ModalHeader, ModalFooter } from "flowbite-react";
import { HiOutlineExclamationCircle, HiCheckCircle, HiOutlineX } from "react-icons/hi";

axios.defaults.baseURL = "https://api.celexest.com"; // Backend URL
axios.defaults.withCredentials = true; // Send cookies with requests

function CreateStudent() {
    const [createForm, setCreateForm] = useState({
        firstName: "",
        lastName: "",
        idNumber: 0,
        studentType: 0
    });

    const [openModal, setOpenModal] = useState(false);
    const [openModalResult, setOpenModalResult] = useState({
        show: false,
        message: ""
    });

    const updateFormField = (e) => {
        const { name, value } = e.target;

        if (name === 'studentType') {
            document.getElementById("idNumber").disabled = value === '2' ? true : false;
        }

        setCreateForm({
            ...createForm,
            [name]: value,
        });
    };

    const registerStudent = async () => {
        try {
            await axios.post("/student/createStudent", createForm);

            setCreateForm({
                firstName: "",
                lastName: "",
                idNumber: 0,
                studentType: 0
            });

            setOpenModalResult({
                show: true,
                message: "Alumno registrado con éxito"
            });
        }
        catch (err) {
            setOpenModalResult({
                show: true,
                message: "Error al registrar al alumno"
            });
        }
    };

    const showModal = async (e) => {
        e.preventDefault();
        setOpenModal(true);
    };

    return (
        <div className="CreateStudent">
            <div>
                <h2>Registrar Alumno</h2>
                <form onSubmit={showModal}>
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
                        <label>Tipo de alumno
                            <span style={{ marginRight: '10px' }} />
                            <select value={createForm.studentType} onChange={updateFormField} id="studentType" name="studentType">
                                <option value={0} disabled>Selecciona un tipo de curso</option>
                                <option value={1}>Comunidad IPN</option>
                                <option value={2}>Externo</option>
                            </select>
                        </label>
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <label>Boleta:
                            <span style={{ marginRight: '10px' }} />
                            <input value={createForm.idNumber} onChange={updateFormField} name="idNumber" id="idNumber" type="number" />
                        </label>
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <input value="Registrar" type="submit" />
                    </div>
                </form>
            </div>
            <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
                <ModalHeader />
                <ModalBody>
                    <div className="text-center">
                        <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                            ¿Seguro de registrar al alumno?
                        </h3>
                        <div className="flex justify-center gap-4">
                            <Button color="failure" onClick={() => {
                                setOpenModal(false);
                                registerStudent();
                            }}>
                                {"Si, registrar"}
                            </Button>
                            <Button color="gray" onClick={() => setOpenModal(false)}>
                                No, cancelar
                            </Button>
                        </div>
                    </div>
                </ModalBody>
            </Modal>
            <Modal size="md" popup dismissible show={openModalResult.show} onClose={() => setOpenModalResult({
                ...setOpenModalResult,
                show: false
            })}>
                <ModalHeader />
                <ModalBody>
                    <div className="text-center space-y-6">
                        {openModalResult.message === "Alumno registrado con éxito" ? (
                            <HiCheckCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                        ) : (
                            <HiOutlineX className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                        )}
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            {openModalResult.message}
                        </p>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={() => setOpenModalResult({
                        ...setOpenModalResult,
                        show: false
                    })}>Aceptar</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default CreateStudent;
