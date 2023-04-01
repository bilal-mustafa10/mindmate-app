import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Button} from '../../components/Button';
import {Input} from '../../components/Input';
import {passwordValidator, usernameValidator} from '../../services/validator';
import {login} from '../../services/api/authEndpoints';
import {ILoginRequest} from '../../types/ILoginRequest';
import {useDispatch} from 'react-redux';
import jwtDecode from 'jwt-decode';
import {getActivities} from '../../services/api/activityEndpoints';
import {setActivity} from '../../services/redux/activitySlice';
import {height, styles, theme} from '../../constants/Theme';
import {RootStackScreenProps} from '../../navigation/types';
import {RealmContext} from '../../services/realm/config';


const { useQuery } = RealmContext;
export default function SignIn({navigation}: RootStackScreenProps<'SignIn'>) {
    const [username, setUsername] = useState({value: 'bilalmustafa', error: ''});
    const [password, setPassword] = useState({value: 'Global1234@', error: ''});
    const [showError, setShowError] = useState(false);
    const user = useQuery('UserData');
    console.log('user', user);
    const dispatch = useDispatch();

    useEffect(() => {
        setUsername({value: 'bilalmustafa', error: ''});
        setPassword({value: 'Global1234@', error: ''});
        setShowError(false);
    }, []);


    const handleSignIn = async () => {
        const usernameError = usernameValidator(username.value);
        const passwordError = passwordValidator(password.value);

        if (usernameError || passwordError) {
            setUsername({...username, error: usernameError});
            setPassword({...password, error: passwordError});
            return;
        }

        const loginCredentials: ILoginRequest = {
            username: username.value,
            password: password.value,
        };

        try {
            const response = await login(loginCredentials);

            if (response && response.status === 200) {
                const decoded = jwtDecode(response.data.access);


                const activities = await getActivities();
                dispatch(setActivity(activities));

                console.log(user);

                if (user.length > 0) {
                    navigation.navigate('Root');
                } else {
                    navigation.navigate('Introduction', {userId: decoded['user_id']});
                }
            }
        } catch (error) {
            console.log(error);
            setShowError(true);
        }
    };

    return (
        <View style={styles.container}>
            <View
                style={[styles.content, {height: height * 0.35, justifyContent: 'flex-end'}]}>
                <FastImage
                    source={require('../../assets/images/logo-wc.png')}
                    resizeMode={FastImage.resizeMode.contain}
                    style={styles.logoWithoutContainer}
                />
            </View>
            <View style={styles.formContainer}>
                <Text style={[theme.typography.subTitle, {marginBottom: '5%'}]}>
                    Sign in to your account
                </Text>
                <View>
                    <Input
                        label={'Username'}
                        keyboardType={'default'}
                        inputMode={'email'}
                        value={username.value}
                        onChangeText={text => setUsername({value: text, error: ''})}
                        autoCapitalize="none"
                        autoCorrect={false}
                    />
                    {username.error ? <Text>{username.error}</Text> : null}
                    <Input
                        label={'Password'}
                        secureTextEntry
                        value={password.value}
                        onChangeText={text => setPassword({value: text, error: ''})}
                        autoCapitalize="none"
                        autoCorrect={false}
                    />
                    {password.error ? <Text>{password.error}</Text> : null}

                    <Button
                        type={'large'}
                        onPress={handleSignIn}
                        style={{marginTop: '5%'}}
                        color={'secondary'}
                    >
                        Sign In
                    </Button>
                    {showError ? <Text>Failure to Login</Text> : null}
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
        </View>
    );
}
