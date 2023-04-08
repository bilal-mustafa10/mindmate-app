import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from './Button';
import { theme } from '../constants/Theme';

interface ReflectionCardProps {
    reflectionData: {
        title: string;
        date: string;
        note: string;
    };
}

export const ReflectionCard: React.FC<ReflectionCardProps> = ({ reflectionData }) => {
    const time = new Date(reflectionData.date)
        .toLocaleTimeString([], {
            hour: 'numeric',
            minute: '2-digit',
        })
        .replace(/(\d)([AP]M)/i, '$1 $2');
    return (
        <View style={styles.reflectionDataContainer}>
            <Text style={styles.titleText}>{reflectionData.title}</Text>
            <Text style={styles.dateText}>{time}</Text>
            <Text style={styles.noteText}>{reflectionData.note}</Text>
            <View style={styles.buttonContainer}>
                <Button onPress={() => console.log('press')} color={'secondary'} type={'pill'}>
                    Share
                </Button>
            </View>
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
    noteText: {
        ...theme.typography.bodyMedium,
        color: '#575757',
        fontSize: 13,
        marginBottom: 8,
        marginRight: 12,
        textAlign: 'left',
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
