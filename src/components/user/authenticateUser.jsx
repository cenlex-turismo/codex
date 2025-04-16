import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, Modal, ModalBody, ModalHeader, ModalFooter } from "flowbite-react";
import { HiCheckCircle, HiOutlineX } from "react-icons/hi";

axios.defaults.baseURL = "https://api.celexest.com"; // Backend URL
axios.defaults.withCredentials = true; // Send cookies with requests

function AuthenticateUser() {

    const navigate = useNavigate();

    const [searchForm, setSearchForm] = useState({
        email: "",
        password: ""
    });

    const [openModalResult, setOpenModalResult] = useState({
        show: false,
        message: ""
    });

    const updateFormField = (e) => {
        const { name, value } = e.target;

        setSearchForm({
            ...searchForm,
            [name]: value,
        });
    };

    const authenticateUser = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post("/user/authenticateUser/", searchForm);

            setOpenModalResult({
                show: true,
                message: "Bienvenid@ " + res.data.user.firstName + " " + res.data.user.lastName
            });
        }
        catch (err) {
            setOpenModalResult({
                show: true,
                message: "Contraseña o correo invalidos"
            });
        }
    };

    return (
        <div className="AuthenticateUser">
            <div>
                <h2>Iniciar Sesion</h2>
                <form onSubmit={authenticateUser}>
                    <div style={{ marginBottom: '10px' }}>
                        <label>Email:
                            <span style={{ marginRight: '10px' }} />
                            <input value={searchForm.email} onChange={updateFormField} name="email" type="email" />
                        </label>
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <label>Contraseña:
                            <span style={{ marginRight: '10px' }} />
                            <input value={searchForm.password} onChange={updateFormField} name="password" type="password" />
                        </label>
                    </div>
                    <input value="Buscar" type="submit" />
                </form>
            </div>
            <Modal size="md" popup dismissible show={openModalResult.show} onClose={() => setOpenModalResult({
                ...setOpenModalResult,
                show: false
            })}>
                <ModalHeader />
                <ModalBody>
                    <div className="text-center space-y-6">
                        {openModalResult.message !== "Contraseña o correo invalidos" ? (
                            <HiCheckCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                        ) : (
                            <HiOutlineX className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                        )}
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            {openModalResult.message}
                        </p>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={() => {
                        setOpenModalResult({
                            ...setOpenModalResult,
                            show: false
                        });
                        navigate("/dashboard");
                    }}>Aceptar</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default AuthenticateUser;
