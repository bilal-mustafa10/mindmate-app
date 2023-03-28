import {styles, theme} from '../../constants/Theme';
import {View, Text} from 'react-native';
import {RootStackScreenProps} from '../../navigation/types';
import * as React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Button} from '../../components/Button';
import {CalendarComponent} from '../../components/CalendarComponent';

export default function MoodJournal({navigation}: RootStackScreenProps<'MoodJournal'>) {
    const insets = useSafeAreaInsets();
    const sampleMoodData = [
        {
            date: '2023-03-28',
            mood: 'happy',
            note: 'I had a great day today!',
        },
        {
            date: '2023-03-27',
            mood: 'unsure',
            note: 'I had an ok day today!',
        },
        {
            date: '2022-03-26',
            mood: 'happy',
            note: 'I had a great day today!',
        }
    ];

    return (
        <View style={[styles.container, {paddingTop: insets.top * 1.75}]}>
            <CalendarComponent/>
        </View>

    );
}
