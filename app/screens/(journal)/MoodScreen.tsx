import {height, styles, theme} from '../../constants/Theme';
import {Text, TouchableOpacity, View} from 'react-native';
import {RootStackScreenProps} from '../../navigation/types';
import FastImage from 'react-native-fast-image';
import {Button} from '../../components/Button';
import * as React from 'react';
import {Input} from '../../components/Input';

export default function MoodScreen({navigation}: RootStackScreenProps<'SignIn'>) {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');


    return (
        <View style={styles.container}>
            <View style={[styles.content, {height: height * 0.35, justifyContent: 'flex-end'}]}>
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
                        label={'Email Address'}
                        keyboardType="email-address"
                        inputMode={'email'}
                        value={email}
                        onChangeText={setEmail}
                        autoCapitalize="none"
                        autoCorrect={false}
                    />
                    <Input
                        label={'Password'}
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                        autoCapitalize="none"
                        autoCorrect={false}
                    />

                    <Button type={'large'} onPress={() => navigation.replace('Root')} style={{marginTop: '5%'}}
                        color={'secondary'}>Sign In</Button>
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
