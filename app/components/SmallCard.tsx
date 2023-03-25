import {Dimensions, StyleSheet, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Photo} from '../services/redux/activitySlice';
import {theme} from '../constants/Theme';

interface SmallCardProps {
    logo: Photo;
    title: string;
    borderColor?: string;
}

const screenWidth = Dimensions.get('window').width;
const cardWidth = screenWidth * 0.33;

const SmallCard = ({logo, title, borderColor}: SmallCardProps) => (
    <View style={[styles.activityBox, {borderColor: borderColor}]}>
        <FastImage source={{ uri: logo.file}} style={styles.activityImage} resizeMode={FastImage.resizeMode.contain} />
        <Text style={styles.activityTitle}>{title}</Text>
    </View>
);

const styles = StyleSheet.create({
    activityBox: {
        width: cardWidth,
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

export default SmallCard;
