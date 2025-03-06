"use client"

import {useState, useContext, useEffect} from "react"
import { useNavigate, Link } from "react-router-dom"
import { observer } from "mobx-react-lite"
import { Context } from "@/index"
import { LOGIN_ROUTE, HOME_ROUTE } from "@/utils/consts"
import * as styles from "./Register.module.scss"
import {registration} from "@/http/userAPI";
import {fetchGroups} from "@/http/groupAPI";

const Register = observer(() => {
    const { user } = useContext(Context)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [fullName, setFullName] = useState("")
    const [role, setRole] = useState("STUDENT")
    const [selectedGroup, setSelectedGroup] = useState("")  // Храним id выбранной группы
    const [groups, setGroups] = useState([]); // Храним список всех групп

    // Вывод списка групп в список при регистрации
    useEffect(() => {
        const getGroups = async () => {
            try {
                const data = await fetchGroups();
                setGroups(data); // Устанавливаем массив групп в отдельное состояние
            } catch (error) {
                console.error("Ошибка при получении групп:", error);
                setGroups([]);
            }
        };
        getGroups();
    }, []);

    // Регистрация
    const signUn = async (e) => {
        e.preventDefault();
        let data;
        try {
        data = await registration(email, password, fullName, role, selectedGroup || null)
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    return (
        <div className={styles.registerContainer}>
            <form className={styles.registerForm}>
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
                            value="STUDENT"
                            checked={role === "STUDENT"}
                            onChange={(e) => setRole(e.target.value)}
                        />
                        Студент
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="TEACHER"
                            checked={role === "TEACHER"}
                            onChange={(e) => setRole(e.target.value)}
                        />
                        Преподаватель
                    </label>
                </div>

                {role === "STUDENT" && groups.length > 0 && (
                    <select
                        className={styles.select}
                        value={selectedGroup} // Тут храним id выбранной группы
                        onChange={(e) => setSelectedGroup(e.target.value)}
                        required
                    >
                        <option value="">Выберите группу</option>
                        {groups.map((group) => (
                            <option key={group.id} value={group.id}>
                                {group.name}
                            </option>
                        ))}
                    </select>
                )}


                <button
                    className={styles.button}
                    onClick={signUn}
                >
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

