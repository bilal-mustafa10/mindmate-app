import React from 'react';
import {View, Text, StatusBar, ScrollView} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import {styles, theme, width} from '../../constants/Theme';
import FastImage from 'react-native-fast-image';
import HTMLView from 'react-native-htmlview';
import {htmlViewStyle} from '../../constants/HtmlViewStyle';
import {Ionicons} from '@expo/vector-icons';
import {Button} from '../../components/Button';
import TagComponent from '../../components/TagComponent';
import {openCamera, openImageLibrary} from '../../services/camera';

type Props = {
    navigation: NativeStackNavigationProp<RootStackParamList, 'ViewActivity'>;
    route: any;
};

export default function ViewActivityScreen({ navigation, route }: Props) {
    const activity = route.params.activity;
    const [images, setImages] = React.useState<string[]>([]);

    const backgroundColor = '#000000'; // Replace this with your desired background color
    const isLight = backgroundColor === '#000000'; // Set your condition for the light status bar here

    const handleActivityComplete = () => {
        navigation.navigate('ActivityCompleted');
    };

    const handleOpenCamera = async () => {
        const response = await openCamera();
        setImages([...images, response]);
    };

    const handleOpenImageLibrary = async () => {
        const response = await openImageLibrary();
        setImages([...images, response]);
    };

    return (
        <>
            <ScrollView>
                <StatusBar barStyle={isLight ? 'light-content' : 'dark-content'} />
                <FastImage
                    source={{
                        uri: activity.photo.file,
                        priority: FastImage.priority.high,
                    }}
                    style={{
                        width: width,
                        height: (width / (activity.photo.width / activity.photo.height)) * 1.5,
                    }}
                />
                <View style={[styles.container, {marginBottom: '30%'}]}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems:'center' }}>
                        <View style={{marginTop: 15, marginBottom: 25}}>
                            <Text style={[theme.typography.subTitle, {marginVertical: '2%'}]}>{activity.title}</Text>
                            <TagComponent tags={activity.tags} />
                        </View>
                        <FastImage
                            source={require('../../assets/images/favourite-empty.png')}
                            style={{ width: 25, height: 25 }}
                        />
                    </View>
                    <HTMLView stylesheet={htmlViewStyle} value={activity.description}/>

                    <View>
                        <Text style={[theme.typography.subTitle, {marginVertical: '2%'}]}>My Photos</Text>
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                            {images &&
                                images.map((image, index) => (
                                    <FastImage
                                        key={index}
                                        source={{
                                            uri: image,
                                            priority: FastImage.priority.high,
                                        }}
                                        style={{
                                            width: width / 3,
                                            height: width / 3,
                                            margin: 1,
                                        }}
                                    />
                                ))}
                        </View>
                    </View>
                </View>
            </ScrollView>
            <View style={styles.activityContainer}>
                <View style={{ flexDirection: 'row' }}>
                    <Ionicons name={'image-outline'} size={32} color={'#000000'} style={{ marginRight: 8 }} onPress={handleOpenImageLibrary} />
                    <Ionicons name={'camera-outline'} size={32} color={'#000000'} onPress={handleOpenCamera} />
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                    <Button onPress={handleActivityComplete} color={'tertiary'} type={'small'}>
                        Share
                    </Button>
                    <Button onPress={handleActivityComplete} color={'secondary'} type={'small'}>
                        Complete
                    </Button>
                </View>
            </View>
        </>
    );
}
