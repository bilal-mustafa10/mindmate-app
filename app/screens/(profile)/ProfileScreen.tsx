import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import UserAvatar from 'react-native-user-avatar';
import { Ionicons } from '@expo/vector-icons';

import { styles as globalStyles, theme } from '../../constants/Theme';
import { RootStackParamList } from '../../navigation/types';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { logout } from '../../services/api/authEndpoints';
import { RouteProp } from '@react-navigation/native';
import Header from '../../components/Header';
import { RealmContext } from '../../services/realm/config';

type Props = {
    navigation: NativeStackNavigationProp<RootStackParamList, 'Profile'>;
    route: RouteProp<RootStackParamList, 'Profile'>;
};

export default function ProfileScreen({ navigation, route }: Props) {
    const user = RealmContext.useObject('UserData', route.params.id);
    console.log(user);

    const [firstName, setFirstName] = useState(route.params.firstName);
    const [lastName, setLastName] = useState(route.params.lastName);

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

            <View style={styles.container}>
                <View style={styles.avatarContainer}>
                    <UserAvatar size={80} name={firstName + lastName} bgColor={'green'} />
                    <Ionicons name="create-outline" size={20} color={'black'} style={styles.editIcon} />
                </View>
                <View style={styles.personalDetailsContainer}>
                    <Text style={theme.typography.bodyBold}>Personal Details</Text>
                    <View style={styles.inputGroup}>
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
                    <Button type={'large'} onPress={handleLogout} color={'error'} style={styles.logoutButton}>
                        Logout
                    </Button>
                </View>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    avatarContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: theme.spacing.large,
        position: 'relative',
    },
    container: {
        ...globalStyles.container,
        alignItems: 'center',
        flex: 1,
        justifyContent: 'flex-start',
        padding: theme.spacing.medium,
        paddingTop: theme.spacing.large,
    },
    editIcon: {
        bottom: 0,
        position: 'absolute',
        right: -theme.spacing.small,
    },
    inputGroup: {
        marginBottom: theme.spacing.medium,
    },
    logoutButton: {
        marginTop: theme.spacing.medium,
    },
    personalDetailsContainer: {
        marginBottom: theme.spacing.large,
        paddingHorizontal: theme.spacing.small,
        width: '100%',
    },
});
