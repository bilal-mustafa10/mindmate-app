import {axiosInstance} from './api';
import {IResourcesRequest} from '../redux/resourcesSlice';

export const getMentalHealthResources = async () => {
    const config = {
        timeout: 7000,
    };
    try {
        const response = await axiosInstance.get<IResourcesRequest>('/resources/', config);
        return response.data;
    } catch (e) {
        return null;
    }
};
