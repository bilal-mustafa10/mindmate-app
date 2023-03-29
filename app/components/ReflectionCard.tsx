import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Button} from './Button';
import {theme} from '../constants/Theme';

interface ReflectionCardProps {
    reflectionData: {
        title: string;
        date: string;
        note: string;
    };
}

export const ReflectionCard: React.FC<ReflectionCardProps> = ({reflectionData}) => {
    return (
        <View style={styles.reflectionDataContainer}>
            <Text style={styles.titleText}>{reflectionData.title}</Text>
            <Text style={styles.noteText}>{reflectionData.note}</Text>
            <View style={styles.buttonContainer}>
                <Button onPress={() => console.log('press')} color={'secondary'} type={'pill'}>share</Button>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    reflectionDataContainer: {
        marginTop: 10,
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
    titleText: {
        ...theme.typography.body,
        marginBottom: 8,
    },
    noteText: {
        ...theme.typography.journalText,
        marginBottom: 8,
    },
    buttonContainer: {
        alignSelf: 'flex-end', // Align the button to the start
    },
});
