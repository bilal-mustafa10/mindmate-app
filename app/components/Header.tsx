import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { theme } from '../constants/Theme';
import FastImage from 'react-native-fast-image';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import UserAvatar from 'react-native-user-avatar';
import { Ionicons } from '@expo/vector-icons';

interface IHeaderProps {
    title?: string;
    headerRight?: any;
    headerLeft?: any;
    onHeaderRightPress?: () => void;
    onHeaderLeftPress?: () => void;
    showAvatar?: boolean;
    name?: string;
    avatarColor?: string;
    showBackButton?: boolean;
    transparent?: boolean;
    showBottomBorder?: boolean;
}
const Header = ({
    title,
    headerRight,
    headerLeft,
    onHeaderRightPress,
    onHeaderLeftPress,
    showAvatar,
    name,
    avatarColor,
    showBackButton,
    transparent,
    showBottomBorder,
}: IHeaderProps) => {
    const insets = useSafeAreaInsets();

    return (
        <View
            style={[
                styles.container,
                {
                    borderBottomWidth: showBottomBorder ? 0 : 0.6,
                    paddingTop: insets.top,
                    backgroundColor: transparent ? '#F5F4FF' : theme.colors.background,
                },
            ]}
        >
            {showAvatar && (
                <TouchableOpacity onPress={onHeaderLeftPress}>
                    <UserAvatar size={35} name={name} bgColor={avatarColor} />
                </TouchableOpacity>
            )}
            {headerLeft && (
                <TouchableOpacity onPress={onHeaderLeftPress}>
                    <FastImage source={headerLeft} style={styles.image} />
                </TouchableOpacity>
            )}

            {showBackButton && (
                <TouchableOpacity onPress={onHeaderLeftPress}>
                    <View style={styles.backButtonContainer}>
                        <Ionicons name={'chevron-back-outline'} size={24} color={'black'} />
                        <Text style={theme.typography.bodyBold}>Back</Text>
                    </View>
                </TouchableOpacity>
            )}

            {title && <Text style={theme.typography.SubHeading}>{title}</Text>}

            {headerRight && (
                <TouchableOpacity onPress={onHeaderRightPress}>
                    <FastImage source={headerRight} style={styles.image} />
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    backButtonContainer: {
        alignItems: 'center',
        flexDirection: 'row',
    },
    container: {
        alignItems: 'center',
        alignSelf: 'stretch',
        borderBottomColor: 'lightgrey',
        borderBottomWidth: 0.6,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 20,
        paddingHorizontal: 15,
    },
    image: {
        height: 30,
        width: 30,
    },
});

export default Header;
