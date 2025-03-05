import React, { useContext } from "react";
import * as style from "./App.module.scss";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "@/components/AppRouter";
import NavBar from "@/components/NavBar/NavBar";
import { Context } from "@/index";

const App = () => {
    const { user } = useContext(Context); // Получаем userStore

    return (
        <BrowserRouter>
            {user.isAuth && <NavBar />} {/* Отображаем NavBar только если авторизован */}
            <AppRouter />
        </BrowserRouter>
    );
};

export default App;
