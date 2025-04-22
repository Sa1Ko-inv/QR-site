import React, {useContext, useEffect, useState} from "react";
import * as style from "./App.module.scss";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "@/components/AppRouter";
import NavBar from "@/components/NavBar/NavBar.jsx";
import { Context } from "@/main.jsx";
import {observer} from "mobx-react-lite";
import {check} from "@/http/userAPI";
import {Spinner} from "react-bootstrap";

const App = observer(() => {
    const { user } = useContext(Context); // Получаем userStore
    const [loading, setLoading] = useState(true);

    // Если функция check() вернет данные, то пользователь авторизован
    useEffect(() => {
        check().then(data => {
            user.setUser(data);
            user.setIsAuth(true);
            user.setRole(data.role);
        }).catch(e => {
            user.setIsAuth(false);
            user.setRole(null);
        }).finally(() => setLoading(false));
    }, []);


    if (loading) {
        return <Spinner animation={"grow"}/>
    }

    return (
        <BrowserRouter>
            {user.isAuth && <NavBar />} {/* Отображаем NavBar только если авторизован */}
            <AppRouter />
        </BrowserRouter>
    );
});

export default App;
