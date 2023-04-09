import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from './Button';
import { theme } from '../constants/Theme';
import { Ionicons } from '@expo/vector-icons';
import { RealmContext } from '../services/realm/config';
import { addToHub, removeFromHub } from '../services/api/userEndpoints';
import FastImage from 'react-native-fast-image';

interface ReflectionCardProps {
    reflectionData: {
        id: string;
        title: string;
        date: string;
        note: string;
        is_shared: boolean;
        hub_id?: number;
    };
}

export const ReflectionCard: React.FC<ReflectionCardProps> = ({ reflectionData }) => {
    const [showOptions, setShowOptions] = React.useState(false);
    const realm = RealmContext.useRealm();
    const reflectionObject = RealmContext.useObject('UserReflection', reflectionData.id);

    const shareToHub = async () => {
        const hub_id = await addToHub(
            1,
            new Date().toISOString(),
            null,
            null,
            reflectionData.note,
            reflectionData.title,
            []
        );

        if (reflectionObject) {
            realm.write(() => {
                reflectionObject['is_shared'] = true;
                reflectionObject['hub_id'] = hub_id;
            });
        }
    };

    const removeReflectionFromHub = async () => {
        await removeFromHub(reflectionData.hub_id);

        if (reflectionObject) {
            realm.write(() => {
                reflectionObject['is_shared'] = false;
                reflectionObject['hub_id'] = null;
            });
        }

        setShowOptions(false);
    };

    const deleteReflection = async () => {
        if (reflectionData.is_shared) {
            await removeFromHub(reflectionData.hub_id);
        }

        if (reflectionObject) {
            realm.write(() => {
                realm.delete(reflectionObject);
            });
        }

        setShowOptions(false);
    };

    const time = new Date(reflectionData.date)
        .toLocaleTimeString([], {
            hour: 'numeric',
            minute: '2-digit',
        })
        .replace(/(\d)([AP]M)/i, '$1 $2');

    return (
        <View style={styles.reflectionDataContainer}>
            <View style={styles.iconTextContainer}>
                <Text style={styles.titleText}>{reflectionData.title}</Text>
                <Ionicons
                    name={'ellipsis-horizontal-outline'}
                    size={24}
                    color={'#A4A4A4'}
                    onPress={() => {
                        setShowOptions(!showOptions);
                    }}
                />
            </View>

            <Text style={styles.dateText}>{time}</Text>
            <Text style={styles.noteText}>{reflectionData.note}</Text>
            <View style={styles.buttonContainer}>
                {reflectionData.is_shared === undefined || reflectionData.is_shared === false ? (
                    <Button onPress={shareToHub} color={'secondary'} type={'pill'}>
                        Share
                    </Button>
                ) : (
                    <FastImage source={require('../assets/images/favourite.png')} style={styles.image} />
                )}
            </View>

            {showOptions && (
                <View style={styles.optionsContainer}>
                    {reflectionData.is_shared && (
                        <Button type={'small'} onPress={removeReflectionFromHub} color={'tertiary'}>
                            Unshare
                        </Button>
                    )}
                    <Button type={'small'} onPress={deleteReflection} color={'error'}>
                        Delete
                    </Button>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        alignSelf: 'flex-end', // Align the button to the end
    },
    dateText: {
        ...theme.typography.caption,
        color: '#A4A4A4',
        marginBottom: 8,
    },
    iconTextContainer: {
        alignItems: 'flex-start',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    image: {
        height: 30,
        resizeMode: 'contain',
        width: 30,
    },
    noteText: {
        ...theme.typography.bodyMedium,
        color: '#575757',
        fontSize: 13,
        marginBottom: 8,
        marginRight: 12,
        textAlign: 'left',
    },
    optionsContainer: {
        backgroundColor: theme.colors.secondaryBackground,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 12,
        padding: 5,
    },
    reflectionDataContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        elevation: 4,
        marginBottom: 24,
        paddingHorizontal: 16,
        paddingVertical: 12,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.04,
        shadowRadius: 4,
        width: '100%',
    },
    titleText: {
        ...theme.typography.bodySemiBold,
        marginBottom: 4,
    },
});
