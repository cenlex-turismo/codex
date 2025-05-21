import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
    Button,
    Modal,
    ModalBody,
    ModalHeader,
    ModalFooter,
    Label,
    TextInput,
    Select,
    Card,
} from "flowbite-react";
import { HiCheckCircle, HiOutlineX } from "react-icons/hi";

axios.defaults.baseURL = "https://api.celexest.com"; // Backend URL
axios.defaults.withCredentials = true; // Send cookies with requests

function FilterStudents() {
    const [searchForm, setSearchForm] = useState({
        idNumber: "",
        firstName: "",
        lastName: "",
        course: "",
        score: "",
        scoreCondition: "",
        courseStart: "",
        courseStartCondition: "",
        courseEnd: "",
        courseEndCondition: "",
        teacher: "",
    });

    const [courses, setCourses] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [result, setResult] = useState([]);
    const [openModalResult, setOpenModalResult] = useState({ show: false, message: "" });
    const navigate = useNavigate();

    const updateFormField = (e) => {
        const { name, value } = e.target;
        setSearchForm({
            ...searchForm,
            [name]: value,
        });
    };

    const searchStudent = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.get("/student/filterStudents/", { params: searchForm });
            setResult(res.data.students);
            setOpenModalResult({ show: true, message: "Alumnos encontrados" });
        } catch (err) {
            console.error(err);
            setResult([]);
            setOpenModalResult({ show: true, message: "Error al buscar alumnos" });
        }
    };

    useEffect(() => {
        fetch("https://api.celexest.com/course/getAllCourses", { credentials: "include" })
            .then((response) => response.json())
            .then((data) => setCourses(data.courses))
            .catch((error) => console.error("Error al obtener los cursos:", error));
    }, []);

    useEffect(() => {
        fetch("https://api.celexest.com/teacher/getAllTeachers", { credentials: "include" })
            .then((response) => response.json())
            .then((data) => setTeachers(data.teachers))
            .catch((error) => console.error("Error al obtener a los maestros:", error));
    }, []);

    const handleOpenSearchPage = (idNumber) => {
        navigate(`/showStudent?idNumber=${idNumber}`);
    };

    const numberInputOnWheelPreventChange = (e) => {
        // Prevent the input value change
        e.target.blur()
    }

    const levels = ["Introductorio", "Básico", "Intermedio", "Avanzado"];
    const modules = ["I", "II", "III", "IV", "V", "VI"];

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
            <Card className="w-full max-w-4xl p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
                <h2 className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-white">
                    Búsqueda Avanzada
                </h2>
                <form onSubmit={searchStudent} className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                        <Label htmlFor="idNumber">Boleta:</Label>
                        <TextInput
                            id="idNumber"
                            name="idNumber"
                            type="number"
                            onWheel={numberInputOnWheelPreventChange}
                            value={searchForm.idNumber}
                            onChange={updateFormField}
                        />
                    </div>
                    <div>
                        <Label htmlFor="firstName">Nombre:</Label>
                        <TextInput
                            id="firstName"
                            name="firstName"
                            type="text"
                            value={searchForm.firstName}
                            onChange={updateFormField}
                        />
                    </div>
                    <div>
                        <Label htmlFor="lastName">Apellidos:</Label>
                        <TextInput
                            id="lastName"
                            name="lastName"
                            type="text"
                            value={searchForm.lastName}
                            onChange={updateFormField}
                        />
                    </div>
                    <div>
                        <Label htmlFor="course">Curso:</Label>
                        <Select
                            id="course"
                            name="course"
                            value={searchForm.course}
                            onChange={updateFormField}
                        >
                            <option value="" disabled>
                                Selecciona un curso
                            </option>
                            {courses.map((course) => (
                                <option key={course._id} value={course._id}>
                                    {`${course.language} ${levels[course.level]} ${modules[course.module - 1]}`}
                                </option>
                            ))}
                        </Select>
                    </div>
                    <div>
                        <Label htmlFor="score">Calificación:</Label>
                        <TextInput
                            id="score"
                            name="score"
                            type="number"
                            min="0"
                            max="100"
                            onWheel={numberInputOnWheelPreventChange}
                            value={searchForm.score}
                            onChange={updateFormField}
                        />
                    </div>
                    <div>
                        <Label htmlFor="scoreCondition">Comparativa calificación:</Label>
                        <Select
                            id="scoreCondition"
                            name="scoreCondition"
                            value={searchForm.scoreCondition}
                            onChange={updateFormField}
                        >
                            <option value="" disabled>
                                Selecciona un comparador
                            </option>
                            <option value="equal">Igual</option>
                            <option value="greater">Mayor que</option>
                            <option value="less">Menor que</option>
                        </Select>
                    </div>
                    <div>
                        <Label htmlFor="courseStart">Inicio del curso:</Label>
                        <TextInput
                            id="courseStart"
                            name="courseStart"
                            type="date"
                            value={searchForm.courseStart}
                            onChange={updateFormField}
                        />
                    </div>
                    <div>
                        <Label htmlFor="courseStartCondition">Comparativa Fecha de inicio:</Label>
                        <Select
                            id="courseStartCondition"
                            name="courseStartCondition"
                            value={searchForm.courseStartCondition}
                            onChange={updateFormField}
                        >
                            <option value="" disabled>
                                Selecciona un comparador
                            </option>
                            <option value="equal">Igual</option>
                            <option value="greater">Mayor que</option>
                            <option value="less">Menor que</option>
                        </Select>
                    </div>
                    <div>
                        <Label htmlFor="courseEnd">Fin del curso:</Label>
                        <TextInput
                            id="courseEnd"
                            name="courseEnd"
                            type="date"
                            value={searchForm.courseEnd}
                            onChange={updateFormField}
                        />
                    </div>
                    <div>
                        <Label htmlFor="courseEndCondition">Comparativa Fecha de término:</Label>
                        <Select
                            id="courseEndCondition"
                            name="courseEndCondition"
                            value={searchForm.courseEndCondition}
                            onChange={updateFormField}
                        >
                            <option value="" disabled>
                                Selecciona un comparador
                            </option>
                            <option value="equal">Igual</option>
                            <option value="greater">Mayor que</option>
                            <option value="less">Menor que</option>
                        </Select>
                    </div>
                    <div>
                        <Label htmlFor="teacher">Maestro:</Label>
                        <Select
                            id="teacher"
                            name="teacher"
                            value={searchForm.teacher}
                            onChange={updateFormField}
                        >
                            <option value="" disabled>
                                Selecciona un Maestro
                            </option>
                            {teachers.map((teacher) => (
                                <option key={teacher._id} value={teacher._id}>
                                    {`${teacher.firstName} ${teacher.lastName}`}
                                </option>
                            ))}
                        </Select>
                    </div>
                    <Button type="submit" className="mt-4 w-full md:col-span-2">
                        Buscar
                    </Button>
                </form>
            </Card>

            <div className="mt-6 w-full max-w-4xl">
                {result.map((student) => (
                    <Card key={student._id} className="mb-4">
                        <p className="text-gray-800 dark:text-white"><strong>Boleta:</strong> {student.studentDetails.idNumber}</p>
                        <p className="text-gray-800 dark:text-white"><strong>Nombre(s):</strong> {student.firstName}</p>
                        <p className="text-gray-800 dark:text-white"><strong>Apellidos:</strong> {student.lastName}</p>
                        <Button
                            onClick={() => handleOpenSearchPage(student.studentDetails.idNumber)}
                            className="mt-2"
                        >
                            Ver perfil del alumno
                        </Button>
                    </Card>
                ))}
            </div>

            <Modal
                size="md"
                popup
                dismissible
                show={openModalResult.show}
                onClose={() => setOpenModalResult({ show: false, message: "" })}
            >
                <ModalHeader />
                <ModalBody>
                    <div className="text-center space-y-6">
                        {openModalResult.message === "Alumnos encontrados" ? (
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
                        onClick={() => setOpenModalResult({ show: false, message: "" })}
                    >
                        Aceptar
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default FilterStudents;
