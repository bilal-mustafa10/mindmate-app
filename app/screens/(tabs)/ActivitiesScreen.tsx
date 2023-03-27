import {Text, TouchableOpacity, View} from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../../services/redux/store';
import { ScrollView } from 'react-native';
import Card from '../../components/Card';
import {styles, theme} from '../../constants/Theme';
import {RootStackScreenProps} from '../../navigation/types';


export default function ActivitiesScreen({ navigation }: RootStackScreenProps<'Root'>) {
    const { results } = useSelector((state: RootState) => state.activity);

    const activitiesByTag = {
        'Keep Active': [],
        'Give to others': [],
        'Take Notice': [],
        'Connect with others': [],
        'Keep Learning': [],
    };

    // Group activities by tag
    results?.forEach(activity => {
        activitiesByTag[activity.five_way_tag].push(activity);
    });

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            {Object.entries(activitiesByTag).map(([tag, activities]) => (
                <View key={tag}>
                    <Text style={theme.typography.subTitle}>{tag}</Text>
                    <ScrollView
                        horizontal
                        contentContainerStyle={styles.rowScrollContainer}
                        showsHorizontalScrollIndicator={false}
                    >
                        {activities.map((activity, index) => (
                            <TouchableOpacity key={index} onPress={() => navigation.navigate('ViewActivity', {activity: activity})}>
                                <Card type={'medium'} borderColor={theme.five_ways_theme[tag]} key={index} logo={activity.logo} title={activity.title} />
                            </TouchableOpacity>

                        ))}
                    </ScrollView>
                </View>
            ))}
        </ScrollView>
    );
}
