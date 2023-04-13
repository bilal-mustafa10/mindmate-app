import React, { useState } from 'react';
import { ScrollView, View, StyleSheet, Dimensions, Text } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../constants/Theme';
import { Button } from '../../components/Button';
import * as Progress from 'react-native-progress';
import { RouteProp } from '@react-navigation/native';
import Header from '../../components/Header';

type Props = {
    navigation: NativeStackNavigationProp<RootStackParamList, 'ViewAssessment'>;
    route: RouteProp<RootStackParamList, 'ViewAssessment'>;
};

export default function ViewAssessmentScreen({ navigation, route }: Props) {
    const assessment = route.params.assessment;
    console.log('assessment: ', assessment);
    const content = JSON.parse(assessment.content);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState(Array(content.length).fill(null));
    const { question } = content[currentIndex].value;

    const handleNext = () => {
        if (currentIndex < content.length - 1) {
            setCurrentIndex(currentIndex + 1);
        } else {
            navigation.goBack();
        }
    };

    const handlePrevious = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    const setAnswerForCurrentIndex = (index: number) => {
        const updatedAnswers = [...answers];
        updatedAnswers[currentIndex] = index;
        setAnswers(updatedAnswers);
    };

    // Get width of screen
    const screenWidth = Dimensions.get('window').width * 0.8;
    const options = ['Never', 'Rarely', 'Sometimes', 'Often', 'Always'];

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
            <ScrollView contentContainerStyle={style.scrollView}>
                <View style={style.contentContainer}>
                    <View style={style.progressBarContainer}>
                        <Progress.Bar
                            height={20}
                            progress={(currentIndex + 1) / content.length}
                            color={theme.colors.secondary}
                            unfilledColor={'#E5E5E5'}
                            borderWidth={0}
                            borderRadius={5}
                            width={screenWidth}
                        />
                    </View>

                    <View style={style.cardContainer}>
                        <View style={style.card}>
                            <Text style={style.cardTitle}>{question}</Text>

                            {options.map((option, index) => {
                                return (
                                    <Button
                                        key={option}
                                        type={'large'}
                                        onPress={() => setAnswerForCurrentIndex(index)}
                                        color={answers[currentIndex] === index ? 'primary' : 'transparent'}
                                    >
                                        {option}
                                    </Button>
                                );
                            })}
                        </View>
                    </View>
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
                </View>
            </ScrollView>
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
        bottom: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
        left: 0,
        paddingHorizontal: '5%',
        position: 'absolute',
        right: 0,
    },
    card: {
        alignItems: 'center',
        backgroundColor: theme.colors.whiteBackground,
        borderRadius: 13,
        elevation: 5,
        justifyContent: 'center',
        padding: 30,
        paddingHorizontal: 50,
        shadowColor: theme.colors.shadowColor,
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.07,
        shadowRadius: 3.3,
    },
    cardContainer: {
        flex: 1,
        paddingTop: '15%',
        padding: '5%',
    },
    cardTitle: {
        fontFamily: 'outfit-medium',
        fontSize: 22,
        marginBottom: 20,
        textAlign: 'left',
    },
    contentContainer: {
        backgroundColor: theme.colors.transparentBackground,
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: '5%',
        paddingTop: 20,
    },
    progressBarContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        left: 0,
        paddingVertical: 20,
        position: 'absolute',
        right: 0,
        top: 0,
    },
    scrollView: {
        backgroundColor: theme.colors.background,
        flexGrow: 1,
    },
});
