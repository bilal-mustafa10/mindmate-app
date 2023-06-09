import { styles, theme } from '../../constants/Theme';
import Header from '../../components/Header';
import { ScrollView, View, Text, RefreshControl } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { getHub } from '../../services/api/userEndpoints';
import { IHubData } from '../../services/interface/IHubData';
import ActivityCard from '../../components/ActivityCard';
import MoodCard from '../../components/MoodCard';
import { IMoodDataProps, IReflectionDataProps } from '../../components/CalendarComponent';
import { ReflectionCard } from '../../components/ReflectionCard';
import { disclamerMessage } from '../../constants/disclamer';

export default function HubScreen() {
    const [hubData, setHubData] = useState<IHubData>(null);
    const [refreshing, setRefreshing] = useState(false);

    const getHubData = useCallback(async () => {
        setRefreshing(true);
        const hubData = await getHub();
        // order by date
        hubData.results.sort((a, b) => {
            const dateA = new Date(a.datetime);
            const dateB = new Date(b.datetime);
            return dateB.getTime() - dateA.getTime();
        });
        setHubData(hubData);
        setRefreshing(false);
    }, []);

    const onRefresh = async () => {
        await getHubData();
    };

    useEffect(() => {
        getHubData();
    }, [getHubData]);

    return (
        <>
            <Header title={'MindSpace'} />
            {hubData !== null && hubData.results.length > 0 ? (
                <ScrollView
                    style={[styles.mainContainer, styles.paddingTop, styles.paddingHorizontal]}
                    showsVerticalScrollIndicator={false}
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                >
                    {hubData.results.map((data) => {
                        if (data.type === 'activity') {
                            return (
                                <ActivityCard
                                    key={data.id}
                                    ActivityData={{
                                        activity_id: data.activity_id,
                                        is_shared: true,
                                        likes: data.likes,
                                        photo: data.photos,
                                        type: 'hub',
                                        completed: true,
                                        hub_id: data.id,
                                        date: data.datetime,
                                    }}
                                />
                            );
                        } else if (data.type === 'mood') {
                            const moodData: IMoodDataProps = {
                                mood: data.mood,
                                date: data.datetime,
                                note: data.notes,
                                is_shared: true,
                                likes: data.likes,
                                hub_id: data.id,
                                type: 'hub',
                            };

                            return <MoodCard key={data.id} moodData={moodData} />;
                        } else if (data.type === 'reflection') {
                            const reflectionData: IReflectionDataProps = {
                                date: data.datetime,
                                title: data.title,
                                note: data.notes,
                                is_shared: true,
                                likes: data.likes,
                                hub_id: data.id,
                                type: 'hub',
                            };

                            return <ReflectionCard key={data.id} reflectionData={reflectionData} />;
                        }
                    })}
                    <View style={styles.disclaimerContainer}>
                        <Text style={styles.disclaimerText}>{disclamerMessage}</Text>
                    </View>
                </ScrollView>
            ) : (
                <View style={styles.noDataContainer}>
                    <Text style={theme.typography.SubHeading}>No Data</Text>
                    <View style={styles.disclaimerContainer}>
                        <Text style={styles.disclaimerText}>{disclamerMessage}</Text>
                    </View>
                </View>
            )}
        </>
    );
}
