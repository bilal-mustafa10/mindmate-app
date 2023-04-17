import { axiosInstance } from './api';
import { Platform } from 'react-native';
import { IHubData } from '../interface/IHubData';

export const addPhoto = async (uri: string, name: string) => {
    const config = {
        timeout: 10000,
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    };

    const fileType = name.split('.').pop();
    const mimeType = `image/${fileType}`;

    const formData = new FormData();
    formData.append('title', name);
    formData.append('file', {
        uri: Platform.OS === 'ios' ? uri.replace('file://', '') : uri,
        name: name,
        type: mimeType,
    });

    try {
        const response = await axiosInstance.post('/images/', formData, config);
        console.log('response: ', response);
        return response.data.id;
    } catch (e) {
        console.log(e.response);
        return null;
    }
};

export const addToHub = async (
    user_id: number,
    type: string,
    date: string,
    activity_id: number | null,
    mood: string | null,
    notes: string | null,
    title: string | null,
    photos: number[] | null
) => {
    const config = {
        timeout: 10000,
    };

    const data = {
        user: user_id,
        type: type,
        datetime: date,
        activity_id: activity_id,
        photos: photos,
        mood: mood,
        notes: notes,
        title: title,
    };

    if (photos === null) {
        delete data.photos;
    }

    try {
        const response = await axiosInstance.post('/hub/', data, config);
        return response.data.id;
    } catch (e) {
        console.log(e.response.data);
        return null;
    }
};

export const removeFromHub = async (id: number) => {
    const config = {
        timeout: 10000,
    };

    try {
        return await axiosInstance.delete(`/hub/${id}/`, config);
    } catch (e) {
        console.log(e);
        return null;
    }
};

export const getHub = async () => {
    const config = {
        timeout: 10000,
    };

    try {
        const response = await axiosInstance.get<IHubData>(`/hub/`, config);
        return response.data;
    } catch (e) {
        console.log(e);
        return null;
    }
};

export const updateLikes = async (id: number, like: number[]) => {
    const config = {
        timeout: 10000,
    };

    try {
        const response = await axiosInstance.patch(`/hub/${id}/`, { likes: like }, config);
        return response.data.likes;
    } catch (e) {
        console.log(e);
        return null;
    }
};

export const getHubDataById = async (id: number) => {
    const config = {
        timeout: 10000,
    };

    try {
        const response = await axiosInstance.get(`/hub/${id}/`, config);
        return response.data;
    } catch (e) {
        console.log(e);
        return null;
    }
};
