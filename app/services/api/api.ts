import {applyAuthTokenInterceptor, AuthTokens, TokenRefreshRequest,} from 'react-native-axios-jwt';
import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000/api';
export const axiosInstance = axios.create({baseURL: BASE_URL});

const requestRefresh: TokenRefreshRequest = async (
    refreshToken: string,
): Promise<AuthTokens | string> => {
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
                refreshToken: response.data.refresh
            };
        } else {
            return {
                accessToken: response.data.access,
                refreshToken: refreshToken
            };
        }
    } catch (e) {
        console.log('Error getting a new token.');
    }

};

// 3. Add interceptor to your axios instance
applyAuthTokenInterceptor(axiosInstance, {requestRefresh});
