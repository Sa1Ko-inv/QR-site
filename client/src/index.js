import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App/App';
import UserStore from "@/store/UserStore";

const root = ReactDOM.createRoot(document.getElementById('root'));
export const Context = createContext(null)
console.log(process.env.REACT_APP_API_URL);

root.render(
    <Context.Provider value={{user: new UserStore()}}>
    <App />

    </Context.Provider>
)

