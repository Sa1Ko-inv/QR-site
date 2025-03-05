import React, { useContext } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { studentRoutes, teacherRoutes } from "@/routes";
import { HOME_ROUTE, LOGIN_ROUTE } from "@/utils/consts";
import { Context } from "@/index";
import Auth from "@/pages/Auth/Auth"; // Добавляем импорт

const AppRouter = () => {
    const { user } = useContext(Context); // Получаем userStore из контекста
    console.log(user);

    // Раскомментировать после создания страницы создания регистрации и авторизации
    return (
        <Routes>

            {/*user.isAuth && */ user.isTeacher() &&
                teacherRoutes.map(({ path, element }) => (
                    <Route key={path} path={path} element={element} exact />
                ))
            }

            {/*user.isAuth &&  user.isStudent() &&*/
                studentRoutes.map(({ path, element }) => (
                    <Route key={path} path={path} element={element} exact />
                ))
            }

            {/* Если пользователь не авторизован, отправляем его на страницу входа */}
            {/*{!user.isAuth && <Route path="*" element={<Navigate to={LOGIN_ROUTE} replace />} />}*/}
            {/*{!user.isAuth && <Route path={LOGIN_ROUTE} element={<Auth />} />}*/}

            {/* Если авторизован, но маршрут не найден — отправляем на главную */}
            <Route path="*" element={<Navigate to={HOME_ROUTE} replace />} />
        </Routes>
    );
};

export default AppRouter;
