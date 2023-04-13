import * as React from 'react';
import { Pressable, StyleSheet, Text, ViewStyle, Dimensions } from 'react-native';
import { theme } from '../constants/Theme';

const { width } = Dimensions.get('window');

interface ButtonProps {
    type: 'large' | 'medium' | 'small' | 'pill';
    onPress: () => void;
    color: 'secondary' | 'tertiary' | 'error' | 'primary' | 'transparent';
    children: React.ReactNode;
    style?: ViewStyle;
}

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        borderColor: theme.colors.borderColor,
        borderRadius: 15,
        borderWidth: 0.5,
        justifyContent: 'center',
        marginVertical: 8,
        paddingHorizontal: 12,
    },
    buttonText: {
        ...theme.typography.BodyBold,
        color: theme.colors.whiteBackground,
    },
    buttonTextPressed: {
        opacity: 0.6,
    },
});

const buttonSizeStyles = {
    large: {
        button: {
            height: 55,
            width: '100%',
        },
        text: {
            fontSize: 18,
        },
    },
    medium: {
        button: {
            height: 50,
            minWidth: width * 0.45,
        },
        text: {
            fontSize: 16,
        },
    },
    small: {
        button: {
            height: 35,
            minWidth: width * 0.28,
            margin: 5,
        },
        text: {
            fontSize: 14,
        },
    },
    pill: {
        button: {
            height: 35,
            minWidth: 60,
        },
        text: {
            fontSize: 14,
        },
    },
};

export const Button = ({ type, onPress, color, children, style }: ButtonProps) => {
    const [isPressed, setIsPressed] = React.useState(false);

    const buttonStyle = StyleSheet.flatten([
        styles.button,
        buttonSizeStyles[type]?.button || buttonSizeStyles.medium.button,
        { backgroundColor: theme.colors[color] },
        style,
        isPressed && styles.buttonTextPressed,
    ]);

    const textStyle = StyleSheet.flatten([
        color === 'transparent' ? theme.typography.Body : styles.buttonText,
        buttonSizeStyles[type]?.text || {},
        color === 'transparent' ? { color: theme.colors.text } : {},
        isPressed && styles.buttonTextPressed,
    ]);

    const handlePressIn = () => {
        setIsPressed(true);
    };

    const handlePressOut = () => {
        setIsPressed(false);
    };

    return (
        <Pressable style={buttonStyle} onPress={onPress} onPressIn={handlePressIn} onPressOut={handlePressOut}>
            <Text style={textStyle}>{children}</Text>
        </Pressable>
    );
};
