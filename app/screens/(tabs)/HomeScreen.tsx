import { useEffect, useState } from 'react';
import { styles as globalStyles } from '../../constants/Theme';
import { RootStackScreenProps } from '../../navigation/types';
import InspirationBoxComponent from '../../components/InspirationComponent';
import { shortcuts } from '../../constants/Shortcuts';
import ShortcutComponent from '../../components/ShortcutComponent';
import RecommendedActivity from '../../components/RecommendedActivity';
import { ScrollView, TouchableOpacity } from 'react-native';
import { quotes } from '../../constants/quotes';
import { RealmContext } from '../../services/realm/config';
import { useSelector } from 'react-redux';
import { RootState } from '../../services/redux/store';
import Header from '../../components/Header';
import SectionHeader from '../../components/SectionHeader';

const { useQuery } = RealmContext;
export default function HomeScreen({ navigation }: RootStackScreenProps<'Root'>) {
    const inspiration = quotes[Math.floor(Math.random() * quotes.length)];
    const userShortcutsData = useQuery('UserShortcut');
    const userData = useQuery('UserData');
    const [userShortcuts, setUserShortcuts] = useState([]);
    const { results } = useSelector((state: RootState) => state.activity);
    const name = userData[0]['first_name'] + ' ' + userData[0]['last_name'];
    const avatarColor = userData[0]['avatar_color'];
    const [showScribble, setShowScribble] = useState(false);
    const [newQuote] = useState<string>('');

    const toggleScribble = () => {
        setShowScribble(!showScribble);
    };

    useEffect(() => {
        const newUserShortcuts = shortcuts.filter((shortcut) =>
            userShortcutsData.some((userShortcut) => userShortcut['shortcut_id'] === shortcut.id)
        );

        setUserShortcuts(newUserShortcuts);
    }, [userShortcutsData]);

    return (
        <>
            <Header
                showAvatar={true}
                avatarColor={avatarColor}
                headerRight={require('../../assets/images/help.png')}
                onHeaderRightPress={() => {
                    console.log('');
                }}
                onHeaderLeftPress={() => {
                    navigation.navigate('Profile', {
                        id: userData[0]['username'],
                        firstName: userData[0]['first_name'],
                        lastName: userData[0]['last_name'],
                        avatarColor: avatarColor,
                    });
                }}
                name={name}
            />
            <ScrollView style={globalStyles.container} showsVerticalScrollIndicator={false}>
                <SectionHeader
                    title="Daily Inspiration"
                    buttonText="share"
                    onButtonPress={() => navigation.navigate('Root')}
                />
                <TouchableOpacity onPress={toggleScribble}>
                    <InspirationBoxComponent inspiration={newQuote !== '' ? newQuote : inspiration} />
                </TouchableOpacity>
                <SectionHeader
                    title="Shortcuts"
                    buttonText="edit"
                    onButtonPress={() => navigation.navigate('EditShortcuts')}
                />
                <ShortcutComponent shortcuts={userShortcuts} navigation={navigation} />
                <SectionHeader title="Recommended Activities" />
                <RecommendedActivity activities={results} navigation={navigation} />
            </ScrollView>
        </>
    );
}
