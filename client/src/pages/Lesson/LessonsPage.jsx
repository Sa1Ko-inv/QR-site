import React, {useContext, useEffect, useState} from 'react';
import {fetchLessons} from '@/http/lessonAPI';
import {Link} from 'react-router-dom';
import * as styles from './LessonPage.module.scss';
import MyModal from "@/components/UI/MyModal/MyModal.jsx";
import LessonCreateModal from "@/components/Lesson/lessonCreateModal.jsx";
import {Context} from "@/main.jsx";

const LessonsPage = () => {
    const [lessons, setLessons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [createLesson, setCreateLesson] = useState(null);
    const {user} = useContext(Context);

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

    const createLessons = (newLesson) => {
        setLessons([...lessons, newLesson]);
        setCreateLesson(null);
    }
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Список занятий</h1>
            {user.isTeacher() && (
                <>
                    <button onClick={() => setIsCreateModalOpen(true)}>Создать занятие</button>
                </>
            )}


            {lessons.length > 0 ? (
                <ul className={styles.lessonList}>
                    {lessons.map((lesson) => (
                        <li key={lesson.id} className={styles.lessonItem}>
                            <h2 className={styles.lessonTitle}>{lesson.title}</h2>
                            <p className={styles.lessonInfo}>Тип: {lesson.type}</p>
                            <p className={styles.lessonInfo}>
                                Дата: {lesson.date}
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
                            {user.isTeacher() && (
                                <>
                                    <Link to={`/lesson/${lesson.id}`}>
                                        Подробнее
                                    </Link>
                                </>
                            )}

                        </li>
                    ))}
                </ul>
            ) : (
                <p className={styles.noLessons}>Нет доступных занятий</p>
            )}

            {isCreateModalOpen && (
                <LessonCreateModal onClose={() => setIsCreateModalOpen(false)} create={createLessons} />
            )}
        </div>
    );
};

export default LessonsPage;