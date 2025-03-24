import { useState } from "react";
import axios from "axios";
import RegisterCourseGrade from "./registerCourseGrade";
import { Link } from "react-router-dom";

axios.defaults.baseURL = "http://localhost:3000"; // Backend URL
axios.defaults.withCredentials = true; // Send cookies with requests

function SearchStudent() {
    const [searchForm, setSearchForm] = useState({
        idNumber: ""
    });

    const [result, setResult] = useState({
        firstName: "",
        lastName: "",
        courseGrades: []
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
                courseGrades: res.data.student.courseGrades
            });

            window.alert("Alumno encontrado");
        }
        catch (err) {
            setResult({
                firstName: "",
                lastName: "",
                courseGrades: []
            });
            window.alert("Alumno no encontrado");
        }
    };

    function formatDate(dateString) {
        const date = new Date(dateString);
        return `${date.getUTCDate().toString().padStart(2, "0")}-${(date.getUTCMonth() + 1).toString().padStart(2, "0")}-${date.getUTCFullYear()}`;
    }

    const levels = ["Basico", "Intermedio", "Avanzado"];
    const modules = ["I", "II", "III", "IV", "V", "VI"];

    return (
        <div className="SearchStudent">
            <div>
                <h2>Buscar Alumno</h2>
                <form onSubmit={searchStudent}>
                    <div style={{ marginBottom: '10px' }}>
                        <label>Boleta:
                            <span style={{ marginRight: '10px' }} />
                            <input value={searchForm.idNumber} onChange={updateFormField} name="idNumber" type="Number" />
                        </label>
                    </div>
                    <input value="Buscar" type="submit" />
                </form>
            </div>
            <div>
                <Link to="/filterStudents">Busqueda Avanzada</Link>
            </div>
            <div>
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
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
            <div>
                <RegisterCourseGrade idNumber={searchForm.idNumber}></RegisterCourseGrade>
            </div>
        </div>
    );
}

export default SearchStudent;
