import {StatusBar} from 'expo-status-bar';
import useCachedResources from './app/hooks/useCachedResources';
import * as React from 'react';
import Navigation from './app/navigation';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {store} from './app/services/redux/store';
import {Provider} from 'react-redux';


export default function App() {
    const isLoadingComplete = useCachedResources();

    if (!isLoadingComplete) {
        return null;
    } else {
        return (
            <Provider store={store}>
                <SafeAreaProvider>
                    <Navigation/>
                    <StatusBar/>
                </SafeAreaProvider>
            </Provider>
        );
    }
}

