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

/*
export const addActivityFeedback = async (activity_id: number, has_benefit: boolean, comments: string) => {
    const config = {
        timeout: 7000,
    };
    try {
        const response = await axiosInstance.post(
            '/activity/feedback/',
            {
                activity_id: activity_id,
                has_benefit: has_benefit,
                comments: comments,
            },
            config
        );
        return response.data;
    } catch (e) {
        return null;
    }
};
*/
