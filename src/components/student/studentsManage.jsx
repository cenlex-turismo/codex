import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Card, Button, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow, Modal, ModalBody, ModalHeader } from "flowbite-react";
import { HiOutlinePlus, HiOutlineTrash, HiOutlineExclamationCircle, HiXCircle, HiCheckCircle, HiEye, HiPencil, HiSearch} from "react-icons/hi";
import { API_URL } from "../../utils/constant";

axios.defaults.baseURL = API_URL;
axios.defaults.withCredentials = true;

function StudentManage(){
    const navigate = useNavigate();

    const [students, setStudent] = useState([]);

    const [selectedStudent, setSelectedStudent] = useState();

    const [openModal, setOpenModal] = useState({show: false, type: "confirm", message: ""});

    const deleteStudent = async (idStudent) => {
        try{
            await axios.delete(`/student/deleteStudent/${idStudent}`);
            setStudent(students.filter(student => student._id !== idStudent));
            setOpenModal({show: true, type: 'success'})
        } catch (err) {
            setOpenModal({show: true, type: 'error', message: 'Ocurrió un error al eliminar al estudiante.'})
        }
    }
    
    useEffect(() => {
        //To get courses data
        const getData = async () =>{
            try{
                const response = await axios.get("/student/getAllStudent");
                setStudent(response.data.students);
            }catch (err){
                setOpenModal({show: true, type: 'error', message: 'Ocurrió un error al obtener los datos de los estudiantes.'})
            }
        }

        getData();
    }, []);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
            <Card className="container">
                <h2 className="text-3xl font-bold text-gray-800 dark:text-white text-center mb-6">
                    Gestor de estudiantes
                </h2>
                <div className="flex flex-wrap gap-2 justify-between">
                    <Button className="gap-2" onClick={() => navigate("/createStudent")}>
                        Agregar a un estudiante
                        <HiOutlinePlus />
                    </Button>
                    <Button color="dark" className="gap-2" onClick={() => navigate("/filterStudents")}>
                        Buscar a un estudiante
                        <HiSearch />
                    </Button>
                </div>
                <div className="overflow-x-auto">
                    <Table striped hoverable>
                        <TableHead>
                            <TableRow>
                                <TableHeadCell>Correo electrónico</TableHeadCell>
                                <TableHeadCell>Nombre</TableHeadCell>
                                <TableHeadCell>Ver historial</TableHeadCell>
                                <TableHeadCell>Modificar</TableHeadCell>
                                <TableHeadCell>Eliminar</TableHeadCell>
                            </TableRow>
                        </TableHead>
                        <TableBody className="divide-y">
                            {students.map((student, index) => (
                                <TableRow key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                    <TableCell>{student.email}</TableCell>
                                    <TableCell>{student.firstName} {student.lastName}</TableCell>
                                    <TableCell>
                                        <Button className="gap-2" color="light" 
                                        /* onClick={()=> {
                                            navigate(`/teacherDetail/${profesor._id}`)
                                            setSelectedProfesor(profesor)
                                            setOpenModal({...openModal, show: true})
                                        }} */
                                        >
                                            Ver historial
                                            <HiEye />
                                        </Button>
                                    </TableCell>
                                    <TableCell>
                                        <Button className="gap-2"
                                        onClick={()=> {
                                            navigate(`/modifyStudent/${student._id}`)
                                        }} 
                                        >
                                            Modificar
                                            <HiPencil />
                                        </Button>
                                    </TableCell>
                                    <TableCell>
                                        <Button className="gap-2" color="red" 
                                        onClick={()=> {
                                            setSelectedStudent(student)
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
                        ¿Estás seguro de eliminar al estudiante?
                        </h3>
                        <div className="flex justify-center gap-4">
                            <Button color="red" onClick={() => deleteStudent(selectedStudent._id)}>
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
                        ¡El estudiante fue eliminado con éxito!
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

export default StudentManage;