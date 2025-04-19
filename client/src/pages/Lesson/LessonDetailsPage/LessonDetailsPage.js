import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchOneLesson, getAttendanceByLesson } from '@/http/lessonAPI';
import * as styles from './LessonDetailsPage.module.scss';

const LessonDetailsPage = () => {
    const { id } = useParams();
    const [lesson, setLesson] = useState(null);
    const [attendance, setAttendance] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getLessonDetails = async () => {
            try {
                const lessonData = await fetchOneLesson(id);
                setLesson(lessonData);


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