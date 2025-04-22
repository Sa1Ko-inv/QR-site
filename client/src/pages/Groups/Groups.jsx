import React, {useEffect, useState} from 'react';
import {createGroup, deleteGroup, fetchGroups, updateGroup} from "@/http/groupAPI";
import {useNavigate} from "react-router-dom";
import { GROUP_ROUTE } from '@/utils/consts';
import * as styles from './Groups.module.scss';

const Groups = () => {
    const [groups, setGroups] = useState([]);
    const [editingGroupId, setEditingGroupId] = useState(null);
    const [newGroupName, setNewGroupName] = useState('');
    const [newGroup, setNewGroup] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const getGroups = async () => {
            try {
                const data = await fetchGroups();
                setGroups(data);
            } catch (error) {
                console.error("Ошибка при получении групп:", error);
                setGroups([]);
            }
        };
        getGroups();
    }, []);

    const handleDelete = async (groupId) => {
        try {
            await deleteGroup(groupId);
            setGroups(groups.filter(group => group.id !== groupId));
        } catch (error) {
            console.error('Ошибка при удалении группы:', error);
        }
    };

    const handleEdit = (groupId, groupName) => {
        setEditingGroupId(groupId);
        setNewGroupName(groupName);
    };

    const handleUpdate = async (groupId) => {
        try {
            await updateGroup(groupId, newGroupName);
            setGroups(groups.map(group => group.id === groupId ? { ...group, name: newGroupName } : group));
            setEditingGroupId(null);
            setNewGroupName('');
        } catch (error) {
            console.error('Ошибка при обновлении группы:', error);
        }
    };

    const handleGroupClick = (groupId) => {
        navigate(`${GROUP_ROUTE}/${groupId}`);
    };

    const handleCreate = async () => {
        try {
            const newGroupData = await createGroup(newGroup);
            setGroups([...groups, newGroupData]);
            setNewGroup('');
        } catch (error) {
            console.error('Ошибка при создании группы:', error);
        }
    };

    return (
        <div className={styles.groupsContainer}>
            <h1>Все группы</h1>
            <div className={styles.createGroupForm}>
                <input
                    type="text"
                    value={newGroup}
                    onChange={(e) => setNewGroup(e.target.value)}
                    placeholder="Название новой группы"
                />
                <button onClick={handleCreate}>Создать группу</button>
            </div>
            <ul className={styles.groupsList}>
                {groups.map(group => (
                    <li key={group.id}>
                        {editingGroupId === group.id ? (
                            <input
                                type="text"
                                value={newGroupName}
                                onChange={(e) => setNewGroupName(e.target.value)}
                            />
                        ) : (
                            <span onClick={() => handleGroupClick(group.id)}>{group.name}</span>
                        )}
                        <div className={styles.actionButtons}>
                            {editingGroupId === group.id ? (
                                <button
                                    className={styles.saveButton}
                                    onClick={() => handleUpdate(group.id)}
                                >
                                    Сохранить
                                </button>
                            ) : (
                                <button
                                    className={styles.editButton}
                                    onClick={() => handleEdit(group.id, group.name)}
                                >
                                    Редактировать
                                </button>
                            )}
                            <button
                                className={styles.deleteButton}
                                onClick={() => handleDelete(group.id)}
                            >
                                Удалить
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Groups;