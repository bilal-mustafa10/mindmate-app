import { View } from '../../components/Themed';
import { styles, theme } from '../../constants/Theme';
import { ScrollView, TouchableOpacity } from 'react-native';
import { RootStackScreenProps } from '../../navigation/types';
import JournalComponent from '../../components/JournalComponent';
import Stats from '../../components/StatsComponent';
import { useSelector } from 'react-redux';
import { RootState } from '../../services/redux/store';
import Card from '../../components/Card';
import Header from '../../components/Header';
import SectionHeader from '../../components/SectionHeader';

export default function MindverseScreen({ navigation }: RootStackScreenProps<'Root'>) {
    const { results: resourceResults } = useSelector((state: RootState) => state.resources);
    const { results: assessmentResults } = useSelector((state: RootState) => state.assessment);

    return (
        <>
            <Header title={'Mindverse'} />
            <ScrollView style={[styles.mainContainer, styles.paddingHorizontal]} showsVerticalScrollIndicator={false}>
                <SectionHeader title="MindStats" buttonText="edit" onButtonPress={() => navigation.navigate('Root')} />
                <View style={styles.mindStatsContainer}>
                    <Stats value={80} label={'Mental Health'} />
                    <Stats value={12} label={'Anxiety'} />
                    <Stats value={20} label={'Depression'} />
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
                                        type={'small'}
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
                        assessmentResults.slice(0, 5).map((resource, index) => {
                            return (
                                <TouchableOpacity style={styles.transparentBackground} key={resource.id}>
                                    <Card
                                        key={resource.id}
                                        type={'small'}
                                        borderColor={theme.card_theme[index % 4]}
                                        logo={resource.logo}
                                        title={resource.title}
                                        isCompleted={false}
                                    />
                                </TouchableOpacity>
                            );
                        })}
                </ScrollView>
            </ScrollView>
        </>
    );
}
