import React, { useEffect, useState } from 'react';
import { ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { styles, theme, width } from '../../constants/Theme';
import FastImage from 'react-native-fast-image';
import HTMLView from 'react-native-htmlview';
import { htmlViewStyle } from '../../constants/HtmlViewStyle';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '../../components/Button';
import TagComponent from '../../components/TagComponent';
import { openCamera, openImageLibrary } from '../../services/camera';
import ImageViewer from '../../components/ImageViewerComponent';
import { RealmContext } from '../../services/realm/config';
import { RouteProp } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Switch } from 'react-native-paper';
import { addPhoto, addToHub } from '../../services/api/userEndpoints';

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
    const [share, setShare] = useState<boolean>(false);

    const backgroundColor = '#000000'; // Replace this with your desired background color
    const isLight = backgroundColor === '#000000'; // Set your condition for the light status bar here

    const handleOpenCamera = async () => {
        const response = await openCamera();

        if (response !== null) {
            setImages([...images, response]);
        }
    };

    const handleOpenImageLibrary = async () => {
        const response = await openImageLibrary();

        if (response !== null) {
            setImages([...images, response]);
        }
    };

    const handleDeleteImage = (indexToDelete: number) => {
        setImages(images.filter((_, index) => index !== indexToDelete));
    };

    const handleCompleteActivity = async () => {
        if (share) {
            const images_id = [];
            for (const image of images) {
                const index = images.indexOf(image);
                const fileName = `activity-${activity.id}-${index}.jpg`;
                const id = await addPhoto(image, fileName);
                images_id.push(id);
            }

            await addToHub(
                1,
                new Date().toISOString(),
                activity.id,
                null,
                null,
                null,
                images.length > 0 ? images_id : undefined
            );
        }

        realm.write(() => {
            const userActivity = {
                _id: new Realm.BSON.UUID(),
                activity_id: activity.id,
                completed_at: new Date(),
                photos: images.length > 0 ? images : undefined,
                is_shared: false,
                likes: 0,
            };
            realm.create('UserActivity', userActivity);
        });

        navigation.navigate('ActivityCompleted');
    };

    useEffect(() => {
        if (isCompleted) {
            const userActivity = realm.objects('UserActivity').filtered(`activity_id = "${activity.id}"`)[0];
            setImages(userActivity['photos']);
        }

        const isFavourite = realm.objects('UserActivityFavourite').filtered(`activity_id = "${activity.id}"`)[0];
        if (isFavourite) {
            setActivityFavourite(true);
        }
    }, [activity.id, isCompleted, realm]);

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
            <TouchableOpacity style={[styles.backHeaderLeft, { paddingTop: insets.top }]} onPress={onHeaderLeftPress}>
                <Ionicons name={'chevron-back-outline'} size={24} color={'black'} />
                <Text style={theme.typography.bodyBold}>Back</Text>
            </TouchableOpacity>
            <ScrollView>
                <StatusBar barStyle={isLight ? 'light-content' : 'dark-content'} />
                <FastImage
                    source={{
                        uri: activity.photo.file,
                        priority: FastImage.priority.high,
                        cache: FastImage.cacheControl.web,
                    }}
                    style={{ width: width, height: (width / (activity.photo.width / activity.photo.height)) * 1.5 }}
                />
                <View style={[styles.mainContainer, styles.paddingBottomLarge]}>
                    <View style={styles.activityHeader}>
                        <View>
                            <Text style={[theme.typography.SubHeading, styles.marginBottomSmall]}>
                                {activity.title}
                            </Text>
                            <TagComponent tags={activity.tags} />
                        </View>
                        <TouchableOpacity onPress={activityFavourite ? handleRemoveFavourite : handleAddFavourite}>
                            <FastImage
                                source={
                                    activityFavourite
                                        ? require('../../assets/images/favourite.png')
                                        : require('../../assets/images/favourite-empty.png')
                                }
                                style={styles.favouriteLogo}
                            />
                        </TouchableOpacity>
                    </View>
                    <HTMLView stylesheet={htmlViewStyle} value={activity.description} />
                    {images.length > 0 && (
                        <View>
                            <Text style={theme.typography.bodyBold}>Memories</Text>
                            <ImageViewer images={images} onDeleteImage={handleDeleteImage} showDelete={!isCompleted} />
                        </View>
                    )}
                </View>
            </ScrollView>

            {!isCompleted && (
                <View style={styles.activityContainer}>
                    <View style={styles.backButtonContainer}>
                        <TouchableOpacity onPress={handleOpenImageLibrary} style={styles.iconButton}>
                            <Ionicons name={'image-outline'} size={36} color={'#000000'} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleOpenCamera} style={styles.iconButton}>
                            <Ionicons name={'camera-outline'} size={36} color={'#000000'} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.activityButtonContainer}>
                        {/*<Text style={theme.typography.captionMedium}>Share</Text>
                        <View style={styles.switchContainer}>
                            <Switch value={share} onValueChange={setShare} color={theme.colors.primary} />
                        </View>*/}

                        <Button onPress={handleCompleteActivity} color={'secondary'} type={'medium'}>
                            Complete
                        </Button>
                    </View>
                </View>
            )}
        </>
    );
}
