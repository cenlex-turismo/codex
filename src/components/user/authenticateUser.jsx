import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios"; // permite usar el cliente de peticiones http "axios"
import { Button, Alert, Label, TextInput, Card } from "flowbite-react";
import { HiInformationCircle } from "react-icons/hi";
import { API_URL } from "../../utils/constant";

import DefaultNavigationBar from "../navbars/defaultNavigationBar";

axios.defaults.baseURL = API_URL;
axios.defaults.withCredentials = true;

function AuthenticateUser() {
    const navigate = useNavigate();

    //Inicializacion de los text box para colocar los datos de inicio de sesion. Por default, estan vacios.
    const [searchForm, setSearchForm] = useState({ email: "", password: "" });
    //Inicializacion del modal con el mensaje a mostrar. Por default, no se muestra y no tiene mensaje.
    const [openResult, setOpenResult] = useState({ show: false });


    //Funciones flecha para definir eventos.

    //Este es el evento de "escribir" o "modificar el campo". Define nombre y valor del campo y los va a
    //buscar usando la funcion setSearchForm. 
    const updateFormField = (e) => {
        const { name, value } = e.target;
        setSearchForm({ ...searchForm, [name]: value });
    };

    //Este es el evento que tira el modal que queremos eliminar. Usa un bloque try-catch
    //para verificar si los datos ingresados son correctos. Tendria que modificar este bloque para que
    //en lugar de sacar un modal, se muestre un mensaje en el mismo formulario, pero solo en caso de que
    //los datos ingresados no sean correctos.
    const authenticateUser = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("/user/authenticateUser/", searchForm);
            navigate("/dashboard");
        } catch (err) {
            setOpenResult({ show: true})
        }
        
    };

    
    return (
        <div>
            <DefaultNavigationBar />
            <div className="flex items-center justify-center h-screen bg-cover bg-center dark:bg-gray-900">
                <Card className="w-full max-w-md p-8 bg-white bg-opacity-90 rounded-2xl shadow-lg">
                    <h2 className="text-3xl font-bold text-center mb-6 text-gray-800 dark:text-gray-200">Iniciar Sesión</h2>
                    
                    {openResult.show ? 
                        (
                            <Alert color="failure" icon={HiInformationCircle} onDismiss={() => setOpenResult({show: false})}>
                                Correo o contraseña inválidos
                            </Alert>
                        )
                        :
                        (
                            <div>
                            </div>
                        )
                    }
                    
                    <form onSubmit={authenticateUser} className="flex flex-col gap-6">
                        <div>
                            <Label htmlFor="email">Correo</Label>
                            <TextInput
                                value={searchForm.email}
                                id="email"
                                name="email"
                                type="email"
                                onChange={updateFormField}
                                placeholder="correo@ejemplo.com"
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="password">Contraseña</Label>
                            <TextInput
                                value={searchForm.password}
                                id="password"
                                name="password"
                                type="password"
                                onChange={updateFormField}
                                required
                            />
                        </div>
                        <Button type="submit" className="w-full">Ingresar</Button>
                    </form>
                    {/* <div className="mt-4">
                        <Link to="/signup" className="text-blue-600 dark:text-blue-400 underline">
                            Registrarse
                        </Link>
                    </div> */}
                </Card>
            </div>
        </div>
    );
}

export default AuthenticateUser;
