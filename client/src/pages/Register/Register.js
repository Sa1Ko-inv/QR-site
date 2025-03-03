"use client"

import { useState, useContext } from "react"
import { useNavigate, Link } from "react-router-dom"
import { observer } from "mobx-react-lite"
import { Context } from "@/index"
import { LOGIN_ROUTE, HOME_ROUTE } from "@/utils/consts"
import * as styles from "./Register.module.scss"

const Register = observer(() => {
    const { user } = useContext(Context)
    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [fullName, setFullName] = useState("")
    const [role, setRole] = useState("student")
    const [group, setGroup] = useState("")

    const groups = [
        { id: "1", name: "Группа 101" },
        { id: "2", name: "Группа 102" },
        { id: "3", name: "Группа 201" },
        { id: "4", name: "Группа 202" },
    ]

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            // Здесь должна быть логика регистрации
            const data = { fullName, email, password, role, group: role === "student" ? group : null }
            console.log("Регистрация:", data)

            // Имитация успешной регистрации
            user.setIsAuth(true)
            user.setUser(data)
            user.setRole(role)
            navigate(HOME_ROUTE)
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    return (
        <div className={styles.registerContainer}>
            <form className={styles.registerForm} onSubmit={handleSubmit}>
                <h2>Регистрация</h2>

                <input
                    className={styles.input}
                    type="text"
                    placeholder="Введите ваше полное имя"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                />

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

                <div className={styles.radioGroup}>
                    <label>
                        <input
                            type="radio"
                            value="student"
                            checked={role === "student"}
                            onChange={(e) => setRole(e.target.value)}
                        />
                        Студент
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="teacher"
                            checked={role === "teacher"}
                            onChange={(e) => setRole(e.target.value)}
                        />
                        Преподаватель
                    </label>
                </div>

                {role === "student" && (
                    <select className={styles.select} value={group} onChange={(e) => setGroup(e.target.value)} required>
                        <option value="">Выберите группу</option>
                        {groups.map((group) => (
                            <option key={group.id} value={group.id}>
                                {group.name}
                            </option>
                        ))}
                    </select>
                )}

                <button className={styles.button} type="submit">
                    Зарегистрироваться
                </button>

                <p>
                    Есть аккаунт? <Link to={LOGIN_ROUTE}>Войдите</Link>
                </p>
            </form>
        </div>
    )
})

export default Register

