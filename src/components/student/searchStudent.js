import { useState } from "react";
import axios from "axios";
import RegisterCourseGrade from "./registerCourseGrade";

function SearchStudent() {
    const [searchForm, setSearchForm] = useState({
        email: ""
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
            const res = await axios.get("http://localhost:3000/getStudent/" + searchForm.email);

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

    const levels = ["Basico", "Intermedio", "Avanzado"];
    const modules = ["I", "II", "III", "IV", "V", "VI"];

    return (
        <div className="SearchStudent">
            <div>
                <h2>Buscar Alumno</h2>
                <form onSubmit={searchStudent}>
                    <div style={{ marginBottom: '10px' }}>
                        <label>Email:
                            <span style={{ marginRight: '10px' }} />
                            <input value={searchForm.email} onChange={updateFormField} name="email" type="email" />
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
                            if (a.level !== b.level) {
                                return a.level - b.level;
                            }
                            return a.module - b.module;
                        })
                        .map((courseGrade, index) => (
                            <li key={index}>
                                {levels[courseGrade.level - 1]} {modules[courseGrade.module - 1]}: {courseGrade.score}
                            </li>
                        ))}
                </ul>
            </div>
            <div>
                <RegisterCourseGrade email={searchForm.email}></RegisterCourseGrade>
            </div>
        </div>
    );
}

export default SearchStudent;
