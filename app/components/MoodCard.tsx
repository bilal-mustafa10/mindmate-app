import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {Button} from './Button';
import {moodImages} from '../constants/Images';
import {theme} from '../constants/Theme';

interface MoodCardProps {
    moodData: {
        mood: string;
        date: string;
        note: string;
    };
    selectedDate: Date;
}

export const MoodCard: React.FC<MoodCardProps> = ({moodData, selectedDate}) => {
    return (
        <View style={styles.moodDataContainer}>
            <View style={styles.moodDataTopRow}>
                <Image
                    style={styles.moodImage}
                    source={moodImages.find((moodImage) => moodImage.name === moodData.mood).image}
                />
                <View>
                    <Text style={styles.moodText}>{moodData.mood}</Text>
                    <Text style={styles.dateText}>{selectedDate.toLocaleDateString()}</Text>
                </View>
            </View>

            <View style={styles.moodDataBottomRow}>
                <Text style={styles.noteText}>{moodData.note}</Text>
                <Button onPress={() => console.log('press')} color={'secondary'} type={'pill'}>share</Button>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    moodDataContainer: {
        marginTop: 10,
        width: '100%',
        height: 90,
        padding: 10,
        borderRadius: 8,
        backgroundColor: '#FFFFFF',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.04,
        shadowRadius: 4,
        elevation: 4,
    },
    moodDataTopRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    moodDataBottomRow: {
        marginTop: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end'
    },
    moodImage: {
        width: 30,
        height: 30,
        resizeMode: 'contain',
        marginRight: 10,
    },
    moodText: {
        ...theme.typography.body,
    },
    dateText: {
        fontSize: 10,
        fontWeight: '300',
    },
    noteText: {
        ...theme.typography.journalText,
    },
});
