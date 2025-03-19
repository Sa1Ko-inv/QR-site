import {$authHost, $host} from '@/http/index';

export const fetchGroups = async () => {
    const { data } = await $host.get('api/group');
    return data.map(({ id, name }) => ({ id, name }));
};

export const deleteGroup = async (groupId) => {
    await $authHost.delete(`api/group/${groupId}`);
};

export const updateGroup = async (groupId, newName) => {
    await $authHost.put(`api/group/${groupId}`, { name: newName });
};

export const fetchGroupUsers = async (groupId) => {
    const { data } = await $authHost.get(`api/group/${groupId}/users`);
    if (data && Array.isArray(data.users)) {
        return data.users.map(({ id, fio }) => ({ id, name: fio }));
    } else {
        throw new Error('Unexpected response format');
    }
};

export const createGroup = async (name) => {
    const { data } = await $authHost.post('api/group', { name });
    return { id: data.id, name: data.name };
};