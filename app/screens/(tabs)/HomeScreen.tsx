import { useEffect, useState } from 'react';
import { styles as globalStyles } from '../../constants/Theme';
import { RootStackScreenProps } from '../../navigation/types';
import InspirationBoxComponent from '../../components/InspirationComponent';
import { shortcuts } from '../../constants/Shortcuts';
import ShortcutComponent from '../../components/ShortcutComponent';
import RecommendedActivity from '../../components/RecommendedActivity';
import { ScrollView, View } from 'react-native';
import { quotes } from '../../constants/quotes';
import { RealmContext } from '../../services/realm/config';
import { useSelector } from 'react-redux';
import { RootState } from '../../services/redux/store';
import Header from '../../components/Header';
import SectionHeader from '../../components/SectionHeader';
import { InspirationModal } from '../../components/InspirationModal';

const { useQuery } = RealmContext;
export default function HomeScreen({ navigation }: RootStackScreenProps<'Root'>) {
    // const inspiration = quotes[Math.floor(Math.random() * quotes.length)];
    const userShortcutsData = useQuery('UserShortcut');
    const userData = useQuery('UserData');
    const [userShortcuts, setUserShortcuts] = useState([]);
    const { results } = useSelector((state: RootState) => state.activity);
    const name = userData[0]['first_name'] + ' ' + userData[0]['last_name'];
    const avatarColor = userData[0]['avatar_color'];
    const [showModal, setShowModal] = useState(false);
    const [quote, setQuote] = useState<{ quote: string; author: string } | null>(null);
    const [userQuote, setUserQuote] = useState<{ quote: string; author: string }>({ quote: '', author: '' });

    useEffect(() => {
        const newQuote = quotes[Math.floor(Math.random() * quotes.length)];
        setQuote(newQuote);
    }, []);

    useEffect(() => {
        const newUserShortcuts = shortcuts.filter((shortcut) =>
            userShortcutsData.some((userShortcut) => userShortcut['shortcut_id'] === shortcut.id)
        );

        setUserShortcuts(newUserShortcuts);
    }, [userShortcutsData]);

    const showInspirationModal = () => {
        console.log('show modal');
        setShowModal(true);
    };

    const hideInspirationModal = () => {
        setShowModal(false);
        const author = userData[0]['first_name'] + ' ' + userData[0]['last_name'] + ', Mindmate ';
        setUserQuote({ quote: userQuote.quote, author: author });
    };

    const handleSetUserQuote = (quote: string) => {
        setUserQuote({ quote: quote, author: '' });
    };

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
            <View>
                <ScrollView style={globalStyles.container} showsVerticalScrollIndicator={false}>
                    <SectionHeader
                        title="Daily Inspiration"
                        buttonText="create your own"
                        onButtonPress={showInspirationModal}
                    />
                    {quote !== null && userQuote.quote === '' ? (
                        <InspirationBoxComponent quote={quote.quote} author={quote.author} />
                    ) : (
                        <InspirationBoxComponent quote={userQuote.quote} author={userQuote.author} />
                    )}
                    <SectionHeader
                        title="Shortcuts"
                        buttonText="edit"
                        onButtonPress={() => navigation.navigate('EditShortcuts')}
                    />
                    <ShortcutComponent shortcuts={userShortcuts} navigation={navigation} />
                    <SectionHeader title="Recommended Activities" />
                    <RecommendedActivity activities={results} navigation={navigation} />
                </ScrollView>
            </View>
            {showModal && (
                <InspirationModal
                    showModal={showModal}
                    quote={userQuote.quote}
                    setQuote={handleSetUserQuote}
                    onClose={hideInspirationModal}
                />
            )}
        </>
    );
}
