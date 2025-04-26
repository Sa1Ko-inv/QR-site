import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import {$authHost, $host} from '@/http';
import {attendanceMark} from "@/http/attendanceAPI.js"; // Предполагается, что есть настроенный axios instance

const AttendanceMarkPage = () => {
    const { lessonId } = useParams();
    const [attendanceCode, setAttendanceCode] = useState('');
    const [message, setMessage] = useState('');
    const [success, setSuccess] = useState(false);

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     try {
    //         const response = await $authHost.post('/api/attendance/mark', {
    //             lessonId,
    //             attendanceCode,
    //         });
    //         setMessage(response.data.message || 'Посещаемость успешно отмечена!');
    //         setSuccess(true);
    //     } catch (error) {
    //         setMessage(error.response?.data?.message || 'Ошибка при отметке посещаемости.');
    //         setSuccess(false);
    //     }
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await attendanceMark(lessonId, attendanceCode);
            setMessage(response.data.message || 'Посещаемость успешно отмечена!');
            setSuccess(true);
        } catch (error) {
            console.error('Ошибка при посещаемости');
        }
    };

    return (
        <div>
            <h1>Отметка посещаемости</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="attendanceCode">Код посещаемости:</label>
                <input
                    type="text"
                    id="attendanceCode"
                    value={attendanceCode}
                    onChange={(e) => setAttendanceCode(e.target.value)}
                    required
                />
                <button type="submit">Отметиться</button>
            </form>
            {message && (
                <p style={{ color: success ? 'green' : 'red' }}>{message}</p>
            )}
        </div>
    );
};

export default AttendanceMarkPage;