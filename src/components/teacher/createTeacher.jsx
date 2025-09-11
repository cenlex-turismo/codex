import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Button, Modal, ModalBody, ModalHeader, ModalFooter, Card, TextInput, Label } from "flowbite-react";
import { HiOutlineExclamationCircle, HiCheckCircle, HiXCircle, HiOutlineX } from "react-icons/hi";
import { API_URL } from "../../utils/constant";

axios.defaults.baseURL = API_URL; // Backend URL
axios.defaults.withCredentials = true; // Send cookies with requests

function CreateTeacher() {
    const { id } = useParams();
    
    const [createForm, setCreateForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    });
    
    const [openModal, setOpenModal] = useState({show: false, type: "confirm", message: ""});
    
    const updateFormField = (e) => {
        const { name, value } = e.target;
        setCreateForm({
            ...createForm,
            [name]: value,
        });
    };
    
    const showModal = (e) => {
        e.preventDefault();
        setOpenModal({...openModal, show: true});
    };
    
    const registerTeacher = async () => {
        try {
            await axios.post("/teacher/createTeacher", createForm);
            
            setCreateForm({
                firstName: "",
                lastName: "",
                email: "",
                password: "",
            });

            setOpenModal({
                type: 'success',
                show: true,
                message: "Maestro registrado con éxito",
            });
        } catch (err) {
            setOpenModal({
                type: 'error',
                show: true,
                message: "Error al registrar al maestro",
            });
        }
    };

    const modifyTeacher = async () => {
        try {
            await axios.put(`/teacher/updateTeacher/${id}`, createForm);

            setOpenModal({
                type: 'success',
                show: true,
                message: "Maestro modificado con éxito",
            })
        } catch (error) {
            setOpenModal({
                type: 'error',
                show: true,
                message: "Error al modificar al maestro",
            })
        }
    }
    
    useEffect(()=> {
        //To get teacher data (if that the case)
        const getData = async () => {
            if(id){
                try{
                    const response = await axios.get(`/teacher/getTeacherById/${id}`);
                    setCreateForm({...response.data.teacher, password: ""});
                }catch (err){
                    setOpenModal({
                        type: "error",
                        show: true,
                        message: "Error al obtener la información del profesor"
                    })
                }
            }
        }

        getData()
    }, []);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
            <Card className="max-w-lg w-full">
                <h2 className="text-xl font-bold text-gray-800 dark:text-white text-center mb-6">
                    {id ? "Modificar Maestro" : "Registrar Maestro"} 
                </h2>
                <form onSubmit={showModal} className="space-y-4">
                    <div>
                        <Label htmlFor="firstName" value="Nombre(s)" />
                        <TextInput
                            id="firstName"
                            name="firstName"
                            value={createForm.firstName}
                            onChange={updateFormField}
                            placeholder="Ingrese el nombre"
                            required
                        />
                    </div>
                    <div>
                        <Label htmlFor="lastName" value="Apellidos" />
                        <TextInput
                            id="lastName"
                            name="lastName"
                            value={createForm.lastName}
                            onChange={updateFormField}
                            placeholder="Ingrese los apellidos"
                            required
                        />
                    </div>
                    <div>
                        <Label htmlFor="email" value="Email" />
                        <TextInput
                            id="email"
                            name="email"
                            type="email"
                            value={createForm.email}
                            onChange={updateFormField}
                            placeholder="Ingrese el correo electrónico"
                            required
                            readOnly = {id ? true : false}
                        />
                    </div>
                    <div>
                        <Label htmlFor="password" value="Contraseña" />
                        <TextInput
                            id="password"
                            name="password"
                            type="password"
                            value={createForm.password}
                            onChange={updateFormField}
                            placeholder="Cree una contraseña"
                            required = {id ? false : true}
                        />
                    </div>
                    <Button type="submit" className="w-full">
                        {id ? "Modificar" : "Registrar"}
                    </Button>
                </form>
            </Card>

            {/* Confirmation Modal */}
            <Modal show={openModal.show} size="md" onClose={() => setOpenModal({type: "confirm", message: "", show: false})} popup>
                <ModalHeader />
                <ModalBody>
                    {openModal.type === 'confirm' && (
                        <div className="text-center">
                            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                                ¿Seguro de  {id ? "modificar datos del" : "registrar al"} Maestro?
                            </h3>
                            <div className="flex justify-center gap-4">
                                <Button color="failure" onClick={() => id ? modifyTeacher() : registerTeacher()}>
                                    Sí, {id ? "modificar" : "registrar"}
                                </Button>
                                <Button color="gray" onClick={() => setOpenModal({...openModal, show: false})}>
                                    No, cancelar
                                </Button>
                            </div>
                        </div>
                    )}

                    {openModal.type === 'success' && (
                    <div className="text-center">
                        <HiCheckCircle className="mx-auto mb-4 h-14 w-14 text-green-500" />
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                            {openModal.message}
                        </h3>
                        <Button color="alternative" onClick={() => setOpenModal({ type: "confirm", message: "", show: false })}>
                        Cerrar
                        </Button>
                    </div>
                    )}

                    {openModal.type === 'error' && (
                    <div className="text-center">
                        <HiXCircle className="mx-auto mb-4 h-14 w-14 text-red-500" />
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                            {openModal.message}
                        </h3>
                        <Button color="alternative" onClick={() => setOpenModal({ type: "confirm", message: "", show: false })}>
                        Cerrar
                        </Button>
                    </div> 
                    )}
                </ModalBody>
            </Modal>
        </div>
    );
}

export default CreateTeacher;
