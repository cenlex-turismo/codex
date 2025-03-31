import { useState } from "react";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:3000"; // Backend URL
axios.defaults.withCredentials = true; // Send cookies with requests

function CreateStudent() {
    const [createForm, setCreateForm] = useState({
        firstName: "",
        lastName: "",
        idNumber: 0,
        studentType: 0
    });

    const updateFormField = (e) => {
        const { name, value } = e.target;

        if(name === 'studentType'){
            document.getElementById("idNumber").disabled = value === '2' ? true : false;
        }

        setCreateForm({
            ...createForm,
            [name]: value,
        });
    };

    const registerStudent = async (e) => {
        e.preventDefault();
        if (!window.confirm("Registrar alumno?")) {
            return;
        }

        try {
            await axios.post("/student/createStudent", createForm);

            setCreateForm({
                firstName: "",
                lastName: "",
                idNumber: 0,
                studentType: 0
            });

            window.alert("Alumno registrado con exito");
        }
        catch (err) {
            window.alert("Error al registrar al alumno");
        }
    };

    return (
        <div className="CreateStudent">
            <div>
                <h2>Registrar Alumno</h2>
                <form onSubmit={registerStudent}>
                    <div style={{ marginBottom: '10px' }}>
                        <label>Nombre(s):
                            <span style={{ marginRight: '10px' }} />
                            <input value={createForm.firstName} onChange={updateFormField} name="firstName" type="text" />
                        </label>
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <label>Apellidos:
                            <span style={{ marginRight: '10px' }} />
                            <input value={createForm.lastName} onChange={updateFormField} name="lastName" type="text" />
                        </label>
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <label>Tipo de alumno
                            <span style={{ marginRight: '10px' }} />
                            <select value={createForm.studentType} onChange={updateFormField} id="studentType" name="studentType">
                                <option value={0} disabled>Selecciona un tipo de curso</option>
                                <option value={1}>Comunidad IPN</option>
                                <option value={2}>Externo</option>
                            </select>
                        </label>
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <label>Boleta:
                            <span style={{ marginRight: '10px' }} />
                            <input value={createForm.idNumber} onChange={updateFormField} name="idNumber" id="idNumber" type="number"/>
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

export default CreateStudent;
