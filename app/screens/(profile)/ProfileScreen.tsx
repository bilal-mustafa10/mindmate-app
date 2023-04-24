import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { styles, theme } from '../../constants/Theme';
import { RootStackParamList } from '../../navigation/types';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { logout } from '../../services/api/authEndpoints';
import { RouteProp } from '@react-navigation/native';
import Header from '../../components/Header';
import { RealmContext } from '../../services/realm/config';
import { fullDisclaimer } from '../../constants/disclamer';

type Props = {
    navigation: NativeStackNavigationProp<RootStackParamList, 'Profile'>;
    route: RouteProp<RootStackParamList, 'Profile'>;
};

export default function ProfileScreen({ navigation, route }: Props) {
    const realm = RealmContext.useRealm();
    const user = RealmContext.useObject('UserData', route.params.id);
    const [firstName, setFirstName] = useState(route.params.firstName);
    const [lastName, setLastName] = useState(route.params.lastName);

    React.useEffect(() => {
        if (user) {
            realm.write(() => {
                user['first_name'] = firstName;
                user['last_name'] = lastName;
            });
        }
    }, [firstName, lastName, realm, user]);

    const handleLogout = async () => {
        await logout();
        navigation.navigate('LandingPage');
    };

    return (
        <>
            <Header
                showAvatar={false}
                onHeaderLeftPress={() => {
                    navigation.goBack();
                }}
                title={'Profile'}
                showBackButton={true}
            />

            <ScrollView style={[styles.mainContainer, styles.paddingHorizontal]} showsVerticalScrollIndicator={false}>
                <View style={styles.marginTopLarge}>
                    <Text style={[theme.typography.bodyBold, styles.marginBottomSmall]}>Personal Details</Text>
                    <View style={styles.marginBottomSmall}>
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
                    </View>
                    <View style={styles.disclaimerContainer}>
                        <Text style={styles.disclaimerText}>{fullDisclaimer}</Text>
                    </View>
                    <Button type={'large'} onPress={handleLogout} color={'error'}>
                        Logout
                    </Button>
                </View>
            </ScrollView>
        </>
    );
}
