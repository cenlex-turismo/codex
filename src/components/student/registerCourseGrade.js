import { useState } from "react";
import axios from "axios";

function RegisterCourseGrade(props) {

    const { email } = props;

    const [courseForm, setCourseForm] = useState({
        level: 0,
        module: 0,
        score: ""
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
        if (email === null || !window.confirm("Registrar calificacion?")) {
            return;
        }

        try {
            await axios.put("http://localhost:3000/registerCourseGrade/" + email, courseForm);

            setCourseForm({
                level: 0,
                module: 0,
                score: ""
            });

            window.alert("Calificacion registrada");
        }
        catch (err) {
            window.alert("Error al registrar calificacion");
        }
    };

    return (
        <div className="RegisterCourseGrade">
            <div>
                <h2>Registrar calificacion</h2>
                <form onSubmit={registerCourseGrade}>
                    <div style={{ marginBottom: '10px' }}>
                        <label>Nivel:
                            <span style={{ marginRight: '10px' }} />
                            <select value={courseForm.level} onChange={updateFormField} id="level" name="level">
                                <option value={0} disabled>Selecciona un nivel</option>
                                <option value={1}>Basico</option>
                                <option value={2}>Intermedio</option>
                                <option value={3}>Avanzado</option>
                            </select>
                        </label>
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <label>Modulo:
                            <span style={{ marginRight: '10px' }} />
                            <select value={courseForm.module} onChange={updateFormField} id="module" name="module">
                                <option value={0} disabled>Selecciona un modulo</option>
                                <option value={1}>I</option>
                                <option value={2}>II</option>
                                <option value={3}>III</option>
                                <option value={4}>IV</option>
                                <option value={5}>V</option>
                                <option value={6}>VI</option>
                            </select>
                        </label>
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <label>Calificacion:
                            <span style={{ marginRight: '10px' }} />
                            <input value={courseForm.score} onChange={updateFormField} id="score" name="score" type="number" min={0} max={100} />
                        </label>
                    </div>
                    <input value="Registrar" type="submit" />
                </form>
            </div>
        </div>
    );
}

export default RegisterCourseGrade;
