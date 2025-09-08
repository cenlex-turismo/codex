import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./components/App";
import FilterStudents from "./components/student/filterStudents";
import ShowStudent from "./components/student/showStudentProfile";
import CreateTeacher from "./components/teacher/createTeacher";
import CreateCourse from "./components/courses/createCourse";
import CreateUser from "./components/user/createUser";
import SearchStudent from "./components/student/searchStudent";
import CreateStudent from "./components/student/createStudent";
import MainLayout from "./components/layouts/mainLayout";
import ProtectedRoute from "./components/protectedRoute";
import RedirectBasedOnAuth from "./components/redirectBasedOnAuth";
import UpdateUserBasicData from "./components/user/updateUserBasicData";
import DeleteOldStudents from "./components/student/deleteOldStudents";
import UpdatePassword from "./components/user/updatePassword"
import CoursesManage from "./components/courses/coursesManage"
import TeacherManage from "./components/teacher/teacherManage"

function Router() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Authentication Redirects */}
                <Route path="/" element={<RedirectBasedOnAuth />} />
                <Route path="login" element={<RedirectBasedOnAuth />} />
                <Route path="signup" element={<CreateStudent />} />

                {/* Main App with Protected Routes */}
                <Route
                    path="/*"
                    element={
                        <ProtectedRoute>
                            <MainLayout>
                                <Routes>
                                    <Route path="dashboard" element={<App />} />
                                    {/* Students Routes */}
                                    <Route path="filterStudents" element={<FilterStudents />} />
                                    <Route path="showStudent" element={<ShowStudent />} />
                                    <Route path="searchStudent" element={<SearchStudent />} />
                                    <Route path="createStudent" element={<CreateStudent />} />
                                    {/* Teachers Routes */}
                                    <Route path="teachers" element={<TeacherManage />}/>
                                    <Route path="createTeacher" element={<CreateTeacher />} />
                                    <Route path="modifyTeacher/:id" element={<CreateTeacher />} />
                                    {/* Courses Routes */}
                                    <Route path="courses" element={<CoursesManage />} />
                                    <Route path="createCourse" element={<CreateCourse />} />
                                    {/* Users Routes */}
                                    <Route path="createAdmin" element={<CreateUser />} />
                                    <Route path="updatedUserBasicData" element={<UpdateUserBasicData />} />
                                    <Route path="updatePassword" element= {<UpdatePassword />} />
                                    <Route path="deleteOldStudents" element={<DeleteOldStudents />} />
                                </Routes>
                            </MainLayout>
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}

// Ensure React 18 Rendering Works
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <Router />
    </React.StrictMode>
);
