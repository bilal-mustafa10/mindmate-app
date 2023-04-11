import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { theme } from '../constants/Theme';
import FastImage from 'react-native-fast-image';
import { useSelector } from 'react-redux';
import { RootState } from '../services/redux/store';
import ImageViewer from './ImageViewerComponent';
import { Ionicons } from '@expo/vector-icons';
import { Photo } from '../services/redux/activitySlice';
import { Button } from './Button';

export interface ActivityCardProps {
    id?: string;
    activity_id: number;
    date?: string;
    note?: string;
    is_shared: boolean;
    likes?: number[];
    photo: Photo[];
    hub_id?: number;
    type: 'hub' | 'activity';
    onDelete?: (index: number) => void;
    completed?: boolean;
    handleShare?: () => void;
}

const ActivityCard: React.FC<ActivityCardProps> = ({
    is_shared,
    activity_id,
    date,
    photo,
    type,
    onDelete,
    completed,
    handleShare,
}: ActivityCardProps) => {
    const activity = useSelector((state: RootState) =>
        state.activity.results?.find((activity) => activity.id === activity_id)
    );

    const time = new Date(date)
        .toLocaleTimeString([], {
            hour: 'numeric',
            minute: '2-digit',
        })
        .replace(/(\d)([AP]M)/i, '$1 $2');

    const [isLiked, setIsLiked] = React.useState(false);
    const [likeCount, setLikeCount] = React.useState(0);
    const likeAnimation = React.useRef(new Animated.Value(0)).current;

    const toggleLike = () => {
        setIsLiked(!isLiked);
        setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
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
                            {date && <Text style={styles.dateText}>{time}</Text>}
                        </View>
                    </View>
                </View>

                {photo.length > 0 && (
                    <ImageViewer
                        images={photo}
                        showDelete={type !== 'hub'}
                        onDeleteImage={onDelete}
                        completed={completed}
                    />
                )}

                {is_shared ? (
                    <View style={styles.actionContainer}>
                        <TouchableOpacity style={styles.likeButton} onPress={toggleLike}>
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
                        <Button onPress={handleShare} color={'secondary'} type={'pill'}>
                            Share
                        </Button>
                    </View>
                )}
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    actionContainer: {
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
        ...theme.typography.caption,
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
        ...theme.typography.bodyMedium,
    },
    moodTextContainer: {
        alignItems: 'flex-start',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});

export default ActivityCard;
