import {StatusBar} from 'expo-status-bar';
import useCachedResources from './app/hooks/useCachedResources';
import * as React from 'react';
import Navigation from './app/navigation';
import {SafeAreaProvider} from 'react-native-safe-area-context';

export default function App() {
    const isLoadingComplete = useCachedResources();


    if (!isLoadingComplete) {
        return null;
    } else {
        return (
            <>
                <SafeAreaProvider>
                    <Navigation/>
                    <StatusBar/>
                </SafeAreaProvider>
            </>
        );
    }
}

