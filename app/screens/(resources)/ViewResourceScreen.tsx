import React, {useState} from 'react';
import {ScrollView, Text, View, StyleSheet, Dimensions} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigation/types';
import {styles, theme} from '../../constants/Theme';
import HTMLView from 'react-native-htmlview';
import {Button} from '../../components/Button';
import * as Progress from 'react-native-progress';

type Props = {
    navigation: NativeStackNavigationProp<RootStackParamList, 'ViewActivity'>;
    route: any;
};

export default function ViewResourceScreen({navigation, route}: Props) {
    const resources = route.params.resource;
    const content = JSON.parse(resources.content);
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNext = () => {
        if (currentIndex < content.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }else{
            navigation.goBack();
        }
    };

    const handlePrevious = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    const {title, description} = content[currentIndex].value;

    // Get width of screen
    const screenWidth = Dimensions.get('window').width * 0.8;

    return (
        <ScrollView contentContainerStyle={style.scrollView}>
            <View style={[styles.container, style.cardContainer]}>
                <View style={style.card}>
                    <Progress.Bar height={10} progress={(currentIndex + 1) / content.length} color={theme.colors.secondary} width={screenWidth} />
                    <Text style={[theme.typography.subTitle, style.cardTitle]}>{title}</Text>
                    <HTMLView value={description} stylesheet={htmlViewResourceStyle} />
                </View>
                <View style={[style.buttonContainer, {justifyContent: currentIndex > 0 ? 'space-between' : 'flex-end'}]}>
                    {currentIndex > 0 && (
                        <Button onPress={handlePrevious} color={'tertiary'} type={'small'}>Back</Button>
                    )}
                    <Button onPress={handleNext} color={'secondary'} type={'small'}>
                        {currentIndex === content.length - 1 ? 'Complete' : 'Next'}
                    </Button>
                </View>
            </View>
        </ScrollView>
    );
}

const style = StyleSheet.create({
    scrollView: {
        flexGrow: 1,
    },
    cardContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    card: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        borderRadius: 13,
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.07,
        shadowRadius: 3.3,
        elevation: 5,
        padding: 20,
    },
    cardTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        paddingHorizontal: 20,
    },
    buttonContainer: {
        margin: '10%',
        alignSelf: 'center',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: '10%',
        backgroundColor: 'transparent',
    },
});

export const htmlViewResourceStyle = StyleSheet.create({
    p: {
        fontFamily: 'outfit-regular',
        fontSize: 16,
        lineHeight: 34,
        letterSpacing: 1,
        backgroundColor: 'transparent',
        textAlign: 'left',
        paddingHorizontal: 20,
    },
});
