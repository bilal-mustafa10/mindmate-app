import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '../constants/Theme';
import FastImage from 'react-native-fast-image';
import { Photo } from '../services/redux/activitySlice';
import { useSelector } from 'react-redux';
import { RootState } from '../services/redux/store';
import ImageViewer from './ImageViewerComponent';
import { Ionicons } from '@expo/vector-icons';

interface ActivityCardProps {
    id?: string;
    activity_id: number;
    date?: string;
    note?: string;
    is_shared: boolean;
    likes?: number[];
    photo: Photo[];
    hub_id?: number;
    type: 'hub' | 'activity';
}

const ActivityCard: React.FC<ActivityCardProps> = ({ id, activity_id, date, photo, type }: ActivityCardProps) => {
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

    const toggleLike = () => {
        setIsLiked(!isLiked);
    };

    const handleDeleteImage = (index: number) => {
        console.log('delete image', index);
        photo.splice(index, 1);
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
                    <View>
                        <ImageViewer images={photo} showDelete={type !== 'hub'} onDeleteImage={handleDeleteImage} />
                    </View>
                )}

                {/*<TouchableOpacity style={{ alignSelf: 'flex-end' }} onPress={toggleLike}>
                    <Ionicons name={isLiked ? 'heart' : 'heart-outline'} size={30} color={theme.colors.primary} />
                </TouchableOpacity>*/}
            </View>
        </>
    );
};

const styles = StyleSheet.create({
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
        marginTop: 2,
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
        justifyContent: 'space-between',
    },
});

export default ActivityCard;
