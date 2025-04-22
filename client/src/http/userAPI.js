//Реализация функций регистрации и авторизации и проверка токена на валидность
import {$authHost, $host} from "@/http/index";
import {jwtDecode} from "jwt-decode";

export const registration = async (email, password, fio, role, groupId) => {
    const {data} = await $host.post('api/user/registration', {email, password, fio, role, groupId});
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token);
}

export const login = async (email, password) => {
    const {data} = await $host.post('"http://192.168.241.62:5000/api/user/login', {email, password});
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token);
}

export const check = async () => {
    const {data} = await $authHost.get('api/user/auth',);
    localStorage.setItem('token', data.token)
    const decoded = jwtDecode(data.token);
    console.log(data);
    localStorage.setItem('role', decoded.role);
    return jwtDecode(data.token);
}
