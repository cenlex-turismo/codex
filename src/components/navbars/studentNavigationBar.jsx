import axios from "axios";
import { Dropdown, DropdownDivider, DropdownItem, Navbar, NavbarBrand, NavbarCollapse, NavbarLink, NavbarToggle } from "flowbite-react";
import { useNavigate } from "react-router-dom";

axios.defaults.baseURL = "https://api.celexest.com"; // Backend URL
axios.defaults.withCredentials = true; // Send cookies with requests

function StudentNavigationBar({ user }) {

    const navigate = useNavigate();

    const logout = async () => {
        try {
            const res = await axios.post("/user/logoutUser/");
            console.log(res.data.message);
            window.alert("Sesion cerrada");
            navigate("/login");
        }
        catch (err) {
            window.alert("Error al cerrar sesion");
        }
    };

    const handleOpenSearchPage = (idNumber) => {
        navigate(`/showStudent?idNumber=${idNumber}`);
    };

    return (
        <div className="NavigationBar bg-white dark:bg-gray-800 shadow-md">
            <Navbar fluid rounded className="px-4 py-2 md:px-6 md:py-4 dark:text-white">
                <NavbarBrand href="/dashboard" className="flex items-center">
                    <img src="src/assets/logo.jpg" className="mr-3 h-6 sm:h-9 rounded-full" alt="Flowbite React Logo" />
                    <span className="self-center whitespace-nowrap text-xl font-bold tracking-wide text-gray-800 dark:text-white">Codex</span>
                </NavbarBrand>
                <NavbarToggle />
                <NavbarCollapse>
                    <div className="flex items-center space-x-4">
                        <DarkThemeToggle className="mr-2" />
                        <NavbarLink href="/dashboard" className="text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400">
                            Inicio
                        </NavbarLink>
                        <NavbarLink onClick={() => handleOpenSearchPage(user.idNumber)}>
                            Historial
                        </NavbarLink>
                        <Dropdown
                            arrowIcon={true}
                            inline
                            label={user.firstName + " " + user.lastName}
                        >
                            <DropdownItem href="/updatedUserBasicData">Perfil</DropdownItem>
                            <DropdownItem onClick={logout}>Cerrar Sesion</DropdownItem>
                        </Dropdown>
                    </div>
                </NavbarCollapse>
            </Navbar>
        </div>
    );
}

export default StudentNavigationBar;
