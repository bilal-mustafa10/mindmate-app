import React, {useMemo} from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Photo} from '../services/redux/activitySlice';
import {theme} from '../constants/Theme';

interface SmallCardProps {
    logo?: Photo;
    photo?: any;
    title: string;
    borderColor?: string;
    type: 'large' | 'medium' | 'small';
}

const screenWidth = Dimensions.get('window').width;

const Card = ({logo, title, borderColor, photo, type}: SmallCardProps) => {
    const cardWidth = useMemo(() => {
        if (type === 'large') {
            return screenWidth * 0.42;
        } else if (type === 'medium') {
            return screenWidth * 0.33;
        } else if (type === 'small') {
            return screenWidth * 0.28;
        }
    }, [type]);

    const boxStyle = useMemo(() => {
        return [styles.activityBox, {borderColor: borderColor, width: cardWidth}];
    }, [borderColor, cardWidth]);

    return (
        <View style={boxStyle}>
            {logo && (
                <FastImage
                    source={{uri: logo.file}}
                    style={styles.activityImage}
                    resizeMode={FastImage.resizeMode.contain}
                />
            )}
            {photo && (
                <FastImage
                    source={photo}
                    style={styles.activityImage}
                    resizeMode={FastImage.resizeMode.contain}
                />
            )}
            <Text style={styles.activityTitle}>{title}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    activityBox: {
        height: 100,
        backgroundColor: '#ffffff',
        padding: 10,
        borderRadius: 8,
        borderWidth: 1,
        marginHorizontal: 4,
        justifyContent: 'space-around',
    },
    activityImage: {
        width: 30,
        height: 30,
    },
    activityTitle: {
        ...theme.typography.body2,
    },
});

export default Card;
