import axios from "axios";
import {
    Dropdown,
    DropdownItem,
    Navbar,
    NavbarBrand,
    NavbarCollapse,
    NavbarLink,
    NavbarToggle,
    DarkThemeToggle,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
} from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { HiCheckCircle, HiOutlineX } from "react-icons/hi";
import logo from "../../assets/logot.png";
import { API_URL } from "../../utils/constant";

axios.defaults.baseURL = API_URL; // Backend URL
axios.defaults.withCredentials = true; // Send cookies with requests

function StudentNavigationBar({ user }) {

    const navigate = useNavigate();

    const [logoutModal, setLogoutModal] = useState({
        show: false,
        success: null, // null = not attempted, true = success, false = failure
        message: "",
    });

    const logout = async () => {
        try {
            const res = await axios.post("/user/logoutUser/");
            setLogoutModal({
                show: true,
                success: true,
                message: "Sesión cerrada con éxito",
            });
        }
        catch (err) {
            setLogoutModal({
                show: true,
                success: false,
                message: "Error al cerrar sesión",
            });
        }
    };

    const handleOpenSearchPage = (idNumber) => {
        navigate(`/showStudent?idNumber=${idNumber}`);
    };

    useEffect(() => {
        if (localStorage.getItem("flowbite-theme-mode") === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, []);

    return (
        <div className="NavigationBar bg-white dark:bg-gray-800 shadow-md">
            <Navbar fluid rounded className="px-4 py-2 md:px-6 md:py-4 dark:text-white">
                <NavbarBrand href="/dashboard" className="flex items-center">
                    <img src={logo} className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" />
                    <span className="self-center whitespace-nowrap text-xl font-bold tracking-wide text-gray-800 dark:text-white">Codex</span>
                </NavbarBrand>
                <NavbarToggle />
                <NavbarCollapse>
                    <div className="flex items-center space-x-4">
                        <DarkThemeToggle className="mr-2" />
                        <NavbarLink href="/dashboard" className="text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400">
                            Inicio
                        </NavbarLink>
                        <NavbarLink onClick={() => handleOpenSearchPage(user.idNumber)} className="text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400">
                            Historial
                        </NavbarLink>
                        <Dropdown
                            arrowIcon={true}
                            inline
                            label={user.firstName + " " + user.lastName}
                        >
                            <DropdownItem href="/updatedUserBasicData">Perfil</DropdownItem>
                            <DropdownItem onClick={logout}>Cerrar Sesión</DropdownItem>
                        </Dropdown>
                    </div>
                </NavbarCollapse>
            </Navbar>

            {/* Logout Modal */}
            <Modal
                size="md"
                popup
                dismissible
                show={logoutModal.show}
                onClose={() => {
                    setLogoutModal({ ...logoutModal, show: false })
                    navigate("/login");
                }}
            >
                <ModalHeader />
                <ModalBody>
                    <div className="text-center space-y-6">
                        {logoutModal.success ? (
                            <HiCheckCircle className="mx-auto mb-4 h-14 w-14 text-green-500" />
                        ) : (
                            <HiOutlineX className="mx-auto mb-4 h-14 w-14 text-red-500" />
                        )}
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            {logoutModal.message}
                        </p>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button
                        onClick={() => {
                            setLogoutModal({ ...logoutModal, show: false })
                            navigate("/login");
                        }}
                    >
                        Aceptar
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default StudentNavigationBar;
