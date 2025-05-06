import React from "react";
import AdminNavigationBar from "../navbars/adminNavigationBar";
import TeacherNavigationBar from "../navbars/teacherNavigationBar";
import StudentNavigationBar from "../navbars/studentNavigationBar";

const MainLayout = ({ children, user }) => {
    let navigationBar = null;
    console.log(user);

    switch (user?.role) {
        case "admin":
            navigationBar = <AdminNavigationBar user={user} />;
            break;
        case "teacher":
            navigationBar = <TeacherNavigationBar user={user} />;
            break;
        case "student":
            navigationBar = <StudentNavigationBar user={user} />;
            break;
        default:
            navigationBar = null; // Or perhaps a default navigation for unauthenticated users
            break;
    }

    return (
        <div>
            {navigationBar}
            <main>{children}</main>
        </div>
    );
};

export default MainLayout;