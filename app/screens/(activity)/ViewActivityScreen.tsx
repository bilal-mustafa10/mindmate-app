import React from 'react';
import {ScrollView, StatusBar, Text, View} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigation/types';
import {styles, theme, width} from '../../constants/Theme';
import FastImage from 'react-native-fast-image';
import HTMLView from 'react-native-htmlview';
import {htmlViewStyle} from '../../constants/HtmlViewStyle';
import {Ionicons} from '@expo/vector-icons';
import {Button} from '../../components/Button';
import TagComponent from '../../components/TagComponent';
import {openCamera, openImageLibrary} from '../../services/camera';
import ImageViewer from '../../components/ImageViewerComponent';
import {RealmContext} from '../../services/realm/config';

type Props = {
    navigation: NativeStackNavigationProp<RootStackParamList, 'ViewActivity'>;
    route: any;
};

const { useRealm } = RealmContext;

export default function ViewActivityScreen({ navigation, route }: Props) {
    const realm = useRealm();
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

    const handleDeleteImage = (indexToDelete: number) => {
        setImages(images.filter((_, index) => index !== indexToDelete));
    };

    const handleCompleteActivity = () => {
        realm.write(() => {
            const userActivity = {
                _id: new Realm.BSON.UUID(),
                activity_id: activity.id,
                completed_at: new Date(),
                photos: images.length > 0 ? images : null,
                is_shared: false,
                likes: 0
            };
            realm.create('UserActivity', userActivity);
        });
        navigation.navigate('ActivityCompleted');
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
                            <TagComponent tags={activity.tags}/>
                        </View>
                        <FastImage
                            source={require('../../assets/images/favourite-empty.png')}
                            style={{width: 25, height: 25}}
                        />
                    </View>
                    <HTMLView stylesheet={htmlViewStyle} value={activity.description}/>

                    {images && images.length > 0 &&
                        <View style={{ flexDirection: 'column' }}>
                            <Text style={[theme.typography.subTitle, { marginVertical: '2%' }]}>My Photos</Text>
                            <ImageViewer
                                images={images}
                                onDeleteImage={handleDeleteImage}
                            />
                        </View>
                    }

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
                    <Button onPress={handleCompleteActivity} color={'secondary'} type={'small'}>
                        Complete
                    </Button>
                </View>
            </View>
        </>
    );
}
