import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { Button } from "flowbite-react";

axios.defaults.baseURL = "https://api.celexest.com";
axios.defaults.withCredentials = true;

function ShowStudent({ propIdNumber }) {
    const [searchParams] = useSearchParams();
    const [studentData, setStudentData] = useState({
        idNumber: "",
        firstName: "",
        lastName: "",
        email: "",
        courseGrades: [],
        allowDownload: false,
    });

    useEffect(() => {
        const idNumber = propIdNumber || searchParams.get("idNumber");
        if (idNumber) fetchStudentData(idNumber);
    }, [searchParams, propIdNumber]);

    const fetchStudentData = async (idNumber) => {
        try {
            const response = await axios.get(`/student/getStudent/${idNumber}`);
            setStudentData({
                idNumber: response.data.student.studentDetails.idNumber,
                firstName: response.data.student.firstName,
                lastName: response.data.student.lastName,
                email: response.data.student.email,
                courseGrades: response.data.student.studentDetails.courseGrades,
                allowDownload: response.data.allowDownload,
            });
        } catch (error) {
            console.error("Error fetching student data:", error);
            setStudentData({
                idNumber: "",
                firstName: "",
                lastName: "",
                email: "",
                courseGrades: [],
                allowDownload: false,
            });
        }
    };

    const downloadTranscript = async () => {
        try {
            const response = await axios.get(`/student/generateTranscript/${studentData.idNumber}`, { responseType: "blob" });
            const blob = new Blob([response.data], {
                type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = "transcript.docx"; // Change the file extension to .docx
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            console.error("Error downloading transcript:", error);
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("es-ES", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });
    };

    const levels = ["Básico", "Intermedio", "Avanzado"];
    const modules = ["I", "II", "III", "IV", "V", "VI"];

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
            <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg w-full max-w-4xl">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Información del Alumno</h2>

                <div className="space-y-2">
                    <p className="text-gray-700 dark:text-gray-300">
                        <span className="font-semibold">Boleta:</span> {studentData.idNumber}
                    </p>
                    <p className="text-gray-700 dark:text-gray-300">
                        <span className="font-semibold">Nombre(s):</span> {studentData.firstName}
                    </p>
                    <p className="text-gray-700 dark:text-gray-300">
                        <span className="font-semibold">Apellidos:</span> {studentData.lastName}
                    </p>
                    <p className="text-gray-700 dark:text-gray-300">
                        <span className="font-semibold">Email:</span> {studentData.email}
                    </p>
                    {studentData.allowDownload && (
                        <Button onClick={downloadTranscript} className="mt-4">
                            Descargar Historial
                        </Button>
                    )}
                </div>

                <div className="mt-6 overflow-x-auto">
                    <table className="min-w-full table-auto border-collapse border border-gray-300 dark:border-gray-700">
                        <thead>
                            <tr className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300">
                                <th className="border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white px-4 py-2">Idioma</th>
                                <th className="border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white px-4 py-2">Nivel</th>
                                <th className="border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white px-4 py-2">Módulo</th>
                                <th className="border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white px-4 py-2">Calificación</th>
                                <th className="border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white px-4 py-2">Inicio</th>
                                <th className="border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white px-4 py-2">Término</th>
                                <th className="border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white px-4 py-2">Maestro</th>
                            </tr>
                        </thead>
                        <tbody>
                            {studentData.courseGrades
                                .sort((a, b) => {
                                    if (a.course.level !== b.course.level) return a.course.level - b.course.level;
                                    return a.course.module - b.course.module;
                                })
                                .map((grade, index) => (
                                    <tr key={index} className="odd:bg-gray-100 dark:odd:bg-gray-800 even:bg-white dark:even:bg-gray-700">
                                        <td className="border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white px-4 py-2">{grade.course.language}</td>
                                        <td className="border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white px-4 py-2">{levels[grade.course.level - 1]}</td>
                                        <td className="border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white px-4 py-2">{modules[grade.course.module - 1]}</td>
                                        <td className="border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white px-4 py-2">{grade.score}</td>
                                        <td className="border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white px-4 py-2">{formatDate(grade.courseStart)}</td>
                                        <td className="border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white px-4 py-2">{formatDate(grade.courseEnd)}</td>
                                        <td className="border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white px-4 py-2">
                                            {grade.teacher.firstName} {grade.teacher.lastName}
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default ShowStudent;
