import { useState } from "react";
import axios from "axios";

function CreateTeacher() {
    const [createForm, setCreateForm] = useState({
        firstName: "",
        lastName: "",
    });

    const updateFormField = (e) => {
        const { name, value } = e.target;

        setCreateForm({
            ...createForm,
            [name]: value,
        });
    };

    const registerTeacher = async (e) => {
        e.preventDefault();
        if (!window.confirm("Registrar maestro?")) {
            return;
        }

        try {
            await axios.post("http://localhost:3000/createTeacher", createForm);

            setCreateForm({
                firstName: "",
                lastName: ""
            });

            window.alert("Maestro registrado con exito");
        }
        catch (err) {
            window.alert("Error al registrar al maestro");
        }
    };

    return (
        <div className="CreateTeacher">
            <div>
                <h2>Registrar Maestro</h2>
                <form onSubmit={registerTeacher}>
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
                        <input value="Registrar" type="submit" />
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CreateTeacher;