import { useEffect } from 'react';
import { ScrollView, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { styles } from '../constants/Theme';
import { Button } from '../components/Button';
import { RootStackScreenProps } from '../navigation/types';
import { isLoggedIn } from 'react-native-axios-jwt';
import { getActivities } from '../services/api/activityEndpoints';
import { useDispatch } from 'react-redux';
import { setActivity } from '../services/redux/activitySlice';
import { getMentalHealthResources } from '../services/api/resourcesEndpoints';
import { setResources } from '../services/redux/resourcesSlice';
import WelcomeText from '../components/WelcomeText';
import { getAssessments } from '../services/api/assessmentEndpoints';
import { setAssessments } from '../services/redux/assessmentSlice';
import { RealmContext } from '../services/realm/config';

export default function LandingScreen({ navigation }: RootStackScreenProps<'LandingPage'>) {
    const dispatch = useDispatch();
    const user = RealmContext.useQuery('UserData');

    useEffect(() => {
        async function fetchData() {
            const loggedIn = await isLoggedIn();

            if (!loggedIn) {
                console.log('not logged in');
                if (user) {
                    navigation.navigate('SignIn');
                }
                return;
            }

            const [activities, resources, assessments] = await Promise.all([
                getActivities(),
                getMentalHealthResources(),
                getAssessments(),
            ]);

            dispatch(setActivity(activities));
            dispatch(setResources(resources));
            dispatch(setAssessments(assessments));
            navigation.navigate('SignIn');
        }

        fetchData().then(() => {
            console.log('completed');
        });
    }, [dispatch, navigation]);

    return (
        <ScrollView contentContainerStyle={styles.mainContainer}>
            <View style={styles.landingLogoContainer}>
                <FastImage source={require('../assets/images/logo.png')} style={styles.logo} />
            </View>
            <View style={styles.landingBottomContainer}>
                <WelcomeText
                    title="Welcome to MindMate"
                    description="Take control of your mental health, anytime, anywhere"
                />
                <Button onPress={() => navigation.navigate('SignIn')} color={'secondary'} type={'large'}>
                    Sign in
                </Button>
            </View>
        </ScrollView>
    );
}
