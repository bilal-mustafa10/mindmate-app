import React from 'react';
import { View, FlatList, TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';
import {Ionicons} from '@expo/vector-icons';
import { width } from '../constants/Theme';

type ImageGalleryProps = {
    images: string[];
    onDeleteImage: (index: number) => void;
};

const ImageViewer: React.FC<ImageGalleryProps> = ({ images, onDeleteImage }) => {
    const renderItem = ({ item, index }) => (
        <View style={{ position: 'relative' }}>
            <FastImage
                source={{
                    uri: item,
                    priority: FastImage.priority.high,
                }}
                style={{
                    width: width / 3,
                    height: width / 3,
                    margin: 5,
                    borderRadius: 10,
                }}
            />
            <TouchableOpacity
                style={{
                    position: 'absolute',
                    top: 5,
                    right: 5,
                    backgroundColor: 'rgba(255, 255, 255, 0.7)',
                    borderRadius: 12,
                    padding: 2,
                }}
                onPress={() => onDeleteImage(index)}
            >
                <Ionicons name={'close'} size={20} color={'#000000'} />
            </TouchableOpacity>
        </View>
    );

    return (
        <View>
            <FlatList
                data={images}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                numColumns={3}
            />
        </View>
    );
};

export default ImageViewer;
