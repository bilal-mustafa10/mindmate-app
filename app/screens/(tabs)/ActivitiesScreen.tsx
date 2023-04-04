import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '../../services/redux/store';
import Card from '../../components/Card';
import {styles, theme} from '../../constants/Theme';
import {RootStackScreenProps} from '../../navigation/types';
import {RealmContext} from '../../services/realm/config';
import {useState} from 'react';
import Header from '../../components/Header';


const {useQuery} = RealmContext;
export default function ActivitiesScreen({navigation}: RootStackScreenProps<'Root'>) {
    const {results} = useSelector((state: RootState) => state.activity);
    const [favouriteSelected, setFavouriteSelected] = useState(false);
    const userActivityData = useQuery('UserActivity');
    const userFavoriteActivities = useQuery('UserActivityFavourite');
    const headerImage = favouriteSelected ? require('../../assets/images/favourite.png') : require('../../assets/images/favourite-empty.png');

    const filteredResults = favouriteSelected ? results?.filter((activity) => {
        return userFavoriteActivities.some((userFavourite) => userFavourite['activity_id'] === activity.id);
    }) : null;

    const activitiesByTag = {
        'Keep Active': [],
        'Give to others': [],
        'Take Notice': [],
        'Connect with others': [],
        'Keep Learning': [],
    };

    // Group activities by tag
    (filteredResults || results)?.forEach(activity => {
        activitiesByTag[activity.five_way_tag].push(activity);
    });


    return (
        <>
            <Header title={'Activities'} headerRight={headerImage} onHeaderRightPress={() => {setFavouriteSelected(!favouriteSelected); }} />
            <ScrollView style={[styles.container]} showsVerticalScrollIndicator={false}>
                {Object.entries(activitiesByTag).map(([tag, activities]) => {

                    return (
                        <>
                            {activities.length > 0 &&
                                <View key={tag}>
                                    <Text style={theme.typography.subTitle}>{tag}</Text>
                                    <ScrollView
                                        key={tag}
                                        horizontal
                                        contentContainerStyle={styles.rowScrollContainer}
                                        showsHorizontalScrollIndicator={false}
                                    >
                                        {activities.map((activity, index) => {
                                            const isCompleted = userActivityData.some(
                                                (userActivity) => userActivity['activity_id'] === activity.id
                                            );

                                            return (
                                                <TouchableOpacity
                                                    key={index}
                                                    onPress={() => navigation.navigate('ViewActivity', {
                                                        activity: activity,
                                                        isCompleted: isCompleted
                                                    })}>
                                                    <Card
                                                        key={index}
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
                            }
                        </>
                    );
                })}
            </ScrollView>
        </>

    );
}
