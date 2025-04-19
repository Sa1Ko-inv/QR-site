import React, { useEffect, useState } from 'react';
import { fetchLessons } from '@/http/lessonAPI';
import * as styles from './LessonPage.module.scss';

const LessonsPage = () => {
    const [lessons, setLessons] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getLessons = async () => {
            try {
                const data = await fetchLessons();
                setLessons(data);
            } catch (error) {
                console.error('Error fetching lessons:', error);
            } finally {
                setLoading(false);
            }
        };

        getLessons();
    }, []);

    if (loading) {
        return <div className={styles.loading}>Загрузка...</div>;
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Список занятий</h1>
            {lessons.length > 0 ? (
                <ul className={styles.lessonList}>
                    {lessons.map((lesson) => (
                        <li key={lesson.id} className={styles.lessonItem}>
                            <h2 className={styles.lessonTitle}>{lesson.title}</h2>
                            <p className={styles.lessonInfo}>Тип: {lesson.type}</p>
                            <p className={styles.lessonInfo}>
                                Дата: {new Date(lesson.date).toLocaleDateString()}
                            </p>
                            <p className={styles.lessonInfo}>
                                Время: {lesson.startTime} - {lesson.endTime}
                            </p>
                            <p className={styles.lessonInfo}>
                                Преподаватель: {lesson.teacher?.fio || 'Не указано'} (
                                {lesson.teacher?.email || 'Нет email'})
                            </p>
                            <p className={styles.lessonGroups}>
                                Группы: {lesson.groups?.map((group) => group.name).join(', ') || 'Не указаны'}
                            </p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className={styles.noLessons}>Нет доступных занятий</p>
            )}
        </div>
    );
};

export default LessonsPage;