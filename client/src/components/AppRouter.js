import React, { useContext } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { studentRoutes, teacherRoutes } from "@/routes";
import { GROUPS_ROUTE, HOME_ROUTE, LOGIN_ROUTE } from "@/utils/consts";
import { Context } from "@/index";
import Auth from "@/pages/Auth/Auth";
import Groups from "@/pages/Groups/Groups";
import Home from "@/pages/Home/Home";

const AppRouter = () => {
    const { user } = useContext(Context);
    console.log("Auth:", user.isAuth, "Role", user.role);

    if (user.isAuth && user.role === null) {
        return <div>Загрузка...</div>; // Здесь можно вставить спиннер
    }
    return (
        <Routes>
            {/* Главная страница только для авторизованных пользователей */}
            {user.isAuth && <Route path={HOME_ROUTE} element={<Home />} />}

            {/* Если авторизован, загружаем маршруты по роли */}
            {user.isAuth && user.isTeacher() &&
                teacherRoutes.map(({ path, element }) => (
                    <Route key={path} path={path} element={element} exact />
                ))
            }

            {user.isAuth && user.isStudent() &&
                studentRoutes.map(({ path, element }) => (
                    <Route key={path} path={path} element={element} exact />
                ))
            }

            {/* Страница авторизации для неавторизованных пользователей */}
            {!user.isAuth && <Route path={LOGIN_ROUTE} element={<Auth />} />}

            {/* Перенаправление в зависимости от авторизации */}
            <Route
                path="*"
                element={user.isAuth ? <Navigate to={HOME_ROUTE} replace /> : <Navigate to={LOGIN_ROUTE} replace />}
            />
        </Routes>
    );
};

export default AppRouter;
