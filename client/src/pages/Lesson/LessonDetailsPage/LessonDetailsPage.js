import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {fetchOneLesson, getAttendanceByLesson, activateAttendance} from '@/http/lessonAPI';
import * as styles from './LessonDetailsPage.module.scss';

const LessonDetailsPage = () => {
    const {id} = useParams();
    const [lesson, setLesson] = useState(null);
    const [attendance, setAttendance] = useState([]);
    const [attendanceCode, setAttendanceCode] = useState('');
    const [loading, setLoading] = useState(true);
    const [activationMessage, setActivationMessage] = useState('');

    useEffect(() => {
        const getLessonDetails = async () => {
            try {
                // Fetch lesson details
                const lessonData = await fetchOneLesson(id);
                setLesson(lessonData);

                // Fetch attendance details for the lesson
                const attendanceData = await getAttendanceByLesson(id);
                setAttendance(attendanceData);
            } catch (error) {
                console.error('Error fetching lesson details or attendance:', error);
            } finally {
                setLoading(false);
            }
        };

        getLessonDetails();
    }, [id]);

    const handleActivateAttendance = async () => {
        if (!attendanceCode) {
            setActivationMessage('Введите код посещаемости.');
            return;
        }

        try {
            await activateAttendance(id, attendanceCode);
            setActivationMessage('Посещаемость успешно активирована.');
        } catch (error) {
            console.error('Error activating attendance:', error);
            setActivationMessage(
                error.response?.data?.message || 'Ошибка активации посещаемости.'
            );
        }
    };

    if (loading) {
        return <div className={styles.loading}>Загрузка...</div>;
    }

    if (!lesson) {
        return <div className={styles.error}>Занятие не найдено</div>;
    }

    return (
        <div className={styles.container}>

            <h1 className={styles.title}>{lesson.title}</h1>
            <p className={styles.info}>Тип: {lesson.type}</p>
            <p className={styles.info}>
                Дата: {new Date(lesson.date).toLocaleDateString()}
            </p>
            <p className={styles.info}>
                Время: {lesson.startTime} - {lesson.endTime}
            </p>
            <p className={styles.info}>
                Преподаватель: {lesson.teacher?.fio || 'Не указано'} (
                {lesson.teacher?.email || 'Нет email'})
            </p>
            <p className={styles.groups}>
                Группы: {lesson.groups?.map((group) => group.name).join(', ') || 'Не указаны'}
            </p>
            <div className={styles.activationSection}>
                <h2>Активировать посещаемость</h2>
                <input
                    type="text"
                    placeholder="Введите код посещаемости"
                    value={attendanceCode}
                    onChange={(e) => setAttendanceCode(e.target.value)}
                    className={styles.attendanceInput}
                />
                <button onClick={handleActivateAttendance} className={styles.activateButton}>
                    Активировать
                </button>
                {activationMessage && <p className={styles.activationMessage}>{activationMessage}</p>}
            </div>
            <h2 className={styles.attendanceTitle}>Список отметившихся пользователей:</h2>
            {attendance.length > 0 ? (
                <ul className={styles.attendanceList}>
                    {attendance.map((record) => (
                        <li key={record.id} className={styles.attendanceItem}>
                            <p className={styles.userName}>
                                {record.user?.fio || 'Неизвестный пользователь'}
                            </p>
                            <p className={styles.userEmail}>
                                {record.user?.email || 'Нет email'}
                            </p>
                            <p className={styles.markedAt}>
                                Отметился: {new Date(record.markedAt).toLocaleString()}
                            </p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className={styles.noAttendance}>Никто не отметился</p>
            )}

        </div>
    );
};

export default LessonDetailsPage;