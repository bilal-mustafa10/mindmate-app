import React, { useCallback } from 'react';
import { View, TouchableOpacity, Dimensions, Modal, StyleSheet, ActivityIndicator } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Ionicons } from '@expo/vector-icons';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import * as Animatable from 'react-native-animatable';
import { Photo } from '../services/redux/activitySlice';
import { theme } from '../constants/Theme';
import PhotoEditor from '@baronha/react-native-photo-editor';

const { width } = Dimensions.get('window');
const adjustedWidth = width * 0.9;

type ImageGalleryProps = {
    images: Photo[];
    onDeleteImage?: (index: number) => void;
    showDelete?: boolean;
};

const ImageViewer: React.FC<ImageGalleryProps> = ({ images, onDeleteImage, showDelete }) => {
    const [activeSlide, setActiveSlide] = React.useState(0);
    const [modalVisible, setModalVisible] = React.useState(false);
    const [modalImageIndex, setModalImageIndex] = React.useState(0);
    const [isLoading, setIsLoading] = React.useState(false);

    const openModal = (index) => {
        setModalVisible(true);
        setModalImageIndex(index);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    const handleError = () => {
        alert('Error loading image');
        onDeleteImage(modalImageIndex);
    };

    const openPhotoEditor = async (index: number) => {
        console.log('images', images);
        if (!images[index]) {
            console.warn('Image not found at index', index);
            return;
        }

        try {
            setIsLoading(true);

            const result = await PhotoEditor.open({
                stickers: undefined,
                path: images[index].file,
            });
            console.log('result', result);

            images[index].file = result as string;
            setIsLoading(false);
        } catch (e) {
            setIsLoading(false);
        }
    };

    const renderItem = useCallback(
        ({ item, index }) => {
            const aspectRatio = item.width / item.height;
            let containerHeight = Math.min(adjustedWidth / aspectRatio, 250);
            let containerWidth = Math.min(adjustedWidth, aspectRatio * containerHeight);

            // check if either height or width is 0 or NaN
            if (!containerHeight || !containerWidth || isNaN(containerHeight) || isNaN(containerWidth)) {
                containerHeight = 150; // set a standard number
                containerWidth = 150; // set a standard number
            }

            return (
                <Animatable.View animation="fadeIn" duration={500} useNativeDriver>
                    <TouchableOpacity
                        style={[styles.imageContainer, { width: containerWidth, height: containerHeight }]}
                        onPress={() => openModal(index)}
                    >
                        <FastImage
                            source={{
                                uri: item.file,
                                priority: FastImage.priority.high,
                            }}
                            style={styles.image}
                            resizeMode={FastImage.resizeMode.contain}
                            onError={handleError}
                        />
                    </TouchableOpacity>
                    <View style={styles.actionContainer}>
                        <TouchableOpacity style={styles.actionButton} onPress={() => openPhotoEditor(index)}>
                            <Ionicons name={'brush-outline'} size={24} color={theme.colors.primary} />
                        </TouchableOpacity>
                        {showDelete && (
                            <TouchableOpacity style={styles.actionButton} onPress={() => onDeleteImage(index)}>
                                <Ionicons name={'trash-outline'} size={24} color={theme.colors.primary} />
                            </TouchableOpacity>
                        )}
                    </View>
                </Animatable.View>
            );
        },
        [handleError, onDeleteImage, openPhotoEditor, showDelete]
    );

    return (
        <View style={styles.container}>
            <Carousel
                data={images}
                renderItem={renderItem}
                sliderWidth={adjustedWidth}
                itemWidth={adjustedWidth}
                layout={'default'}
                layoutCardOffset={0}
                inactiveSlideOpacity={0}
                onSnapToItem={(index) => setActiveSlide(index)}
            />
            <Pagination
                dotsLength={images.length}
                activeDotIndex={activeSlide}
                containerStyle={styles.paginationContainer}
                dotStyle={styles.paginationDot}
                inactiveDotStyle={styles.inactivePaginationDot}
                inactiveDotOpacity={0.4}
                inactiveDotScale={0.6}
            />
            <Modal animationType="fade" transparent={false} visible={modalVisible} onRequestClose={closeModal}>
                <View style={styles.modalContainer}>
                    <FastImage
                        source={{
                            uri: images[modalImageIndex].file,
                            priority: FastImage.priority.high,
                        }}
                        style={styles.modalImage}
                        resizeMode={FastImage.resizeMode.contain}
                    />
                    <TouchableOpacity style={styles.modalCloseIcon} onPress={closeModal}>
                        <Ionicons name={'close'} size={30} color={'#FFFFFF'} />
                    </TouchableOpacity>
                </View>
            </Modal>
            {isLoading && (
                <View style={styles.loadingOverlay}>
                    <ActivityIndicator size="large" color={theme.colors.primary} />
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    actionButton: {
        alignItems: 'center',
        backgroundColor: theme.colors.whiteBackground,
        borderRadius: 20,
        elevation: 3,
        flexDirection: 'row',
        marginRight: 10,
        paddingHorizontal: 10,
        paddingTop: 5,
    },
    actionContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 5,
    },
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    image: {
        height: '100%',
        width: '100%',
    },
    imageContainer: {
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        maxHeight: 250,
        overflow: 'hidden',
        width: '100%',
    },
    inactivePaginationDot: {
        backgroundColor: theme.colors.textSecondary,
    },
    loadingOverlay: {
        alignItems: 'center',
        backgroundColor: theme.colors.text,
        bottom: 0,
        justifyContent: 'center',
        left: 0,
        position: 'absolute',
        right: 0,
        top: 0,
    },
    modalCloseIcon: {
        borderRadius: 15,
        elevation: 3,
        padding: 4,
        position: 'absolute',
        right: 25,
        top: 75,
    },
    modalContainer: {
        alignItems: 'center',
        backgroundColor: theme.colors.text,
        flex: 1,
        justifyContent: 'center',
    },
    modalImage: {
        height: '100%',
        width: '100%',
    },
    paginationContainer: {
        paddingBottom: 0,
        paddingTop: 0,
    },
    paginationDot: {
        backgroundColor: theme.colors.tertiary,
        borderRadius: 5,
        height: 10,
        marginHorizontal: 2,
        width: 10,
    },
});

export default ImageViewer;
