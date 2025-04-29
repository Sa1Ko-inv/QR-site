"use client"
import React from 'react'; // Добавьте эту строку
import { useContext, useState } from "react"
import { Context } from "@/main.jsx"
import {GROUPS_ROUTE, HOME_ROUTE, LESSON_ROUTE, LOGIN_ROUTE} from "@/utils/consts"
import {useNavigate} from "react-router-dom"
import styles from "./NavBar.module.scss"

const NavBar = () => {
    const { user } = useContext(Context)
    const [show, setShow] = useState(false)

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const navigate = useNavigate();

    return (
        <nav className={styles.navbar}>
            <div className={styles.navbarContainer}>
                <div className={styles.navbarBrand} onClick={() => navigate(HOME_ROUTE)}>
                    <img alt="" src="../../../public/QR-icons.png" className={`${styles.dInlineBlock} ${styles.alignTop}`} />
                </div>

                <button onClick={handleShow} className={styles.navbarToggler}>
                    <span>☰</span>
                </button>

                <div className={`${styles.navbarOffcanvas} ${show ? styles.show : ''}`}>
                    <div className={styles.navbarOffcanvasHeader}>
                        <h5 className={styles.offcanvasTitle}>Меню</h5>
                        <button type="button" className={styles.btnClose} onClick={handleClose}>×</button>
                    </div>
                    <div className={styles.navbarOffcanvasBody}>
                        <ul className={`${styles.nav} ${styles.justifyContentStart} ${styles.flexColumn} ${styles.pe3}`}>
                            <li className={`${styles.navItem} ${styles.mb2} ${styles.mbLg0}`}>
                                <button
                                    className={`${styles.btn} ${styles.btnPrimary} ${styles.w100}`}
                                    onClick={() => {
                                        navigate(GROUPS_ROUTE);
                                        handleClose();
                                    }}
                                >
                                    Группы
                                </button>
                            </li>
                            <li className={`${styles.navItem} ${styles.mb2} ${styles.mbLg0}`}>
                                <button
                                    className={`${styles.btn} ${styles.btnPrimary} ${styles.w100}`}
                                    onClick={() => {
                                        navigate(LESSON_ROUTE);
                                        handleClose();
                                    }}
                                >
                                    Лекции
                                </button>
                            </li>
                        </ul>
                        <ul className={`${styles.nav} ${styles.justifyContentEnd} ${styles.flexColumn}`}>
                            <li className={`${styles.navItem} ${styles.mt2} ${styles.mtLg0}`}>
                                <button
                                    className={`${styles.btn} ${styles.btnOutlinePrimary} ${styles.w100}`}
                                    onClick={() => {
                                        user.logout();
                                        handleClose();
                                    }}
                                >
                                    Выход
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default NavBar