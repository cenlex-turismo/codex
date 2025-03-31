import { useState } from "react";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:3000"; // Backend URL
axios.defaults.withCredentials = true; // Send cookies with requests

function CreateCourse() {
    const [createForm, setCreateForm] = useState({
        language: "",
        level: 0,
        module: 0
    });

    const updateFormField = (e) => {
        const { name, value } = e.target;

        setCreateForm({
            ...createForm,
            [name]: value,
        });
    };

    const registerCourse = async (e) => {
        e.preventDefault();
        if (!window.confirm("Registrar curso?")) {
            return;
        }

        try {
            await axios.post("/course/createCourse", createForm);

            setCreateForm({
                language: "",
                level: 0,
                module: 0
            });

            window.alert("Curso registrado con exito");
        }
        catch (err) {
            window.alert("Error al registrar al curso");
        }
    };

    return (
        <div className="CreateCourse">
            <div>
                <h2>Registrar Curso</h2>
                <form onSubmit={registerCourse}>
                    <div style={{ marginBottom: '10px' }}>
                        <label>Lenguaje:
                            <span style={{ marginRight: '10px' }} />
                            <input value={createForm.language} onChange={updateFormField} name="language" type="text" />
                        </label>
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <label>Nivel:
                            <span style={{ marginRight: '10px' }} />
                            <input value={createForm.level} onChange={updateFormField} name="level" type="number" />
                        </label>
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <label>Modulo:
                            <span style={{ marginRight: '10px' }} />
                            <input value={createForm.module} onChange={updateFormField} name="module" type="number" />
                        </label>
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <input value="Registrar" type="submit" />
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CreateCourse;