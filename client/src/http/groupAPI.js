import {$host} from "@/http/index";

export const fetchGroups = async () => {
    const {data} = await $host.get('api/group');
    console.log(data)
    return data.map(({ id, name }) => ({ id, name }));

}