import {useEffect} from 'react';
import {View, Text, ScrollView} from 'react-native';
import FastImage from 'react-native-fast-image';
import {height, styles, theme} from '../constants/Theme';
import {Button} from '../components/Button';
import {RootStackScreenProps} from '../navigation/types';
import {isLoggedIn} from 'react-native-axios-jwt';
import {getActivities} from '../services/api/activityEndpoints';
import {useDispatch} from 'react-redux';
import {setActivity} from '../services/redux/activitySlice';


export default function LandingScreen({ navigation }: RootStackScreenProps<'LandingPage'>) {
    const dispatch = useDispatch();

    useEffect(() => {
        isLoggedIn().then(async res => {
            if (!res) {
                console.log('not logged in');
            } else {
                console.log('logged in');
                const activities = await getActivities();
                dispatch(setActivity(activities));
                navigation.navigate('Root');
            }
        });
    }, []);

    return (
        <ScrollView contentContainerStyle={[styles.container, {paddingHorizontal: 0}]}>
            <View style={[styles.content, styles.secondaryBackground, { height: height * 0.67 }]}>
                <FastImage source={require('../assets/images/logo.png')} style={styles.logo} />
            </View>
            <View style={[styles.content, { flex: 1, justifyContent: 'space-between' }]}>
                <View style={{ alignItems: 'center', marginTop: '5%' }}>
                    <Text style={theme.typography.header}>Welcome to MindMate</Text>
                    <Text style={[theme.typography.subTitle, { textAlign: 'center', marginVertical: 16 }]}>
                        Take control of your mental health, anytime, anywhere
                    </Text>
                </View>
                <View
                    style={{
                        width: '100%',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginBottom: '15%'
                    }}
                >
                    <Button onPress={() => navigation.navigate('SignUp')} color={'tertiary'} type={'medium'}>
                        Sign up
                    </Button>
                    <Button onPress={() => navigation.navigate('SignIn')} color={'secondary'} type={'medium'}>
                        Sign in
                    </Button>
                </View>
            </View>
        </ScrollView>
    );
}
