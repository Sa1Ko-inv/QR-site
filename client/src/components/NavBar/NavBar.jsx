"use client"
import React from 'react'; // Добавьте эту строку
import { useContext, useState } from "react"
import { Context } from "@/main.jsx"
import {GROUPS_ROUTE, HOME_ROUTE, LESSON_ROUTE, LOGIN_ROUTE} from "@/utils/consts"
import {useNavigate} from "react-router-dom"
import * as styles from "./NavBar.module.scss"

const NavBar = () => {
    const { user } = useContext(Context)
    const [show, setShow] = useState(false)

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const navigate = useNavigate();

    return (
        <nav className={styles.navBar_navbar}>
            <div className={styles.navBar_navbarContainer}>
                <div className={styles.navBar_navbarBrand} onClick={() => navigate(HOME_ROUTE)}>
                    <img alt="" src="../../../public/QR-icons.png" className={`${styles.navBar_dInlineBlock} ${styles.navBar_alignTop}`} />
                </div>

                <button onClick={handleShow} className={styles.navBar_navbarToggler}>
                    <span>☰</span>
                </button>

                <div className={`${styles.navBar_navbarOffcanvas} ${show ? styles.show : ''}`}>
                    <div className={styles.navBar_navbarOffcanvasHeader}>
                        <h5 className={styles.navBar_offcanvasTitle}>Меню</h5>
                        <button type="button" className={styles.btnClose} onClick={handleClose}>×</button>
                    </div>
                    <div className={styles.navBar_navbarOffcanvasBody}>
                        <ul className={`${styles.navBar_nav} ${styles.justifyContentStart} ${styles.flexColumn} ${styles.pe3}`}>
                            <li className={`${styles.navBar_navItem} ${styles.navBar_mb2} ${styles.navBar_mbLg0}`}>
                                <button
                                    className={`${styles.navBar_btn} ${styles.navBar_btnPrimary} ${styles.w100}`}
                                    onClick={() => {
                                        navigate(GROUPS_ROUTE);
                                        handleClose();
                                    }}
                                >
                                    Группы
                                </button>
                            </li>
                            <li className={`${styles.navBar_navItem} ${styles.navBar_mb2} ${styles.navBar_mbLg0}`}>
                                <button
                                    className={`${styles.navBar_btn} ${styles.navBar_btnPrimary} ${styles.w100}`}
                                    onClick={() => {
                                        navigate(LESSON_ROUTE);
                                        handleClose();
                                    }}
                                >
                                    Занятия
                                </button>
                            </li>
                        </ul>
                        <ul className={`${styles.navBar_nav} ${styles.justifyContentEnd} ${styles.flexColumn}`}>
                            <li className={`${styles.navBar_navItem} ${styles.navBar_mt2} ${styles.navBar_mtLg0}`}>
                                <button
                                    className={`${styles.navBar_btn} ${styles.navBar_btnOutlinePrimary} ${styles.w100}`}
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