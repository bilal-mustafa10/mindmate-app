import React from 'react';
import { View, TouchableOpacity, Dimensions, Modal } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Ionicons } from '@expo/vector-icons';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import * as Animatable from 'react-native-animatable';

const { width } = Dimensions.get('window');
const adjustedWidth = width * 0.9;
const adjustedHeight = adjustedWidth * 0.7;

type ImageGalleryProps = {
    images: string[];
    onDeleteImage?: (index: number) => void;
    showDelete?: boolean;
};

const ImageViewer: React.FC<ImageGalleryProps> = ({ images, onDeleteImage, showDelete }) => {
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
        return (
            <Animatable.View animation="fadeIn" duration={500} useNativeDriver>
                <TouchableOpacity onPress={() => openModal(index)}>
                    <FastImage
                        source={{
                            uri: item,
                            priority: FastImage.priority.high,
                        }}
                        style={{
                            width: adjustedWidth,
                            height: adjustedHeight,
                            borderRadius: 10,
                            marginBottom: 10,
                        }}
                        resizeMode={FastImage.resizeMode.contain}
                    />
                </TouchableOpacity>
                {showDelete && (
                    <TouchableOpacity
                        style={{
                            position: 'absolute',
                            top: 5,
                            right: 5,
                            backgroundColor: '#FF6347',
                            borderRadius: 15,
                            padding: 4,
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: 1 },
                            shadowOpacity: 0.22,
                            shadowRadius: 2.22,
                            elevation: 3,
                        }}
                        onPress={() => onDeleteImage(index)}
                    >
                        <Ionicons name={'close'} size={20} color={'#FFFFFF'} />
                    </TouchableOpacity>
                )}
            </Animatable.View>
        );
    };

    return (
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
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
                containerStyle={{ paddingTop: 10 }}
                dotStyle={{
                    width: 10,
                    height: 10,
                    borderRadius: 5,
                    marginHorizontal: 2,
                    backgroundColor: 'rgba(0, 0, 0, 0.75)',
                }}
                inactiveDotStyle={{
                    backgroundColor: 'rgba(0, 0, 0, 0.3)',
                }}
                inactiveDotOpacity={0.4}
                inactiveDotScale={0.6}
            />
            <Modal animationType="fade" transparent={false} visible={modalVisible} onRequestClose={closeModal}>
                <View style={{ flex: 1, backgroundColor: 'black', justifyContent: 'center', alignItems: 'center' }}>
                    <FastImage
                        source={{
                            uri: images[modalImageIndex],
                            priority: FastImage.priority.high,
                        }}
                        style={{
                            width: '100%',
                            height: '100%',
                        }}
                        resizeMode={FastImage.resizeMode.contain}
                    />
                    <TouchableOpacity
                        style={{
                            position: 'absolute',
                            top: 50,
                            right: 20,
                            backgroundColor: 'rgba(255, 255, 255, 0.3)',
                            borderRadius: 15,
                            padding: 4,
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: 1 },
                            shadowOpacity: 0.22,
                            shadowRadius: 2.22,
                            elevation: 3,
                        }}
                        onPress={closeModal}
                    >
                        <Ionicons name={'close'} size={30} color={'#FFFFFF'} />
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    );
};

export default ImageViewer;
