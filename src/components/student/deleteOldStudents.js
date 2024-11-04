import axios from "axios";

function DeleteOldStudents() {

    const deleteOldStudents = async (e) => {
        e.preventDefault();

        if (!window.confirm("Eliminar registros de mas de 2 años?")) {
            return;
        }

        try {
            await axios.delete("http://localhost:3000/maintenance");
            window.alert("Eliminacion exitosa");
        }
        catch (err) {
            window.alert("Error al eliminar registros");
        }
    };

    return (
        <div className="DeleteOldStudents">
            <div>
                <h2>Eliminar registros viejos de alumnos</h2>
                <form onSubmit={deleteOldStudents}>
                    <input value="Eliminar" type="submit" />
                </form>
            </div>
        </div>
    );
}

export default DeleteOldStudents;
