import {useEffect, useState} from 'react';
import {Text, View} from '../../components/Themed';
import {styles, theme} from '../../constants/Theme';
import {Button} from '../../components/Button';
import {RootStackScreenProps} from '../../navigation/types';
import InspirationBoxComponent from '../../components/InspirationComponent';
import {shortcuts} from '../../constants/Shortcuts';
import ShortcutComponent from '../../components/ShortcutComponent';
import RecommendedActivity from '../../components/RecommendedActivity';
import {ScrollView} from 'react-native';
import {quotes} from '../../constants/quotes';
import {logout} from '../../services/api/authEndpoints';
import {RealmContext} from '../../services/realm/config';
import {useSelector} from 'react-redux';
import {RootState} from '../../services/redux/store';


const { useQuery } = RealmContext;
export default function HomeScreen({ navigation }: RootStackScreenProps<'Root'>) {
    const inspiration = quotes[Math.floor(Math.random() * quotes.length)];
    const userShortcutsData = useQuery('UserShortcut');
    const [userShortcuts, setUserShortcuts] = useState([]);
    const {results} = useSelector((state: RootState) => state.activity);




    useEffect(() => {
        const newUserShortcuts = shortcuts.filter((shortcut) =>
            userShortcutsData.some((userShortcut) => userShortcut['shortcut_id'] === shortcut.id)
        );

        setUserShortcuts(newUserShortcuts);
    }, [userShortcutsData]);

    // TODO: write your own inspiration

    const handleLogout = async () => {
        console.log('logout');
        await logout();
        navigation.navigate('LandingPage');
    };

    return (
        <ScrollView style={[styles.container]} showsVerticalScrollIndicator={false}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems:'center', backgroundColor:'transparent'}}>
                <Text style={theme.typography.subTitle}>Daily Inspiration</Text>
                <Button onPress={() => navigation.navigate('Root')} color={'secondary'} type={'pill'}>
                    share
                </Button>
                <Button onPress={handleLogout} color={'secondary'} type={'pill'}>
                    LOGOUT
                </Button>
            </View>
            <InspirationBoxComponent inspiration={inspiration}/>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems:'center', backgroundColor:'transparent'}}>
                <Text style={theme.typography.subTitle}>Shortcuts</Text>
                <Button onPress={() => navigation.navigate('EditShortcuts')} color={'secondary'} type={'pill'}>
                    edit
                </Button>
            </View>
            <ShortcutComponent shortcuts={userShortcuts} navigation={navigation} />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems:'center', backgroundColor:'transparent'}}>
                <Text style={theme.typography.subTitle}>Recommended Activities</Text>
            </View>
            <RecommendedActivity activities={results} navigation={navigation}/>
        </ScrollView>
    );
}

