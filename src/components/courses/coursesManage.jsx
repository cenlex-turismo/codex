import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Card, Button, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow, Modal, ModalBody, ModalHeader } from "flowbite-react";
import { HiOutlinePlus, HiOutlineTrash, HiOutlineExclamationCircle, HiXCircle, HiCheckCircle} from "react-icons/hi";
import { API_URL } from "../../utils/constant";

axios.defaults.baseURL = API_URL;
axios.defaults.withCredentials = true;

function CoursesManage(){
    const navigate = useNavigate();

    const [cursos, setCursos] = useState([]);

    const [selectedCurso, setSelectedCurso] = useState();

    const [openModal, setOpenModal] = useState({show: false, type: "confirm", message: ""});

    const deleteCourse = async (idCourse) => {
        try{
            await axios.delete(`/course/deleteCourse/${idCourse}`);
            setCursos(cursos.filter(curso => curso._id !== idCourse));
            setOpenModal({show: true, type: 'success'})
        } catch (err) {
            setOpenModal({show: true, type: 'error', message: 'Ocurrió un error al eliminar el curso.'})
        }
    }
    
    useEffect(() => {
        //To get courses data
        const getData = async () =>{
            try{
                const response = await axios.get("/course/getAllCourses");
                setCursos(response.data.courses);
            }catch (err){
                setOpenModal({show: true, type: 'error', message: 'Ocurrió un error al obtener los datos de los cursos.'})
            }
        }

        getData();
    }, []);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
            <Card className="container">
                <h2 className="text-3xl font-bold text-gray-800 dark:text-white text-center mb-6">
                    Gestor de cursos
                </h2>
                <div className="flex flex-wrap gap-2 justify-end">
                    <Button className="gap-2" onClick={() => navigate("/createCourse")}>
                        Crear un curso
                        <HiOutlinePlus />
                    </Button>
                </div>
                <div className="overflow-x-auto">
                    <Table striped hoverable>
                        <TableHead>
                            <TableRow>
                                <TableHeadCell>Lenguaje</TableHeadCell>
                                <TableHeadCell>Nivel</TableHeadCell>
                                <TableHeadCell>Módulo</TableHeadCell>
                                <TableHeadCell>Eliminar</TableHeadCell>
                            </TableRow>
                        </TableHead>
                        <TableBody className="divide-y">
                            {cursos.map((curso, index) => (
                                <TableRow key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                    <TableCell>{curso.language}</TableCell>
                                    <TableCell>{curso.level}</TableCell>
                                    <TableCell>{curso.module}</TableCell>
                                    <TableCell>
                                        <Button className="gap-2" color="red" 
                                        onClick={()=> {
                                            setSelectedCurso(curso)
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
                        ¿Estás seguro de eliminar el curso?
                        </h3>
                        <div className="flex justify-center gap-4">
                            <Button color="red" onClick={() => deleteCourse(selectedCurso._id)}>
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
                        ¡El curso fue eliminado con éxito!
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

export default CoursesManage;