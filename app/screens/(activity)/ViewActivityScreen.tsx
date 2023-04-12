import React, { useCallback, useEffect, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
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
import { addPhoto, addToHub, getHubDataById, removeFromHub } from '../../services/api/userEndpoints';
import ActivityCard from '../../components/ActivityCard';
import { Photo } from '../../services/redux/activitySlice';

type Props = {
    navigation: NativeStackNavigationProp<RootStackParamList, 'ViewActivity'>;
    route: RouteProp<RootStackParamList, 'ViewActivity'>;
};

export default function ViewActivityScreen({ navigation, route }: Props) {
    const insets = useSafeAreaInsets();
    const realm = RealmContext.useRealm();
    const { activity, isCompleted } = route.params;
    const [images, setImages] = useState<Photo[]>([]);
    const [activityFavourite, setActivityFavourite] = useState<boolean>(false);
    const [share, setShare] = useState<boolean>(false);
    const [hubId, setHubId] = useState<number | null>(null);
    const [likes, setLikes] = useState(null);

    const activityObject = React.useMemo(() => {
        if (isCompleted) {
            const userActivityFilter = `activity_id = "${activity.id}"`;

            const userActivity = realm.objects('UserActivity').filtered(userActivityFilter)[0];
            if (userActivity) {
                setImages(userActivity['photos']);
                setShare(userActivity['is_shared']);
                setHubId(userActivity['hub_id']);
            }

            const isFavourite = realm.objects('UserActivityFavourite').filtered(userActivityFilter)[0];
            setActivityFavourite(!!isFavourite);

            return userActivity;
        } else {
            return null;
        }
    }, [activity.id, isCompleted, realm]);

    useEffect(() => {
        if (hubId !== null) {
            const fetchData = async () => {
                const data = await getHubDataById(hubId);
                if (data.likes !== null && data.likes.length > 0) {
                    setLikes(data.likes);
                }
            };
            fetchData().then(() => {
                console.log('done');
            });
        }
    }, [hubId]);

    const uploadImages = async () => {
        return await Promise.all(
            images.map(async (image, index) => {
                const fileName = `activity-${activity.id}-${index}.jpg`;
                return await addPhoto(image.file, fileName);
            })
        );
    };

    const uploadToHub = async () => {
        const images_id = await uploadImages();

        return await addToHub(
            1,
            'activity',
            new Date().toISOString(),
            activity.id,
            null,
            null,
            null,
            images.length > 0 ? images_id : undefined
        );
    };

    const shareToHub = async () => {
        const hub_id = await uploadToHub();

        if (hub_id === null) return;

        realm.write(() => {
            const userActivity = realm.objects('UserActivity').filtered(`activity_id = "${activity.id}"`)[0];
            userActivity['is_shared'] = true;
            userActivity['hub_id'] = hub_id;
        });

        setShare(true);
        setHubId(hub_id);
        setLikes([]);
    };

    const handleCompleteActivity = async () => {
        let hub_id = null;

        if (share) {
            const hub = await uploadToHub();
            hub_id = hub.id;
        }

        if (hub_id === null && share) return;

        realm.write(() => {
            const userActivity = {
                _id: new Realm.BSON.UUID(),
                activity_id: activity.id,
                completed_at: new Date(),
                photos: images.length > 0 ? images : undefined,
                is_shared: share,
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

    const handleImageAction = useCallback(async (imageAction: 'camera' | 'library') => {
        const response = imageAction === 'camera' ? await openCamera() : await openImageLibrary();
        if (response) {
            setImages((prevImages) => [...prevImages, response]);
        }
    }, []);

    const handleDeleteImage = useCallback((index: number) => {
        setImages((prevImages) => prevImages.filter((_, idx) => idx !== index));
    }, []);

    const handleDeleteActivityPhotos = useCallback(async () => {
        if (share) {
            await removeFromHub(hubId);
        }

        if (activityObject !== null) {
            realm.write(() => {
                if (activityObject['photos'] && Array.isArray(activityObject['photos'])) {
                    while (activityObject['photos'].length > 0) {
                        realm.delete(activityObject['photos'][0]);
                    }
                }
                activityObject['is_shared'] = false;
                activityObject['hub_id'] = null;
                activityObject['photos'] = [];
            });

            setImages([]);
            setShare(false);
            setHubId(null);
            setLikes(null);
        }
    }, [share, activityObject, hubId, realm]);

    const handleDeleteActivityFromHub = useCallback(async () => {
        const response = await removeFromHub(hubId);
        if (response.status !== 204) return;

        if (activityObject) {
            realm.write(() => {
                activityObject['is_shared'] = false;
                activityObject['hub_id'] = null;
            });

            setShare(false);
            setHubId(null);
            setLikes(null);
        }
    }, [activityObject, hubId, realm]);

    return (
        <>
            <TouchableOpacity
                style={[styles.backHeaderLeft, { paddingTop: insets.top }]}
                onPress={() => {
                    navigation.goBack();
                }}
            >
                <Ionicons name={'chevron-back-outline'} size={24} color={'black'} />
                <Text style={theme.typography.bodyBold}>Back</Text>
            </TouchableOpacity>
            <ScrollView>
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
                                ActivityData={{
                                    activity_id: activity.id,
                                    is_shared: share,
                                    likes: likes,
                                    photo: images,
                                    type: 'activity',
                                    completed: isCompleted,
                                    hub_id: hubId,
                                    handleDeleteImage: handleDeleteImage,
                                    handleShare: shareToHub,
                                    handleDeleteActivityPhotos: handleDeleteActivityPhotos,
                                    handleDeleteActivityFromHub: handleDeleteActivityFromHub,
                                }}
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
