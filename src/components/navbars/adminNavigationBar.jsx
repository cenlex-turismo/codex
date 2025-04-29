import axios from "axios";
import { Dropdown, DropdownDivider, DropdownItem, Navbar, NavbarBrand, NavbarCollapse, NavbarLink, NavbarToggle } from "flowbite-react";
import { useNavigate } from "react-router-dom";

axios.defaults.baseURL = "https://api.celexest.com"; // Backend URL
axios.defaults.withCredentials = true; // Send cookies with requests

function AdminNavigationBar({ user }) {

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
                    <Dropdown
                        arrowIcon={true}
                        inline
                        label="Alumnos"
                    >
                        <DropdownItem href="/createStudent">Registrar alumno</DropdownItem>
                        <DropdownDivider />
                        <DropdownItem href="/searchStudent">Buscar alumno</DropdownItem>
                        <DropdownDivider />
                        <DropdownItem href="/filterStudents">Buscar alumno - Avanzado</DropdownItem>
                    </Dropdown>
                    <Dropdown
                        arrowIcon={true}
                        inline
                        label="Profesores"
                    >
                        <DropdownItem href="/createTeacher">Registrar profesor</DropdownItem>
                    </Dropdown>
                    <Dropdown
                        arrowIcon={true}
                        inline
                        label="Cursos"
                    >
                        <DropdownItem href="/createCourse">Crear Curso</DropdownItem>
                    </Dropdown>
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

export default AdminNavigationBar;
