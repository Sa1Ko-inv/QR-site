"use client"

import { useState, useContext } from "react"
import { useNavigate, Link } from "react-router-dom"
import { observer } from "mobx-react-lite"
import { Context } from "@/index"
import { REGISTRATION_ROUTE, HOME_ROUTE } from "@/utils/consts"
import * as styles from "./Auth.module.scss"

const Auth = observer(() => {
    const { user } = useContext(Context)
    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            // Здесь должна быть логика авторизации
            const data = { email, password }
            console.log("Авторизация:", data)

            // Имитация успешной авторизации
            user.setIsAuth(true)
            user.setUser(data)
            // Роль пользователя должна приходить с сервера после успешной авторизации
            user.setRole("student") // Пример, замените на реальную логику
            navigate(HOME_ROUTE)
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    return (
        <div className={styles.authContainer}>
            <form className={styles.authForm} onSubmit={handleSubmit}>
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

                <button className={styles.button} type="submit">
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

