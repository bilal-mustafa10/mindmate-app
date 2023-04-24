import React, { useRef, useState } from 'react';
import { ScrollView, Text, View, StyleSheet, Dimensions } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { styles, theme } from '../../constants/Theme';
import HTMLView from 'react-native-htmlview';
import { Button } from '../../components/Button';
import * as Progress from 'react-native-progress';
import { RouteProp } from '@react-navigation/native';
import Header from '../../components/Header';
import { disclamerMessage } from '../../constants/disclamer';

type Props = {
    navigation: NativeStackNavigationProp<RootStackParamList, 'ViewActivity'>;
    route: RouteProp<RootStackParamList, 'ViewResource'>;
};

export default function ViewResourceScreen({ navigation, route }: Props) {
    const resources = route.params.resource;
    const content = JSON.parse(resources.content);
    const screenWidth = Dimensions.get('window').width * 0.9;
    const { width, height } = Dimensions.get('window');

    const [currentIndex, setCurrentIndex] = useState(0); // Add this line
    const scrollViewRef = useRef(null); // Add this line

    const handleNext = () => {
        if (currentIndex === content.length - 1) {
            navigation.goBack();
        } else {
            setCurrentIndex(currentIndex + 1);
            scrollViewRef.current.scrollTo({ x: width * (currentIndex + 1), y: 0, animated: true });
        }
    };

    const handleBack = () => {
        setCurrentIndex(currentIndex - 1);
        scrollViewRef.current.scrollTo({ x: width * (currentIndex - 1), y: 0, animated: true });
    };

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
            <ScrollView
                horizontal={true}
                scrollEventThrottle={16}
                pagingEnabled={true}
                showsHorizontalScrollIndicator={false}
                ref={scrollViewRef}
                onMomentumScrollEnd={(event) => {
                    const newIndex = Math.round(event.nativeEvent.contentOffset.x / width);
                    setCurrentIndex(newIndex);
                }}
            >
                {content.map((_, index) => {
                    const { title, description } = content[index].value;
                    return (
                        <>
                            <View key={title} style={{ width, height }}>
                                <View style={style.progressBarContainer}>
                                    <Progress.Bar
                                        height={30}
                                        progress={(index + 1) / content.length}
                                        color={theme.colors.secondary}
                                        unfilledColor={'#E5E5E5'}
                                        borderWidth={0}
                                        borderRadius={10}
                                        width={screenWidth}
                                    />
                                </View>

                                <View style={style.cardContainer}>
                                    <View style={style.card}>
                                        <Text style={style.cardTitle}>{title}</Text>
                                        <HTMLView value={description} stylesheet={htmlViewResourceStyle} />
                                    </View>
                                    <View style={styles.disclaimerContainer}>
                                        <Text style={styles.disclaimerText}>{disclamerMessage}</Text>
                                    </View>
                                </View>
                            </View>
                        </>
                    );
                })}
            </ScrollView>
            <View style={style.buttonContainer}>
                {currentIndex > 0 && (
                    <Button onPress={handleBack} color={'tertiary'} type={'medium'} style={style.button}>
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
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,

        shadowRadius: 2.22,
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
    progressBarContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 20,
    },
});

const htmlViewResourceStyle = StyleSheet.create({
    p: {
        ...theme.typography.Body,
        fontSize: 16,
        letterSpacing: 0.75,
        lineHeight: 28,
        textAlign: 'left',
    },
});
