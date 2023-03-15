import * as React from 'react';
import { Pressable, StyleSheet, Text, ViewStyle } from 'react-native';
import {theme} from '../constants/Theme';

interface ButtonProps {
    type: 'large' | 'medium' | 'small';
    onPress: () => void;
    color: 'secondary' | 'tertiary' | 'error' | 'primary';
    children: React.ReactNode;
    style?: ViewStyle;
}

export const Button = ({ type, onPress, color, children, style }: ButtonProps) => {
    let buttonStyle;
    let textStyle;

    switch (type) {
    case 'large':
        buttonStyle = styles.largeButton;
        textStyle = styles.largeButtonText;
        break;
    case 'medium':
        buttonStyle = styles.mediumButton;
        textStyle = styles.mediumButtonText;
        break;
    case 'small':
        buttonStyle = styles.smallButton;
        textStyle = styles.smallButtonText;
        break;
    default:
        buttonStyle = styles.mediumButton;
        textStyle = styles.mediumButtonText;
    }

    switch (color) {
    case 'secondary':
        buttonStyle.backgroundColor = theme.colors.secondary;
        break;
    case 'tertiary':
        buttonStyle.backgroundColor = theme.colors.tertiary;
        break;
    case 'error':
        buttonStyle.backgroundColor = theme.colors.error;
        break;
    case 'primary':
    default:
        buttonStyle.backgroundColor = theme.colors.primary;
        break;
    }

    return (
        <Pressable style={[buttonStyle, style]} onPress={onPress}>
            <Text style={textStyle}>{children}</Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    largeButton: {
        alignItems: 'center',
        backgroundColor: theme.colors.primary,
        borderRadius: 8,
        borderWidth: 0.5,
        borderColor: '#D9D9D9',
        height: 50,
        justifyContent: 'center',
        width: '100%',
    },
    largeButtonText: {
        ...theme.typography.button,
        color: theme.colors.textSecondary,
    },
    mediumButton: {
        alignItems: 'center',
        backgroundColor: theme.colors.secondary,
        borderRadius: 8,
        borderWidth: 0.5,
        borderColor: '#D9D9D9',
        height: 50,
        justifyContent: 'center',
        width: '45%',
    },
    mediumButtonText: {
        ...theme.typography.button,
    },
    smallButton: {
        alignItems: 'center',
        backgroundColor: theme.colors.secondary,
        borderRadius: 24,
        height: 48,
        justifyContent: 'center',
        paddingHorizontal: 16,
    },
    smallButtonText: {
        ...theme.typography.subheading,
        color: theme.colors.textSecondary,
    },
});
