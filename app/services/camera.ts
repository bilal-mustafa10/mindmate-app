import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { Photo } from './redux/activitySlice';

export const openCamera = async () => {
    const result = await launchCamera({ mediaType: 'photo' });

    if (result.didCancel) {
        return null;
    }

    const response: Photo = {
        title: result.assets[0].fileName,
        file: result.assets[0].uri,
        width: result.assets[0].width,
        height: result.assets[0].height,
    };

    return response;
};

// Photo Library
export const openImageLibrary = async () => {
    const result = await launchImageLibrary({ mediaType: 'photo' });

    if (result.didCancel) {
        return null;
    }

    const response: Photo = {
        title: result.assets[0].fileName,
        file: result.assets[0].uri,
        width: result.assets[0].width,
        height: result.assets[0].height,
    };

    return response;
};
