import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from './components/App';
import FilterStudents from './components/student/filterStudents';
import ShowStudent from './components/student/showStudentProfile';
import CreateTeacher from './components/teacher/createTeacher';
import CreateCourse from './components/courses/createCourse';
import CreateUser from './components/user/createUser';
import AuthenticateUser from './components/user/authenticateUser';

// Router Component
function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<AuthenticateUser />} />
                <Route path="login" element={<AuthenticateUser />} />
                <Route path="dashboard" element={<App />} />
                <Route path="filterStudents" element={<FilterStudents />} />
                <Route path="showStudent" element={<ShowStudent />} />
                <Route path="createTeacher" element={<CreateTeacher />} />
                <Route path="createCourse" element={<CreateCourse />} />
                <Route path="createUser" element={<CreateUser />} />
            </Routes>
        </BrowserRouter>
    );
}

// Ensure React 18 Rendering Works
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Router />
    </React.StrictMode>
);
