import React from 'react';
import {Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Button} from '../../components/Button';
import {Input} from '../../components/Input';
import {styles, theme} from '../../constants/Theme';
import {RootStackScreenProps} from '../../navigation/types';
import {nameValidator} from '../../services/validator';
import {RealmContext} from '../../services/realm/config';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export default function IntroductionScreen({navigation, route}: RootStackScreenProps<'Introduction'>) {
    const insets = useSafeAreaInsets();
    const userId = route.params.userId;
    const realm = RealmContext.useRealm();
    const [firstName, setFirstName] = React.useState({value: '', error: ''});
    const [lastName, setLastName] = React.useState({value: '', error: ''});
    const shortcuts = [1,2,3];

    const handleContinue = () => {
        const firstNameError = nameValidator(firstName.value);
        const lastNameError = nameValidator(lastName.value);

        if (firstNameError || lastNameError) {
            setFirstName({...firstName, error: firstNameError});
            setLastName({...lastName, error: lastNameError});
            return;
        }

        realm.write(() => {
            realm.create('UserData', {
                username: userId,
                first_name: firstName.value,
                last_name: lastName.value,
            });
        });

        // loop through shortcuts and add to user shortcut
        shortcuts.forEach((id) => {
            realm.write(() => {
                const userShortcut = {
                    _id: new Realm.BSON.UUID(),
                    shortcut_id: id,
                };
                realm.create('UserShortcut', userShortcut);
            });
        });

        navigation.replace('Root');
    };


    return (
        <View style={styles.container}>
            <View style={[styles.container, {paddingTop: insets.top}]}>
                <FastImage
                    source={require('../../assets/images/logo-wc.png')}
                    resizeMode={FastImage.resizeMode.contain}
                    style={styles.logoWithoutContainer}
                />
                <View style={styles.formContainer}>
                    <Text style={[theme.typography.bodyBold, {marginBottom: '2%', textAlign:'left'}]}>Begin your wellbeing journey!</Text>
                    <Text style={[theme.typography.captionSemiBold, {marginBottom: '5%', textAlign:'left'}]}>Share your details for customized support and tools.</Text>
                    <View>
                        <Input
                            label={'First Name'}
                            keyboardType="default"
                            inputMode={'text'}
                            value={firstName.value}
                            onChangeText={text => setFirstName({value: text, error: ''})}
                            autoCapitalize="none"
                            autoCorrect={false}
                        />
                        <Input
                            label={'Last Name'}
                            keyboardType="default"
                            inputMode={'text'}
                            value={lastName.value}
                            onChangeText={text => setLastName({value: text, error: ''})}
                            autoCapitalize="none"
                            autoCorrect={false}
                        />

                        <Button type={'large'}
                            onPress={handleContinue}
                            style={{marginTop: '5%'}}
                            color={'secondary'}
                        >
                            Continue
                        </Button>
                    </View>
                </View>
            </View>

        </View>
    );
}
