import { Text, View, StyleSheet } from 'react-native';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../services/redux/store';
import { ScrollView } from 'react-native';
import SmallCard from '../../components/SmallCard';


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
                <View style={styles.tagContainer} key={tag}>
                    <Text style={styles.tagText}>{tag}</Text>
                    <ScrollView
                        horizontal
                        contentContainerStyle={styles.activitiesContainer}
                        showsHorizontalScrollIndicator={false}
                    >
                        {activities.map((activity, index) => (
                            <SmallCard key={index} logo={activity.logo} title={activity.title} />
                        ))}
                    </ScrollView>
                </View>
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
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
});
