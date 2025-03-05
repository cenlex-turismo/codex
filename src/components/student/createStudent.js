import { useState } from "react";
import axios from "axios";

function CreateStudent() {
    const [createForm, setCreateForm] = useState({
        firstName: "",
        lastName: "",
        idNumber: 0
    });

    const updateFormField = (e) => {
        const { name, value } = e.target;

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
            await axios.post("http://localhost:3000/createStudent", createForm);

            setCreateForm({
                firstName: "",
                lastName: "",
                idNumber: 0
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
                        <label>Boleta:
                            <span style={{ marginRight: '10px' }} />
                            <input value={createForm.idNumber} onChange={updateFormField} name="idNumber" type="number" />
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
