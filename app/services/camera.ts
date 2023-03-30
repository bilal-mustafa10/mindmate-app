import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

export const openCamera = async () => {
    const result = await launchCamera({mediaType: 'photo'});

    if (result.didCancel){
        return;
    }

    return result.assets[0].uri;
};

// Photo Library
export const openImageLibrary = async () => {
    const result = await launchImageLibrary({mediaType: 'photo'});

    if (result.didCancel){
        return;
    }

    console.log('result: ',result.assets[0].uri);
    return result.assets[0].uri;
};

export const _deleteImage = async () => {
    return null;
};
