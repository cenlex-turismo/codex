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
import SearchStudent from './components/student/searchStudent';
import CreateStudent from './components/student/createStudent';
import MainLayout from './components/layouts/mainLayout';

// Router Component
function Router() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Authentication Routes */}
                <Route path="/" element={<AuthenticateUser />} />
                <Route path="login" element={<AuthenticateUser />} />
                <Route
                    path="/*"
                    element={
                        <MainLayout>
                            <Routes>
                                <Route path="dashboard" element={<App />} />
                                {/* Students Routes */}
                                <Route path="filterStudents" element={<FilterStudents />} />
                                <Route path="showStudent" element={<ShowStudent />} />
                                <Route path="searchStudent" element={<SearchStudent />} />
                                <Route path="createStudent" element={<CreateStudent />} />
                                {/* Teachers Routes */}
                                <Route path="createTeacher" element={<CreateTeacher />} />
                                {/* Courses Routes */}
                                <Route path="createCourse" element={<CreateCourse />} />
                                {/* Users Routes */}
                                <Route path="createUser" element={<CreateUser />} />
                            </Routes>
                        </MainLayout>
                    }
                />
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
