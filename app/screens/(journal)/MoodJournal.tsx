import {styles} from '../../constants/Theme';
import {View} from 'react-native';
import {RootStackScreenProps} from '../../navigation/types';
import * as React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {CalendarComponent, IMoodDataProps} from '../../components/CalendarComponent';
import {RealmContext} from '../../services/realm/config';


const { useQuery } = RealmContext;
export default function MoodJournal({navigation}: RootStackScreenProps<'MoodJournal'>) {
    const insets = useSafeAreaInsets();
    const userMoodData = useQuery('UserMood');
    const [moodData, setMoodData] = React.useState<IMoodDataProps[] | null>(null);

    React.useEffect(() => {
        const moodData: IMoodDataProps[] = userMoodData.map((mood) => {

            return {
                date: mood['date'].toISOString(),
                mood: mood['mood'],
                note: mood['notes'],
            };
        });
        setMoodData(moodData);
    }, [userMoodData]);


    return (
        <View style={[styles.container, {paddingTop: insets.top * 1.75}]}>
            {moodData !== null && <CalendarComponent type='mood' data={moodData} navigation={navigation} />}
        </View>

    );
}
