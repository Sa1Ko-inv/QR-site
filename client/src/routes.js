import Home from '@/pages/Home/Home';
import {GROUP_ROUTE, GROUPS_ROUTE, HOME_ROUTE, LESSON_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE} from "@/utils/consts";
import Register from "@/pages/Register/Register";
import Auth from "@/pages/Auth/Auth";
import Groups from "@/pages/Groups/Groups";
import GroupInfo from "@/pages/Groups/GroupsInfo/GroupInfo";
import LessonsPage from "@/pages/Lesson/LessonsPage";

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
    // Студенты тоже могут просматривать информацию о своей группе
    {
        path: `${GROUP_ROUTE}/:id`, // Добавляем параметр :id к маршруту
        element: <GroupInfo />
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
    // Преподаватели могут просматривать информацию о любой группе
    {
        path: `${GROUP_ROUTE}/:id`, // Добавляем параметр :id к маршруту
        element: <GroupInfo />
    },
    {
        path: LESSON_ROUTE,
        element: <LessonsPage />
    }
]; 