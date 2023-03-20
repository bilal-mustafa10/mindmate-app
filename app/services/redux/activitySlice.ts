import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface ActivitySlice {
    results?: (ActivityResults)[] | null;
}
export interface ActivityResults {
    id: number;
    title: string;
    description: string;
    five_way_tag: string;
    tags: string;
    logo: Photo;
    photo: Photo;
}
export interface Photo {
    id: number;
    title: string;
    file: string;
    width: number;
    height: number;
}



const initialState: ActivitySlice = {
    results: []
};

export const activitySlice = createSlice({
    name:'activity',
    initialState,
    reducers: {
        setActivity: (state, action: PayloadAction<ActivitySlice>) => {
            state.results = action.payload.results;
        }
    }
});

export const { setActivity } = activitySlice.actions;

