import { Text, View, StyleSheet } from 'react-native';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../services/redux/store';
import { styles } from '../../constants/Theme';
import FastImage from 'react-native-fast-image';
import { ScrollView } from 'react-native';

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
    results?.forEach(activity => {
        activitiesByTag[activity.five_way_tag].push(activity);
    });

    return (
        <ScrollView style={styles.container}>
            {Object.entries(activitiesByTag).map(([tag, activities]) => (
                <View style={style.tagContainer} key={tag}>
                    <Text style={style.tagText}>{tag}</Text>
                    <ScrollView
                        horizontal
                        contentContainerStyle={style.activitiesContainer}
                        showsHorizontalScrollIndicator={false}
                    >
                        {activities.map((activity, index) => (
                            <View style={style.activityBox} key={index}>
                                <FastImage source={{ uri: activity.logo.file }} style={style.activityImage} />
                                <Text style={style.activityTitle}>{activity.title}</Text>
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
    tagContainer: {
        margin: 10,
    },
    tagText: {
        fontSize: 16,
        fontFamily: 'outfit-semibold',
        marginVertical: 8,
    },
    activitiesContainer: {
        flexDirection: 'row',
        overflow: 'scroll',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    activityBox: {
        width: 140,
        height: 115,
        backgroundColor: '#ffffff',
        padding: 15,
        borderRadius: 8,
        borderColor: '#3960A8',
        borderWidth: 1,
        marginHorizontal: 4,
        justifyContent: 'space-between',
    },
    activityImage: {
        width: 40,
        height: 40,
    },
    activityTitle: {
        fontSize: 12,
        fontFamily: 'outfit-semibold',
        textAlign: 'left',
    },
});
