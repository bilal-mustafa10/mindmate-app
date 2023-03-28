import {Text, View} from '../../components/Themed';
import {styles, theme} from '../../constants/Theme';
import {Button} from '../../components/Button';
import {ScrollView} from 'react-native';
import {RootStackScreenProps} from '../../navigation/types';
import JournalComponent from '../../components/JournalComponent';
import Stats from '../../components/StatsComponent';

export default function MindverseScreen({ navigation }: RootStackScreenProps<'Root'>) {

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems:'center', backgroundColor:'transparent'}}>
                <Text style={theme.typography.subTitle}>MindStats</Text>
                <Button onPress={() => navigation.navigate('Root')} color={'secondary'} type={'pill'}>
                    edit
                </Button>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems:'center', backgroundColor:'transparent'}}>
                <Stats value={50} label={'Mental Health Score'}/>
                <Stats value={50} label={'Anxiety Score'}/>
                <Stats value={50} label={'Depression Score'}/>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems:'center', backgroundColor:'transparent'}}>
                <Text style={theme.typography.subTitle}>Journals</Text>
            </View>
            <JournalComponent navigation={navigation}/>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems:'center', backgroundColor:'transparent'}}>
                <Text style={theme.typography.subTitle}>Mental Health Resources</Text>
                <Button onPress={() => navigation.navigate('Root')} color={'secondary'} type={'pill'}>
                    view all
                </Button>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems:'center', backgroundColor:'transparent'}}>
                <Text style={theme.typography.subTitle}>Assessments</Text>
            </View>
        </ScrollView>
    );
}

