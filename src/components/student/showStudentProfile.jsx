import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { Button, Modal, ModalBody, ModalHeader, ModalFooter } from "flowbite-react";

axios.defaults.baseURL = "https://api.celexest.com"; // Backend URL
axios.defaults.withCredentials = true; // Send cookies with requests

function ShowStudent() {
    const [searchParams] = useSearchParams(); // Hook to access query parameters
    const [result, setResult] = useState({
        idNumber: "",
        firstName: "",
        lastName: "",
        courseGrades: []
    });

    const [openModalResult, setOpenModalResult] = useState(false);

    const searchStudent = async (idNumber) => {
        try {
            const res = await axios.get(`/student/getStudent/${idNumber}`);
            setResult({
                idNumber: res.data.student.idNumber,
                firstName: res.data.student.firstName,
                lastName: res.data.student.lastName,
                courseGrades: res.data.student.courseGrades
            });
        } catch (err) {
            setResult({
                idNumber: "",
                firstName: "",
                lastName: "",
                courseGrades: []
            });
            setOpenModalResult(true);
        }
    };

    // Execute on page load
    useEffect(() => {
        const idNumber = searchParams.get("idNumber"); // Get idNumber from URL
        if (idNumber) {
            searchStudent(idNumber);
        }
    }, [searchParams]); // Run whenever query params change

    function formatDate(dateString) {
        const date = new Date(dateString);
        return `${date.getUTCDate().toString().padStart(2, "0")}-${(date.getUTCMonth() + 1).toString().padStart(2, "0")}-${date.getUTCFullYear()}`;
    }

    const handleDownload = async () => {
        try {
            const response = await axios.get("/student/generateTranscript", {
                responseType: "blob", // Important: Treat response as a binary file
            });

            // Create a Blob URL and trigger the download
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const a = document.createElement("a");
            a.href = url;
            a.download = "generated.pdf";
            document.body.appendChild(a);
            a.click();
            a.remove();
        } catch (error) {
            console.error("Error downloading PDF:", error);
        }
    };

    const levels = ["Basico", "Intermedio", "Avanzado"];
    const modules = ["I", "II", "III", "IV", "V", "VI"];

    return (
        <div className="SearchStudent">
            <div>
                <p>Boleta: {result.idNumber}</p>
                <p>Nombre(s): {result.firstName}</p>
                <p>Apellidos: {result.lastName}</p>
                <table>
                    <thead>
                        <tr>
                            <th>Idioma</th>
                            <th>Nivel</th>
                            <th>Modulo</th>
                            <th>Calificacion</th>
                            <th>Fecha de inicio del curso</th>
                            <th>Fecha de termino del curso</th>
                            <th>Maestro</th>
                            <th>Descargar Historial</th>
                        </tr>
                    </thead>
                    <tbody>
                        {result.courseGrades
                            .sort((a, b) => {
                                if (a.course.level !== b.course.level) {
                                    return a.course.level - b.course.level;
                                }
                                return a.course.module - b.course.module;
                            })
                            .map((courseGrade, index) => (
                                <tr key={index}>
                                    <td>{courseGrade.course.language}</td>
                                    <td>{levels[courseGrade.course.level - 1]}</td>
                                    <td>{modules[courseGrade.course.module - 1]}</td>
                                    <td>{courseGrade.score}</td>
                                    <td>{formatDate(courseGrade.courseStart)}</td>
                                    <td>{formatDate(courseGrade.courseEnd)}</td>
                                    <td>{courseGrade.teacher.firstName} {courseGrade.teacher.lastName}</td>
                                    <td><button onClick={() => handleDownload()}>Descargar</button></td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
            <Modal size="md" popup dismissible show={openModalResult.show} onClose={() => setOpenModalResult(false)}>
                <ModalHeader />
                <ModalBody>
                    <div className="text-center space-y-6">
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            El alumno no existe
                        </p>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={() => setOpenModalResult(false)}>Aceptar</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default ShowStudent;
