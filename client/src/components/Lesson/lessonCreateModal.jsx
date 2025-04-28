import React, {useContext, useEffect, useState} from 'react';
import * as styles from './LessonCreateModal.module.scss';
import {Context} from "@/main.jsx";
import {createLesson} from "@/http/lessonAPI.js";
import {InputMask} from "@react-input/mask";
import {fetchGroups} from "@/http/groupAPI.js";

const LessonCreateModal = ({create, onClose}) => {
    const {user} = useContext(Context);
    const [groups, setGroups] = useState([]);
    const [newLesson, setNewLesson] = useState({
        title: "",
        type: "LECTURE",
        date: "",
        startTime: "",
        endTime: "",
        teacherId: user.user.id,
        groupIds: []
    });

    const types = [
        { value: "LECTURE", label: "лекция" },
        { value: "LABORATORY", label: "лабораторная" },
        { value: "PRACTICE", label: "практика" }
    ];

    const handleChange = (e) => {
        setNewLesson({ ...newLesson, [e.target.name]: e.target.value });
    };

    const handleGroupChange = (e) => {
        const selectedOptions = Array.from(e.target.selectedOptions)
            .map(option => Number(option.value)); // Преобразуем в числа
        setNewLesson({ ...newLesson, groupIds: selectedOptions });
    };

    const handleCreate = async () => {
        try {
            const createdLesson = await createLesson(newLesson);
            create(createdLesson);
            onClose()
        } catch (error) {
            console.error('Ошибка при создании занятия', error);
        }
    }

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

    const PeredDan = () => {
        console.log(newLesson);
    }

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modal}>
                <h2>Создание занятия</h2>
                <p>Название занятия</p>
                <input type="text" name="title" value={newLesson.title} onChange={handleChange}
                       placeholder="Введите название занятия" required/>

                <p>Тип занятия</p>
                <select name="type" value={newLesson.type} onChange={handleChange}>
                    {types.map((type) => (
                        <option key={type.value} value={type.value}>
                            {type.label}
                        </option>
                    ))}
                </select>

                <p>Дата проведения</p>
                <InputMask mask="##/##/####" replacement="#" type="text" name="date" value={newLesson.date} onChange={handleChange}
                           placeholder="Введите дату"/>
                <p>Время начала</p>
                <InputMask mask="##:##" replacement='#' type="text" name="startTime" value={newLesson.startTime} onChange={handleChange}
                           placeholder="Введите время начала"/>
                <p>Время окончания</p>
                <InputMask mask="##:##" replacement='#' type="text" name="endTime" value={newLesson.endTime} onChange={handleChange}
                           placeholder="Введите время окончания"/>

                <p>Группы</p>
                <select
                    name="groupIds"
                    multiple
                    value={newLesson.groupIds}
                    onChange={handleGroupChange}
                >
                    {groups.map((group) => (
                        <option key={group.id} value={group.id}>{group.name}</option>
                    ))}
                </select>
                <small>Для выбора нескольких групп удерживайте Ctrl (Windows) или Command (Mac)</small>

                <div className={styles.buttons}>
                    <button onClick={handleCreate}>Создать</button>
                    <button onClick={onClose}>Отмена</button>
                </div>
            </div>
        </div>
    );
};

export default LessonCreateModal;