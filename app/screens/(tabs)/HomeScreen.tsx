import {Text, View} from '../../components/Themed';
import {styles} from '../../constants/Theme';
import {Button} from '../../components/Button';
import {RootStackScreenProps} from '../../navigation/types';
import InspirationBoxComponent from '../../components/InspirationComponent';
import {shortcuts} from '../../constants/Shortcuts';
import ShortcutComponent from '../../components/ShortcutComponent';
import RecommendedActivity from '../../components/RecommendedActivity';
import {ScrollView} from 'react-native';

export default function HomeScreen({ navigation }: RootStackScreenProps<'Root'>) {
    const inspiration = '"You are not your illness. You have an individual story to tell. You have a name, a history, a personality. Staying yourself is part of the battle." - Julian Seifter';

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems:'center', backgroundColor:'transparent' }}>
                <Text style={styles.subTitle}>Daily Inspiration</Text>
                <Button onPress={() => navigation.navigate('Root')} color={'secondary'} type={'pill'}>
                    share
                </Button>
            </View>
            <InspirationBoxComponent inspiration={inspiration}/>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems:'center', backgroundColor:'transparent' }}>
                <Text style={styles.subTitle}>Shortcuts</Text>
                <Button onPress={() => navigation.navigate('Root')} color={'secondary'} type={'pill'}>
                    edit
                </Button>
            </View>
            <ShortcutComponent shortcuts={shortcuts} navigation={navigation} />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems:'center', backgroundColor:'transparent' }}>
                <Text style={styles.subTitle}>Recommended Activities</Text>
            </View>
            <RecommendedActivity activities={shortcuts}/>
        </ScrollView>
    );
}

