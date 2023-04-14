import React, { useState } from 'react';
import { ScrollView, View, StyleSheet, Dimensions, Text } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../constants/Theme';
import { Button } from '../../components/Button';
import * as Progress from 'react-native-progress';
import { RouteProp } from '@react-navigation/native';
import Header from '../../components/Header';
import {
    calculateAngerScore,
    calculateAnxietyScore,
    calculateDepressionScore,
} from '../../constants/AssessmentScoreCalculator';
import { RealmContext } from '../../services/realm/config';

type Props = {
    navigation: NativeStackNavigationProp<RootStackParamList, 'ViewAssessment'>;
    route: RouteProp<RootStackParamList, 'ViewAssessment'>;
};

export default function ViewAssessmentScreen({ navigation, route }: Props) {
    const realm = RealmContext.useRealm();
    const options = ['Never', 'Rarely', 'Sometimes', 'Often', 'Always'];
    const assessment = route.params.assessment;
    const content = JSON.parse(assessment.content);
    const screenWidth = Dimensions.get('window').width * 0.9;

    const [currentIndex, setCurrentIndex] = useState(0);
    const [errorMessage, setErrorMessage] = useState('');
    const [answers, setAnswers] = useState(Array(content.length).fill(null));

    const { question } = content[currentIndex].value;

    const assessmentCalculators = {
        Depression: calculateDepressionScore,
        Anxiety: calculateAnxietyScore,
        Anger: calculateAngerScore,
    };

    const calculateScore = () => {
        const calculator = assessmentCalculators[assessment.title];

        if (calculator) {
            const { rawScore, tScore, result } = calculator(answers);
            return { rawScore, tScore, result };
        }
    };

    const addAssessmentToRealm = (score: number, result: string) => {
        realm.write(() => {
            const userAssessment = {
                _id: new Realm.BSON.UUID(),
                date: new Date(),
                type: assessment.title,
                score: score,
                result: result,
                answers: answers,
            };
            realm.create('UserAssessment', userAssessment);
        });
    };

    const handleNext = () => {
        if (answers[currentIndex] === null) {
            setErrorMessage('Please select an answer before proceeding.');
            return;
        } else {
            setErrorMessage('');
        }

        if (currentIndex < content.length - 1) {
            setCurrentIndex(currentIndex + 1);
        } else {
            const { rawScore, tScore, result } = calculateScore();
            addAssessmentToRealm(tScore, result);
            navigation.navigate('AssessmentCompleted', { results: { rawScore, tScore, result } });
        }
    };

    const handlePrevious = () => {
        if (currentIndex > 0) {
            setErrorMessage('');
            setCurrentIndex(currentIndex - 1);
        }
    };

    const setAnswerForCurrentIndex = (index: number) => {
        const updatedAnswers = [...answers];
        updatedAnswers[currentIndex] = index;
        setAnswers(updatedAnswers);
        setErrorMessage('');
    };

    return (
        <>
            <Header
                showAvatar={false}
                onHeaderLeftPress={() => {
                    navigation.goBack();
                }}
                title={assessment.title + ' Assessment'}
                showBackButton={true}
            />
            <ScrollView>
                <View style={style.progressBarContainer}>
                    <Progress.Bar
                        height={30}
                        progress={(currentIndex + 1) / content.length}
                        color={theme.colors.secondary}
                        unfilledColor={'#E5E5E5'}
                        borderWidth={0}
                        borderRadius={10}
                        width={screenWidth}
                    />
                </View>
                <View style={style.errorMessageContainer}>
                    <Text style={style.errorMessage}>{errorMessage}</Text>
                </View>

                <View style={style.cardContainer}>
                    <View style={style.card}>
                        <Text style={style.cardTitle}>{question}</Text>

                        {options.map((option, index) => {
                            return (
                                <Button
                                    key={option}
                                    type={'medium'}
                                    onPress={() => setAnswerForCurrentIndex(index)}
                                    color={answers[currentIndex] === index ? 'primary' : 'transparent'}
                                >
                                    {option}
                                </Button>
                            );
                        })}
                    </View>
                </View>
            </ScrollView>
            <View style={style.buttonContainer}>
                {currentIndex > 0 && (
                    <Button onPress={handlePrevious} color={'tertiary'} type={'medium'} style={style.button}>
                        Back
                    </Button>
                )}
                <Button onPress={handleNext} color={'secondary'} type={'medium'} style={style.button}>
                    {currentIndex === content.length - 1 ? 'Complete' : 'Next'}
                </Button>
            </View>
        </>
    );
}

const style = StyleSheet.create({
    button: {
        flexGrow: 1,
        marginHorizontal: 5,
    },
    buttonContainer: {
        backgroundColor: theme.colors.transparentBackground,
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingBottom: 16,
        paddingHorizontal: 10,
    },
    card: {
        backgroundColor: theme.colors.whiteBackground,
        borderRadius: 15,
        elevation: 3,
        paddingBottom: '10%',
        paddingHorizontal: 24,
        paddingTop: 24,
        shadowColor: theme.colors.shadowColor,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        width: '100%',
    },
    cardContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: '5%',
    },
    cardTitle: {
        ...theme.typography.BodySemiBold,
        fontSize: 24,
        marginBottom: 24,
        textAlign: 'left',
    },
    errorMessage: {
        ...theme.typography.BodySemiBold,
        color: theme.colors.error,
    },
    errorMessageContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    progressBarContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 15,
        paddingTop: 20,
    },
});
