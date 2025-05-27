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
    const [selectedType, setSelectedType] = useState('Все');

    const {user} = useContext(Context);

    const lessonTypes = ['Все', ...new Set(lessons.map(lesson => lesson.type))];

    const filteredLessons = selectedType === 'Все'
        ? lessons
        : lessons.filter(lesson => lesson.type === selectedType);

    const lessonTypeLabels = {
        LABORATORY: 'Лабораторное занятие',
        LECTURE: 'Лекция',
        PRACTICE: 'Практика',
        Все: 'Все', // для селектора
    };


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
        return <div className={styles.lessonsPageLoading}>Загрузка...</div>;
    }

    const createLessons = (newLesson) => {
        setLessons([...lessons, newLesson]);
        setCreateLesson(null);
    };

    const handeDeleteLesson = async (id) => {
        try {
            await deleteLesson(id);
            setLessons(lessons.filter(lesson => lesson.id !== id));
            alert('Занятие успешно удалено');
        } catch (error) {
            console.error('Ошибка при удалении занятия:', error);
        }
    };

    const handleSaveLesson = async (updatedLesson) => {
        try {
            const response = await updateLesson(updatedLesson.id, {
                ...updatedLesson,
                groupIds: updatedLesson.groups || [],
            });

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
                <div className={styles.lessonsPageCreateBtnWrapper}>
                    <button
                        className={styles.lessonsPageCreateBtn}
                        onClick={() => setIsCreateModalOpen(true)}
                    >
                        Создать занятие
                    </button>
                </div>
            )}

            <div className={styles.lessonsPageFilterWrapper}>
                <label htmlFor="lessonTypeFilter" className={styles.lessonsPageFilterLabel}>Фильтр по типу:</label>
                <select
                    id="lessonTypeFilter"
                    className={styles.lessonsPageFilterSelect}
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                >
                    {lessonTypes.map(type => (
                        <option key={type} value={type}>{lessonTypeLabels[type] || type}</option>
                    ))}
                </select>
            </div>


            {lessons.length > 0 ? (
                <ul className={styles.lessonsPageList}>
                    {filteredLessons.map((lesson) => (
                        <li key={lesson.id} className={styles.lessonsPageItem}>
                            <h2 className={styles.lessonsPageItemTitle}>{lesson.title}</h2>
                            <p className={styles.lessonsPageItemInfo}>
                                Тип: {lessonTypeLabels[lesson.type] || lesson.type}
                            </p>
                            <p className={styles.lessonsPageItemInfo}>Дата: {lesson.date}</p>
                            <p className={styles.lessonsPageItemInfo}>Время: {lesson.startTime} - {lesson.endTime}</p>
                            <p className={styles.lessonsPageItemInfo}>
                                Преподаватель: {lesson.teacher?.lastName} {lesson.teacher?.firstName} {lesson.teacher?.middleName} (
                                {lesson.teacher?.email || 'Нет email'})
                            </p>
                            <p className={styles.lessonsPageGroups}>
                                Группы: {lesson.groups?.map((group) => group.name).join(', ') || 'Не указаны'}
                            </p>
                            {user.isTeacher() && (
                                <div className={styles.lessonsPageBtnWrapper}>
                                    <Link to={`/lesson/${lesson.id}`} className={styles.lessonsPageLink}>
                                        Подробнее
                                    </Link>
                                    <div className={styles.lessonsPageActionBtns}>
                                        <button onClick={() => handeDeleteLesson(lesson.id)} className={styles.lessonsPageActionBtns_delete}>Удалить</button>
                                        <button onClick={() => setEditingLesson(lesson)} className={styles.lessonsPageActionBtns_update}>Редактировать</button>
                                    </div>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            ) : (
                <p className={styles.lessonsPageNoLessons}>Нет доступных занятий</p>
            )}

            {isCreateModalOpen && (
                <LessonCreateModal onClose={() => setIsCreateModalOpen(false)} create={createLessons} />
            )}

            {editingLesson && (
                <LessonEditModal lesson={editingLesson} onClose={() => setEditingLesson(null)} onSave={handleSaveLesson} />
            )}
        </div>
    );
};

export default LessonsPage;
