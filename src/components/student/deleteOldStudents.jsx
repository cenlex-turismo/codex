import axios from "axios";
import { useState } from "react";
import { Card, Label, TextInput, Button, Modal, ModalBody, ModalHeader, ModalFooter } from "flowbite-react";
import { HiOutlineExclamationCircle, HiCheckCircle, HiOutlineX } from "react-icons/hi";
import { API_URL } from "../../utils/constant";

axios.defaults.baseURL = API_URL; // Backend URL
axios.defaults.withCredentials = true; // Send cookies with requests

function DeleteOldStudents() {
    const [years, setYears] = useState("");
    const [openModal, setOpenModal] = useState(false);
    const [openModalResult, setOpenModalResult] = useState({
        show: false,
        message: ""
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (years.trim() !== "") {
            setOpenModal(true);
        }
    };

    const deleteOldStudents = async () => {
        try {
            await axios.delete(`/student/maintenance/${years}`);
            setOpenModalResult({
                show: true,
                message: "Eliminación con éxito"
            });
        } catch (err) {
            setOpenModalResult({
                show: true,
                message: "Error al eliminar"
            });
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
            <Card className="w-full max-w-md">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Eliminar alumnos antiguos</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                    Por favor, ingresa el número de años de antigüedad que deben tener los registros para ser eliminados.
                </p>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <Label htmlFor="years" value="Eliminar alumnos con más de (años):" />
                        <TextInput
                            id="years"
                            type="number"
                            value={years}
                            onChange={(e) => setYears(e.target.value)}
                            placeholder="Ej. 3"
                            required
                        />
                    </div>
                    <Button type="submit" className="w-full">Eliminar Registros</Button>
                </form>
            </Card>

            {/* Modal de confirmación */}
            <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
                <ModalHeader />
                <ModalBody>
                    <div className="text-center">
                        <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                            ¿Seguro que deseas eliminar los registros con más de {years} años?
                        </h3>
                        <div className="flex justify-center gap-4">
                            <Button color="failure" onClick={() => {
                                setOpenModal(false);
                                deleteOldStudents();
                            }}>
                                Sí, eliminar
                            </Button>
                            <Button color="gray" onClick={() => setOpenModal(false)}>
                                No, cancelar
                            </Button>
                        </div>
                    </div>
                </ModalBody>
            </Modal>

            {/* Modal de resultado */}
            <Modal size="md" popup dismissible show={openModalResult.show} onClose={() => setOpenModalResult({ show: false, message: "" })}>
                <ModalHeader />
                <ModalBody>
                    <div className="text-center space-y-6">
                        {openModalResult.message === "Eliminación con éxito" ? (
                            <HiCheckCircle className="mx-auto h-14 w-14 text-green-500" />
                        ) : (
                            <HiOutlineX className="mx-auto h-14 w-14 text-red-500" />
                        )}
                        <p className="text-base text-gray-700 dark:text-gray-300">
                            {openModalResult.message}
                        </p>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={() => setOpenModalResult({ show: false, message: "" })}>Aceptar</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default DeleteOldStudents;
