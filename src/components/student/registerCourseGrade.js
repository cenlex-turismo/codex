import { useState, useEffect } from "react";
import axios from "axios";

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

    const updateFormField = (e) => {
        const { name, value } = e.target;

        setCourseForm({
            ...courseForm,
            [name]: value,
        });
    };

    const registerCourseGrade = async (e) => {
        e.preventDefault();
        if (idNumber === null || !window.confirm("Registrar calificacion?")) {
            return;
        }

        try {
            await axios.put("http://localhost:3000/student/registerCourseGrade/" + idNumber, courseForm);

            setCourseForm({
                course: "0",
                courseStart: "2025-01-01",
                courseEnd: "2025-01-01",
                score: 0,
                teacher: "0"
            });

            window.alert("Calificacion registrada");
        }
        catch (err) {
            window.alert("Error al registrar calificacion");
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
        <div className="RegisterCourseGrade">
            <div>
                <h2>Registrar calificacion</h2>
                <form onSubmit={registerCourseGrade}>
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
        </div>
    );
}

export default RegisterCourseGrade;
