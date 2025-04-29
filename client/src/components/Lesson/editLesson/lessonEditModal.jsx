import React, {useEffect, useState} from 'react';
import * as styles from './lessonEditModal.module.scss';
import {InputMask} from "@react-input/mask";
import {fetchGroups} from "@/http/groupAPI.js";

const LessonEditModal = ({lesson, onClose, onSave}) => {
    const [formData, setFormData] = useState({
        ...lesson,
        groups: lesson.groups?.map(group => group.id) || [], // Оставляем только ID
    });
    const [groups, setGroups] = useState([]);

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    console.log('Полученные данные для редактирования', formData)

    const handleSubmit = () => {
        onSave(formData);
        console.log('Отправляемые данные:', {
            ...formData,
            groups: formData.groups,
        });
    };

    const handleGroupChange = (e) => {
        const selectedGroupIds = Array.from(e.target.selectedOptions)
            .map(option => Number(option.value)); // Получаем только ID
        setFormData({...formData, groups: selectedGroupIds});
    };

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

    const types = [
        { value: "LECTURE", label: "лекция" },
        { value: "LABORATORY", label: "лабораторная" },
        { value: "PRACTICE", label: "практика" }
    ];

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modal}>
                <h2>Редактирование занятия</h2>
                <p>Название занятия</p>
                <input type="text" name="title" value={formData.title} onChange={handleChange}
                       placeholder="Введите название занятия" required/>

                <p>Тип занятия</p>
                <select name="type" value={formData.type} onChange={handleChange}>
                    {types.map((type) => (
                        <option key={type.value} value={type.value}>
                            {type.label}
                        </option>
                    ))}
                </select>

                <p>Дата проведения</p>
                <InputMask mask="##/##/####" replacement="#" type="text" name="date" value={formData.date} onChange={handleChange}
                           placeholder="Введите дату"/>
                <p>Время начала</p>
                <InputMask mask="##:##" replacement='#' type="text" name="startTime" value={formData.startTime} onChange={handleChange}
                           placeholder="Введите время начала"/>
                <p>Время окончания</p>
                <InputMask mask="##:##" replacement='#' type="text" name="endTime" value={formData.endTime} onChange={handleChange}
                           placeholder="Введите время окончания"/>

                <p>Группы</p>
                <select
                    name="groups"
                    multiple
                    value={formData.groups}
                    onChange={handleGroupChange}
                >
                    {groups.map((group) => (
                        <option key={group.id} value={group.id}>{group.name}</option>
                    ))}
                </select>
                <small>Для выбора нескольких групп удерживайте Ctrl (Windows) или Command (Mac)</small>

                <div className={styles.buttons}>
                    <button onClick={handleSubmit}>Редактировать</button>
                    <button onClick={onClose}>Отмена</button>
                </div>
            </div>
        </div>
    );
};

export default LessonEditModal;