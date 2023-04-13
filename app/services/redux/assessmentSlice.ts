import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AssessmentSlice {
    results?: AssessmentData[] | null;
}
export interface AssessmentData {
    id: number;
    title: string;
    content: string;
    logo: Photo;
}

interface Photo {
    id?: number;
    title: string;
    file: string;
    width: number;
    height: number;
}

const initialState: AssessmentSlice = {
    results: [],
};

export const assessmentSlice = createSlice({
    name: 'assessment',
    initialState,
    reducers: {
        setAssessments: (state, action: PayloadAction<AssessmentSlice>) => {
            state.results = action.payload.results;
        },
    },
});

export const { setAssessments } = assessmentSlice.actions;
