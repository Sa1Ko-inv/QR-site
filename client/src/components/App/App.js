import React from 'react';
import * as style from './App.module.scss'
import {BrowserRouter} from "react-router-dom";
import AppRouter from "@/components/AppRouter";
import NavBar from "@/components/NavBar/NavBar";

const App = () => {
    return (
        <BrowserRouter>
            <NavBar />
            <AppRouter />
        </BrowserRouter>
    )
}

export default App;

