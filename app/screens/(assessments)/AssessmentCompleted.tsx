import { Text, View } from '../../components/Themed';
import { styles, theme } from '../../constants/Theme';
import FastImage from 'react-native-fast-image';
import { Button } from '../../components/Button';
import { RootStackParamList } from '../../navigation/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import Stats from '../../components/StatsComponent';
import { ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type Props = {
    navigation: NativeStackNavigationProp<RootStackParamList, 'AssessmentCompleted'>;
    route: RouteProp<RootStackParamList, 'AssessmentCompleted'>;
};

export default function AssessmentCompleted({ navigation, route }: Props) {
    const { result, tScore } = route.params.results;
    const insets = useSafeAreaInsets();
    return (
        <>
            <ScrollView
                contentContainerStyle={[styles.mainContainer, { paddingTop: insets.top * 2 }, styles.paddingHorizontal]}
            >
                <View style={styles.primaryBackground}>
                    <FastImage
                        source={require('../../assets/images/assessment-completed.png')}
                        style={[styles.activityLogo, { alignSelf: 'center' }]}
                    />
                    <Text style={[theme.typography.SubHeading, { textAlign: 'center', paddingVertical: '3%' }]}>
                        Assessment Completed
                    </Text>
                    <Text
                        style={[
                            theme.typography.Text,
                            { alignSelf: 'center', textAlign: 'center', paddingBottom: '10%' },
                        ]}
                    >
                        Congratulations! You have successfully completed the mental wellbeing assessment.
                    </Text>
                    <View style={{ alignSelf: 'center', paddingVertical: '5%', backgroundColor: 'transparent' }}>
                        <Stats value={tScore} label={'Assessment Score'} size={'large'} />
                    </View>

                    <Text style={theme.typography.Text}>
                        Your result is <Text style={theme.typography.TextSemiBold}>{result}</Text>, which is determined
                        by comparing your assessment score to the established cut-off scores for this assessment.
                    </Text>
                </View>
            </ScrollView>
            <View style={styles.buttonBottomStyle}>
                <Button onPress={() => navigation.navigate('Root')} color={'secondary'} type={'large'}>
                    Continue
                </Button>
            </View>
        </>
    );
}
