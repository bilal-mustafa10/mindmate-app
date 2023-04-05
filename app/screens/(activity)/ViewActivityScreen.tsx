import React, {useEffect, useState} from 'react';
import {ScrollView, StatusBar, Text, TouchableOpacity, View,} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigation/types';
import {styles, theme, width} from '../../constants/Theme';
import FastImage from 'react-native-fast-image';
import HTMLView from 'react-native-htmlview';
import {htmlViewStyle} from '../../constants/HtmlViewStyle';
import {Ionicons} from '@expo/vector-icons';
import {Button} from '../../components/Button';
import TagComponent from '../../components/TagComponent';
import {openCamera, openImageLibrary,} from '../../services/camera';
import ImageViewer from '../../components/ImageViewerComponent';
import {RealmContext} from '../../services/realm/config';
import {RouteProp} from '@react-navigation/native';
import Header from '../../components/Header';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

type Props = {
    navigation: NativeStackNavigationProp<RootStackParamList, 'ViewActivity'>;
    route: RouteProp<RootStackParamList, 'ViewActivity'>;
};


export default function ViewActivityScreen({ navigation, route }: Props) {
    const insets = useSafeAreaInsets();
    const realm = RealmContext.useRealm();
    const activity = route.params.activity;
    const isCompleted = route.params.isCompleted;
    const [images, setImages] = useState<string[]>([]);
    const [activityFavourite, setActivityFavourite] = useState<boolean>(false);

    const backgroundColor = '#000000'; // Replace this with your desired background color
    const isLight = backgroundColor === '#000000'; // Set your condition for the light status bar here


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
                photos: images.length > 0 ? images : undefined,
                is_shared: false,
                likes: 0
            };
            realm.create('UserActivity', userActivity);
        });
        navigation.navigate('ActivityCompleted');
    };



    useEffect(() => {
        if (isCompleted) {
            const userActivity = realm
                .objects('UserActivity')
                .filtered(`activity_id = "${activity.id}"`)[0];
            setImages(userActivity['photos']);
        }

        const isFavourite = realm
            .objects('UserActivityFavourite')
            .filtered(`activity_id = "${activity.id}"`)[0];
        if (isFavourite) {
            setActivityFavourite(true);
        }
    }, []);


    const handleAddFavourite = () => {
        realm.write(() => {
            const userActivityFavourite = {
                _id: new Realm.BSON.UUID(),
                activity_id: activity.id,
            };
            realm.create('UserActivityFavourite', userActivityFavourite);
        });
        setActivityFavourite(true);
    };

    const handleRemoveFavourite = () => {
        realm.write(() => {
            const userActivityFavourite = realm
                .objects('UserActivityFavourite')
                .filtered(`activity_id = "${activity.id}"`)[0];
            if (userActivityFavourite) {
                realm.delete(userActivityFavourite);
                setActivityFavourite(false);
            }
        });
    };

    const onHeaderLeftPress = () => {
        navigation.goBack();
    };

    return (
        <>
            <TouchableOpacity
                style={{
                    paddingTop: insets.top,
                    position: 'absolute',
                    left: 10,
                    zIndex: 2,
                    flexDirection: 'row',
                    alignItems: 'center',
                }}
                onPress={onHeaderLeftPress}
            >
                <Ionicons name={'chevron-back-outline'} size={24} color={'blue'} />
                <Text style={[theme.typography.bodyBold, { color: 'blue' }]}>Back</Text>
            </TouchableOpacity>
            <ScrollView>
                <StatusBar barStyle={isLight ? 'light-content' : 'dark-content'} />
                <FastImage
                    source={{uri: activity.photo.file, priority: FastImage.priority.high, cache: FastImage.cacheControl.immutable}}
                    style={{width: width, height: (width / (activity.photo.width / activity.photo.height)) * 1.5}}
                />
                <View style={[styles.container, { marginBottom: '30%', backgroundColor: 'transparent' }]}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 15, marginBottom: 25 }}>
                        <View>
                            <Text style={{ ...theme.typography.bodyBold, marginVertical: '2%' }}>{activity.title}</Text>
                            <TagComponent tags={activity.tags} />
                        </View>
                        <TouchableOpacity onPress={activityFavourite ? handleRemoveFavourite : handleAddFavourite}>
                            <FastImage
                                source={
                                    activityFavourite
                                        ? require('../../assets/images/favourite.png')
                                        : require('../../assets/images/favourite-empty.png')
                                }
                                style={{ width: 25, height: 25 }}
                            />
                        </TouchableOpacity>
                    </View>
                    <HTMLView stylesheet={htmlViewStyle} value={activity.description} />
                    {images.length > 0 && (
                        <View style={{ flexDirection: 'column' }}>
                            <Text style={{ ...theme.typography.bodyBold, marginVertical: '2%' }}>Memories</Text>
                            <ImageViewer
                                images={images}
                                onDeleteImage={handleDeleteImage}
                                showDelete={!isCompleted}
                            />
                        </View>
                    )}
                </View>
            </ScrollView>

            {!isCompleted && (
                <View style={styles.activityContainer}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <TouchableOpacity onPress={handleOpenImageLibrary} style={styles.iconButton}>
                            <Ionicons name={'image-outline'} size={32} color={'#000000'} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleOpenCamera} style={styles.iconButton}>
                            <Ionicons name={'camera-outline'} size={32} color={'#000000'} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                        <Button onPress={handleCompleteActivity} color={'tertiary'} type={'small'}>
                            Share
                        </Button>
                        <Button onPress={handleCompleteActivity} color={'secondary'} type={'small'}>
                            Complete
                        </Button>
                    </View>
                </View>

            )}
        </>
    );
}
