// Файл сс всеми маршрутами приложения
import Home from '@/pages/Home/Home';
import {GROUPS_ROUTE, HOME_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE} from "@/utils/consts";
import Register from "@/pages/Register/Register";
import Auth from "@/pages/Auth/Auth";
import Groups from "@/pages/Groups/Groups";

export const studentRoutes = [
    {
        path: HOME_ROUTE,
        element: <Home />
    },
    {
        path: REGISTRATION_ROUTE,
        element: <Register />
    },
    {
        path: LOGIN_ROUTE,
        element: <Auth />
    },
    {
        path: GROUPS_ROUTE,
        element: <Groups />
    },
];

export const teacherRoutes = [
    {
        path: HOME_ROUTE,
        element: <Home />
    },
    {
        path: REGISTRATION_ROUTE,
        element: <Register />
    },
    {
        path: LOGIN_ROUTE,
        element: <Auth />
    },
    {
      path: GROUPS_ROUTE,
      element: <Groups />
    },
];
