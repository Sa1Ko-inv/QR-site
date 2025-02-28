// Файл сс всеми маршрутами приложения
import Home from './src/pages/Home/Home';
import {HOME_ROUTE} from "@/utils/consts";

export const studentRoutes = [
    {
        path: HOME_ROUTE
        element: <Home/>
    }
];

export const teacherRoutes = [];