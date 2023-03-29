import {styles} from '../../constants/Theme';
import {View} from 'react-native';
import {RootStackScreenProps} from '../../navigation/types';
import * as React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {CalendarComponent, IReflectionDataProps} from '../../components/CalendarComponent';

const sampleReflectionData: IReflectionDataProps[] = [
    {
        date: '2023-02-02T08:00:00',
        title: 'First Day of New Job',
        note: 'Started new job at XYZ company. Excited for new challenges and opportunities.'
    },
    {
        date: '2023-03-02T08:00:00',
        title: 'Monthly Check-In',
        note: 'Had a productive meeting with my supervisor. Discussed progress on projects and received positive feedback.'
    },
    {
        date: '2023-03-02T12:00:00',
        title: 'Lunch with Co-Workers',
        note: 'Had a fun time bonding with co-workers over lunch. Enjoyed learning more about their interests and hobbies.'
    },
    {
        date: '2023-03-28T16:00:00',
        title: 'Project Milestone',
        note: 'Successfully completed a major project milestone. Proud of the hard work and collaboration that went into achieving this goal.'
    }
];


export default function SelfReflectionJournal({navigation}: RootStackScreenProps<'SelfReflectionJournal'>) {
    const insets = useSafeAreaInsets();


    return (
        <View style={[styles.container, {paddingTop: insets.top * 1.75}]}>
            <CalendarComponent type='reflection' data={sampleReflectionData} />
        </View>

    );
}
