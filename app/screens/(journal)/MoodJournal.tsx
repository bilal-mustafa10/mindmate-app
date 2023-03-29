import {styles, theme} from '../../constants/Theme';
import {View, Text} from 'react-native';
import {RootStackScreenProps} from '../../navigation/types';
import * as React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Button} from '../../components/Button';
import {CalendarComponent} from '../../components/CalendarComponent';

const sampleMoodData = [
    { date: '2023-03-02', mood: 'Happy', note: 'I had a great day today!' },
    { date: '2023-03-02', mood: 'Unsure', note: 'I had an ok day today!' },
    { date: '2023-03-28', mood: 'Happy', note: 'I had a great day today!' },
];

export default function MoodJournal({navigation}: RootStackScreenProps<'MoodJournal'>) {
    const insets = useSafeAreaInsets();


    return (
        <View style={[styles.container, {paddingTop: insets.top * 1.75}]}>
            <CalendarComponent moodData={sampleMoodData} />
        </View>

    );
}
