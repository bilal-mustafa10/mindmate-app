import React from 'react';
import {
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text,
    TouchableWithoutFeedback,
    View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { styles, theme } from '../../constants/Theme';
import { RootStackScreenProps } from '../../navigation/types';
import { nameValidator } from '../../services/validator';
import { RealmContext } from '../../services/realm/config';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function IntroductionScreen({ navigation, route }: RootStackScreenProps<'Introduction'>) {
    const insets = useSafeAreaInsets();
    const userId = route.params.userId;
    const realm = RealmContext.useRealm();
    const [firstName, setFirstName] = React.useState({ value: '', error: '' });
    const [lastName, setLastName] = React.useState({ value: '', error: '' });
    const shortcuts = [1, 2, 3];
    const stats = [1, 2, 3];

    const handleContinue = () => {
        const firstNameError = nameValidator(firstName.value);
        const lastNameError = nameValidator(lastName.value);

        if (firstNameError || lastNameError) {
            setFirstName({ ...firstName, error: firstNameError });
            setLastName({ ...lastName, error: lastNameError });
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

        stats.forEach((id) => {
            realm.write(() => {
                const userStat = {
                    _id: new Realm.BSON.UUID(),
                    stat_id: id,
                };
                realm.create('UserStat', userStat);
            });
        });

        navigation.replace('Root');
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
                    <View style={styles.formContainer}>
                        <Text style={[theme.typography.Body, styles.marginBottomMedium]}>
                            Share your details for customized tools.
                        </Text>
                        <View>
                            <Input
                                label={'First Name'}
                                keyboardType="default"
                                inputMode={'text'}
                                value={firstName.value}
                                onChangeText={(text) => setFirstName({ value: text, error: '' })}
                                autoCapitalize="none"
                                autoCorrect={false}
                            />
                            {firstName.error ? (
                                <Text style={[theme.typography.Error, styles.marginBottomSmall]}>
                                    {firstName.error}
                                </Text>
                            ) : null}
                            <Input
                                label={'Last Name'}
                                keyboardType="default"
                                inputMode={'text'}
                                value={lastName.value}
                                onChangeText={(text) => setLastName({ value: text, error: '' })}
                                autoCapitalize="none"
                                autoCorrect={false}
                            />
                            {lastName.error ? (
                                <Text style={[theme.typography.Error, styles.marginBottomSmall]}>{lastName.error}</Text>
                            ) : null}

                            <Button
                                type={'large'}
                                onPress={handleContinue}
                                style={styles.marginTopMedium}
                                color={'secondary'}
                            >
                                Continue
                            </Button>
                        </View>
                    </View>
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}
