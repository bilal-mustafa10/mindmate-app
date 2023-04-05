import React, { useState } from 'react';
import { ScrollView, Text, View, StyleSheet, Dimensions } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { styles, theme } from '../../constants/Theme';
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
                onHeaderLeftPress={()=>{navigation.goBack(); }}
                title={resources.title}
                showBackButton={true}
            />
            <ScrollView contentContainerStyle={style.scrollView}>
                <View style={style.contentContainer}>
                    <View style={{ justifyContent: 'center', alignItems: 'center', paddingVertical: 20 }}>
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

                    <View style={[styles.container, style.cardContainer]}>
                        <View style={style.card}>
                            <Text style={[theme.typography.bodyMedium, style.cardTitle]}>{title}</Text>
                            <HTMLView value={description} stylesheet={htmlViewResourceStyle} />
                        </View>
                    </View>
                    <View style={style.buttonContainer}>
                        {currentIndex > 0 && (
                            <Button onPress={handlePrevious} color={'tertiary'} type={'small'} style={style.button}>Back</Button>
                        )}
                        <Button onPress={handleNext} color={'secondary'} type={'small'} style={style.button}>
                            {currentIndex === content.length - 1 ? 'Complete' : 'Next'}
                        </Button>
                    </View>

                </View>
            </ScrollView>
        </>

    );
}

const style = StyleSheet.create({
    scrollView: {
        flexGrow: 1,
        backgroundColor: theme.colors.background,
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: '5%',
        backgroundColor:'transparent'
    },
    cardContainer: {
        padding: '5%',
    },
    card: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        borderRadius: 13,
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.07,
        shadowRadius: 3.3,
        elevation: 5,
        padding: 30,
        marginBottom: 30,
    },
    cardTitle: {
        ...theme.typography.bodyBold,
        marginBottom: 20,
        textAlign: 'center',
        paddingHorizontal: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: '15%',
        paddingHorizontal: '5%',
        backgroundColor: 'transparent',
    },
    button: {
        flexGrow: 1,
        marginHorizontal: 5,
    },
});


export const htmlViewResourceStyle = StyleSheet.create({
    p: {
        ...theme.typography.caption,
        fontSize: 14,
        lineHeight: 24,
        letterSpacing: 0.75,
        textAlign: 'center',
    },
});
