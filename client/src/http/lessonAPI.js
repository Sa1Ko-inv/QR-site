import {$authHost} from "./index";

// Получение всех занятий с возможностью фильтрации
export const fetchLessons = async (filters = {}) => {
    const { type, teacherId, groupId, date } = filters;
    let url = 'api/lesson';

    // Добавление параметров фильтрации в URL
    const params = new URLSearchParams();
    if (type) params.append('type', type);
    if (teacherId) params.append('teacherId', teacherId);
    if (groupId) params.append('groupId', groupId);
    if (date) params.append('date', date);

    if (params.toString()) {
        url += `?${params.toString()}`;
    }

    const {data} = await $authHost.get(url);
    return data;
};

// Получение занятия по ID
export const fetchOneLesson = async (id) => {
    const {data} = await $authHost.get(`api/lesson/${id}`);
    return data;
};

// Создание нового занятия
export const createLesson = async (lesson) => {
    const {data} = await $authHost.post('api/lesson', lesson);
    return data;
};

// Обновление занятия
export const updateLesson = async (id, lesson) => {
    const {data} = await $authHost.put(`api/lesson/${id}`, lesson);
    return data;
};

// Удаление занятия
export const deleteLesson = async (id) => {
    const {data} = await $authHost.delete(`api/lesson/${id}`);
    return data;
};

// Генерация кода посещаемости
export const generateAttendanceCode = async (lessonId, duration) => {
    const {data} = await $authHost.post(`api/attendance/${lessonId}/generate`, { duration });
    return data;
};

// Деактивация кода посещаемости
export const deactivateAttendanceCode = async (lessonId) => {
    const {data} = await $authHost.post(`api/attendance/${lessonId}/deactivate`);
    return data;
};

// Отметка посещаемости студентом
export const markAttendance = async (lessonId, attendanceCode) => {
    const {data} = await $authHost.post(`api/attendance/${lessonId}/mark`, { attendanceCode });
    return data;
};

// Получение списка посещаемости для занятия
export const getAttendanceByLesson = async (lessonId) => {
    const {data} = await $authHost.get(`api/attendance/${lessonId}`);
    return data;
};
