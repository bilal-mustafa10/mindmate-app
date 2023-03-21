import {Dimensions, StyleSheet, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Photo} from '../services/redux/activitySlice';
import {theme} from '../constants/Theme';

interface SmallCardProps {
    logo: Photo;
    title: string;
}

const screenWidth = Dimensions.get('window').width;
const cardWidth = screenWidth * 0.35;

const SmallCard = ({logo, title}: SmallCardProps) => (
    <View style={styles.activityBox}>
        <FastImage source={{ uri: logo.file }} style={styles.activityImage} />
        <Text style={styles.activityTitle}>{title}</Text>
    </View>
);

const styles = StyleSheet.create({
    activityBox: {
        width: cardWidth,
        height: 120,
        backgroundColor: '#ffffff',
        padding: 10,
        borderRadius: 8,
        borderColor: '#3960A8',
        borderWidth: 1,
        marginHorizontal: 4,
        justifyContent: 'space-around',
    },
    activityImage: {
        width: 35,
        height: 35,
    },
    activityTitle: {
        ...theme.typography.body2,
    },
});

export default SmallCard;
