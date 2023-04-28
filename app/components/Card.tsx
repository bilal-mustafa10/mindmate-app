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
            return screenWidth * 0.4;
        } else if (type === 'small') {
            return screenWidth * 0.32;
        } else if (type === 'empty') {
            return screenWidth * 0.8;
        }
    }, [type, width]);

    const cardHeight = useMemo(() => {
        if (height) return height;

        if (type === 'large') {
            return screenWidth * 0.36;
        } else if (type === 'medium') {
            return screenWidth * 0.36;
        } else if (type === 'small') {
            return screenWidth * 0.32;
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
            sizeRatio = 0.38;
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
        borderWidth: 2,
        elevation: 4,
        justifyContent: 'space-around',
        marginHorizontal: baseWidth * 0.012,
        shadowColor: theme.colors.shadowColor,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
    },
    activityTitle: {
        ...theme.typography.CardText,
    },
    imageContainer: {
        alignItems: 'flex-start',
        // backgroundColor: 'red',
        justifyContent: 'flex-start',
        paddingHorizontal: baseWidth * 0.03,
        paddingVertical: baseWidth * 0.04,
    },
    textContainer: {
        justifyContent: 'flex-end',
        padding: baseWidth * 0.03,
    },
});

export default Card;
