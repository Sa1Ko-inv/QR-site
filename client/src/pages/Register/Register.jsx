"use client"

import {useState, useContext, useEffect} from "react"
import { useNavigate, Link } from "react-router-dom"
import { observer } from "mobx-react-lite"
import { Context } from "@/main.jsx"
import { LOGIN_ROUTE, HOME_ROUTE } from "@/utils/consts"
import * as styles from "./Register.module.scss"
import {registration} from "@/http/userAPI";
import {fetchGroups} from "@/http/groupAPI";

const Register = observer(() => {
    const { user } = useContext(Context)
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [fullName, setFullName] = useState("")
    const [role, setRole] = useState("STUDENT")
    const [selectedGroup, setSelectedGroup] = useState("")  // Храним id выбранной группы
    const [groups, setGroups] = useState([]); // Храним список всех групп
    const [showSuccessModal, setShowSuccessModal] = useState(false) // Состояние для отображения модального окна
    const [error, setError] = useState(""); //вывод ошибки


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
        e.preventDefault()
        let data
        try {
            data = await registration(email, password, fullName, role, selectedGroup || null)
            setShowSuccessModal(true) // Показываем модальное окно при успешной регистрации

            // Перенаправляем на страницу авторизации через 3 секунды
            setTimeout(() => {
                navigate(LOGIN_ROUTE)
            }, 3500)
        } catch (e) {
            const errorMessage = e.response?.data?.message || "Ошибка авторизации";
            setError(errorMessage);
        }
    }

    return (
        <div className={styles.registerContainer}>
            {/* Модальное окно успешной регистрации */}
            {showSuccessModal && (
                <div className={styles.modalOverlay}>
                    <div className={styles.successModal}>
                        <div className={styles.successIcon}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="64"
                                height="64"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                <polyline points="22 4 12 14.01 9 11.01"></polyline>
                            </svg>
                        </div>
                        <h3>Регистрация успешна!</h3>
                        <p>Ваша учетная запись была успешно создана.</p>
                        <p>Вы будете перенаправлены на страницу входа через несколько секунд...</p>
                        <button className={styles.modalButton} onClick={() => navigate(LOGIN_ROUTE)}>
                            Перейти сейчас
                        </button>
                    </div>
                </div>
            )}

            <form className={styles.registerForm}>
                {error && <div className={styles.error}>{error}</div>}  {/* Вывод ошибки */}
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

