import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface AuthSlice {
    userId: number;
    accessToken: string;
    refreshToken: string;
    shortcuts?: number[];
}


const initialState: AuthSlice = {
    userId: 0,
    accessToken: '',
    refreshToken: '',
    shortcuts: []
};

export const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers: {
        setLogin: (state, action: PayloadAction<AuthSlice>) => {
            state.userId = action.payload.userId;
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
        },
        setLogout: (state) => {
            state.userId = null;
            state.accessToken = null;
            state.refreshToken = null;
        },
        setShortcuts: (state, action: PayloadAction<number[]>) => {
            state.shortcuts = action.payload;
        }
        /*setApplications: (state, action) => {
            state.applications = action.payload.applications;
        },
        setApplication: (state, action) => {
            state.applications = state.applications.map((application) => {
                if (application._id === action.payload.application_id) return action.payload.application;
                return application;
            });
        }*/
    }
});

export const { setLogin, setLogout, setShortcuts } = authSlice.actions;

