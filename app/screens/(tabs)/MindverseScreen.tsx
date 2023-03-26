import {Text, View} from '../../components/Themed';
import {styles} from '../../constants/Theme';
import {Button} from '../../components/Button';
import {shortcuts} from '../../constants/Shortcuts';
import RecommendedActivity from '../../components/RecommendedActivity';
import {ScrollView} from 'react-native';
import {RootStackScreenProps} from '../../navigation/types';
import JournalComponent from '../../components/JournalComponent';

export default function MindverseScreen({ navigation }: RootStackScreenProps<'Root'>) {

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems:'center', backgroundColor:'transparent' }}>
                <Text style={styles.subTitle}>MindStats</Text>
                <Button onPress={() => navigation.navigate('Root')} color={'secondary'} type={'pill'}>
                    edit
                </Button>
            </View>
            <RecommendedActivity activities={shortcuts}/>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems:'center', backgroundColor:'transparent' }}>
                <Text style={styles.subTitle}>Journals</Text>
            </View>
            <JournalComponent/>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems:'center', backgroundColor:'transparent' }}>
                <Text style={styles.subTitle}>Mental Health Resources</Text>
                <Button onPress={() => navigation.navigate('Root')} color={'secondary'} type={'pill'}>
                    view all
                </Button>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems:'center', backgroundColor:'transparent' }}>
                <Text style={styles.subTitle}>Assessments</Text>
            </View>
        </ScrollView>
    );
}

