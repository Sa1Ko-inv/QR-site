import React from 'react'; // Добавьте эту строку
import Home from '@/pages/Home/Home';
import {
    GROUP_ROUTE,
    GROUPS_ROUTE,
    HOME_ROUTE,
    LESSON_ROUTE,
    LESSONDETAILS_ROUTE,
    LOGIN_ROUTE,
    REGISTRATION_ROUTE
} from "@/utils/consts.js";
import Register from "@/pages/Register/Register.jsx";
import Auth from "./pages/Auth/Auth.jsx";
import Groups from "@/pages/Groups/Groups.jsx";
import GroupInfo from "@/pages/Groups/GroupsInfo/GroupInfo.jsx";
import LessonsPage from "@/pages/Lesson/LessonsPage.jsx";
import LessonDetailsPage from "@/pages/Lesson/LessonDetailsPage/LessonDetailsPage.jsx";
import AttendanceMarkPage from "@/pages/Attendance/AttendanceMarkPage.jsx";

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
    {
        path: '/attendance/mark/:lessonId',
        element: <AttendanceMarkPage /> // Страница для отметки посещаемости
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
    },
    {
        path: LESSONDETAILS_ROUTE,
        element: <LessonDetailsPage />
    },
    {
        path: '/attendance/mark/:lessonId',
        element: <AttendanceMarkPage /> // Страница для отметки посещаемости
    },
];