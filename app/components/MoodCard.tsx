import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button } from './Button';
import { moodImages } from '../constants/Images';
import { theme } from '../constants/Theme';
import { RealmContext } from '../services/realm/config';
import FastImage from 'react-native-fast-image';
import { Ionicons } from '@expo/vector-icons';
import { addToHub, getHubDataById, removeFromHub, updateLikes } from '../services/api/userEndpoints';

export interface MoodCardProps {
    moodData: {
        id?: string;
        mood: string;
        date: string;
        note: string;
        is_shared: boolean;
        likes?: number[];
        hub_id?: number;
        type: 'hub' | 'journal';
    };
}

const MoodCard: React.FC<MoodCardProps> = ({ moodData }) => {
    const realm = RealmContext.useRealm();
    const user = RealmContext.useQuery('UserData')[0]['username'];
    const [isLiked, setIsLiked] = useState(moodData.likes ? moodData.likes.includes(user) : false);
    const [likes, setLikes] = useState(0);
    const [showOptions, setShowOptions] = useState(false);

    const getMoodDataFromHub = useCallback(async () => {
        const data = await getHubDataById(moodData.hub_id);
        if (data.likes !== null && data.likes.length > 0) {
            setLikes(data.likes.length);
        }
    }, [moodData.hub_id]);

    useEffect(() => {
        if (moodData.type === 'journal' && moodData.is_shared && moodData.hub_id) {
            getMoodDataFromHub();
        }
    }, [getMoodDataFromHub, moodData.type, moodData.is_shared, moodData.hub_id]);

    const moodObject = React.useMemo(() => {
        if (moodData.type === 'journal') {
            return realm.objectForPrimaryKey('UserMood', moodData.id);
        } else {
            return null;
        }
    }, [realm, moodData.type, moodData.id]);

    const time = new Date(moodData.date)
        .toLocaleTimeString([], {
            hour: 'numeric',
            minute: '2-digit',
        })
        .replace(/(\d)([AP]M)/i, '$1 $2');

    const shareToHub = useCallback(async () => {
        const hub_id = await addToHub(
            1,
            'mood',
            new Date().toISOString(),
            null,
            moodData.mood,
            moodData.note,
            null,
            []
        );

        if (hub_id === null) {
            return;
        }

        if (moodObject) {
            realm.write(() => {
                moodObject['is_shared'] = true;
                moodObject['hub_id'] = hub_id;
            });
        }
    }, [moodObject, realm]);

    const removeMoodFromHub = useCallback(async () => {
        await removeFromHub(moodData.hub_id);

        if (moodObject) {
            realm.write(() => {
                moodObject['is_shared'] = false;
                moodObject['hub_id'] = null;
            });
        }

        setShowOptions(false);
    }, [moodObject, moodData.hub_id, realm]);

    const deleteMood = useCallback(async () => {
        if (moodData.is_shared) {
            await removeFromHub(moodData.hub_id);
        }

        if (moodObject) {
            realm.write(() => {
                realm.delete(moodObject);
            });
        }

        setShowOptions(false);
    }, [moodObject, moodData.hub_id, moodData.is_shared, realm]);

    const onPressLike = useCallback(async () => {
        if (isLiked) {
            const updatedLikes = moodData.likes.filter((like) => like !== user);
            await updateLikes(moodData.hub_id, updatedLikes);
            setIsLiked(false);
        } else {
            const updatedLikes = [...moodData.likes, user];
            await updateLikes(moodData.hub_id, updatedLikes);
            setIsLiked(true);
        }
    }, [isLiked, moodData.hub_id, moodData.likes, user]);

    const moodImageSource = useMemo(
        () => moodImages.find((moodImage) => moodImage.name === moodData.mood).image,
        [moodData.mood]
    );

    return (
        <>
            <View style={styles.container}>
                <View style={[styles.moodContainer, moodData.note !== '' ? { marginBottom: 12 } : {}]}>
                    <View style={styles.moodImageContainer}>
                        <Image style={styles.moodImage} source={moodImageSource} />
                    </View>
                    <View style={styles.moodTextContainer}>
                        <View>
                            <Text style={styles.moodText}>{moodData.mood}</Text>
                            <Text style={styles.dateText}>{time}</Text>
                        </View>
                        {moodData.type === 'journal' && (
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
                </View>

                {moodData.note !== '' && (
                    <View style={styles.noteContainer}>
                        <Text style={styles.noteText}>{moodData.note}</Text>
                        {moodData.type === 'journal' ? (
                            <View style={styles.buttonContainer}>
                                {moodData.is_shared === undefined || moodData.is_shared === false ? (
                                    <Button onPress={shareToHub} color={'secondary'} type={'pill'}>
                                        Share
                                    </Button>
                                ) : (
                                    <>
                                        <Text>{likes} x </Text>
                                        <FastImage
                                            source={require('../assets/images/favourite.png')}
                                            style={styles.moodImage}
                                        />
                                    </>
                                )}
                            </View>
                        ) : (
                            <TouchableOpacity onPress={onPressLike}>
                                <FastImage
                                    source={
                                        isLiked
                                            ? require('../assets/images/favourite.png')
                                            : require('../assets/images/favourite-empty.png')
                                    }
                                    style={styles.moodImage}
                                />
                            </TouchableOpacity>
                        )}
                    </View>
                )}
                {showOptions && (
                    <View style={styles.optionsContainer}>
                        {moodData.is_shared && (
                            <Button type={'small'} onPress={removeMoodFromHub} color={'tertiary'}>
                                Unshare
                            </Button>
                        )}
                        <Button type={'small'} onPress={deleteMood} color={'error'}>
                            Delete
                        </Button>
                    </View>
                )}
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        alignItems: 'center',
        flexDirection: 'row',
    },
    container: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        elevation: 4,
        marginBottom: 12,
        padding: 12,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.04,
        shadowRadius: 4,
        width: '100%',
    },
    dateText: {
        ...theme.typography.caption,
        color: '#A4A4A4',
        marginTop: 4,
    },
    moodContainer: {
        alignItems: 'center',
        flexDirection: 'row',
    },
    moodImage: {
        height: 30,
        resizeMode: 'contain',
        width: 30,
    },
    moodImageContainer: {
        backgroundColor: theme.colors.secondaryBackground,
        borderRadius: 100,
        marginRight: 8,
        padding: 10,
    },
    moodText: {
        ...theme.typography.bodyMedium,
    },
    moodTextContainer: {
        alignItems: 'flex-start',
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-between',
    },
    noteContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    noteText: {
        ...theme.typography.bodyMedium,
        color: '#575757',
        flex: 1,
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
});

export default MoodCard;
