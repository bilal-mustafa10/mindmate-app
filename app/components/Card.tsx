import React, { useMemo } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Photo } from '../services/redux/activitySlice';
import { theme, width } from '../constants/Theme';

interface SmallCardProps {
    logo?: Photo;
    photo?: any;
    title: string;
    borderColor?: string;
    type: 'large' | 'medium' | 'small' | 'empty';
    isCompleted?: boolean;
}

const screenWidth = Dimensions.get('window').width;

const Card = ({ logo, title, borderColor, photo, type, isCompleted }: SmallCardProps) => {
    const cardWidth = useMemo(() => {
        if (type === 'large') {
            return screenWidth * 0.425;
        } else if (type === 'medium') {
            return screenWidth * 0.33;
        } else if (type === 'small') {
            return screenWidth * 0.28;
        } else if (type === 'empty') {
            return screenWidth * 0.8;
        }
    }, [type]);

    const boxStyle = useMemo(() => {
        const bgColor = isCompleted ? borderColor : '#ffffff';
        const opacity = isCompleted ? 0.25 : 1;
        const rgbaColor = `${bgColor}${Math.floor(opacity * 255).toString(16)}`;
        return [
            styles.activityBox,
            {
                borderColor: borderColor,
                width: cardWidth,
                backgroundColor: rgbaColor,
            },
        ];
    }, [borderColor, cardWidth, isCompleted]);

    const imageSize = useMemo(() => {
        if (type === 'large') {
            return 40;
        } else if (type === 'medium') {
            return 35;
        } else if (type === 'small') {
            return 30;
        }
    }, [type]);

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
        borderWidth: 1,
        height: width * 0.28,
        marginHorizontal: width * 0.012,
    },
    activityTitle: {
        ...theme.typography.CardText,
    },
    imageContainer: {
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        padding: width * 0.03,
    },
    textContainer: {
        justifyContent: 'flex-end',
        padding: width * 0.03,
    },
});

export default Card;
