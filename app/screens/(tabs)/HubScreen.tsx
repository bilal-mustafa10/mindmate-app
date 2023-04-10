import { styles, theme } from '../../constants/Theme';
import Header from '../../components/Header';
import { ScrollView, View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { getHub } from '../../services/api/userEndpoints';
import { IHubData } from '../../services/interface/IHubData';
import ActivityCard from '../../components/AcyivityCard';
import MoodCard from '../../components/MoodCard';
import { IMoodDataProps } from '../../components/CalendarComponent';

export default function HubScreen() {
    const [hubData, setHubData] = useState<IHubData>(null);

    useEffect(() => {
        const getHubData = async () => {
            const hubData = await getHub();
            setHubData(hubData);
        };

        getHubData();
    }, []);

    return (
        <>
            <Header title={'MindSpace'} />
            {hubData !== null && hubData.results.length > 0 ? (
                <ScrollView style={styles.mainContainer} showsVerticalScrollIndicator={false}>
                    {hubData.results.map((data, index) => {
                        if (data.type === 'activity') {
                            return (
                                <ActivityCard
                                    key={data.id}
                                    activity_id={data.activity_id}
                                    id={data.id}
                                    date={data.datetime}
                                    likes={0}
                                    photo={data.photos}
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

                            return <MoodCard key={`mood-${index}`} moodData={moodData as IMoodDataProps} />;
                        }
                    })}
                </ScrollView>
            ) : (
                <View
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100%',
                    }}
                >
                    <Text style={theme.typography.SubHeading}>No Data</Text>
                </View>
            )}
        </>
    );
}
