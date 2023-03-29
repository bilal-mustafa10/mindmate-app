import {styles} from '../../constants/Theme';
import {View} from 'react-native';
import {RootStackScreenProps} from '../../navigation/types';
import * as React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {CalendarComponent, IMoodDataProps} from '../../components/CalendarComponent';

const sampleMoodData: IMoodDataProps[] = [
    { date: '2023-02-02T08:00:00', mood: 'Happy', note: 'I had a great day today!' },
    { date: '2023-03-02T08:00:00', mood: 'Happy', note: 'I had a great day today!' },
    { date: '2023-03-02T12:00:00', mood: 'Unsure', note: 'I had an ok day today!' },
    { date: '2023-03-28T16:00:00', mood: 'Happy', note: 'I had a great day today!' },
];

export default function MoodJournal({navigation}: RootStackScreenProps<'MoodJournal'>) {
    const insets = useSafeAreaInsets();


    return (
        <View style={[styles.container, {paddingTop: insets.top * 1.75}]}>
            <CalendarComponent type='mood' data={sampleMoodData} />
        </View>

    );
}
