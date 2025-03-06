import axios from "axios";

// Не требует авторизации
const $host = axios.create({
baseURL: process.env.REACT_APP_API_URL,
})

const $authHost = axios.create({
baseURL: process.env.REACT_APP_API_URL,

})

// Автоматическая подстановка токена
const authInterception = config => {
    config.headers.authorization = `Bearer ${localStorage.getItem("token")}`;
    return config;
}

// Обработчик ошибки 401, она не высвечивает ошибку на сайте, а перенаправляет на страницу авторизации
$host.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('role');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

$authHost.interceptors.request.use(authInterception)

export {
    $host,
    $authHost
}