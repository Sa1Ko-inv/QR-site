import React, { useContext } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { studentRoutes, teacherRoutes } from "@/routes.jsx";
import {GROUPS_ROUTE, HOME_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE} from "@/utils/consts";
import { Context } from "@/main.jsx";
import Auth from "@/pages/Auth/Auth.jsx";
import Groups from "@/pages/Groups/Groups";
import Home from "@/pages/Home/Home.jsx";
import Register from "@/pages/Register/Register.jsx";

const AppRouter = () => {
    const { user } = useContext(Context);
    console.log("Auth:", user.isAuth, "Role", user.role, "User", user.user);

    if (user.isAuth && user.role === null) {
        return <div>Загрузка...</div>; // Здесь можно вставить спиннер
    }
    return (
        <Routes>
            {/* Главная страница только для авторизованных пользователей */}
            {user.isAuth && <Route path={HOME_ROUTE} element={<Home />} />}

            {/* Если авторизован, загружаем маршруты по роли */}
            {/*Страницы для учителей*/}
            {user.isAuth && user.isTeacher() &&
                teacherRoutes.map(({ path, element }) => (
                    <Route key={path} path={path} element={element} exact />
                ))
            }
            {/*Страницы для студентов*/}
            {user.isAuth && user.isStudent() &&
                studentRoutes.map(({ path, element }) => (
                    <Route key={path} path={path} element={element} exact />
                ))
            }

            {/* Страница авторизации для неавторизованных пользователей */}
            {!user.isAuth && <Route path={LOGIN_ROUTE} element={<Auth />} />}
            {!user.isAuth && <Route path={REGISTRATION_ROUTE} element={<Register />} />}

            {/* Перенаправление в зависимости от авторизации */}
            <Route
                path="*"
                element={user.isAuth ? <Navigate to={HOME_ROUTE} replace /> : <Navigate to={LOGIN_ROUTE} replace />}
            />
        </Routes>
    );
};

export default AppRouter;
