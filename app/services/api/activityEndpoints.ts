import { axiosInstance } from './api';
import { ActivitySlice } from '../redux/activitySlice';

export const getActivities = async () => {
    const config = {
        timeout: 7000,
    };
    try {
        const response = await axiosInstance.get<ActivitySlice>('/activity/', config);
        return response.data;
    } catch (e) {
        return null;
    }
};
