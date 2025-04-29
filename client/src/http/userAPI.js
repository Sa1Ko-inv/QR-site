//Реализация функций регистрации и авторизации и проверка токена на валидность
import {$authHost, $host} from "@/http/index";
import {jwtDecode} from "jwt-decode";

export const registration = async (email, password, firstName, lastName, middleName, role, groupId) => {
    const {data} = await $host.post('api/user/registration', {email, password, firstName, lastName, middleName, role, groupId});
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token);
}

export const login = async (email, password) => {
    const {data} = await $host.post('api/user/login', {email, password});
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token);
}

export const check = async () => {
    const {data} = await $authHost.get('api/user/auth',);
    localStorage.setItem('token', data.token)
    const decoded = jwtDecode(data.token);
    localStorage.setItem('role', decoded.role);
    return jwtDecode(data.token);
}
