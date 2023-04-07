import { axiosInstance } from './api';
import { IResourcesRequest } from '../redux/resourcesSlice';

export const getMentalHealthResources = async () => {
    const config = {
        timeout: 30000,
    };
    try {
        const response = await axiosInstance.get<IResourcesRequest>('/resources/', config);
        return response.data;
    } catch (e) {
        console.log(e);
        return null;
    }
};
