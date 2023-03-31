import React from 'react';
import { View, TouchableOpacity, Dimensions } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Ionicons } from '@expo/vector-icons';
import Carousel from 'react-native-snap-carousel';

const { width } = Dimensions.get('window');

type ImageGalleryProps = {
    images: string[];
    onDeleteImage: (index: number) => void;
    showDelete?: boolean;
};

const ImageViewer: React.FC<ImageGalleryProps> = ({ images, onDeleteImage, showDelete }) => {
    const renderItem = ({ item, index }) => (
        <View style={{ position: 'relative', alignSelf: 'center' }}>
            <FastImage
                source={{
                    uri: item,
                    priority: FastImage.priority.high,
                }}
                style={{
                    width: width / 1.5,
                    height: width / 1.5,
                    margin: 5,
                    borderRadius: 10,
                }}
            />
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
        </View>
    );

    return (
        <View style={{ paddingTop: 20 }}>
            <Carousel
                data={images}
                renderItem={renderItem}
                sliderWidth={width}
                itemWidth={width / 1.2}
                layout={'stack'}
                layoutCardOffset={18}
            />
        </View>
    );
};

export default ImageViewer;
