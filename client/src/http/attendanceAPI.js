import {$authHost, $host} from '@/http/index';

export const attendanceMark = async (lessonId, attendanceCode) => {
    console.log(lessonId, attendanceCode);
     const response = await $authHost.post('api/attendance/mark', {
        lessonId,
        attendanceCode,
    })
    return response;
}