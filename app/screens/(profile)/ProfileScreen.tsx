import React, { useState, useEffect } from 'react';
import { Modal, Pressable, TouchableOpacity, View, StyleSheet, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import UserAvatar from 'react-native-user-avatar';
import { Ionicons } from '@expo/vector-icons';

import { styles, theme } from '../../constants/Theme';
import { RootStackParamList } from '../../navigation/types';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { logout } from '../../services/api/authEndpoints';
import { RealmContext } from '../../services/realm/config';

type Props = {
    navigation: NativeStackNavigationProp<RootStackParamList, 'Profile'>;
    route: any;
};


export default function ProfileScreen({navigation, route}: Props) {
    const insets = useSafeAreaInsets();
    const realm = RealmContext.useRealm();
    const user = RealmContext.useObject('UserData', route.params.id);

    const [firstName, setFirstName] = useState(route.params.firstName);
    const [lastName, setLastName] = useState(route.params.lastName);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedColor, setSelectedColor] = useState(route.params.avatarColor);

    useEffect(() => {
        updateUserData();
    }, [firstName, lastName, selectedColor]);

    const updateUserData = () => {
        try {
            realm.write(() => {
                user['first_name'] = firstName;
                user['last_name'] = lastName;
                user['avatar_color'] = selectedColor;
            });
        } catch (error) {
            console.error('Error updating user data:', error);
        }
    };

    const handleColorChange = (color: string) => {
        setSelectedColor(color);
        setModalVisible(false);
    };

    const handleLogout = async () => {
        await logout();
        navigation.navigate('LandingPage');
    };

    const ColorOptionsModal = ({ visible }: { visible: boolean }) => {
        const colors = [
            theme.colors.tertiary,
            theme.colors.primary,
            theme.colors.secondary,
            theme.colors.error,
        ];

        return (
            <Modal animationType="slide" transparent={true} visible={visible}>
                <View style={style.modalContainer}>
                    <View style={style.modalContent}>
                        <View style={style.colorsContainer}>
                            {colors.map((color, index) => (
                                <Pressable
                                    key={index}
                                    style={[
                                        style.colorSquare,
                                        { backgroundColor: color },
                                        selectedColor === color ? style.selectedColor : {},
                                    ]}
                                    onPress={() => handleColorChange(color)}
                                />
                            ))}
                        </View>
                    </View>
                </View>
            </Modal>
        );
    };



    return (
        <View style={[styles.container, { paddingTop: insets.top * 1.75 }]}>
            <TouchableOpacity style={{ width: '30%', alignSelf: 'center', marginBottom: '8%' }} onPress={() => setModalVisible(true)}>
                <UserAvatar size={100} name={firstName + lastName} bgColor={selectedColor} />
                <Ionicons name="create-outline" size={20} color={'black'} style={style.editIcon} />
            </TouchableOpacity>
            <ColorOptionsModal visible={modalVisible}/>

            <View style={[styles.formContainer, {marginVertical:'5%'}]}>
                <Text style={theme.typography.subTitle}>Personal Details</Text>
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
                </View>
                <Button type={'large'}
                    onPress={handleLogout}
                    style={{position: 'absolute', bottom: 35, alignSelf: 'center'}}
                    color={'error'}
                >
                    Logout
                </Button>
            </View>
        </View>
    );
}

const style = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        height: '15%',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingHorizontal: 20,
    },
    cancelIcon: {
        position: 'absolute',
        top: 10,
        left: 10,
    },
    tickIcon: {
        position: 'absolute',
        top: 10,
        right: 10,
    },
    colorsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    colorSquare: {
        width: 50,
        height: 50,
        margin: 10,
        borderRadius: 20,
    },
    selectedColor: {
        borderWidth: 4,
        borderColor: 'black',
        borderRadius: 20,
    },
    editIcon: {
        position: 'absolute',
        bottom: -8,
        right: -5,
    },

});

