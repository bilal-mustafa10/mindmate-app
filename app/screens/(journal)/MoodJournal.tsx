import {styles} from '../../constants/Theme';
import {ScrollView} from 'react-native';
import {RootStackScreenProps} from '../../navigation/types';
import * as React from 'react';
import {CalendarComponent, IMoodDataProps} from '../../components/CalendarComponent';
import {RealmContext} from '../../services/realm/config';
import Header from '../../components/Header';


const { useQuery } = RealmContext;
export default function MoodJournal({navigation}: RootStackScreenProps<'MoodJournal'>) {
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
        <>
            <Header
                showAvatar={false}
                onHeaderLeftPress={()=>{navigation.goBack();}}
                title={'Mood Journal'}
                showBackButton={true}
            />
            <ScrollView style={styles.container}>
                {moodData !== null && <CalendarComponent type='mood' data={moodData} navigation={navigation} />}
            </ScrollView>
        </>


    );
}
