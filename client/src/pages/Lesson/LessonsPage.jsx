import React, {useContext, useEffect, useState} from 'react';
import {deleteLesson, fetchLessons, updateLesson} from '@/http/lessonAPI';
import {Link} from 'react-router-dom';
import * as styles from './LessonPage.module.scss';
import MyModal from "@/components/UI/MyModal/MyModal.jsx";
import LessonCreateModal from "@/components/Lesson/createLesson/lessonCreateModal.jsx";
import {Context} from "@/main.jsx";
import LessonEditModal from "@/components/Lesson/editLesson/lessonEditModal.jsx";

const LessonsPage = () => {
    const [lessons, setLessons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [createLesson, setCreateLesson] = useState(null);
    const [editingLesson, setEditingLesson] = useState(null);
    const {user} = useContext(Context);

    useEffect(() => {
        const getLessons = async () => {
            try {
                const data = await fetchLessons();
                console.log(data);
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
        return <div className={styles.lessonsPageLoading}>Загрузка...</div>;
    }

    const createLessons = (newLesson) => {
        setLessons([...lessons, newLesson]);
        setCreateLesson(null);
    }

    const handeDeleteLesson = async (id) => {
        try {
            await deleteLesson(id)
            setLessons(lessons.filter(lesson => lesson.id !== id))
            alert('Занятие успешно удалено')
        } catch (error) {
            console.error('Ошибка при удалении занятия:', error);
        }
    }

    const handleSaveLesson = async (updatedLesson) => {
        try {
            const response = await updateLesson(updatedLesson.id, {
                ...updatedLesson,
                groupIds: updatedLesson.groups || [], // groups уже содержит массив ID
            });
            console.log('Ответ сервера:', response); // Проверьте структуру

            // Обновляем состояние
            setLessons(prev => prev.map(lesson =>
                lesson.id === updatedLesson.id ? response : lesson
            ));
        } catch (error) {
            console.error('Ошибка при обновлении занятия', error);
        }
        setEditingLesson(null);
    };

    return (
        <div className={styles.lessonsPageContainer}>
            <h1 className={styles.lessonsPageTitle}>Список занятий</h1>
            {user.isTeacher() && (
                <>
                    <button onClick={() => setIsCreateModalOpen(true)}>Создать занятие</button>
                </>
            )}


            {lessons.length > 0 ? (
                <ul className={styles.lessonsPageList}>
                    {lessons.map((lesson) => (
                        <li key={lesson.id} className={styles.lessonsPageItem}>
                            <h2 className={styles.lessonsPageItemTitle}>{lesson.title}</h2>
                            <p className={styles.lessonsPageItemInfo}>Тип: {lesson.type}</p>
                            <p className={styles.lessonsPageItemInfo}>
                                Дата: {lesson.date}
                            </p>
                            <p className={styles.lessonsPageItemInfo}>
                                Время: {lesson.startTime} - {lesson.endTime}
                            </p>
                            <p className={styles.lessonsPageItemInfo}>
                                Преподаватель: {lesson.teacher?.fio || 'Не указано'} (
                                {lesson.teacher?.email || 'Нет email'})
                            </p>
                            <p className={styles.lessonsPageGroups}>
                                Группы: {lesson.groups?.map((group) => group.name).join(', ') || 'Не указаны'}
                            </p>
                            <div className="lessonsPageBtnWrapper">
                                {user.isTeacher() && (
                                    <>
                                        <Link to={`/lesson/${lesson.id}`}>
                                            Подробнее
                                        </Link>
                                        <div className="lessonsPageActionBtns">
                                            <button onClick={() => handeDeleteLesson(lesson.id)}>Удалить занятие
                                            </button>
                                            <button onClick={() => setEditingLesson(lesson)}>Редактировать занятие</button>
                                        </div>
                                    </>
                                )}
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className={styles.lessonsPageNoLessons}>Нет доступных занятий</p>
            )}
            {/*Модально окно создания занятия */}
            {isCreateModalOpen && (
                <LessonCreateModal onClose={() => setIsCreateModalOpen(false)} create={createLessons}/>
            )}
            {/*Модальное окно редактирования занятия*/}
            {editingLesson && (
                <LessonEditModal lesson={editingLesson} onClose={() => setEditingLesson(null)}
                                 onSave={handleSaveLesson}/>
            )}
        </div>
    );
};

export default LessonsPage;