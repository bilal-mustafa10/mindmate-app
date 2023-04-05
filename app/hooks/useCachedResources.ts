import {FontAwesome} from '@expo/vector-icons';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import * as React from 'react';

export default function useCachedResources() {
    const [isLoadingComplete, setLoadingComplete] = React.useState(false);

    // Load any stickers or data that we need prior to rendering the app
    React.useEffect(() => {
        async function loadResourcesAndDataAsync() {
            try {
                await SplashScreen.preventAutoHideAsync();

                // Load fonts
                await Font.loadAsync({
                    ...FontAwesome.font,
                    /*                    'outfit-black': require('../assets/fonts/Outfit/static/Outfit-Black.ttf'),
                    'outfit-extabold': require('../assets/fonts/Outfit/static/Outfit-ExtraBold.ttf'),
                    'outfit-bold': require('../assets/fonts/Outfit/static/Outfit-Bold.ttf'),
                    'outfit-semibold': require('../assets/fonts/Outfit/static/Outfit-SemiBold.ttf'),
                    'outfit-medium': require('../assets/fonts/Outfit/static/Outfit-Medium.ttf'),
                    'outfit-regular': require('../assets/fonts/Outfit/static/Outfit-Regular.ttf'),
                    'outfit-light': require('../assets/fonts/Outfit/static/Outfit-Light.ttf'),
                    'outfit-thin': require('../assets/fonts/Outfit/static/Outfit-Thin.ttf'),*/
                    'nunito-regular': require('../assets/fonts/Nunito/Nunito-Regular.ttf'),
                    'nunito-medium': require('../assets/fonts/Nunito/Nunito-Medium.ttf'),
                    'nunito-semibold': require('../assets/fonts/Nunito/Nunito-SemiBold.ttf'),
                    'nunito-bold': require('../assets/fonts/Nunito/Nunito-Bold.ttf'),
                });
            } catch (e) {
                // We might want to provide this error information to an error reporting service
                console.warn(e);
            } finally {
                setLoadingComplete(true);
                await SplashScreen.hideAsync();
            }
        }

        loadResourcesAndDataAsync();
    }, []);

    return isLoadingComplete;
}
