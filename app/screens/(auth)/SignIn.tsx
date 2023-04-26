import React, { useEffect, useState } from 'react';
import {
    Text,
    View,
    Platform,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
    ScrollView,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { passwordValidator, usernameValidator } from '../../services/validator';
import { login } from '../../services/api/authEndpoints';
import { ILoginRequest } from '../../types/ILoginRequest';
import { useDispatch } from 'react-redux';
import jwtDecode from 'jwt-decode';
import { getActivities } from '../../services/api/activityEndpoints';
import { setActivity } from '../../services/redux/activitySlice';
import { styles, theme } from '../../constants/Theme';
import { RootStackScreenProps } from '../../navigation/types';
import { RealmContext } from '../../services/realm/config';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getMentalHealthResources } from '../../services/api/resourcesEndpoints';
import { setResources } from '../../services/redux/resourcesSlice';
import { getAssessments } from '../../services/api/assessmentEndpoints';
import { setAssessments } from '../../services/redux/assessmentSlice';
import { PinComponent } from '../../components/PinComponent';
import PinManager from '../../services/localAuth/PinManager';

export default function SignIn({ navigation }: RootStackScreenProps<'SignIn'>) {
    const dispatch = useDispatch();
    const insets = useSafeAreaInsets();
    const [userId, setUserId] = useState(0);
    const [username, setUsername] = useState({ value: '', error: '' });
    const [password, setPassword] = useState({ value: '', error: '' });
    const [pin, setPin] = useState(['', '', '', '']);
    const [showError, setShowError] = useState(false);
    const user = RealmContext.useQuery('UserData');
    const [showPin, setShowPin] = useState(user.length > 0);
    const [pinError, setPinError] = useState(false);

    useEffect(() => {
        setUsername({ value: '', error: '' });
        setPassword({ value: '', error: '' });
        setShowError(false);
    }, []);

    const handleSignIn = async () => {
        const usernameError = usernameValidator(username.value);
        const passwordError = passwordValidator(password.value);

        if (usernameError || passwordError) {
            setUsername({ ...username, error: usernameError });
            setPassword({ ...password, error: passwordError });
            return;
        }

        const loginCredentials: ILoginRequest = {
            username: username.value,
            password: password.value,
        };

        const response = await login(loginCredentials);

        if (response && response.status === 200) {
            const decoded = jwtDecode(response.data.access);
            const [activities, resources, assessments] = await Promise.all([
                getActivities(),
                getMentalHealthResources(),
                getAssessments(),
            ]);

            dispatch(setActivity(activities));
            dispatch(setResources(resources));
            dispatch(setAssessments(assessments));

            if (user.length > 0) {
                navigation.navigate('Root');
            } else {
                setShowPin(true);
                setUserId(decoded['user_id']);
            }
        } else {
            setShowError(true);
        }
    };

    const onKeyPress = (value: string) => {
        setPinError(false);
        const index = pin.findIndex((item) => item === '');
        if (index !== -1) {
            const newPin = [...pin];
            newPin[index] = value;
            setPin(newPin);
        }
    };

    const clearLastDigit = () => {
        const index = pin.findIndex((item) => item === '');
        if (index > 0) {
            const newPin = [...pin];
            newPin[index - 1] = '';
            setPin(newPin);
        } else if (index === -1) {
            const newPin = [...pin];
            newPin[pin.length - 1] = '';
            setPin(newPin);
        }
    };

    const handlePin = async () => {
        console.log('Pin: ', pin);
        if (user.length === 0 && pin.join('').length === 4) {
            const pinString = pin.join('');
            await PinManager.setPin(pinString);
            setPin(['', '', '', '']);
            navigation.navigate('Introduction', { userId: userId });
        } else {
            const pinString = pin.join('');
            const isValid = await PinManager.verifyPin(pinString);
            if (isValid) {
                const [activities, resources, assessments] = await Promise.all([
                    getActivities(),
                    getMentalHealthResources(),
                    getAssessments(),
                ]);

                if (activities !== null) {
                    dispatch(setActivity(activities));
                }

                if (resources !== null) {
                    dispatch(setResources(resources));
                }

                if (assessments !== null) {
                    dispatch(setAssessments(assessments));
                }

                setPin(['', '', '', '']);
                navigation.navigate('Root');
            } else {
                setPinError(true);
                setPin(['', '', '', '']);
            }
        }
    };

    if (showPin) {
        return (
            <ScrollView style={[styles.mainContainer, styles.paddingHorizontal, { paddingTop: insets.top }]}>
                <FastImage
                    source={require('../../assets/images/logo-wc.png')}
                    resizeMode={FastImage.resizeMode.contain}
                    style={styles.logoWithoutContainer}
                />
                <PinComponent
                    onKeyPress={onKeyPress}
                    clearLastDigit={clearLastDigit}
                    setupMode={user.length === 0}
                    onComplete={handlePin}
                    error={pinError}
                />
                {user.length !== 0 && (
                    <Button
                        type={'large'}
                        onPress={() => {
                            setShowPin(false);
                        }}
                        color={'tertiary'}
                        style={styles.marginBottomMedium}
                    >
                        Sign In with Password
                    </Button>
                )}
            </ScrollView>
        );
    } else {
        return (
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={[styles.mainContainer, styles.paddingHorizontal, { paddingTop: insets.top }]}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <ScrollView>
                        <FastImage
                            source={require('../../assets/images/logo-wc.png')}
                            resizeMode={FastImage.resizeMode.contain}
                            style={styles.logoWithoutContainer}
                        />
                        <View>
                            <Text style={[theme.typography.SubHeading, styles.marginBottomMedium]}>
                                Sign in to your account
                            </Text>
                            <View>
                                <Input
                                    label={'Username'}
                                    keyboardType={'default'}
                                    inputMode={'email'}
                                    value={username.value}
                                    onChangeText={(text) => setUsername({ value: text, error: '' })}
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                />
                                {username.error ? (
                                    <Text style={[theme.typography.Error, styles.marginBottomSmall]}>
                                        {username.error}
                                    </Text>
                                ) : null}
                                <Input
                                    label={'Password'}
                                    secureTextEntry
                                    value={password.value}
                                    onChangeText={(text) => setPassword({ value: text, error: '' })}
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                />
                                {password.error ? (
                                    <Text style={[theme.typography.Error, styles.marginBottomSmall]}>
                                        {password.error}
                                    </Text>
                                ) : null}

                                <Button
                                    type={'large'}
                                    onPress={handleSignIn}
                                    color={'secondary'}
                                    style={styles.marginBottomMedium}
                                >
                                    Sign In
                                </Button>
                                {showError && (
                                    <Text style={[theme.typography.error, styles.marginBottomSmall]}>
                                        Failure Logging In
                                    </Text>
                                )}
                            </View>

                            {user.length > 0 && (
                                <Button
                                    type={'large'}
                                    onPress={() => {
                                        setShowPin(true);
                                    }}
                                    color={'tertiary'}
                                    style={styles.marginBottomMedium}
                                >
                                    Sign In with Pin
                                </Button>
                            )}
                        </View>
                    </ScrollView>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        );
    }
}
