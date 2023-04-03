import {Text, View} from '../../components/Themed';
import {styles, theme} from '../../constants/Theme';
import {Button} from '../../components/Button';
import {ScrollView, TouchableOpacity} from 'react-native';
import {RootStackScreenProps} from '../../navigation/types';
import JournalComponent from '../../components/JournalComponent';
import Stats from '../../components/StatsComponent';
import {useSelector} from 'react-redux';
import {RootState} from '../../services/redux/store';
import Card from '../../components/Card';

export default function MindverseScreen({ navigation }: RootStackScreenProps<'Root'>) {
    const {results} = useSelector((state: RootState) => state.resources);

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
                <Button onPress={() => navigation.navigate('AllResources')} color={'secondary'} type={'pill'}>
                    view all
                </Button>
            </View>
            <ScrollView
                horizontal
                contentContainerStyle={styles.rowScrollContainer}
                showsHorizontalScrollIndicator={false}
            >
                {results && results.length > 0 && results.slice(0,5).map((resource, index) => {
                    return (
                        <TouchableOpacity onPress={() => navigation.navigate('ViewResource', {resource: resource, title: resource.title})} style={{backgroundColor: 'transparent'}} key={index}>
                            <Card
                                key={index}
                                type={'medium'}
                                borderColor={theme.card_theme[index % 4]}
                                logo={resource.logo}
                                title={resource.title}
                                isCompleted={false}
                            />
                        </TouchableOpacity>
                    );})}
            </ScrollView>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems:'center', backgroundColor:'transparent'}}>
                <Text style={theme.typography.subTitle}>Assessments</Text>
            </View>
        </ScrollView>
    );
}

