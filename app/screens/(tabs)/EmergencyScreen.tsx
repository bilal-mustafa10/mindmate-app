import React from 'react';
import { ScrollView, View, Text, TouchableOpacity, Linking, StyleSheet } from 'react-native';
import { styles as globalStyles, theme } from '../../constants/Theme';
import Header from '../../components/Header';
import { RootStackScreenProps } from '../../navigation/types';
import { emergencyContacts } from '../../constants/EmergencyContacts';
import { Ionicons } from '@expo/vector-icons';

export default function EmergencyScreen({ navigation }: RootStackScreenProps<'EditShortcuts'>) {
    return (
        <>
            <Header
                showAvatar={false}
                onHeaderLeftPress={() => {
                    navigation.goBack();
                }}
                title={'Emergency Contacts'}
                showBackButton={true}
            />
            <ScrollView
                style={[globalStyles.mainContainer, globalStyles.paddingHorizontal, globalStyles.marginTopSmall]}
                showsVerticalScrollIndicator={false}
            >
                <Text style={[theme.typography.BodyBold, globalStyles.marginBottomSmall]}>Emergency Contacts</Text>
                {emergencyContacts.map((contact) => {
                    return (
                        <View key={contact.name} style={styles.emergencyCard}>
                            <View style={styles.nameContainer}>
                                <Text style={theme.typography.CardText}>{contact.name}</Text>
                            </View>
                            <TouchableOpacity
                                style={styles.iconContainer}
                                onPress={() => {
                                    Linking.openURL(`tel:${contact.phone}`);
                                }}
                            >
                                <Ionicons name={'call-outline'} size={30} color={theme.colors.error} />
                            </TouchableOpacity>
                        </View>
                    );
                })}
            </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    emergencyCard: {
        alignItems: 'center',
        backgroundColor: theme.colors.whiteBackground,
        borderColor: theme.colors.borderColor,
        borderRadius: 15,
        borderWidth: 0.5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 5,
        paddingHorizontal: 10,
        paddingVertical: 15,
    },
    iconContainer: {
        width: '10%',
    },
    nameContainer: {
        width: '80%',
    },
});
