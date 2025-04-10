import axios from "axios";
import { useState } from "react";
import { Button, Modal, ModalBody, ModalHeader, ModalFooter } from "flowbite-react";
import { HiOutlineExclamationCircle, HiCheckCircle, HiOutlineX } from "react-icons/hi";

axios.defaults.baseURL = "http://localhost:3000"; // Backend URL
axios.defaults.withCredentials = true; // Send cookies with requests

function DeleteOldStudents() {

    const [openModal, setOpenModal] = useState(false);
    const [openModalResult, setOpenModalResult] = useState({
        show: false,
        message: ""
    });

    const deleteOldStudents = async () => {
        try {
            await axios.delete("/student/maintenance");
            setOpenModalResult({
                show: true,
                message: "Eliminación con éxito"
            });
        }
        catch (err) {
            setOpenModalResult({
                show: true,
                message: "Error al eliminar"
            });
        }
    };

    const showModal = async (e) => {
        e.preventDefault();
        setOpenModal(true);
    };

    return (
        <div className="DeleteOldStudents">
            <div>
                <h2>Eliminar registros viejos de alumnos</h2>
                <form onSubmit={showModal}>
                    <input value="Eliminar" type="submit" />
                </form>
            </div>
            <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
                <ModalHeader />
                <ModalBody>
                    <div className="text-center">
                        <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                            ¿Seguro de realizar la eliminación?
                        </h3>
                        <div className="flex justify-center gap-4">
                            <Button color="failure" onClick={() => {
                                setOpenModal(false);
                                deleteOldStudents();
                            }}>
                                {"Si, eliminar"}
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
                        {openModalResult.message === "Eliminación con éxito" ? (
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

export default DeleteOldStudents;
