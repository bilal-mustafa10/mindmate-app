import {height, styles} from '../../constants/Theme';
import {View, Text} from 'react-native';
import {RootStackScreenProps} from '../../navigation/types';
import FastImage from 'react-native-fast-image';
import {Button} from '../../components/Button';
import * as React from 'react';
import {Input} from '../../components/Input';

export default function SignUp({ navigation }: RootStackScreenProps<'SignUp'>) {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');


    return (
        <View style={styles.container}>
            <View style={[styles.content, { height: height * 0.35, justifyContent: 'flex-end'}]}>
                <FastImage
                    source={require('../../assets/images/logo.png')}
                    resizeMode={FastImage.resizeMode.contain}
                    style={styles.logo}
                />
            </View>
            <View style={styles.formContainer}>
                <Text style={[styles.subtitle, {marginBottom: '5%'}]}>Sign up</Text>
                <View>
                    <Input
                        label={'Email'}
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

                    <Button type={'large'} onPress={() => navigation.replace('Root')} style={{marginTop: '5%'}} color={'secondary'}>Sign In</Button>
                </View>
            </View>
        </View>
    );
}
