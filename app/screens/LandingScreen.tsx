import * as React from 'react';
import { View, Text } from 'react-native';
import FastImage from 'react-native-fast-image';
import {height, styles} from '../constants/Theme';
import {Button} from '../components/Button';
import {RootStackScreenProps} from '../navigation/types';

export default function LandingScreen({ navigation }: RootStackScreenProps<'LandingPage'>) {

    return (
        <View style={styles.container}>
            <View style={[styles.content, styles.secondaryBackground, { height: height * 0.67 }]}>
                <FastImage
                    source={require('../assets/images/logo.png')}
                    resizeMode={FastImage.resizeMode.contain}
                    style={styles.logo}
                />
            </View>
            <View style={[styles.content, styles.primaryBackground, { height: height * 0.33, justifyContent: 'space-between' }]}>
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
