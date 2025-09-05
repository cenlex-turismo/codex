import axios from "axios";
import {
    Dropdown,
    DropdownDivider,
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

function DefaultNavigationBar() {
    useEffect(() => {
        if (localStorage.getItem("flowbite-theme-mode") === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, []);

    return (
        <div className="NavigationBar bg-white dark:bg-gray-800 shadow-md">
            <Navbar
                fluid
                rounded
                className="px-4 py-2 md:px-6 md:py-4 dark:text-white"
            >
                <NavbarBrand href="/dashboard" className="flex items-center">
                    <img
                        src={logo}
                        className="mr-3 h-6 sm:h-9"
                        alt="Codex Logo"
                    />
                    <span className="self-center whitespace-nowrap text-xl font-bold tracking-wide text-gray-800 dark:text-white">
                        Codex
                    </span>
                </NavbarBrand>
                <NavbarToggle />
                <NavbarCollapse>
                    <div className="flex items-center space-x-4">
                        <DarkThemeToggle className="mr-2" />
                        <NavbarLink
                            href="/"
                            className="text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400"
                        >
                            Iniciar sesión
                        </NavbarLink>
                        <NavbarLink
                            href="/signup"
                            className="text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400"
                        >
                            Registrar alumno
                        </NavbarLink>
                    </div>
                </NavbarCollapse>
            </Navbar>
        </div>
    );
}

export default DefaultNavigationBar;
