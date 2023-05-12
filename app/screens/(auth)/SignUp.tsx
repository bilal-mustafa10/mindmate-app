import { styles, theme } from '../../constants/Theme';
import { Text, View } from 'react-native';
import { RootStackScreenProps } from '../../navigation/types';
import FastImage from 'react-native-fast-image';
import { Button } from '../../components/Button';
import * as React from 'react';
import { Input } from '../../components/Input';

export default function SignUp({ navigation }: RootStackScreenProps<'SignUp'>) {
    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <FastImage
                    source={require('../../assets/images/logo-wc.png')}
                    resizeMode={FastImage.resizeMode.contain}
                    style={styles.logoWithoutContainer}
                />
            </View>
            <View style={styles.formContainer}>
                <Text style={theme.typography.BodyBold}>Sign up to MindMate</Text>
                <View>
                    <Input
                        label={'First Name'}
                        keyboardType="default"
                        inputMode={'text'}
                        value={firstName}
                        onChangeText={setFirstName}
                        autoCapitalize="none"
                        autoCorrect={false}
                    />
                    <Input
                        label={'Last Name'}
                        keyboardType="default"
                        inputMode={'text'}
                        value={lastName}
                        onChangeText={setLastName}
                        autoCapitalize="none"
                        autoCorrect={false}
                    />
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

                    <Button type={'large'} onPress={() => navigation.replace('Root')} color={'secondary'}>
                        Sign Up
                    </Button>
                </View>
            </View>
        </View>
    );
}
