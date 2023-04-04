import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {theme} from '../constants/Theme';
import FastImage from 'react-native-fast-image';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import UserAvatar from 'react-native-user-avatar';

interface IHeaderProps {
    title?: string;
    headerRight?: any;
    headerLeft?: any;
    onHeaderRightPress?: () => void;
    onHeaderLeftPress?: () => void;
    showAvatar?: boolean;
    name?: string;
}
const Header = ({title, headerRight, headerLeft, onHeaderRightPress, onHeaderLeftPress, showAvatar, name}: IHeaderProps) => {
    const insets = useSafeAreaInsets();

    return (
        <View style={[styles.container, {paddingTop: insets.top}]}>
            {showAvatar &&
                <TouchableOpacity onPress={onHeaderLeftPress}>
                    <UserAvatar size={35} name={name} bgColor={theme.colors.tertiary}/>
                </TouchableOpacity>

            }
            {headerLeft &&
                <TouchableOpacity onPress={onHeaderLeftPress}>
                    <FastImage source={headerLeft} style={styles.image} />
                </TouchableOpacity>
            }

            {title &&
                <Text style={theme.typography.title}>{title}</Text>
            }

            {headerRight &&
                <TouchableOpacity onPress={onHeaderRightPress}>
                    <FastImage source={headerRight} style={styles.image} />
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
