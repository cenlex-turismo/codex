import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import FilterStudents from './components/student/filterStudents';
import ShowStudent from './components/student/showStudentProfile';
import CreateTeacher from './components/teacher/createTeacher';
import CreateCourse from './components/courses/createCourse';
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="filterStudents" element={<FilterStudents />} />
                <Route path="showStudent" element={<ShowStudent />} />
                <Route path="createTeacher" element={<CreateTeacher />} />
                <Route path="createCourse" element={<CreateCourse />} />
            </Routes>
        </BrowserRouter>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Router />
);