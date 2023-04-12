import { ScrollView, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../../services/redux/store';
import Card from '../../components/Card';
import { styles, theme } from '../../constants/Theme';
import { RootStackScreenProps } from '../../navigation/types';
import { RealmContext } from '../../services/realm/config';
import { useState } from 'react';
import Header from '../../components/Header';
import { ActivityResults } from '../../services/redux/activitySlice';
import SectionHeader from '../../components/SectionHeader';

const { useQuery } = RealmContext;

export default function ActivitiesScreen({ navigation }: RootStackScreenProps<'Root'>) {
    const { results } = useSelector((state: RootState) => state.activity);
    const [favouriteSelected, setFavouriteSelected] = useState(false);
    const userActivityData = useQuery('UserActivity');
    const userFavoriteActivities = useQuery('UserActivityFavourite');
    const headerImage = favouriteSelected
        ? require('../../assets/images/favourite.png')
        : require('../../assets/images/favourite-empty.png');

    const filteredResults = favouriteSelected
        ? results?.filter((activity) => {
              return userFavoriteActivities.some((userFavourite) => userFavourite['activity_id'] === activity.id);
          })
        : null;

    const activitiesByTag = {
        'Keep Active': [],
        'Give to others': [],
        'Take Notice': [],
        'Connect with others': [],
        'Keep Learning': [],
    };

    // Group activities by tag
    (filteredResults || results)?.forEach((activity) => {
        activitiesByTag[activity.five_way_tag].push(activity);
    });

    const renderActivities = (tag: string, activities: ActivityResults[]) => {
        if (activities.length === 0) return null;

        return (
            <View key={tag} style={styles.tagContainer}>
                <SectionHeader title={tag} backgroundColor={theme.five_ways_theme[tag]} />
                <ScrollView
                    horizontal
                    contentContainerStyle={styles.rowScrollContainer}
                    showsHorizontalScrollIndicator={false}
                >
                    {activities.map((activity) => {
                        const isCompleted = userActivityData.some(
                            (userActivity) => userActivity['activity_id'] === activity.id
                        );

                        return (
                            <TouchableOpacity
                                key={activity.id}
                                onPress={() =>
                                    navigation.navigate('ViewActivity', {
                                        activity: activity,
                                        isCompleted: isCompleted,
                                    })
                                }
                            >
                                <Card
                                    type={'medium'}
                                    borderColor={theme.five_ways_theme[tag]}
                                    logo={activity.logo}
                                    title={activity.title}
                                    isCompleted={isCompleted}
                                />
                            </TouchableOpacity>
                        );
                    })}
                </ScrollView>
            </View>
        );
    };

    return (
        <>
            <Header
                title={'Activities'}
                headerRight={headerImage}
                onHeaderRightPress={() => {
                    setFavouriteSelected(!favouriteSelected);
                }}
            />
            <ScrollView style={[styles.mainContainer, styles.activityPadding]} showsVerticalScrollIndicator={false}>
                {Object.entries(activitiesByTag).map(([tag, activities]) => renderActivities(tag, activities))}
            </ScrollView>
        </>
    );
}
