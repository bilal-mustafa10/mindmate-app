import {StatusBar} from 'expo-status-bar';
import useCachedResources from './app/hooks/useCachedResources';
import * as React from 'react';
import Navigation from './app/navigation';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {isLoggedIn} from 'react-native-axios-jwt';

export default function App() {
    const isLoadingComplete = useCachedResources();
    const [loggedIn, setLoggedIn] = React.useState(false);


    React.useEffect(() => {
        isLoggedIn().then(async res => {
            if (res) {
                console.log('Logged in');
                setLoggedIn(true);
            } else {
                console.log('Not logged in');
                setLoggedIn(false);
            }
        });
    }, []);



    if (!isLoadingComplete) {
        return null;
    } else {
        return (
            <>
                <SafeAreaProvider>
                    <Navigation loggedIn={loggedIn} />
                    <StatusBar/>
                </SafeAreaProvider>
            </>
        );
    }
}

