import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';

interface MoodComponentProps {
    onAction: (id: string) => void;
    mood: string;
    moodImages: {
        id: number;
        image: any;
        name: string;
    }[];
}

const MoodComponent = ({ moodImages, onAction, mood }: MoodComponentProps) => {
    return (
        <View style={styles.gridContainer}>
            {moodImages.map((moodItem) => (
                <TouchableOpacity
                    key={moodItem.id}
                    onPress={() => {
                        onAction(moodItem.name);
                    }}
                    style={[
                        styles.moodCard,
                        {
                            backgroundColor: moodItem.name === mood ? '#D7F9DA' : '#FFFFFF', // Conditionally apply the background color
                        },
                    ]}
                >
                    <FastImage source={moodItem.image} style={styles.moodImage} />
                    <Text style={styles.moodName}>{moodItem.name}</Text>
                </TouchableOpacity>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
    },
    moodCard: {
        width: '27%',
        height: 90,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
        padding: 10,
        borderColor: '#D9D9D9',
        borderWidth: 0.5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 1, // Only needed for Android to support boxShadow
        borderRadius: 10,
    },
    moodImage: {
        height: 35,
        width: 35,
    },
    moodName: {
        fontFamily: 'outfit-medium',
        fontSize: 14,
        marginTop: 12,
        textAlign: 'center',
    },
});

export default MoodComponent;
