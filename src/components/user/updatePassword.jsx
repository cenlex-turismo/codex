import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Card, Button, Label, TextInput, Modal, ModalHeader, ModalBody, ModalFooter } from "flowbite-react";
import { HiOutlineExclamationCircle, HiCheckCircle, HiOutlineX } from "react-icons/hi";
import { API_URL } from "../../utils/constant";

axios.defaults.baseURL = API_URL; // Backend URL
axios.defaults.withCredentials = true; // Send cookies with requests

function UpdatePassword(){
    const navigate = useNavigate();

    const [updateForm, setUpdateForm] = useState({
        newPassword: "",
        confirmPassword: ""
    })
    
    const [resultModal, setResultModal] = useState({
        show: false,
        success: null,
        message: "",
        activeFunction: false,
    })

    const updateField = (e) => {
        const { name, value } = e.target;
        setUpdateForm({
            ...updateForm,
            [name]: value,
        })
    }

    const changePassword = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put("/user/updatePassword", updateForm);
            setUpdateForm({
                newPassword: "",
                confirmPassword: "",
            })

            setResultModal({
                show: true,
                success: true,
                message: "Contraseña reestablecida con éxito, vuelva a iniciar sesión por favor",
                activeFunction: true,
            });
        } catch (error) {
            setResultModal({
                show: true,
                success: false,
                message: "Error al reestablecer la contraseña",
                activeFunction: false,
            })
        } 
    }

    const logout = async () => {
        try {
            const res = await axios.post("/user/logoutUser/");
            setResultModal({ ...resultModal, show: false, activeFunction: true })
            navigate("/login");
        } catch (err) {
            console.log(err);
            setResultModal({ success: false, message: "Error al cerrar sesión", activeFunction: false, show: true })
        }
    };

    return(
        <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
            <Card className="max-w-lg w-full">
                <h2 className="text-xl font-bold text-gray-800 dark:text-white text-center mb-6">
                    Reestablecer contraseña
                </h2>
                {/* <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 text-center">
                    
                </p> */}
                <form onSubmit={changePassword} className="space-y-4">
                    <div>
                        <Label htmlFor="newPassword" value="Contraseña nueva" />
                        <TextInput
                            id="newPassword"
                            name="newPassword"
                            type="password"
                            value={updateForm.newPassword}
                            onChange={updateField}
                            required
                            placeholder="Ingrese su nueva contraseña"
                        />
                    </div>
                    <div>
                        <Label htmlFor="confirmPassword" value="Confirmación de la contraseña" />
                        <TextInput
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            value={updateForm.confirmPassword}
                            onChange={updateField}
                            placeholder="Ingrese la confirmación de la cuenta"
                            required
                        />
                    </div>
                    <Button type="submit" className="w-full">
                        Actualizar
                    </Button>
                </form>
                <div className="w-full mt-4 text-center">
                    <Link to="/updatedUserBasicData" className="text-blue-600 dark:text-blue-400 underline">
                        Cancelar
                    </Link>
                </div>
            </Card>

            {/* Result Modal */}
            <Modal
                show={resultModal.show}
                size="md"
                popup
                dismissible
                onClose={() => resultModal.activeFunction ? logout() : setResultModal({...resultModal, show: false})}
            >
                <ModalHeader />
                <ModalBody>
                    <div className="text-center space-y-6">
                        {resultModal.success ? (
                            <HiCheckCircle className="mx-auto mb-4 h-14 w-14 text-green-500" />
                        ) : (
                            <HiOutlineX className="mx-auto mb-4 h-14 w-14 text-red-500" />
                        )}
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            {resultModal.message}
                        </p>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button
                        onClick={() => resultModal.activeFunction ? logout() : setResultModal({...resultModal, show: false})}
                    >
                        Aceptar
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default UpdatePassword;