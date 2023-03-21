import { Text, View, StyleSheet } from 'react-native';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../services/redux/store';
import { styles } from '../../constants/Theme';
import FastImage from 'react-native-fast-image';
import {ScrollView} from 'react-native';

export default function ActivitiesScreen() {
    const { results } = useSelector((state: RootState) => state.activity);

    const activitiesByTag = {
        'Keep Active': [],
        'Give to others': [],
        'Keep Notice': [],
        'Connect with others': [],
        'Keep Learning': [],
    };

    // Group activities by tag
    results?.forEach((activity) => {
        activitiesByTag[activity.five_way_tag].push(activity);
    });

    return (
        <ScrollView style={styles.container}>
            {Object.entries(activitiesByTag).map(([tag, activities]) => (
                <View key={tag}>
                    <Text style={{ fontWeight: 'bold', marginVertical: 8 }}>{tag}</Text>
                    <ScrollView
                        horizontal
                        contentContainerStyle={style.activitiesContainer}
                        showsHorizontalScrollIndicator={false}
                    >
                        {activities.map((activity, index) => (
                            <View key={index} style={style.activity}>
                                <View style={style.activityBox}>
                                    <FastImage source={{ uri: activity.logo.file }} style={{ width: 40, height: 40 }} />
                                    <Text style={{fontSize:12, fontFamily:'outfit-semibold'}}>{activity.title}</Text>
                                </View>
                            </View>
                        ))}
                    </ScrollView>
                </View>
            ))}
        </ScrollView>
    );
}

const style = StyleSheet.create({
    container: {
        flex: 1,
    },
    activitiesContainer: {
        flexDirection: 'row',
        overflow: 'scroll',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    activity: {
        marginVertical: 4,
        marginRight: 8,
    },
    activityBox: {
        width: 140,
        height: 115,
        backgroundColor: '#ffffff',
        padding: 15,
        borderRadius: 16,
        marginHorizontal: 4,
        justifyContent: 'space-between',
    },
});
