import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Card from './Card';
import {theme} from '../constants/Theme';
import {ActivityResults} from '../services/redux/activitySlice';
import {RealmContext} from '../services/realm/config';
import {NavigationProp} from '@react-navigation/native';
import {RootStackParamList} from '../navigation/types';


interface ShortcutsProps {
    activities: ActivityResults[];
    navigation: NavigationProp<RootStackParamList>;
}

const {useQuery} = RealmContext;
const RecommendedActivity = ({activities, navigation}: ShortcutsProps) => {
    const userActivityData = useQuery('UserActivity');

    // Filter out activities that have already been completed
    const activitiesToDisplay = activities.filter((activity) => {
        return !userActivityData.some((userActivity) => userActivity['activity_id'] === activity.id);
    }).slice(0, 4);



    return (
        <View style={styles.container}>
            {activitiesToDisplay.map((activity, index) => (
                <View key={index} style={index % 2 === 0 ? { marginBottom: 10 } : {}}>
                    <TouchableOpacity onPress={()=>{navigation.navigate('ViewActivity', {activity: activity, isCompleted: false});}}>
                        <Card
                            type={'large'}
                            key={index}
                            logo={activity.logo}
                            title={activity.title}
                            borderColor={theme.card_theme[index]}
                        />
                    </TouchableOpacity>
                </View>
            ))}
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
});


export default RecommendedActivity;
