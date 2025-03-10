import { useState, useEffect } from "react";
import axios from "axios";
import RegisterCourseGrade from "./registerCourseGrade";

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
        teacher: ""
    });

    const [courses, setCourses] = useState([]);

    const [teachers, setTeachers] = useState([]);

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
            const res = await axios.get("http://localhost:3000/filterStudents/", {
                params: searchForm
            });

            console.log(res.data);

            setResult({
                firstName: res.data.student.firstName,
                lastName: res.data.student.lastName,
                courseGrades: res.data.student.courseGrades
            });

            window.alert("Alumno encontrado");
        }
        catch (err) {
            console.log(err);

            setResult({
                firstName: "",
                lastName: "",
                courseGrades: []
            });
            window.alert("Alumno no encontrado");
        }
    };

    useEffect(() => {
        fetch("http://148.204.11.20:3000/getAllCourses")
            .then(response => response.json())
            .then(data => setCourses(data.courses))
            .catch(error => console.error("Error al obtener los cursos:", error));
    }, []);

    useEffect(() => {
        fetch("http://148.204.11.20:3000/getAllTeachers")
            .then(response => response.json())
            .then(data => setTeachers(data.teachers))
            .catch(error => console.error("Error al obtener a los maestros:", error));
    }, []);

    const levels = ["Basico", "Intermedio", "Avanzado"];
    const modules = ["I", "II", "III", "IV", "V", "VI"];

    return (
        <div className="SearchStudent">
            <div>
                <h2>Buscar Alumno - Avanzada</h2>
                <form onSubmit={searchStudent}>
                    <div style={{ marginBottom: '10px' }}>
                        <label>Boleta:
                            <span style={{ marginRight: '10px' }} />
                            <input value={searchForm.idNumber} onChange={updateFormField} name="idNumber" type="Number" />
                        </label>
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <label>Nombre:
                            <span style={{ marginRight: '10px' }} />
                            <input value={searchForm.firstName} onChange={updateFormField} name="firstName" type="text" />
                        </label>
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <label>Apellidos:
                            <span style={{ marginRight: '10px' }} />
                            <input value={searchForm.lastName} onChange={updateFormField} name="lastName" type="text" />
                        </label>
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <label>Curso:
                            <span style={{ marginRight: '10px' }} />
                            <select value={searchForm.course} onChange={updateFormField} id="course" name="course">
                                <option value={""} disabled>Selecciona un curso</option>
                                {courses.map(course => (
                                    <option key={course._id} value={course._id}>{course.language + " " + levels[course.level - 1] + " " + modules[course.module - 1]}</option>
                                ))}
                            </select>
                        </label>
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <label>Maestro:
                            <span style={{ marginRight: '10px' }} />
                            <select value={searchForm.teacher} onChange={updateFormField} id="teacher" name="teacher">
                                <option value={""} disabled>Selecciona un Maestro</option>
                                {teachers.map(teacher => (
                                    <option key={teacher._id} value={teacher._id}>{teacher.firstName + " " + teacher.lastName}</option>
                                ))}
                            </select>
                        </label>
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <label>Calificacion:
                            <span style={{ marginRight: '10px' }} />
                            <input value={searchForm.score} onChange={updateFormField} id="score" name="score" type="number" min={0} max={100} />
                        </label>
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <label>Comparativa calificacion:
                            <span style={{ marginRight: '10px' }} />
                            <select value={searchForm.scoreCondition} onChange={updateFormField} id="scoreCondition" name="scoreCondition">
                                <option value={""} disabled>Selecciona un comparador</option>
                                <option value={"equal"}>Igual</option>
                                <option value={"greater"}>Mayor que</option>
                                <option value={"less"}>Menor que</option>
                            </select>
                        </label>
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <label>Inicio del curso:
                            <span style={{ marginRight: '10px' }} />
                            <input value={searchForm.courseStart} onChange={updateFormField} id="courseStart" name="courseStart" type="date" min="2010-01-01" />
                        </label>
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <label>Comparativa Fecha de inicio:
                            <span style={{ marginRight: '10px' }} />
                            <select value={searchForm.courseStartCondition} onChange={updateFormField} id="courseStartCondition" name="courseStartCondition">
                                <option value={""} disabled>Selecciona un comparador</option>
                                <option value={"equal"}>Igual</option>
                                <option value={"greater"}>Mayor que</option>
                                <option value={"less"}>Menor que</option>
                            </select>
                        </label>
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <label>Fin del curso:
                            <span style={{ marginRight: '10px' }} />
                            <input value={searchForm.courseEnd} onChange={updateFormField} id="courseEnd" name="courseEnd" type="date" min="2010-01-01" />
                        </label>
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <label>Comparativa Fecha de termino:
                            <span style={{ marginRight: '10px' }} />
                            <select value={searchForm.courseEndCondition} onChange={updateFormField} id="courseEndCondition" name="courseEndCondition">
                                <option value={""} disabled>Selecciona un comparador</option>
                                <option value={"equal"}>Igual</option>
                                <option value={"greater"}>Mayor que</option>
                                <option value={"less"}>Menor que</option>
                            </select>
                        </label>
                    </div>
                    <input value="Buscar" type="submit" />
                </form>
            </div>
            <div>
                <p>Nombre(s): {result.firstName}</p>
                <p>Apellidos: {result.lastName}</p>
                <p>Calificaciones</p>
                <ul>
                    {result.courseGrades
                        .sort((a, b) => {
                            if (a.course.level !== b.course.level) {
                                return a.course.level - b.course.level;
                            }
                            return a.course.module - b.course.module;
                        })
                        .map((courseGrade, index) => (
                            <li key={index}>
                                {levels[courseGrade.course.level - 1]} {modules[courseGrade.course.module - 1]}: {courseGrade.score} {courseGrade.courseStart} {courseGrade.courseEnd} {courseGrade.teacher.firstName} {courseGrade.teacher.lastName}
                            </li>
                        ))}
                </ul>
            </div>
            <div>
                <RegisterCourseGrade idNumber={searchForm.idNumber}></RegisterCourseGrade>
            </div>
        </div>
    );
}

export default FilterStudents;