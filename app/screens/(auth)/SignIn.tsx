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

export default function SignIn({ navigation }: RootStackScreenProps<'SignIn'>) {
    const dispatch = useDispatch();
    const insets = useSafeAreaInsets();
    const [username, setUsername] = useState({ value: 'bilalmustafa', error: '' });
    const [password, setPassword] = useState({ value: 'Global1234@', error: '' });
    const [showError, setShowError] = useState(false);
    const user = RealmContext.useQuery('UserData');

    useEffect(() => {
        setUsername({ value: 'bilalmustafa', error: '' });
        setPassword({ value: 'Global1234@', error: '' });
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
            const [activities, resources] = await Promise.all([getActivities(), getMentalHealthResources()]);

            dispatch(setActivity(activities));
            dispatch(setResources(resources));

            if (user.length > 0) {
                navigation.navigate('Root');
            } else {
                navigation.navigate('Introduction', { userId: decoded['user_id'] });
            }
        } else {
            setShowError(true);
        }
    };

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
                                <Text style={[theme.typography.Error, styles.marginBottomSmall]}>{username.error}</Text>
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
                                <Text style={[theme.typography.Error, styles.marginBottomSmall]}>{password.error}</Text>
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
                        {/*<TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                        <Text style={{...theme.typography.body, textAlign: 'center', marginTop: '10%'}}
                        >
                            Do not have an account?{' '}
                            <Text style={{...theme.typography.bodyBold, color: theme.colors.secondary}}>
                                Sign up
                            </Text>
                        </Text>
                    </TouchableOpacity>*/}
                    </View>
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}
