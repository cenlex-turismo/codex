import { useState } from "react";
import axios from "axios";
import { Button, Modal, ModalBody, ModalHeader, ModalFooter } from "flowbite-react";
import { HiOutlineExclamationCircle, HiCheckCircle, HiOutlineX } from "react-icons/hi";

axios.defaults.baseURL = "https://api.celexest.com"; // Backend URL
axios.defaults.withCredentials = true; // Send cookies with requests

function CreateCourse() {
    const [createForm, setCreateForm] = useState({
        language: "",
        level: 0,
        module: 0
    });

    const [openModal, setOpenModal] = useState(false);
    const [openModalResult, setOpenModalResult] = useState({
        show: false,
        message: ""
    });

    const updateFormField = (e) => {
        const { name, value } = e.target;

        setCreateForm({
            ...createForm,
            [name]: value,
        });
    };

    const registerCourse = async () => {
        try {
            await axios.post("/course/createCourse", createForm);

            setCreateForm({
                language: "",
                level: 0,
                module: 0
            });

            setOpenModalResult({
                show: true,
                message: "Curso registrado con éxito"
            });
        }
        catch (err) {
            setOpenModalResult({
                show: true,
                message: "Error al registrar el curso"
            });
        }
    };

    const showModal = async (e) => {
        e.preventDefault();
        setOpenModal(true);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
            <div>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Registrar Curso</h2>
                <form onSubmit={showModal}>
                    <div style={{ marginBottom: '10px' }}>
                        <label>Lenguaje:
                            <span style={{ marginRight: '10px' }} />
                            <input value={createForm.language} onChange={updateFormField} name="language" type="text" />
                        </label>
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <label>Nivel:
                            <span style={{ marginRight: '10px' }} />
                            <input value={createForm.level} onChange={updateFormField} name="level" type="number" />
                        </label>
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <label>Modulo:
                            <span style={{ marginRight: '10px' }} />
                            <input value={createForm.module} onChange={updateFormField} name="module" type="number" />
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
                            ¿Seguro de registrar el curso?
                        </h3>
                        <div className="flex justify-center gap-4">
                            <Button color="failure" onClick={() => {
                                setOpenModal(false);
                                registerCourse();
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
                        {openModalResult.message === "Curso registrado con éxito" ? (
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

export default CreateCourse;