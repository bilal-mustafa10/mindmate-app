import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {theme} from '../constants/Theme';
import FastImage from 'react-native-fast-image';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

interface IHeaderProps {
    title: string;
    image?: any;
    onPress?: () => void;

}
const Header = ({title, image, onPress}: IHeaderProps) => {
    const insets = useSafeAreaInsets();

    return (
        <View style={[styles.container, {paddingTop: insets.top}]}>
            <Text style={theme.typography.title}>{title}</Text>
            {image &&
                <TouchableOpacity onPress={onPress}>
                    <FastImage source={image} style={styles.image} />
                </TouchableOpacity>

            }
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15,
        borderBottomColor: 'lightgrey',
        borderBottomWidth: 0.6,
        paddingBottom: 10,
    },
    image: {
        width: 30,
        height: 30,
    },
});


export default Header;
