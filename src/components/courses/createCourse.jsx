import { useState } from "react";
import axios from "axios";
import { Button, Modal, ModalBody, ModalHeader, ModalFooter, Tooltip } from "flowbite-react";
import { HiOutlineExclamationCircle, HiCheckCircle, HiOutlineX, HiInformationCircle } from "react-icons/hi";

axios.defaults.baseURL = "https://api.celexest.com"; // Backend URL
axios.defaults.withCredentials = true; // Send cookies with requests

function CreateCourse() {
    const [createForm, setCreateForm] = useState({
        language: "",
        level: 0,
        module: 1,
    });

    const [openModal, setOpenModal] = useState(false);
    const [openModalResult, setOpenModalResult] = useState({
        show: false,
        message: "",
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
                module: 1,
            });

            setOpenModalResult({
                show: true,
                message: "¡Curso registrado con éxito! 🎉",
            });
        } catch (err) {
            setOpenModalResult({
                show: true,
                message: "Error al registrar el curso. Por favor, inténtelo nuevamente.",
            });
        }
    };

    const showModal = async (e) => {
        e.preventDefault();
        setOpenModal(true);
    };

    const numberInputOnWheelPreventChange = (e) => {
        e.target.blur();
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
            <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 max-w-md w-full">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                    Registrar Nuevo Curso
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                    Complete los campos para registrar un curso. Los datos deben ser precisos.
                </p>
                <form onSubmit={showModal}>
                    <div className="mb-4">
                        <label className="block text-gray-700 dark:text-gray-300 mb-2">
                            Lenguaje:
                            <Tooltip content="Por ejemplo: Español, Inglés, Francés">
                                <HiInformationCircle className="inline ml-2 h-5 w-5 text-blue-500 cursor-pointer" />
                            </Tooltip>
                        </label>
                        <input
                            value={createForm.language}
                            onChange={updateFormField}
                            name="language"
                            type="text"
                            required
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 dark:text-gray-300 mb-2">Nivel:
                            <Tooltip content="0 - Introductorio, 1 - Básico, 2 - Intermedio, 3 - Avanzado">
                                <HiInformationCircle className="inline ml-2 h-5 w-5 text-blue-500 cursor-pointer" />
                            </Tooltip>
                        </label>
                        <input
                            value={createForm.level}
                            onChange={updateFormField}
                            name="level"
                            type="number"
                            required
                            onWheel={numberInputOnWheelPreventChange}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            min={0}
                            max={3}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 dark:text-gray-300 mb-2">Módulo:</label>
                        <input
                            value={createForm.module}
                            onChange={updateFormField}
                            name="module"
                            type="number"
                            required
                            onWheel={numberInputOnWheelPreventChange}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            min={1}
                            max={6}
                        />
                    </div>
                    <div className="flex justify-end">
                        <Button type="submit">Registrar</Button>
                    </div>
                </form>
            </div>

            <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
                <ModalHeader />
                <ModalBody>
                    <div className="text-center">
                        <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                            ¿Está seguro de registrar este curso?
                        </h3>
                        <div className="flex justify-center gap-4">
                            <Button
                                color="failure"
                                onClick={() => {
                                    setOpenModal(false);
                                    registerCourse();
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

            <Modal
                size="md"
                popup
                dismissible
                show={openModalResult.show}
                onClose={() =>
                    setOpenModalResult({
                        ...setOpenModalResult,
                        show: false,
                    })
                }
            >
                <ModalHeader />
                <ModalBody>
                    <div className="text-center space-y-6">
                        {openModalResult.message === "¡Curso registrado con éxito! 🎉" ? (
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
                        onClick={() =>
                            setOpenModalResult({
                                ...setOpenModalResult,
                                show: false,
                            })
                        }
                    >
                        Aceptar
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default CreateCourse;
