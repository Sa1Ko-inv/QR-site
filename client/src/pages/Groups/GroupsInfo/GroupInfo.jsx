import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchGroupUsers, fetchGroups } from "@/http/groupAPI";
import { GROUPS_ROUTE } from '@/utils/consts';
import * as styles from './GroupInfo.module.scss';

const GroupInfo = () => {
    const { id } = useParams();
    const [groupUsers, setGroupUsers] = useState([]);
    const [groupName, setGroupName] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const loadGroupData = async () => {
            try {
                setLoading(true);
                console.log('Загрузка данных для группы с ID:', id);

                const usersData = await fetchGroupUsers(id);
                console.log('Получены данные пользователей:', usersData);
                setGroupUsers(usersData);

                const groupsData = await fetchGroups();
                console.log('Получены данные групп:', groupsData);
                const currentGroup = groupsData.find(group => group.id === parseInt(id) || group.id === id);
                console.log('Найдена текущая группа:', currentGroup);

                if (currentGroup) {
                    setGroupName(currentGroup.name);
                } else {
                    setGroupName(`Группа #${id}`);
                }

                setError(null);
            } catch (err) {
                console.error('Ошибка при загрузке данных группы:', err);
                console.error('Детали ошибки:', err.response?.data || 'Нет дополнительных данных');
                setError(`Не удалось загрузить информацию о группе: ${err.message}`);
                setGroupUsers([]);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            loadGroupData();
        } else {
            console.error('ID группы не определен');
            setError('ID группы не определен');
            setLoading(false);
        }
    }, [id]);

    const handleBackClick = () => {
        navigate(GROUPS_ROUTE);
    };

    if (loading) {
        return <div className={styles.groupInfoContainer}>
            <div className={styles.loadingState}>Загрузка информации о группе (ID: {id})...</div>
        </div>;
    }

    if (error) {
        return (
            <div className={styles.groupInfoContainer}>
                <div className={styles.errorMessage}>{error}</div>
                <button onClick={handleBackClick} className={styles.backButton}>← Вернуться к списку групп</button>
            </div>
        );
    }

    return (
        <div className={styles.groupInfoContainer}>
            <button onClick={handleBackClick} className={styles.backButton}>← Назад к списку групп</button>

            <h1>{groupName}</h1>

            <div className={styles.groupStudentsSection}>
                <h2>Студенты группы</h2>

                {groupUsers.length === 0 ? (
                    <p>В этой группе пока нет студентов</p>
                ) : (
                    <ul className={styles.studentsList}>
                        {groupUsers.map(user => (
                            <li key={user.id} className={styles.studentItem}>
                                <span className={styles.studentName}>{user.lastName} {user.firstName} {user.middleName}</span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default GroupInfo;