import { applyAuthTokenInterceptor, AuthTokens, TokenRefreshRequest } from 'react-native-axios-jwt';
import axios from 'axios';
import { logout } from './authEndpoints';

const BASE_URL = 'https://b108-2a00-23ee-13e0-2dd5-8dc9-2106-9e07-a366.eu.ngrok.io/api';
export const axiosInstance = axios.create({ baseURL: BASE_URL });

const requestRefresh: TokenRefreshRequest = async (refreshToken: string): Promise<AuthTokens | string> => {
    // Important! Do NOT use the axios instance that you supplied to applyAuthTokenInterceptor
    // because this will result in an infinite loop when trying to refresh the token.
    // Use the global axios client or a different instance
    try {
        const response = await axios.post(`${BASE_URL}/token/refresh/`, {
            refresh: refreshToken,
        });
        // If your backend supports rotating refresh tokens, you may also choose to return an object containing both tokens:
        if (response.data.refresh) {
            return {
                accessToken: response.data.access,
                refreshToken: response.data.refresh,
            };
        } else {
            return {
                accessToken: response.data.access,
                refreshToken: refreshToken,
            };
        }
    } catch (e) {
        await logout();
        console.log('Error getting a new token.');
    }
};

// 3. Add interceptor to your axios instance
applyAuthTokenInterceptor(axiosInstance, { requestRefresh });
