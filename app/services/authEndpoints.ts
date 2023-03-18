import {setAuthTokens, clearAuthTokens} from 'react-native-axios-jwt';
import { axiosInstance } from './api';
import {ILoginRequest} from '../types/ILoginRequest';

export const login = async (params: ILoginRequest) => {
    const response = await axiosInstance.post('/auth/login', params);

    // save tokens to storage
    await setAuthTokens({
        accessToken: response.data.access_token,
        refreshToken: response.data.refresh_token
    });
};

// 5. Log out by clearing the auth tokens from AsyncStorage
const logout = () => clearAuthTokens();


