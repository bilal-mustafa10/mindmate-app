import {StatusBar} from 'expo-status-bar';
import useCachedResources from './app/hooks/useCachedResources';
import * as React from 'react';
import Navigation from './app/navigation';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {persistor, store} from './app/services/redux/store';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';


export default function App() {
    const isLoadingComplete = useCachedResources();

    if (!isLoadingComplete) {
        return null;
    } else {
        return (
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <SafeAreaProvider>
                        <Navigation/>
                        <StatusBar/>
                    </SafeAreaProvider>
                </PersistGate>
            </Provider>
        );
    }
}

