//Реализация функций регистрации и авторизации и проверка токена на валидность
import {$authHost, $host} from "@/http/index";

export const registration = async (email, password, fio, role, groupId) => {
    const response = await $host.post('api/user/registration', {email, password, fio, role, groupId});
    return response;
}

export const login = async (email, password) => {
    const response = await $host.post('api/user/login', {email, password});
    return response;
}

export const check = async () => {
    const response = await $host.post('api/user/registration',);
    return response;
}