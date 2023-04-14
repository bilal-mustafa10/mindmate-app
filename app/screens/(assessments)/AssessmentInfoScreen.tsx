import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { RouteProp } from '@react-navigation/native';
import Header from '../../components/Header';
import { styles, theme } from '../../constants/Theme';
import SectionHeader from '../../components/SectionHeader';
import { htmlViewStyle } from '../../constants/HtmlViewStyle';
import HTMLView from 'react-native-htmlview';
import { RealmContext } from '../../services/realm/config';
import { Button } from '../../components/Button';
import AssessmentCard from '../../components/AssessmentCard';
import { getFormattedDate, getFormattedTime } from '../../services/formatDate';

type Props = {
    navigation: NativeStackNavigationProp<RootStackParamList, 'ViewAssessment'>;
    route: RouteProp<RootStackParamList, 'ViewAssessment'>;
};

export default function AssessmentInfoScreen({ navigation, route }: Props) {
    const assessment = route.params.assessment;
    const userAssessment = RealmContext.useQuery('UserAssessment').filtered('type = $0', assessment.title);

    const startAssessment = () => {
        navigation.navigate('ViewAssessment', { assessment: assessment, title: assessment.title });
    };
    return (
        <>
            <Header
                showAvatar={false}
                onHeaderLeftPress={() => {
                    navigation.goBack();
                }}
                title={assessment.title}
                showBackButton={true}
            />
            <ScrollView style={[styles.mainContainer, styles.paddingHorizontal]}>
                <SectionHeader title="About" />
                <HTMLView stylesheet={htmlViewStyle} value={assessment.instructions} />
                <SectionHeader title="Recent Assessments" />
                <View style={styles.paddingBottomLarge}>
                    {userAssessment.length > 0 ? (
                        userAssessment.map((assessment) => {
                            console.log(assessment);
                            const date = getFormattedDate(assessment['date']);
                            const time = getFormattedTime(assessment['date']);
                            const _id = assessment['_id'];
                            const score = assessment['score'];
                            const result = assessment['result'];
                            return (
                                <View key={_id}>
                                    <AssessmentCard
                                        key={_id}
                                        date={date}
                                        time={time}
                                        score={score}
                                        result={result}
                                        id={_id}
                                    />
                                </View>
                            );
                        })
                    ) : (
                        <View style={styles.emptyShortcutContainer}>
                            <Text style={theme.typography.Caption}>
                                Assessments will appear once you complete them.
                            </Text>
                        </View>
                    )}
                </View>
            </ScrollView>
            <View style={styles.buttonBottomStyle}>
                <Button onPress={startAssessment} color={'secondary'} type={'large'}>
                    Start Assessment
                </Button>
            </View>
        </>
    );
}
