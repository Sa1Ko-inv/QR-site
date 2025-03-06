import { useState, useContext } from "react"
import {Link, useNavigate} from "react-router-dom"
import { observer } from "mobx-react-lite"
import { Context } from "@/index"
import { REGISTRATION_ROUTE, HOME_ROUTE } from "@/utils/consts"
import * as styles from "./Auth.module.scss"
import {login} from "@/http/userAPI";

const Auth = observer(() => {
    const { user } = useContext(Context)
    const navigate = useNavigate();

    // Авторизация
    const signIn = async (e) => {
        e.preventDefault();
        let data;
        try {
            data = await login(email, password)
            // user.setUser(data)
            user.setUser(user)
            user.setIsAuth(true)
            user.setRole(data.role)
            navigate(HOME_ROUTE);
        } catch (e) {
            alert(e.response.data.message)
        }

    }

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")


    return (
        <div className={styles.authContainer}>
            <form className={styles.authForm}>
                <h2>Авторизация</h2>

                <input
                    className={styles.input}
                    type="email"
                    placeholder="Введите ваш email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <input
                    className={styles.input}
                    type="password"
                    placeholder="Введите пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button
                    className={styles.button}
                    onClick={signIn}
                >
                    Войти
                </button>

                <p>
                    Нет аккаунта? <Link to={REGISTRATION_ROUTE}>Зарегистрируйтесь</Link>
                </p>
            </form>
        </div>
    )
})

export default Auth

