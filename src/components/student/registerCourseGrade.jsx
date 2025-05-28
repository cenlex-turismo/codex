import { useState, useEffect } from "react";
import axios from "axios";
import { Button, Modal, ModalBody, ModalHeader, ModalFooter } from "flowbite-react";
import { HiOutlineExclamationCircle, HiCheckCircle, HiOutlineX } from "react-icons/hi";

axios.defaults.baseURL = "https://api.celexest.com"; // Backend URL
axios.defaults.withCredentials = true; // Send cookies with requests

function RegisterCourseGrade({ idNumber }) {
    const [courses, setCourses] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [courseForm, setCourseForm] = useState(() => {
        const today = new Date().toISOString().split("T")[0]; // Current date in YYYY-MM-DD format
        return {
            course: "0",
            courseType: "0",
            courseStart: today,
            courseEnd: today,
            score: 0,
            teacher: "0",
        };
    });

    const [openModal, setOpenModal] = useState(false);
    const [openModalResult, setOpenModalResult] = useState({
        show: false,
        message: "",
    });

    const updateFormField = (e) => {
        const { name, value } = e.target;
        setCourseForm({ ...courseForm, [name]: value });
    };

    const registerCourseGrade = async () => {
        if (!idNumber) {
            setOpenModal(false);
            return;
        };

        try {
            await axios.put(`/student/registerCourseGrade/${idNumber}`, courseForm);

            setCourseForm({
                course: "0",
                courseType: "0",
                courseStart: "2025-01-01",
                courseEnd: "2025-01-01",
                score: 0,
                teacher: "0",
            });

            setOpenModal(false);
            setOpenModalResult({ show: true, message: "Calificación registrada con éxito" });
        } catch (err) {
            setOpenModal(false);
            setOpenModalResult({ show: true, message: "Error al registrar calificación" });
        }
    };

    const showModal = (e) => {
        e.preventDefault();
        setOpenModal(true);
    };

    useEffect(() => {
        axios
            .get("/course/getAllCourses", { withCredentials: true })
            .then((response) => setCourses(response.data.courses))
            .catch((error) => console.error("Error al obtener los cursos:", error));
    }, []);

    useEffect(() => {
        axios
            .get("/teacher/getAllTeachers", { withCredentials: true })
            .then((response) => setTeachers(response.data.teachers))
            .catch((error) => console.error("Error al obtener a los maestros:", error));
    }, []);

    const numberInputOnWheelPreventChange = (e) => {
        // Prevent the input value change
        e.target.blur()
    }

    const levels = ["Introductorio", "Básico", "Intermedio", "Avanzado"];
    const modules = ["I", "II", "III", "IV", "V", "VI"];

    return (
        <div className="p-6 bg-gray-100 dark:bg-gray-900 rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Registrar Calificación</h2>
            <form onSubmit={showModal} className="space-y-4">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                    Si seleccionas un curso que el estudiante ya tenga, se sobreescribira la información anterior por la nueva
                </p>
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Curso</label>
                    <select
                        value={courseForm.course}
                        onChange={updateFormField}
                        name="course"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300"
                    >
                        <option value="0" disabled>
                            Selecciona un curso
                        </option>
                        {courses.map((course) => (
                            <option key={course._id} value={course._id}>
                                {`${course.language} ${levels[course.level]} ${modules[course.module - 1]}`}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Tipo de curso</label>
                    <select
                        value={courseForm.courseType}
                        onChange={updateFormField}
                        name="courseType"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300"
                    >
                        <option value="0" disabled>
                            Selecciona un tipo de curso
                        </option>
                        <option key="Semanal" value="Semanal">
                            Semanal
                        </option>
                        <option key="Sabatino" value="Sabatino">
                            Sabatino
                        </option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Maestro</label>
                    <select
                        value={courseForm.teacher}
                        onChange={updateFormField}
                        name="teacher"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300"
                    >
                        <option value="0" disabled>
                            Selecciona un maestro
                        </option>
                        {teachers.map((teacher) => (
                            <option key={teacher._id} value={teacher._id}>
                                {`${teacher.firstName} ${teacher.lastName}`}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Calificación</label>
                    <input
                        type="number"
                        min="0"
                        max="100"
                        value={courseForm.score}
                        onChange={updateFormField}
                        onWheel={numberInputOnWheelPreventChange}
                        name="score"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Inicio del Curso</label>
                    <input
                        type="date"
                        value={courseForm.courseStart}
                        onChange={updateFormField}
                        name="courseStart"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Fin del Curso</label>
                    <input
                        type="date"
                        value={courseForm.courseEnd}
                        onChange={updateFormField}
                        name="courseEnd"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300"
                    />
                </div>
                <Button type="submit" className="w-full">
                    Registrar
                </Button>
            </form>

            {/* Confirmation Modal */}
            <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
                <ModalHeader />
                <ModalBody className="text-center">
                    <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                    <h3 className="mb-4 text-lg font-medium text-gray-700 dark:text-gray-300">
                        ¿Está seguro de registrar esta calificación?
                    </h3>
                    <div className="flex justify-center space-x-4">
                        <Button onClick={registerCourseGrade} color="failure">
                            Sí, registrar
                        </Button>
                        <Button onClick={() => setOpenModal(false)} color="gray">
                            Cancelar
                        </Button>
                    </div>
                </ModalBody>
            </Modal>

            {/* Result Modal */}
            <Modal
                show={openModalResult.show}
                size="md"
                onClose={() => setOpenModalResult({ ...openModalResult, show: false })}
                popup
                dismissible
            >
                <ModalHeader />
                <ModalBody className="text-center space-y-4">
                    {openModalResult.message === "Calificación registrada con éxito" ? (
                        <HiCheckCircle className="mx-auto h-14 w-14 text-green-500" />
                    ) : (
                        <HiOutlineX className="mx-auto h-14 w-14 text-red-500" />
                    )}
                    <p className="text-gray-700 dark:text-gray-300">{openModalResult.message}</p>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={() => setOpenModalResult({ ...openModalResult, show: false })}>
                        Aceptar
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default RegisterCourseGrade;
