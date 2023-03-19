import {setAuthTokens, clearAuthTokens} from 'react-native-axios-jwt';
import { axiosInstance } from './api';
import {ILoginRequest} from '../../types/ILoginRequest';


export const login = async (params: ILoginRequest) => {

    try {
        const response = await axiosInstance.post('/token/', params);

        await setAuthTokens({
            accessToken: response.data.access,
            refreshToken: response.data.refresh
        });

        return response;

    }
    catch (e) {
        console.log('Error logging in.');
        console.log(e.response.data);
    }
};

// 5. Log out by clearing the auth tokens from AsyncStorage
const logout = () => clearAuthTokens();


