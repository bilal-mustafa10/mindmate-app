import { useEffect, useState } from 'react';
import { styles, theme } from '../../constants/Theme';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { RootStackScreenProps } from '../../navigation/types';
import JournalComponent from '../../components/JournalComponent';
import Stats from '../../components/StatsComponent';
import { useSelector } from 'react-redux';
import { RootState } from '../../services/redux/store';
import Card from '../../components/Card';
import Header from '../../components/Header';
import SectionHeader from '../../components/SectionHeader';
import { RealmContext } from '../../services/realm/config';
import { Stat } from '../../constants/Stats';
import { disclamerMessage } from '../../constants/disclamer';

export default function MindverseScreen({ navigation }: RootStackScreenProps<'Root'>) {
    const { results: resourceResults } = useSelector((state: RootState) => state.resources);
    const { results: assessmentResults } = useSelector((state: RootState) => state.assessment);
    const [userStats, setUserStats] = useState([]);
    const stats = RealmContext.useQuery('UserStat');
    const assessment = RealmContext.useQuery('UserAssessment');

    useEffect(() => {
        const currentUserStats = Stat.filter((shortcut) =>
            stats.some((userStat) => userStat['stat_id'] === shortcut.id)
        );

        setUserStats(currentUserStats);
    }, [stats]);

    console.log('userStats', userStats);

    return (
        <>
            <Header title={'Mindverse'} />
            <ScrollView style={[styles.mainContainer, styles.paddingHorizontal]} showsVerticalScrollIndicator={false}>
                <SectionHeader title="MindStats" />
                <View style={styles.mindStatsContainer}>
                    {userStats &&
                        userStats.length > 0 &&
                        userStats.map((stat) => {
                            const thirtyDaysAgo = new Date();
                            thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

                            const relevantAssessments = assessment.filter(
                                (assmt) => assmt['type'] === stat.name && new Date(assmt['date']) >= thirtyDaysAgo
                            );

                            const averageScore =
                                relevantAssessments.length > 0
                                    ? relevantAssessments.reduce((sum, assmt) => sum + assmt['score'], 0) /
                                      relevantAssessments.length
                                    : 0;
                            return (
                                <Stats
                                    key={stat.id}
                                    value={averageScore}
                                    label={stat.name}
                                    size={'small'}
                                    empty={relevantAssessments.length === 0}
                                />
                            );
                        })}
                </View>

                <SectionHeader title="Journals" />
                <JournalComponent navigation={navigation} />

                <SectionHeader
                    title="Mental Health Resources"
                    buttonText="view all"
                    onButtonPress={() => navigation.navigate('AllResources')}
                />

                <ScrollView
                    horizontal
                    contentContainerStyle={styles.rowScrollContainer}
                    showsHorizontalScrollIndicator={false}
                >
                    {resourceResults &&
                        resourceResults.length > 0 &&
                        resourceResults.slice(0, 5).map((resource, index) => {
                            return (
                                <TouchableOpacity
                                    onPress={() =>
                                        navigation.navigate('ViewResource', {
                                            resource: resource,
                                            title: resource.title,
                                        })
                                    }
                                    style={styles.transparentBackground}
                                    key={resource.id}
                                >
                                    <Card
                                        key={resource.id}
                                        type={'medium'}
                                        borderColor={theme.card_theme[index % 4]}
                                        logo={resource.logo}
                                        title={resource.title}
                                        isCompleted={false}
                                    />
                                </TouchableOpacity>
                            );
                        })}
                </ScrollView>

                <SectionHeader title="Assessments" />
                <ScrollView
                    horizontal
                    contentContainerStyle={styles.rowScrollContainer}
                    showsHorizontalScrollIndicator={false}
                >
                    {assessmentResults &&
                        assessmentResults.length > 0 &&
                        assessmentResults.slice(0, 5).map((assessment, index) => {
                            return (
                                <TouchableOpacity
                                    style={styles.transparentBackground}
                                    key={assessment.id}
                                    onPress={() =>
                                        navigation.navigate('AssessmentInfo', {
                                            assessment: assessment,
                                            title: assessment.title,
                                        })
                                    }
                                >
                                    <Card
                                        key={assessment.id}
                                        type={'medium'}
                                        borderColor={theme.card_theme[index % 4]}
                                        logo={assessment.logo}
                                        title={assessment.title}
                                        isCompleted={false}
                                    />
                                </TouchableOpacity>
                            );
                        })}
                </ScrollView>
                <View style={styles.disclaimerContainer}>
                    <Text style={styles.disclaimerText}>{disclamerMessage}</Text>
                </View>
            </ScrollView>
        </>
    );
}
