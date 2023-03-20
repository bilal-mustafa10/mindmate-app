import {height, styles, theme} from '../../constants/Theme';
import {Text, TouchableOpacity, View} from 'react-native';
import {RootStackScreenProps} from '../../navigation/types';
import FastImage from 'react-native-fast-image';
import {Button} from '../../components/Button';
import * as React from 'react';
import {Input} from '../../components/Input';
import {passwordValidator, usernameValidator} from '../../services/validator';
import {login} from '../../services/api/authEndpoints';
import {ILoginRequest} from '../../types/ILoginRequest';
import {useDispatch} from 'react-redux';
import {setLogin} from '../../services/redux/authSlice';
import jwtDecode from 'jwt-decode';

export default function SignIn({navigation}: RootStackScreenProps<'SignIn'>) {
    const [username, setUsername] = React.useState({value: '', error: ''});
    const [password, setPassword] = React.useState({value: '', error: ''});
    const [showError, setShowError] = React.useState(false);
    const dispatch = useDispatch();

    React.useEffect(() => {
        setUsername({value: '', error: ''});
        setPassword({value: '', error: ''});
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

        const response = await login(loginCredentials);

        if (response && response.status === 200) {
            const decoded = jwtDecode(response.data.access);
            
            

            dispatch(setLogin({
                userId: decoded['user_id'],
                accessToken: response.data.access,
                refreshToken: response.data.refresh
            }));

            navigation.navigate('Root');
        } else {
            
            setShowError(true);
        }
    };


    return (
        <View style={styles.container}>
            <View style={[styles.content, { height: height * 0.35, justifyContent: 'flex-end'}]}>
                <FastImage
                    source={require('../../assets/images/logo-wc.png')}
                    resizeMode={FastImage.resizeMode.contain}
                    style={styles.logoWithoutContainer}
                />
            </View>
            <View style={styles.formContainer}>
                <Text style={[styles.subtitle, {marginBottom: '5%'}]}>Sign in to your account</Text>
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

                    <Button type={'large'} onPress={() => {
                        handleSignIn().then(r => {});
                    }} style={{marginTop: '5%'}} color={'secondary'}>Sign In</Button>
                    {showError ? <Text>Failure to Login</Text> : null}
                </View>
                <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                    <Text style={[styles.content, {textAlign: 'center', marginTop: '10%', color: theme.colors.text}]}>
                        Do not have an account? <Text style={{fontWeight: 'bold', color: theme.colors.secondary}}>Sign
                        up</Text>
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
