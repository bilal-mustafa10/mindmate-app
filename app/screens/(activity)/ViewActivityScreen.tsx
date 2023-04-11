import React, { useCallback, useEffect, useState } from 'react';
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
import { RealmContext } from '../../services/realm/config';
import { RouteProp } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Switch } from 'react-native-paper';
import { addPhoto, addToHub, getHubDataById } from '../../services/api/userEndpoints';
import ActivityCard from '../../components/ActivityCard';
import { Photo } from '../../services/redux/activitySlice';

type Props = {
    navigation: NativeStackNavigationProp<RootStackParamList, 'ViewActivity'>;
    route: RouteProp<RootStackParamList, 'ViewActivity'>;
};

export default function ViewActivityScreen({ navigation, route }: Props) {
    const insets = useSafeAreaInsets();
    const realm = RealmContext.useRealm();
    const activity = route.params.activity;
    const isCompleted = route.params.isCompleted;
    const [images, setImages] = useState<Photo[]>([]);
    const [activityFavourite, setActivityFavourite] = useState<boolean>(false);
    const [share, setShare] = useState<boolean>(false);
    const [hubId, setHubId] = useState<number | null>(null);
    const [likes, setLikes] = useState(0);

    const backgroundColor = '#000000';
    const isLight = backgroundColor === '#000000';

    const initializeActivityState = useCallback(() => {
        if (isCompleted) {
            const userActivity = realm.objects('UserActivity').filtered(`activity_id = "${activity.id}"`)[0];
            setImages(userActivity['photos']);
            setShare(userActivity['is_shared']);
            setHubId(userActivity['hub_id']);
        }

        const isFavourite = realm.objects('UserActivityFavourite').filtered(`activity_id = "${activity.id}"`)[0];
        if (isFavourite) {
            setActivityFavourite(true);
        }
    }, [activity.id, isCompleted, realm]);

    useEffect(() => {
        initializeActivityState();
    }, [activity.id, initializeActivityState, isCompleted, realm]);

    const handleImageAction = useCallback(async (imageAction: 'camera' | 'library') => {
        const response = imageAction === 'camera' ? await openCamera() : await openImageLibrary();
        if (response) {
            setImages((prevImages) => [...prevImages, response]);
        }
    }, []);

    const handleDeleteImage = useCallback((index: number) => {
        setImages((prevImages) => prevImages.filter((_, idx) => idx !== index));
    }, []);

    const shareToHub = async () => {
        const images_id = await Promise.all(
            images.map(async (image, index) => {
                const fileName = `activity-${activity.id}-${index}.jpg`;
                return await addPhoto(image.file, fileName);
            })
        );

        await addToHub(
            1,
            'activity',
            new Date().toISOString(),
            activity.id,
            null,
            null,
            null,
            images.length > 0 ? images_id : undefined
        );

        realm.write(() => {
            const userActivity = realm.objects('UserActivity').filtered(`activity_id = "${activity.id}"`)[0];
            userActivity['is_shared'] = true;
        });

        setShare(true);
    };

    const getMoodDataFromHub = useCallback(async () => {
        const data = await getHubDataById(hubId);
        if (data.likes !== null && data.likes.length > 0) {
            setLikes(data.likes.length);
        }
    }, [hubId]);

    useEffect(() => {
        if (hubId !== null) {
            getMoodDataFromHub();
        }
    }, [getMoodDataFromHub, hubId]);

    const handleCompleteActivity = async () => {
        let hub_id = null;
        if (share) {
            const images_id = await Promise.all(
                images.map(async (image, index) => {
                    const fileName = `activity-${activity.id}-${index}.jpg`;
                    return await addPhoto(image.file, fileName);
                })
            );

            hub_id = await addToHub(
                1,
                'activity',
                new Date().toISOString(),
                activity.id,
                null,
                null,
                null,
                images.length > 0 ? images_id : undefined
            );
        }

        if (hub_id === null) {
            return;
        }

        realm.write(() => {
            const userActivity = {
                _id: new Realm.BSON.UUID(),
                activity_id: activity.id,
                completed_at: new Date(),
                photos: images.length > 0 ? images : undefined,
                is_shared: false,
                likes: 0,
                hub_id: hub_id,
            };
            realm.create('UserActivity', userActivity);
        });

        navigation.navigate('ActivityCompleted');
    };

    const handleFavourite = () => {
        if (activityFavourite) {
            realm.write(() => {
                const userActivityFavourite = realm
                    .objects('UserActivityFavourite')
                    .filtered(`activity_id = "${activity.id}"`)[0];
                if (userActivityFavourite) {
                    realm.delete(userActivityFavourite);
                    setActivityFavourite(false);
                }
            });
        } else {
            realm.write(() => {
                const userActivityFavourite = {
                    _id: new Realm.BSON.UUID(),
                    activity_id: activity.id,
                };
                realm.create('UserActivityFavourite', userActivityFavourite);
            });
            setActivityFavourite(true);
        }
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
                        <TouchableOpacity onPress={handleFavourite}>
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
                            <ActivityCard
                                activity_id={activity.id}
                                is_shared={share}
                                likes={[]}
                                photo={images}
                                type={'activity'}
                                onDelete={handleDeleteImage}
                                completed={isCompleted}
                                handleShare={shareToHub}
                            />
                        </View>
                    )}
                </View>
            </ScrollView>

            {!isCompleted && (
                <View style={styles.activityContainer}>
                    <View style={styles.backButtonContainer}>
                        <TouchableOpacity onPress={() => handleImageAction('library')} style={styles.iconButton}>
                            <Ionicons name={'image-outline'} size={36} color={'#000000'} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleImageAction('camera')} style={styles.iconButton}>
                            <Ionicons name={'camera-outline'} size={36} color={'#000000'} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.activityButtonContainer}>
                        {images.length > 0 && (
                            <>
                                <Text style={theme.typography.captionMedium}>Share</Text>
                                <View style={styles.switchContainer}>
                                    <Switch value={share} onValueChange={setShare} color={theme.colors.primary} />
                                </View>
                            </>
                        )}

                        <Button onPress={handleCompleteActivity} color={'secondary'} type={'small'}>
                            Complete
                        </Button>
                    </View>
                </View>
            )}
        </>
    );
}
