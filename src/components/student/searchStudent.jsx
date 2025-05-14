import { useState } from "react";
import axios from "axios";
import RegisterCourseGrade from "./registerCourseGrade";
import { Link } from "react-router-dom";
import ShowStudent from "./showStudentProfile";
import { Card, Label, TextInput } from "flowbite-react";

axios.defaults.baseURL = "https://api.celexest.com"; // Backend URL
axios.defaults.withCredentials = true; // Send cookies with requests

function SearchStudent() {
    const [searchForm, setSearchForm] = useState({ idNumber: "" });

    const updateFormField = (e) => {
        const { name, value } = e.target;
        setSearchForm({ ...searchForm, [name]: value });
    };

    const numberInputOnWheelPreventChange = (e) => {
        // Prevent the input value change
        e.target.blur()
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
            <Card className="w-full max-w-xl">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Buscar Alumno</h2>
                <form className="space-y-4">
                    <div>
                        <Label htmlFor="idNumber" value="Boleta:" />
                        <TextInput
                            id="idNumber"
                            name="idNumber"
                            type="number"
                            value={searchForm.idNumber}
                            onChange={updateFormField}
                            onWheel={numberInputOnWheelPreventChange}
                            placeholder="Ingresa número de boleta"
                            shadow
                            required
                        />
                    </div>
                </form>
                <div className="mt-4">
                    <Link to="/filterStudents" className="text-blue-600 dark:text-blue-400 underline">
                        Búsqueda Avanzada
                    </Link>
                </div>
            </Card>

            <div className="mt-6">
                <ShowStudent propIdNumber={searchForm.idNumber} />
                <RegisterCourseGrade idNumber={searchForm.idNumber} />
            </div>
        </div>
    );
}

export default SearchStudent;
