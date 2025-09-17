import { useEffect, useState } from "react";
import axios from "axios";
import { Button, Modal, ModalBody, ModalHeader, ModalFooter, Label, TextInput, Select, Card } from "flowbite-react";
import { HiOutlineExclamationCircle, HiCheckCircle, HiXCircle,} from "react-icons/hi";
import { API_URL } from "../../utils/constant";
import DefaultNavigationBar from "../navbars/defaultNavigationBar";
import { useParams } from "react-router-dom";

axios.defaults.baseURL = API_URL; // Backend URL
axios.defaults.withCredentials = true; // Send cookies with requests

function CreateStudent() {
    const { id } = useParams();

    const [createForm, setCreateForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        idNumber: 0,
        studentType: 0,
    });

    const [openModal, setOpenModal] = useState({show: false, type: "confirm", message: ""});

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

    const showModal = async (e) => {
        e.preventDefault();
        setOpenModal({...openModal, show: true});
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

            setOpenModal({
                type: 'success',
                show: true,
                message: "Alumno registrado con éxito con boleta " + res.data.idNumber,
            });
        } catch (err) {
            setOpenModal({
                type: 'error',
                show: true,
                message: "Error al registrar al alumno",
            });
        }
    };

    const modifyStudent = async () =>{
        try {
            await axios.put(`/student/updateStudent/${createForm._id}`, createForm);

            setOpenModal({
                type: 'success',
                show: true,
                message: "Alumno modificado con éxito",
            })
        } catch (error) {
            setOpenModal({
                type: 'error',
                show: true,
                message: "Error al modificar al alumno",
            })
        }
    }

    const numberInputOnWheelPreventChange = (e) => {
        // Prevent the input value change
        e.target.blur()
    }

    useEffect(() =>{
        //To get student data (if that the case)
        const getData = async () => {
            if(id){
                try {
                    const response = await axios.get(`/student/getStudent/${id}`);

                    setCreateForm({...createForm, ...response.data.student});
                } catch (error) {
                    setOpenModal({
                        type: "error",
                        show: true,
                        message: "Error al obtener la información del alumno"
                    })
                }
            }
            console.log(createForm)
        }

        getData();
    }, []);

    return (
        <div>
            {(location.pathname == "/createStudent" || location.pathname.split('/')[1] == "modifyStudent") ? (
                <div></div>
            ) : (
                <DefaultNavigationBar />
            )}
            <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
                <Card className="w-full max-w-lg p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
                    <h2 className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-white">
                        {id ? "Modificar Alumno" : "Registrar Alumno"}
                    </h2>
                    {/* Poner una nota donde se informa que en la modificación es opcional llenar la contraseña */}
                    <form onSubmit={showModal} className="flex flex-col gap-4">
                        <div>
                            <Label htmlFor="firstName">Nombre(s):</Label>
                            <TextInput
                                value={createForm.firstName}
                                id="firstName"
                                name="firstName"
                                type="text"
                                onChange={updateFormField}
                                placeholder="Ingrese el nombre"
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
                                placeholder="Ingreso los apellidos"
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
                                placeholder="Ingrese el correo electrónico"
                                required
                                disabled = {id ? true : false}
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
                                placeholder="Cree una contraseña"
                                required = {id ? false: true}
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
                                <option value={0} disabled>Selecciona un tipo de alumno</option>   
                                <option value={1}>Comunidad IPN</option>
                                <option value={2}>Externo</option>
                            </Select>
                        </div>
                        <div>
                            <Label htmlFor="idNumber">Boleta:</Label>
                            <TextInput
                                value={id}
                                id="idNumber"
                                name="idNumber"
                                type="number"
                                onChange={updateFormField}
                                onWheel={numberInputOnWheelPreventChange}
                                required
                                disabled = {id ? true : false}
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
                                    ¿Seguro de  {id ? "modificar datos del" : "registrar al"} Alumno?
                                </h3>
                                <div className="flex justify-center gap-4">
                                    <Button color="failure" onClick={() => id ? modifyStudent() : registerStudent()}>
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
        </div>
    );
}

export default CreateStudent;
