import { useEffect } from 'react';
import { View, ScrollView } from 'react-native';
import FastImage from 'react-native-fast-image';
import { height, styles as globalStyles, theme } from '../constants/Theme';
import { Button } from '../components/Button';
import { RootStackScreenProps } from '../navigation/types';
import { isLoggedIn } from 'react-native-axios-jwt';
import { getActivities } from '../services/api/activityEndpoints';
import { useDispatch } from 'react-redux';
import { setActivity } from '../services/redux/activitySlice';
import { getMentalHealthResources } from '../services/api/resourcesEndpoints';
import { setResources } from '../services/redux/resourcesSlice';
import WelcomeText from '../components/WelcomeText';

export default function LandingScreen({ navigation }: RootStackScreenProps<'LandingPage'>) {
    const dispatch = useDispatch();

    useEffect(() => {
        async function fetchData() {
            const loggedIn = await isLoggedIn();

            if (!loggedIn) {
                console.log('not logged in');
                return;
            }

            console.log('logged in');
            const [activities, resources] = await Promise.all([
                getActivities(),
                getMentalHealthResources(),
            ]);

            dispatch(setActivity(activities));
            dispatch(setResources(resources));
            navigation.navigate('Root');
        }

        fetchData().then(()=>{console.log('completed');});
    }, []);

    return (
        <ScrollView contentContainerStyle={[globalStyles.container, { paddingHorizontal: 0 }]}>
            <View style={[globalStyles.content, globalStyles.secondaryBackground, { height: height * 0.60 }]}>
                <FastImage source={require('../assets/images/logo.png')} style={globalStyles.logo} />
            </View>
            <View style={[globalStyles.content, { flex: 1, justifyContent: 'space-between' }]}>
                <WelcomeText
                    titleStyle={{ ...theme.typography.headingBold, textAlign: 'center', marginVertical: '5%' }}
                    title="Welcome to MindMate"
                    descriptionStyle={{ ...theme.typography.subtitle, textAlign: 'center' }}
                    description="Take control of your mental health, anytime, anywhere"
                />
                <View
                    style={{
                        width: '100%',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginBottom: '15%',
                    }}
                >
                    <Button onPress={() => navigation.navigate('SignIn')} color={'secondary'} type={'large'}>
                        Sign in
                    </Button>
                </View>
            </View>
        </ScrollView>
    );
}
