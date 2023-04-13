import React, { useMemo } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Photo } from '../services/redux/activitySlice';
import { theme, width as baseWidth } from '../constants/Theme';

interface SmallCardProps {
    logo?: Photo;
    photo?: any;
    title: string;
    borderColor?: string;
    type: 'large' | 'medium' | 'small' | 'empty';
    isCompleted?: boolean;
    width?: number;
    height?: number;
}

const screenWidth = Dimensions.get('window').width;
const maxHeight = 300;
const maxWidth = 500;

const Card = ({ logo, title, borderColor, photo, type, isCompleted, width, height }: SmallCardProps) => {
    const cardWidth = useMemo(() => {
        if (width) return width;

        if (type === 'large') {
            return screenWidth * 0.445;
        } else if (type === 'medium') {
            return screenWidth * 0.38;
        } else if (type === 'small') {
            return screenWidth * 0.29;
        } else if (type === 'empty') {
            return screenWidth * 0.8;
        }
    }, [type, width]);

    const cardHeight = useMemo(() => {
        if (height) return height;

        if (type === 'large') {
            return screenWidth * 0.32;
        } else if (type === 'medium') {
            return screenWidth * 0.32;
        } else if (type === 'small') {
            return screenWidth * 0.3;
        } else if (type === 'empty') {
            return screenWidth * 0.8;
        }
    }, [type, height]);

    const imageSize = useMemo(() => {
        let sizeRatio = 0;

        if (type === 'large') {
            sizeRatio = 0.42;
        } else if (type === 'medium') {
            sizeRatio = 0.4;
        } else if (type === 'small') {
            sizeRatio = 0.35;
        }

        const sizeByWidth = cardWidth * sizeRatio;
        const sizeByHeight = cardHeight * sizeRatio;

        let size = Math.min(sizeByWidth, sizeByHeight);

        if (maxWidth && size > maxWidth) {
            size = maxWidth;
        }
        if (maxHeight && size > maxHeight) {
            size = maxHeight;
        }

        return size;
    }, [type, maxWidth, maxHeight, cardWidth, cardHeight]);

    const boxStyle = useMemo(() => {
        const bgColor = isCompleted ? borderColor : '#ffffff';
        const opacity = isCompleted ? 0.25 : 1;
        const rgbaColor = `${bgColor}${Math.floor(opacity * 255).toString(16)}`;

        return [
            styles.activityBox,
            {
                borderColor: borderColor,
                width: cardWidth,
                height: cardHeight,
                backgroundColor: rgbaColor,
            },
        ];
    }, [borderColor, cardWidth, cardHeight, isCompleted]);

    return (
        <View style={boxStyle}>
            <View style={styles.imageContainer}>
                {logo && (
                    <FastImage
                        source={{ uri: logo.file }}
                        style={{ width: imageSize, height: imageSize }}
                        resizeMode={FastImage.resizeMode.contain}
                    />
                )}
                {photo && (
                    <FastImage
                        source={photo}
                        style={{ width: imageSize, height: imageSize }}
                        resizeMode={FastImage.resizeMode.contain}
                    />
                )}
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.activityTitle}>{title}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    activityBox: {
        borderRadius: 15,
        borderWidth: 1.2,
        marginHorizontal: baseWidth * 0.012,
    },
    activityTitle: {
        ...theme.typography.CardText,
    },
    imageContainer: {
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        padding: baseWidth * 0.03,
    },
    textContainer: {
        justifyContent: 'flex-end',
        padding: baseWidth * 0.03,
    },
});

export default Card;
