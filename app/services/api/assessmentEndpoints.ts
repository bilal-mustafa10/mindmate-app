import { axiosInstance } from './api';
import { AssessmentSlice } from '../redux/assessmentSlice';

export const getAssessments = async () => {
    const config = {
        timeout: 10000,
    };

    try {
        const response = await axiosInstance.get<AssessmentSlice>(`/assessments/`, config);
        return response.data;
    } catch (e) {
        console.log(e);
        return null;
    }
};
