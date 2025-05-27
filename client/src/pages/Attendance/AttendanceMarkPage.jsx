import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import {$authHost, $host} from '@/http';
import {attendanceMark} from "@/http/attendanceAPI.js";
import * as styles from './AttendanceMarkPage.module.scss';

const AttendanceMarkPage = () => {
    const { lessonId } = useParams();
    const [attendanceCode, setAttendanceCode] = useState('');
    const [message, setMessage] = useState('');
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await attendanceMark(lessonId, attendanceCode);
            setMessage(response.data.message || 'Посещаемость успешно отмечена!');
            setSuccess(true);
        } catch (error) {
            setMessage(error.response?.data?.message || 'Ошибка при отметке посещаемости');
            setSuccess(false);
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Отметка посещаемости</h1>
            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    <label className={styles.label} htmlFor="attendanceCode">Код посещаемости:</label>
                    <input
                        className={styles.input}
                        type="text"
                        id="attendanceCode"
                        value={attendanceCode}
                        onChange={(e) => setAttendanceCode(e.target.value)}
                        required
                    />
                </div>
                <button className={styles.button} type="submit">Отметиться</button>
            </form>
            {message && (
                <p className={`${styles.message} ${success ? styles.success : styles.error}`}>
                    {message}
                </p>
            )}
        </div>
    );
};

export default AttendanceMarkPage;