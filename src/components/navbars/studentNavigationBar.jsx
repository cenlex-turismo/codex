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
        <div className="NavigationBar">
            <Navbar fluid rounded>
                <NavbarBrand href="/dashboard">
                    <img src="../../assets/logo.jpg" className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" />
                    <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Codex</span>
                </NavbarBrand>
                <NavbarToggle />
                <NavbarCollapse>
                    <NavbarLink href="/dashboard" active>
                        Inicio
                    </NavbarLink>
                    <NavbarLink onClick={() => handleOpenSearchPage(5)} active>
                        Historial
                    </NavbarLink>
                    <Dropdown
                        arrowIcon={true}
                        inline
                        label={user.firstName + " " + user.lastName}
                    >
                        <DropdownItem onClick={logout}>Cerrar Sesion</DropdownItem>
                    </Dropdown>
                </NavbarCollapse>
            </Navbar>
        </div>
    );
}

export default StudentNavigationBar;
