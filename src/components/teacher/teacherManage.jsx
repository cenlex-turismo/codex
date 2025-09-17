import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Card, Button, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow, Modal, ModalBody, ModalHeader } from "flowbite-react";
import { HiOutlinePlus, HiOutlineTrash, HiOutlineExclamationCircle, HiXCircle, HiCheckCircle, HiEye, HiPencil} from "react-icons/hi";
import { API_URL } from "../../utils/constant";

axios.defaults.baseURL = API_URL;
axios.defaults.withCredentials = true;

function TeacherManage(){
    const navigate = useNavigate();

    const [profesores, setProfesores] = useState([]);

    const [selectedProfesor, setSelectedProfesor] = useState();

    const [openModal, setOpenModal] = useState({show: false, type: "confirm", message: ""});

    const deleteTeacher = async (idTeacher) => {
        console.log(idTeacher);
        try{
            await axios.delete(`/teacher/deleteTeacher/${idTeacher}`);
            setProfesores(profesores.filter(profesor => profesor._id !== idTeacher));
            setOpenModal({show: true, type: 'success'})
        } catch (err) {
            setOpenModal({show: true, type: 'error', message: 'Ocurrió un error al eliminar el profesor.'})
        }
    }
    
    useEffect(() => {
        //To get courses data
        const getData = async () =>{
            try{
                const response = await axios.get("/teacher/getAllTeachers");
                setProfesores(response.data.teachers);
            }catch (err){
                setOpenModal({show: true, type: 'error', message: 'Ocurrió un error al obtener los datos de los profesores.'})
            }
        }

        getData();
    }, []);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
            <Card className="container">
                <h2 className="text-3xl font-bold text-gray-800 dark:text-white text-center mb-6">
                    Gestor de profesores
                </h2>
                <div className="flex flex-wrap gap-2 justify-end">
                    <Button className="gap-2" onClick={() => navigate("/createTeacher")}>
                        Agregar a un profesor
                        <HiOutlinePlus />
                    </Button>
                </div>
                <div className="overflow-x-auto">
                    <Table striped hoverable>
                        <TableHead>
                            <TableRow>
                                <TableHeadCell>Correo electrónico</TableHeadCell>
                                <TableHeadCell>Nombres</TableHeadCell>
                                {/* <TableHeadCell>Ver historial</TableHeadCell> */}
                                <TableHeadCell>Modificar</TableHeadCell>
                                <TableHeadCell>Eliminar</TableHeadCell>
                            </TableRow>
                        </TableHead>
                        <TableBody className="divide-y">
                            {profesores.map((profesor, index) => (
                                <TableRow key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                    <TableCell>{profesor.email}</TableCell>
                                    <TableCell>{profesor.firstName} {profesor.lastName}</TableCell>
                                    {/* <TableCell>
                                        <Button className="gap-2" color="light" 
                                         onClick={()=> {
                                            navigate(`/teacherDetail/${profesor._id}`)
                                            setSelectedProfesor(profesor)
                                            setOpenModal({...openModal, show: true})
                                        }} 
                                        >
                                            Ver historial
                                            <HiEye />
                                        </Button>
                                    </TableCell> */}
                                    <TableCell>
                                        <Button className="gap-2"
                                        onClick={()=> {
                                            navigate(`/modifyTeacher/${profesor._id}`)
                                        }} 
                                        >
                                            Modificar
                                            <HiPencil />
                                        </Button>
                                    </TableCell>
                                    <TableCell>
                                        <Button className="gap-2" color="red" 
                                        onClick={()=> {
                                            setSelectedProfesor(profesor)
                                            setOpenModal({...openModal, show: true})
                                        }}>
                                            Eliminar
                                            <HiOutlineTrash />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </Card>
            <Modal show={openModal.show} size="md" onClose={() => setOpenModal({ type: "confirm", message: "", show: false})} popup>
                <ModalHeader />
                <ModalBody>
                    {openModal.type === 'confirm' && (
                    <div className="text-center">
                        <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                        ¿Estás seguro de eliminar al profesor?
                        </h3>
                        <div className="flex justify-center gap-4">
                            <Button color="red" onClick={() => deleteTeacher(selectedProfesor._id)}>
                                Sí, eliminar
                            </Button>
                            <Button color="alternative" onClick={() => setOpenModal({...openModal, show: false})}>
                                No, cancelar
                            </Button>
                        </div>
                    </div>
                    )}

                    {openModal.type === 'success' && (
                    <div className="text-center">
                        <HiCheckCircle className="mx-auto mb-4 h-14 w-14 text-green-500" />
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                        ¡El profesor fue eliminado con éxito!
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
    )
}

export default TeacherManage;