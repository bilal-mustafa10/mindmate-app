import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Pressable } from 'react-native';
import { Button } from './Button';
import { theme } from '../constants/Theme';
import { Ionicons } from '@expo/vector-icons';
import { RealmContext } from '../services/realm/config';
import { addToHub, getHubDataById, removeFromHub, updateLikes } from '../services/api/userEndpoints';
import FastImage from 'react-native-fast-image';

interface ReflectionCardProps {
    reflectionData: {
        id?: string;
        date: string;
        title: string;
        note: string;
        is_shared: boolean;
        likes?: number[];
        hub_id?: number;
        type: 'hub' | 'journal';
    };
}

export const ReflectionCard: React.FC<ReflectionCardProps> = ({ reflectionData }) => {
    const realm = RealmContext.useRealm();
    const user = RealmContext.useQuery('UserData')[0]['username'];
    const [showOptions, setShowOptions] = React.useState(false);
    const [isLiked, setIsLiked] = useState(reflectionData.likes ? reflectionData.likes.includes(user) : false);
    const [likes, setLikes] = useState(0);

    const reflectionObject = React.useMemo(() => {
        if (reflectionData.type === 'journal') {
            return realm.objectForPrimaryKey('UserReflection', reflectionData.id);
        } else {
            return null;
        }
    }, [realm, reflectionData.type, reflectionData.id]);

    const getReflectionDataFromHub = useCallback(async () => {
        const data = await getHubDataById(reflectionData.hub_id);
        if (data.likes !== null && data.likes.length > 0) {
            setLikes(data.likes.length);
        }
    }, [reflectionData.hub_id]);

    useEffect(() => {
        if (reflectionData.type === 'journal' && reflectionData.is_shared && reflectionData.hub_id) {
            getReflectionDataFromHub();
        }
    }, [reflectionData, reflectionData.type, reflectionData.is_shared, reflectionData.hub_id]);

    const shareToHub = useCallback(async () => {
        const hub_id = await addToHub(
            user,
            'reflection',
            new Date().toISOString(),
            null,
            null,
            reflectionData.note,
            reflectionData.title,
            null
        );

        if (hub_id === null) {
            return;
        }

        if (reflectionObject) {
            realm.write(() => {
                reflectionObject['is_shared'] = true;
                reflectionObject['hub_id'] = hub_id;
            });
        }
    }, [reflectionObject, realm]);

    const removeReflectionFromHub = useCallback(async () => {
        await removeFromHub(reflectionData.hub_id);

        if (reflectionObject) {
            realm.write(() => {
                reflectionObject['is_shared'] = false;
                reflectionObject['hub_id'] = null;
            });
        }

        setShowOptions(false);
    }, [reflectionObject, reflectionData.hub_id, realm]);

    const deleteReflection = useCallback(async () => {
        if (reflectionData.is_shared) {
            await removeFromHub(reflectionData.hub_id);
        }

        if (reflectionObject) {
            realm.write(() => {
                realm.delete(reflectionObject);
            });
        }

        setShowOptions(false);
    }, [reflectionObject, reflectionData.hub_id, reflectionData.is_shared, realm]);

    const time = new Date(reflectionData.date)
        .toLocaleTimeString([], {
            hour: 'numeric',
            minute: '2-digit',
        })
        .replace(/(\d)([AP]M)/i, '$1 $2');

    const onPressLike = useCallback(async () => {
        if (isLiked) {
            const updatedLikes = reflectionData.likes.filter((like) => like !== user);
            await updateLikes(reflectionData.hub_id, updatedLikes);
            setIsLiked(false);
        } else {
            const updatedLikes = [...reflectionData.likes, user];
            await updateLikes(reflectionData.hub_id, updatedLikes);
            setIsLiked(true);
        }
    }, [isLiked, reflectionData.hub_id, reflectionData.likes, user]);

    const closeOptions = () => {
        if (showOptions) {
            setShowOptions(false);
        }
    };

    return (
        <Pressable onPress={closeOptions} style={styles.outerPressable}>
            <View style={styles.reflectionDataContainer}>
                <View style={styles.iconTextContainer}>
                    <Text style={styles.titleText}>{reflectionData.title}</Text>
                    {reflectionData.type === 'journal' && (
                        <Ionicons
                            name={'ellipsis-horizontal-outline'}
                            size={24}
                            color={'#A4A4A4'}
                            onPress={() => {
                                setShowOptions(!showOptions);
                            }}
                        />
                    )}
                </View>

                <Text style={styles.dateText}>{time}</Text>
                <Text style={styles.noteText}>{reflectionData.note}</Text>
                {reflectionData.type === 'journal' ? (
                    <View style={styles.buttonContainer}>
                        {reflectionData.is_shared === undefined || reflectionData.is_shared === false ? (
                            <Button onPress={shareToHub} color={'secondary'} type={'pill'}>
                                Share
                            </Button>
                        ) : (
                            <>
                                <Text>{likes} x </Text>
                                <FastImage source={require('../assets/images/favourite.png')} style={styles.image} />
                            </>
                        )}
                    </View>
                ) : (
                    <TouchableOpacity style={styles.buttonContainer} onPress={onPressLike}>
                        <FastImage
                            source={
                                isLiked
                                    ? require('../assets/images/favourite.png')
                                    : require('../assets/images/favourite-empty.png')
                            }
                            style={styles.image}
                        />
                    </TouchableOpacity>
                )}

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
        </Pressable>
    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        alignSelf: 'flex-end', // Align the button to the end
    },
    dateText: {
        ...theme.typography.Caption,
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
        ...theme.typography.BodyMedium,
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
    outerPressable: {
        flex: 1,
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
        ...theme.typography.BodySemiBold,
        marginBottom: 4,
    },
});
