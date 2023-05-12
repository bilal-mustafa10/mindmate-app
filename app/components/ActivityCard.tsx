import React, { useCallback, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { theme } from '../constants/Theme';
import FastImage from 'react-native-fast-image';
import { useSelector } from 'react-redux';
import { RootState } from '../services/redux/store';
import ImageViewer from './ImageViewerComponent';
import { Ionicons } from '@expo/vector-icons';
import { Photo } from '../services/redux/activitySlice';
import { Button } from './Button';
import { RealmContext } from '../services/realm/config';
import { updateLikes } from '../services/api/userEndpoints';

export interface ActivityCardProps {
    ActivityData: {
        id?: string;
        activity_id: number;
        date?: string;
        note?: string;
        is_shared: boolean;
        likes?: number[];
        photo: Photo[];
        hub_id?: number;
        type: 'hub' | 'activity';
        handleDeleteImage?: (index: number) => void;
        completed?: boolean;
        handleShare?: () => void;
        handleDeleteActivityPhotos?: () => void;
        handleDeleteActivityFromHub?: () => void;
    };
}

const ActivityCard: React.FC<ActivityCardProps> = ({ ActivityData }) => {
    const activity = useSelector((state: RootState) =>
        state.activity.results?.find((activity) => activity.id === ActivityData.activity_id)
    );

    const time = new Date(ActivityData.date)
        .toLocaleTimeString([], {
            hour: 'numeric',
            minute: '2-digit',
        })
        .replace(/(\d)([AP]M)/i, '$1 $2');

    const likeAnimation = React.useRef(new Animated.Value(0)).current;
    const user = RealmContext.useQuery('UserData')[0]['username'];
    const [isLiked, setIsLiked] = useState(ActivityData.likes ? ActivityData.likes.includes(user) : false);
    const [showOptions, setShowOptions] = useState(false);

    const likeAnimatedStyle = {
        transform: [
            {
                scale: likeAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, 1.2],
                }),
            },
        ],
    };

    const onPressLike = useCallback(async () => {
        const toggleLike = () => {
            Animated.sequence([
                Animated.timing(likeAnimation, {
                    toValue: 1,
                    duration: 100,
                    useNativeDriver: true,
                }),
                Animated.timing(likeAnimation, {
                    toValue: 0,
                    duration: 100,
                    useNativeDriver: true,
                }),
            ]).start();
        };

        toggleLike();
        if (isLiked) {
            const updatedLikes = ActivityData.likes.filter((like) => like !== user);
            await updateLikes(ActivityData.hub_id, updatedLikes);
            setIsLiked(false);
        } else {
            const updatedLikes = [...ActivityData.likes, user];
            await updateLikes(ActivityData.hub_id, updatedLikes);
            setIsLiked(true);
        }
    }, [isLiked, ActivityData.likes, ActivityData.hub_id, user, likeAnimation]);

    return (
        <>
            <View style={styles.container}>
                <View style={styles.moodContainer}>
                    <View style={styles.moodImageContainer}>
                        <FastImage
                            source={{ uri: activity.logo.file }}
                            style={styles.moodImage}
                            resizeMode={FastImage.resizeMode.contain}
                        />
                    </View>
                    <View style={styles.moodTextContainer}>
                        <View>
                            <Text style={styles.moodText}>{activity.title}</Text>
                            {!!ActivityData.date && <Text style={styles.dateText}>{time}</Text>}
                        </View>
                        {ActivityData.type === 'activity' && (
                            <>
                                {ActivityData.completed && (
                                    <Ionicons
                                        name={'ellipsis-horizontal-outline'}
                                        size={24}
                                        color={'#A4A4A4'}
                                        onPress={() => {
                                            setShowOptions(!showOptions);
                                        }}
                                    />
                                )}
                            </>
                        )}
                    </View>
                </View>

                {ActivityData.photo.length > 0 && (
                    <ImageViewer
                        images={ActivityData.photo}
                        showDelete={ActivityData.type !== 'hub'}
                        onDeleteImage={ActivityData.handleDeleteImage}
                        completed={ActivityData.completed}
                    />
                )}

                {ActivityData.completed && (
                    <>
                        {ActivityData.is_shared ? (
                            <>
                                {ActivityData.type === 'hub' ? (
                                    <View style={styles.actionContainer}>
                                        <TouchableOpacity style={styles.likeButton} onPress={onPressLike}>
                                            <Animated.View style={likeAnimatedStyle}>
                                                <Ionicons
                                                    name={isLiked ? 'heart' : 'heart-outline'}
                                                    size={30}
                                                    color={theme.colors.primary}
                                                />
                                            </Animated.View>
                                        </TouchableOpacity>
                                    </View>
                                ) : (
                                    <View style={styles.actionContainer}>
                                        <Text>{ActivityData.likes !== null ? ActivityData.likes.length : 0} x</Text>
                                        <Ionicons name={'heart'} size={30} color={theme.colors.primary} />
                                    </View>
                                )}
                            </>
                        ) : (
                            <View style={styles.actionContainer}>
                                <Button onPress={ActivityData.handleShare} color={'secondary'} type={'pill'}>
                                    Share
                                </Button>
                            </View>
                        )}
                    </>
                )}
                {showOptions && (
                    <View style={styles.optionsContainer}>
                        {ActivityData.is_shared && (
                            <Button
                                type={'small'}
                                onPress={ActivityData.handleDeleteActivityFromHub}
                                color={'tertiary'}
                            >
                                Unshare
                            </Button>
                        )}
                        <Button type={'small'} onPress={ActivityData.handleDeleteActivityPhotos} color={'error'}>
                            Delete
                        </Button>
                    </View>
                )}
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    actionContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 5,
    },
    container: {
        backgroundColor: theme.colors.whiteBackground,
        borderRadius: 15,
        elevation: 4,
        marginBottom: 12,
        padding: 12,
        shadowColor: theme.colors.text,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.04,
        shadowRadius: 4,
        width: '100%',
    },
    dateText: {
        ...theme.typography.Caption,
        color: theme.colors.textTertiary,
        marginTop: 2,
    },
    likeButton: {
        alignItems: 'center',
        flexDirection: 'row',
    },
    moodContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: 5,
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
        ...theme.typography.BodyMedium,
    },
    moodTextContainer: {
        alignItems: 'flex-start',
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-between',
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

export default ActivityCard;
