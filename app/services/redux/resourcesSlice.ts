import {createSlice, PayloadAction} from '@reduxjs/toolkit';


export interface IResourcesRequest {
    results: ResourcesResult[] | null;
}

export interface ResourcesResult {
    id: number
    title: string
    content: string
    logo: Photo;
}


export interface Photo {
    id: number;
    title: string;
    file: string;
    width: number;
    height: number;
}



const initialState: IResourcesRequest = {
    results: []
};

export const resourcesSlice = createSlice({
    name:'resources',
    initialState,
    reducers: {
        setResources: (state, action: PayloadAction<IResourcesRequest>) => {
            state.results = action.payload.results;
        }
    }
});

export const { setResources } = resourcesSlice.actions;

