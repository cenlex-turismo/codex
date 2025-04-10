import { useState, useEffect } from "react";
import axios from "axios";
import { Button, Modal, ModalBody, ModalHeader, ModalFooter } from "flowbite-react";
import { HiOutlineExclamationCircle, HiCheckCircle, HiOutlineX } from "react-icons/hi";

axios.defaults.baseURL = "http://localhost:3000"; // Backend URL
axios.defaults.withCredentials = true; // Send cookies with requests

function RegisterCourseGrade(props) {

    const { idNumber } = props;

    const [courses, setCourses] = useState([]);

    const [teachers, setTeachers] = useState([]);

    const [courseForm, setCourseForm] = useState(() => {
        const today = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format
        return {
            course: "0",
            courseStart: today,
            courseEnd: today,
            score: 0,
            teacher: "0"
        };
    });

    const [openModal, setOpenModal] = useState(false);
    const [openModalResult, setOpenModalResult] = useState({
        show: false,
        message: ""
    });

    const updateFormField = (e) => {
        const { name, value } = e.target;

        setCourseForm({
            ...courseForm,
            [name]: value,
        });
    };

    const registerCourseGrade = async () => {
        if (idNumber === null) {
            return;
        }

        try {
            await axios.put("/student/registerCourseGrade/" + idNumber, courseForm);

            setCourseForm({
                course: "0",
                courseStart: "2025-01-01",
                courseEnd: "2025-01-01",
                score: 0,
                teacher: "0"
            });

            setOpenModalResult({
                show: true,
                message: "Calificación registrada con éxito"
            });
        }
        catch (err) {
            setOpenModalResult({
                show: true,
                message: "Error al registrar calificación"
            });
        }
    };

    const showModal = async (e) => {
        e.preventDefault();
        setOpenModal(true);
    };

    useEffect(() => {
        fetch("http://localhost:3000/course/getAllCourses", { credentials: "include" })
            .then(response => response.json())
            .then(data => setCourses(data.courses))
            .catch(error => console.error("Error al obtener los cursos:", error));
    }, []);

    useEffect(() => {
        fetch("http://localhost:3000/teacher/getAllTeachers", { credentials: "include" })
            .then(response => response.json())
            .then(data => setTeachers(data.teachers))
            .catch(error => console.error("Error al obtener a los maestros:", error));
    }, []);

    const levels = ["Basico", "Intermedio", "Avanzado"];
    const modules = ["I", "II", "III", "IV", "V", "VI"];

    return (
        <div className="RegisterCourseGrade">
            <div>
                <h2>Registrar calificacion</h2>
                <form onSubmit={showModal}>
                    <div style={{ marginBottom: '10px' }}>
                        <label>Curso:
                            <span style={{ marginRight: '10px' }} />
                            <select value={courseForm.course} onChange={updateFormField} id="course" name="course">
                                <option value={0} disabled>Selecciona un curso</option>
                                {courses.map(course => (
                                    <option key={course._id} value={course._id}>{course.language + " " + levels[course.level - 1] + " " + modules[course.module - 1]}</option>
                                ))}
                            </select>
                        </label>
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <label>Maestro:
                            <span style={{ marginRight: '10px' }} />
                            <select value={courseForm.teacher} onChange={updateFormField} id="teacher" name="teacher">
                                <option value={0} disabled>Selecciona un Maestro</option>
                                {teachers.map(teacher => (
                                    <option key={teacher._id} value={teacher._id}>{teacher.firstName + " " + teacher.lastName}</option>
                                ))}
                            </select>
                        </label>
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <label>Calificacion:
                            <span style={{ marginRight: '10px' }} />
                            <input value={courseForm.score} onChange={updateFormField} id="score" name="score" type="number" min={0} max={100} />
                        </label>
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <label>Inicio del curso:
                            <span style={{ marginRight: '10px' }} />
                            <input value={courseForm.courseStart} onChange={updateFormField} id="courseStart" name="courseStart" type="date" min="2010-01-01" />
                        </label>
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <label>Fin del curso:
                            <span style={{ marginRight: '10px' }} />
                            <input value={courseForm.courseEnd} onChange={updateFormField} id="courseEnd" name="courseEnd" type="date" min="2010-01-01" />
                        </label>
                    </div>
                    <input value="Registrar" type="submit" />
                </form>
            </div>
            <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
                <ModalHeader />
                <ModalBody>
                    <div className="text-center">
                        <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                            ¿Seguro de registrar la calificación?
                        </h3>
                        <div className="flex justify-center gap-4">
                            <Button color="failure" onClick={() => {
                                setOpenModal(false);
                                registerCourseGrade();
                            }}>
                                {"Si, registrar"}
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
                        {openModalResult.message === "Calificación registrada con éxito" ? (
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

export default RegisterCourseGrade;
