import { axiosInstance } from './api';
import { Platform } from 'react-native';

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
        return response.data.id;
    } catch (e) {
        console.log(e.response);
        return null;
    }
};

export const addToHub = async (
    user_id: number,
    date: string,
    activity_id: number | null,
    mood: string | null,
    notes: string | null,
    title: string | null,
    photos: string[]
) => {
    const config = {
        timeout: 10000,
    };

    const data = {
        user: user_id,
        datetime: date,
        activity_id: activity_id,
        mood: mood,
        notes: notes,
        title: title,
        photos: photos,
    };

    try {
        const response = await axiosInstance.post('/hub/', data, config);
        return response.data.id;
    } catch (e) {
        console.log(e);
        return null;
    }
};

export const removeFromHub = async (id: number) => {
    const config = {
        timeout: 10000,
    };

    try {
        await axiosInstance.delete(`/hub/${id}/`, config);
    } catch (e) {
        console.log(e);
        return null;
    }
};
