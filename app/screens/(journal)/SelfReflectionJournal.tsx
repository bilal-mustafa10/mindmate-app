import {styles} from '../../constants/Theme';
import {View} from 'react-native';
import {RootStackScreenProps} from '../../navigation/types';
import * as React from 'react';
import {CalendarComponent, IReflectionDataProps} from '../../components/CalendarComponent';
import {RealmContext} from '../../services/realm/config';
import Header from '../../components/Header';

const { useQuery } = RealmContext;
export default function SelfReflectionJournal({navigation}: RootStackScreenProps<'SelfReflectionJournal'>) {
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
        <>
            <Header
                showAvatar={false}
                onHeaderLeftPress={()=>{navigation.goBack();}}
                title={'Self Reflection Journal'}
                showBackButton={true}
            />
            <View style={styles.container}>
                {reflectionData !== null && <CalendarComponent type='reflection' data={reflectionData}  navigation={navigation}/>}
            </View>
        </>
    );
}
