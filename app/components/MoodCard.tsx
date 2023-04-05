import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Button } from './Button';
import { moodImages } from '../constants/Images';
import { theme } from '../constants/Theme';

interface MoodCardProps {
    moodData: {
        mood: string;
        date: string;
        note: string;
    };
}

const MoodCard: React.FC<MoodCardProps> = ({ moodData }) => {
    const time = new Date(moodData.date).toLocaleTimeString([], {
        hour: 'numeric',
        minute: '2-digit',
    }).replace(/(\d)([AP]M)/i, '$1 $2');

    return (
        <View style={styles.container}>
            <View style={[styles.moodContainer, moodData.note !== '' ? { marginBottom: 12 } : {}]}>
                <View style={styles.moodImageContainer}>
                    <Image
                        style={styles.moodImage}
                        source={
                            moodImages.find((moodImage) => moodImage.name === moodData.mood).image
                        }
                    />
                </View>
                <View style={styles.moodTextContainer}>
                    <Text style={styles.moodText}>{moodData.mood}</Text>
                    <Text style={styles.dateText}>{time}</Text>
                </View>
            </View>
            {moodData.note !== '' && (
                <View style={styles.noteContainer}>
                    <Text style={styles.noteText}>{moodData.note}</Text>
                    <View style={styles.shareButton}>
                        <Button
                            onPress={() => console.log('press')}
                            color={'secondary'}
                            type={'pill'}
                        >
                            Share
                        </Button>
                    </View>
                </View>
            )}
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        width: '100%',
        padding: 12,
        borderRadius: 12,
        backgroundColor: '#FFFFFF',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.04,
        shadowRadius: 4,
        elevation: 4,
        marginBottom: 12,
    },
    moodContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    moodImageContainer: {
        backgroundColor: theme.colors.secondaryBackground,
        borderRadius: 100,
        padding: 10,
        marginRight: 8,
    },
    moodImage: {
        width: 30,
        height: 30,
        resizeMode: 'contain',
    },
    moodTextContainer: {
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    moodText: {
        ...theme.typography.bodyMedium,
    },
    dateText: {
        ...theme.typography.caption,
        color: '#A4A4A4',
        marginTop: 4,
    },
    noteContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    noteText: {
        ...theme.typography.bodyMedium,
        textAlign: 'left',
        fontSize: 13,
        color: '#575757',
        flex: 1,
        marginRight: 12,
        marginBottom: 8,
    },
    shareButton: {
        marginLeft: 12,
    },
});



export default MoodCard;
