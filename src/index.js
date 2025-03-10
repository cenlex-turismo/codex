import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import FilterStudents from './components/student/filterStudents';
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="filterStudents" element={<FilterStudents />} />
            </Routes>
        </BrowserRouter>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Router />
);