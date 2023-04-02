import {styles} from '../../constants/Theme';
import {View} from 'react-native';
import {RootStackScreenProps} from '../../navigation/types';
import * as React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {CalendarComponent, IReflectionDataProps} from '../../components/CalendarComponent';
import {RealmContext} from '../../services/realm/config';

const { useQuery } = RealmContext;
export default function SelfReflectionJournal({navigation}: RootStackScreenProps<'SelfReflectionJournal'>) {
    const insets = useSafeAreaInsets();
    const userReflectionData = useQuery('UserReflection');
    const [reflectionData, setReflectionData] = React.useState<IReflectionDataProps[] | null>(null);

    React.useEffect(() => {
        const reflectData: IReflectionDataProps[] = userReflectionData.map((mood) => {
            return {
                date: mood['date'].toISOString(),
                title: mood['title'],
                note: mood['notes'],
            };
        });
        setReflectionData(reflectData);
    }, [userReflectionData]);


    return (
        <View style={[styles.container, {paddingTop: insets.top * 1.75}]}>
            {reflectionData !== null && <CalendarComponent type='reflection' data={reflectionData}  navigation={navigation}/>}
        </View>

    );
}
