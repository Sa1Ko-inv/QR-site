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

$authHost.interceptors.request.use(authInterception)

export {
    $host,
    $authHost
}