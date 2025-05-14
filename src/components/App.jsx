import { useState, useEffect } from "react";
import { Card } from "flowbite-react";
import { HiSun, HiMoon, HiCloud, HiStar } from "react-icons/hi";

function App() {
  const [greeting, setGreeting] = useState("");
  const [icon, setIcon] = useState(null);

  useEffect(() => {
    const hour = new Date().getHours();

    if (hour >= 5 && hour < 12) {
      setGreeting("¡Buenos días! 🌞");
      setIcon(<HiSun className="h-10 w-10 text-yellow-500" />);
    } else if (hour >= 12 && hour < 18) {
      setGreeting("¡Buenas tardes! ☁️");
      setIcon(<HiCloud className="h-10 w-10 text-gray-400" />);
    } else if (hour >= 18 && hour < 22) {
      setGreeting("¡Buenas noches! 🌙");
      setIcon(<HiMoon className="h-10 w-10 text-indigo-500" />);
    } else {
      setGreeting("¡Es tarde, pero nunca demasiado tarde para soñar! 🌟");
      setIcon(<HiStar className="h-10 w-10 text-blue-500" />);
    }
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <Card className="max-w-md w-full text-center">
        <div className="flex justify-center mb-4">{icon}</div>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
          {greeting}
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Bienvenid@ a Codex. La plataforma para el manejo de
          calificaciones del CELEX de la EST 🌟
        </p>
      </Card>
    </div>
  );
}

export default App;
