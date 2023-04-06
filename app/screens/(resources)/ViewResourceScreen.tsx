import React, { useState } from 'react';
import { ScrollView, Text, View, StyleSheet, Dimensions } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../constants/Theme';
import HTMLView from 'react-native-htmlview';
import { Button } from '../../components/Button';
import * as Progress from 'react-native-progress';
import { RouteProp } from '@react-navigation/native';
import Header from '../../components/Header';

type Props = {
    navigation: NativeStackNavigationProp<RootStackParamList, 'ViewActivity'>;
    route: RouteProp<RootStackParamList, 'ViewResource'>;
};

export default function ViewResourceScreen({ navigation, route }: Props) {
    const resources = route.params.resource;
    const content = JSON.parse(resources.content);
    const [currentIndex, setCurrentIndex] = useState(0);

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

    const { title, description } = content[currentIndex].value;

    // Get width of screen
    const screenWidth = Dimensions.get('window').width * 0.8;

    return (
        <>
            <Header
                showAvatar={false}
                onHeaderLeftPress={() => {
                    navigation.goBack();
                }}
                title={resources.title}
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
                            <Text style={[theme.typography.bodyMedium, style.cardTitle]}>{title}</Text>
                            <HTMLView value={description} stylesheet={htmlViewResourceStyle} />
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
        ...theme.typography.bodyBold,
        marginBottom: 20,
        paddingHorizontal: 20,
        textAlign: 'center',
    },
    contentContainer: {
        backgroundColor: theme.colors.transparentBackground,
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: '5%',
        paddingTop: 20, // Add this line
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

const htmlViewResourceStyle = StyleSheet.create({
    // eslint-disable-next-line react-native/no-unused-styles
    p: {
        ...theme.typography.caption,
        fontSize: 14,
        letterSpacing: 0.75,
        lineHeight: 24,
        textAlign: 'center',
    },
});
