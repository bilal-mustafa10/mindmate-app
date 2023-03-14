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
                    /*          'nunito-bold': require("../app/assets/fonts/Nunito/Nunito-Bold.ttf"),
                    'nunito-light': require("../app/assets/fonts/Nunito/Nunito-Light.ttf"),
                    'nunito-medium': require("../app/assets/fonts/Nunito/Nunito-Medium.ttf"),
                    'nunito-semibold': require("../app/assets/fonts/Nunito/Nunito-SemiBold.ttf"),
                    'anekodia-bold':  require("../app/assets/fonts/AnekOdia/AnekOdia-Bold.ttf"),
                    'anekodia-regular':  require("../app/assets/fonts/AnekOdia/AnekOdia-Regular.ttf"),
                    'anekodia-medium':  require("../app/assets/fonts/AnekOdia/AnekOdia-Medium.ttf"),
                    'anekodia-semibold':  require("../app/assets/fonts/AnekOdia/AnekOdia-SemiBold.ttf"),
                    'andika-regular':  require("../app/assets/fonts/Andika/Andika-Regular.ttf"),*/
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
