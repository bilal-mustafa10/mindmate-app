import * as React from 'react';
import { View, Text } from 'react-native';
import FastImage from 'react-native-fast-image';
import {height, styles} from '../constants/Theme';
import {Button} from '../components/Button';
import {RootStackScreenProps} from '../navigation/types';
import {isLoggedIn} from 'react-native-axios-jwt';
import {getActivities} from '../services/api/activityEndpoints';
import {useDispatch} from 'react-redux';
import {setActivity} from '../services/redux/activitySlice';


export default function LandingScreen({ navigation }: RootStackScreenProps<'LandingPage'>) {
    const dispatch = useDispatch();

    React.useEffect(() => {
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
        <View style={styles.container}>
            <View style={[styles.content, styles.secondaryBackground, { height: height * 0.67 }]}>
                <FastImage
                    source={require('../assets/images/logo.png')}
                    style={styles.logo}
                />
            </View>
            <View style={[styles.content,  { height: height * 0.33, justifyContent: 'space-between' }]}>
                <View style={{ alignItems: 'center', marginTop: '5%' }}>
                    <Text style={[styles.title]}>Welcome to MindMate</Text>
                    <Text style={[styles.body, { textAlign:'center'}]}>Take control of your mental health, anytime, anywhere</Text>
                </View>
                <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', marginBottom: '15%' }}>
                    <Button type={'medium'} onPress={() => {navigation.navigate('SignUp');}} color={'tertiary'}>Sign up</Button>
                    <Button type={'medium'} onPress={() => {navigation.navigate('SignIn');}} color={'secondary'}>Sign in</Button>
                </View>
            </View>
        </View>
    );
}
