import React from 'react';
import { View, TouchableOpacity, Dimensions, Modal, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Ionicons } from '@expo/vector-icons';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import * as Animatable from 'react-native-animatable';
import { Photo } from '../services/redux/activitySlice';

const { width } = Dimensions.get('window');
const adjustedWidth = width * 0.9;

type ImageGalleryProps = {
    images: Photo[];
    onDeleteImage?: (index: number) => void;
    showDelete?: boolean;
};

const ImageViewer: React.FC<ImageGalleryProps> = ({ images, onDeleteImage, showDelete }) => {
    console.log('images', images);
    const [activeSlide, setActiveSlide] = React.useState(0);
    const [modalVisible, setModalVisible] = React.useState(false);
    const [modalImageIndex, setModalImageIndex] = React.useState(0);

    const openModal = (index) => {
        setModalVisible(true);
        setModalImageIndex(index);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    const renderItem = ({ item, index }) => {
        const aspectRatio = item.width / item.height;
        const containerHeight = Math.min(adjustedWidth / aspectRatio, 250);
        const containerWidth = Math.min(adjustedWidth, aspectRatio * containerHeight);

        return (
            <Animatable.View animation="fadeIn" duration={500} useNativeDriver>
                <TouchableOpacity
                    style={[styles.imageContainer, { width: containerWidth, height: containerHeight }]}
                    onPress={() => openModal(index)}
                    onLongPress={() => showDelete && onDeleteImage(index)}
                >
                    <FastImage
                        source={{
                            uri: item.file,
                            priority: FastImage.priority.high,
                        }}
                        style={styles.image}
                        resizeMode={FastImage.resizeMode.contain}
                    />
                </TouchableOpacity>
            </Animatable.View>
        );
    };

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
        </View>
    );
};

const styles = StyleSheet.create({
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
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
    },
    modalCloseIcon: {
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        borderRadius: 15,
        elevation: 3,
        padding: 4,
        position: 'absolute',
        right: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        top: 50,
    },
    modalContainer: {
        alignItems: 'center',
        backgroundColor: 'black',
        flex: 1,
        justifyContent: 'center',
    },
    modalImage: {
        height: '100%',
        width: '100%',
    },
    paginationContainer: {
        paddingBottom: 0,
        paddingTop: 10,
    },

    paginationDot: {
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        borderRadius: 5,
        height: 10,
        marginHorizontal: 2,
        width: 10,
    },
});

export default ImageViewer;
