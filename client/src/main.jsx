import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import UserStore from "@/store/UserStore";
// TODO: Сделать чтобы студент отдельную страницу, где студент сможет отмечаться, сделать, проверку из той группы студент отмечается или нет
const root = ReactDOM.createRoot(document.getElementById('root'));
export const Context = createContext(null)
console.log(import.meta.env.VITE_API_URL);

root.render(
    <Context.Provider value={{user: new UserStore()}}>
        <App />

    </Context.Provider>
)

