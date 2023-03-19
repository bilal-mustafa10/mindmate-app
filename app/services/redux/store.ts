import {combineReducers} from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import {authSlice} from './authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {configureStore} from '@reduxjs/toolkit';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage
};


const rootReducer = combineReducers({
    auth: authSlice.reducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);


export type RootState = ReturnType<typeof rootReducer>;


export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware => getDefaultMiddleware({serializableCheck: false}))
});
export const persistor = persistStore(store);
