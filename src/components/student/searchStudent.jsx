import { useState } from "react";
import axios from "axios";
import RegisterCourseGrade from "./registerCourseGrade";
import { Link } from "react-router-dom";
import { Button, Modal, ModalBody, ModalHeader, ModalFooter } from "flowbite-react";
import { HiCheckCircle, HiOutlineX } from "react-icons/hi";

axios.defaults.baseURL = "https://api.celexest.com"; // Backend URL
axios.defaults.withCredentials = true; // Send cookies with requests

function SearchStudent() {
    const [searchForm, setSearchForm] = useState({ idNumber: "" });

    const [result, setResult] = useState({
        firstName: "",
        lastName: "",
        courseGrades: [],
    });

    const [openModalResult, setOpenModalResult] = useState({
        show: false,
        message: "",
    });

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
            const res = await axios.get("/student/getStudent/" + searchForm.idNumber);

            setResult({
                firstName: res.data.student.firstName,
                lastName: res.data.student.lastName,
                courseGrades: res.data.student.studentDetails.courseGrades,
            });

            setOpenModalResult({
                show: true,
                message: "Alumno encontrado",
            });
        } catch (err) {
            setResult({
                firstName: "",
                lastName: "",
                courseGrades: [],
            });
            setOpenModalResult({
                show: true,
                message: "Alumno no encontrado",
            });
        }
    };

    function formatDate(dateString) {
        const date = new Date(dateString);
        return `${date.getUTCDate().toString().padStart(2, "0")}-${(date.getUTCMonth() + 1)
            .toString()
            .padStart(2, "0")}-${date.getUTCFullYear()}`;
    }

    const levels = ["Básico", "Intermedio", "Avanzado"];
    const modules = ["I", "II", "III", "IV", "V", "VI"];

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
            <div className="max-w-xl w-full bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Buscar Alumno</h2>
                <form onSubmit={searchStudent} className="space-y-4">
                    <div>
                        <label htmlFor="idNumber" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Boleta:
                        </label>
                        <input
                            id="idNumber"
                            name="idNumber"
                            type="number"
                            value={searchForm.idNumber}
                            onChange={updateFormField}
                            className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg shadow-sm dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
                        />
                    </div>
                    <Button type="submit" color="primary" className="w-full">
                        Buscar
                    </Button>
                </form>
                <div className="mt-4">
                    <Link to="/filterStudents" className="text-blue-600 dark:text-blue-400 underline">
                        Búsqueda Avanzada
                    </Link>
                </div>
            </div>
            <div className="max-w-4xl w-full bg-white dark:bg-gray-800 mt-6 p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">Resultados</h3>
                {result.firstName || result.lastName ? (
                    <>
                        <p className="text-gray-700 dark:text-gray-300">
                            <strong>Nombre(s):</strong> {result.firstName}
                        </p>
                        <p className="text-gray-700 dark:text-gray-300">
                            <strong>Apellidos:</strong> {result.lastName}
                        </p>
                        <table className="w-full mt-4 table-auto text-sm text-left">
                            <thead className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                                <tr>
                                    <th className="px-4 py-2">Idioma</th>
                                    <th className="px-4 py-2">Nivel</th>
                                    <th className="px-4 py-2">Módulo</th>
                                    <th className="px-4 py-2">Calificación</th>
                                    <th className="px-4 py-2">Inicio</th>
                                    <th className="px-4 py-2">Término</th>
                                    <th className="px-4 py-2">Maestro</th>
                                </tr>
                            </thead>
                            <tbody>
                                {result.courseGrades
                                    .sort((a, b) => a.course.level - b.course.level || a.course.module - b.course.module)
                                    .map((courseGrade, index) => (
                                        <tr
                                            key={index}
                                            className="border-b last:border-none dark:border-gray-600"
                                        >
                                            <td className="px-4 py-2">{courseGrade.course.language}</td>
                                            <td className="px-4 py-2">{levels[courseGrade.course.level - 1]}</td>
                                            <td className="px-4 py-2">{modules[courseGrade.course.module - 1]}</td>
                                            <td className="px-4 py-2">{courseGrade.score}</td>
                                            <td className="px-4 py-2">{formatDate(courseGrade.courseStart)}</td>
                                            <td className="px-4 py-2">{formatDate(courseGrade.courseEnd)}</td>
                                            <td className="px-4 py-2">{`${courseGrade.teacher.firstName} ${courseGrade.teacher.lastName}`}</td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </>
                ) : (
                    <p className="text-gray-500 dark:text-gray-400">No se encontraron resultados.</p>
                )}
            </div>
            <div className="mt-6">
                <RegisterCourseGrade idNumber={searchForm.idNumber} />
            </div>
            <Modal
                size="md"
                popup
                dismissible
                show={openModalResult.show}
                onClose={() =>
                    setOpenModalResult({
                        ...setOpenModalResult,
                        show: false,
                    })
                }
            >
                <ModalHeader />
                <ModalBody>
                    <div className="text-center space-y-6">
                        {openModalResult.message === "Alumno encontrado" ? (
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
                        onClick={() =>
                            setOpenModalResult({
                                ...setOpenModalResult,
                                show: false,
                            })
                        }
                    >
                        Aceptar
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default SearchStudent;
