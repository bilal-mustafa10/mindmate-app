import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Button } from './Button';
import { moodImages } from '../constants/Images';
import { theme } from '../constants/Theme';
import { RealmContext } from '../services/realm/config';
import FastImage from 'react-native-fast-image';
import { Ionicons } from '@expo/vector-icons';
import { addToHub, removeFromHub } from '../services/api/userEndpoints';

interface MoodCardProps {
    moodData: {
        id: string;
        mood: string;
        date: string;
        note: string;
        is_shared: boolean;
        hub_id?: number;
    };
}

const MoodCard: React.FC<MoodCardProps> = ({ moodData }) => {
    const realm = RealmContext.useRealm();
    const moodObject = RealmContext.useObject('UserMood', moodData.id);
    const [showOptions, setShowOptions] = React.useState(false);
    const time = new Date(moodData.date)
        .toLocaleTimeString([], {
            hour: 'numeric',
            minute: '2-digit',
        })
        .replace(/(\d)([AP]M)/i, '$1 $2');

    const shareToHub = async () => {
        const hub_id = await addToHub(1, new Date().toISOString(), null, moodData.mood, null, null, []);

        console.log('Mood Object: ', moodObject);

        if (moodObject) {
            realm.write(() => {
                moodObject['is_shared'] = true;
                moodObject['hub_id'] = hub_id;
            });
        }
    };

    const removeMoodFromHub = async () => {
        await removeFromHub(moodData.hub_id);

        if (moodObject) {
            realm.write(() => {
                moodObject['is_shared'] = false;
                moodObject['hub_id'] = null;
            });
        }

        setShowOptions(false);
    };

    const deleteMood = async () => {
        if (moodData.is_shared) {
            await removeFromHub(moodData.hub_id);
        }

        if (moodObject) {
            realm.write(() => {
                realm.delete(moodObject);
            });
        }

        setShowOptions(false);
    };

    return (
        <>
            <View style={styles.container}>
                <View style={[styles.moodContainer, moodData.note !== '' ? { marginBottom: 12 } : {}]}>
                    <View style={styles.moodImageContainer}>
                        <Image
                            style={styles.moodImage}
                            source={moodImages.find((moodImage) => moodImage.name === moodData.mood).image}
                        />
                    </View>
                    <View style={styles.moodTextContainer}>
                        <View>
                            <Text style={styles.moodText}>{moodData.mood}</Text>
                            <Text style={styles.dateText}>{time}</Text>
                        </View>
                        <Ionicons
                            name={'ellipsis-horizontal-outline'}
                            size={24}
                            color={'#A4A4A4'}
                            onPress={() => {
                                setShowOptions(!showOptions);
                            }}
                        />
                    </View>
                </View>

                {moodData.note !== '' && (
                    <View style={styles.noteContainer}>
                        <Text style={styles.noteText}>{moodData.note}</Text>
                        <View style={styles.buttonContainer}>
                            {moodData.is_shared === undefined || moodData.is_shared === false ? (
                                <Button onPress={shareToHub} color={'secondary'} type={'pill'}>
                                    Share
                                </Button>
                            ) : (
                                <FastImage
                                    source={require('../assets/images/favourite.png')}
                                    style={styles.moodImage}
                                />
                            )}
                        </View>
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
